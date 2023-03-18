const User = require("../models/user");
const Blog = require("../models/blog");
const Request = require("../models/request");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
const questions = require("../questions.json");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.checkInFavourites = (req, res) => {
  const senderUsername = req.body.sender;
  const userToCheck = req.body.reciever;
  User.findOne({ username: senderUsername }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      User.findOne({ username: userToCheck }).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          const inFavourites = user.favourites.includes(result);
          return res.json({ inFavourites });
        }
      });
    }
  });
};

exports.addFavourite = (req, res) => {
  const senderUsername = req.body.sender;
  const userToAdd = req.body.userToAdd;

  User.findOne({ username: userToAdd }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      User.findOneAndUpdate(
        { username: senderUsername },
        {
          $push: {
            favourites: user,
          },
        },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          return res.json({ message: "User added to favourites" });
        }
      });
    }
  });
};

exports.removeFavourite = (req, res) => {
  const senderUsername = req.body.sender;
  const userToRemove = req.body.userToRemove;

  User.findOne({ username: userToRemove }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {

      User.findOneAndUpdate(
        { username: senderUsername },
        {
          $pull: {
            favourites: user._id,
          },
        },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          return res.json({ message: "User removed from favourites" });
        }
      });
    }
  });
};

exports.sendAcceptanceRequest = (req, res) => {
  const senderUsername = req.body.sender;
  const recieverUsername = req.body.reciever;
  let sender;
  let reciever;
  User.findOne({ username: senderUsername })
    .populate("sentRequests")
    .exec((err, senderUser) => {
      if (err || !senderUser) {
        return res.status(400).json({ error: "Sender user not found" });
      }

      sender = senderUser;
      if (sender.sentRequests.length !== 0) {
        const lastRequestStatus =
          sender.sentRequests[sender.sentRequests.length - 1].status;
        //If the request is pending or readed
        //check for token validity
        if (lastRequestStatus === 0 || lastRequestStatus === 1) {
          const lastRequestToken =
            sender.sentRequests[sender.sentRequests.length - 1].token;
          if (lastRequestToken) {
            jwt.verify(
              lastRequestToken,
              process.env.JWT_ACCEPTANCE_REQUEST,
              function (err, decoded) {
                //If token is not valid -> user can send another request
                if (err) {
                  //Before sending new request, we change the status of previous request
                  Request.findByIdAndUpdate(
                    {
                      _id: sender.sentRequests[sender.sentRequests.length - 1]
                        ._id,
                    },
                    { status: 4 },
                    {
                      new: true,
                    }
                  ).exec((err, result) => {
                    if (err) {
                      return res.status(400).json({
                        error: errorHandler(err),
                      });
                    }
                  });
                  // START sending new request
                  User.findOne({ username: recieverUsername }).exec(
                    (err, recieverUser) => {
                      if (err || !recieverUser) {
                        return res
                          .status(400)
                          .json({ error: "Reciever user not found" });
                      }
                      reciever = recieverUser;

                      if (sender.gender === reciever.gender) {
                        return res.json({ message: "اتق الله" });
                      }

                      const request = new Request();

                      const token = jwt.sign(
                        { senderUsername, recieverUsername },
                        process.env.JWT_ACCEPTANCE_REQUEST,
                        {
                          expiresIn: "10s",
                        }
                      );
                      request.sender = sender;
                      request.reciever = reciever;
                      request.token = token;

                      request.save((err, result) => {
                        if (err) {
                          return res
                            .status(400)
                            .json({ error: errorHandler(err) });
                        }
                        const newRequest = result;
                        User.findByIdAndUpdate(
                          sender._id,
                          {
                            $push: {
                              sentRequests: newRequest,
                            },
                          },
                          { new: true }
                        ).exec((err, result) => {
                          if (err) {
                            return res.status(400).json({
                              error: errorHandler(err),
                            });
                          } else {
                            User.findByIdAndUpdate(
                              reciever._id,
                              { $push: { recievedRequests: newRequest } },
                              { new: true }
                            ).exec((err, result) => {
                              if (err) {
                                return res.status(400).json({
                                  error: errorHandler(err),
                                });
                              } else {
                                return res.json({
                                  message: "تم ارسال طلب القبول المبدئي بنجاح",
                                });
                              }
                            });
                          }
                        });
                      });
                    }
                  );
                  //If token still valid this means time is not finished yet, and user has to wait before sending new request
                } else {
                  return res.json({ message: "you can't send request now" });
                }
              }
            );
          }
        } else if (lastRequestStatus == 2) {
          return res.json({
            message:
              "You can't send request because you are already accepted by another one",
          });
        } else if (
          lastRequestStatus == 3 ||
          lastRequestStatus == 4 ||
          lastRequestStatus == 5
        ) {
          // START sending new request
          User.findOne({ username: recieverUsername }).exec(
            (err, recieverUser) => {
              if (err || !recieverUser) {
                return res
                  .status(400)
                  .json({ error: "Reciever user not found" });
              }
              reciever = recieverUser;

              if (sender.gender === reciever.gender) {
                return res.json({ message: "اتق الله" });
              }

              const request = new Request();

              const token = jwt.sign(
                { senderUsername, recieverUsername },
                process.env.JWT_ACCEPTANCE_REQUEST,
                {
                  expiresIn: "10s",
                }
              );
              request.sender = sender;
              request.reciever = reciever;
              request.token = token;

              request.save((err, result) => {
                if (err) {
                  return res.status(400).json({ error: errorHandler(err) });
                }
                const newRequest = result;
                User.findByIdAndUpdate(
                  sender._id,
                  {
                    $push: {
                      sentRequests: newRequest,
                    },
                  },
                  { new: true }
                ).exec((err, result) => {
                  if (err) {
                    return res.status(400).json({
                      error: errorHandler(err),
                    });
                  } else {
                    User.findByIdAndUpdate(
                      reciever._id,
                      { $push: { recievedRequests: newRequest } },
                      { new: true }
                    ).exec((err, result) => {
                      if (err) {
                        return res.status(400).json({
                          error: errorHandler(err),
                        });
                      } else {
                        return res.json({
                          message: "تم ارسال طلب القبول المبدئي بنجاح",
                        });
                      }
                    });
                  }
                });
              });
            }
          );
        }
      } else {
        User.findOne({ username: recieverUsername }).exec(
          (err, recieverUser) => {
            if (err || !recieverUser) {
              return res.status(400).json({ error: "Reciever user not found" });
            }
            reciever = recieverUser;

            if (sender.gender === reciever.gender) {
              return res.json({ message: "اتق الله" });
            }

            const request = new Request();

            const token = jwt.sign(
              { senderUsername, recieverUsername },
              process.env.JWT_ACCEPTANCE_REQUEST,
              {
                expiresIn: "10s",
              }
            );
            request.sender = sender;
            request.reciever = reciever;
            request.token = token;

            request.save((err, result) => {
              if (err) {
                return res.status(400).json({ error: errorHandler(err) });
              }

              const newRequest = result;

              User.findByIdAndUpdate(
                sender._id,
                {
                  $push: {
                    sentRequests: newRequest,
                  },
                },
                { new: true }
              ).exec((err, result) => {
                if (err) {
                  return res.status(400).json({
                    error: errorHandler(err),
                  });
                } else {
                  User.findByIdAndUpdate(
                    reciever._id,
                    { $push: { recievedRequests: newRequest } },
                    { new: true }
                  ).exec((err, result) => {
                    if (err) {
                      return res.status(400).json({
                        error: errorHandler(err),
                      });
                    } else {
                      return res.json({
                        message: "تم ارسال طلب القبول المبدئي بنجاح",
                      });
                    }
                  });
                }
              });
            });
          }
        );
      }
    });
};

exports.getUsers = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let users;

  User.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      }

      users = data;

      return res.json({ users, size: users.length });
    });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.getQuestions = (req, res) => {
  return res.json(questions);
};

exports.getUsersThatNeedConfirmations = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  User.find({ confirmed: 0 })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec((err, users) => {
      if (err || !users) {
        return res.status(400).json({
          error: "No users found",
        });
      }
      res.json({
        users,
      });
    });
};

exports.rejectUser = (req, res) => {
  let username = req.body.username;
  let user;

  User.findOne({ username }).exec((err, userFromDB) => {
    if (err || !userFromDB) {
      return res.status(400).json({
        error: "User is not found",
      });
    }
    user = userFromDB;
    user.confirmed = 2;
    user.save((err, result) => {
      if (err) {
        console.log("profile udpate error", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ message: `User ${user.username} rejected` });
    });
  });
};

exports.confirmUser = (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let user;

  User.findOne({ username }).exec((err, userFromDB) => {
    if (err || !userFromDB) {
      return res.status(400).json({
        error: "User is not found",
      });
    }
    user = userFromDB;
    user.confirmed = 1;
    user.save((err, result) => {
      if (err) {
        console.log("profile udpate error", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ message: `User ${user.username} confirmed` });
    });
  });
};

exports.publicProfile = (req, res) => {
  let username = req.params.username;
  let user;
  let blogs;
  User.findOne({ username }).exec((err, userFromDB) => {
    if (err || !userFromDB) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user = userFromDB;
    let userId = user._id;
    Blog.find({ postedBy: userId })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name")
      .limit(10)
      .select(
        "_id title slug excerpt categories tags postedBy createdAt updatedAt"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        user.photo = undefined;
        user.hashed_password = undefined;
        res.json({
          user,
          blogs: data,
        });
      });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }

    let user = req.profile;
    // user's existing role and email before update
    let existingRole = user.role;
    let existingEmail = user.email;

    if (fields && fields.username && fields.username.length > 12) {
      return res.status(400).json({
        error: "Username should be less than 12 characters long",
      });
    }

    if (fields.username) {
      fields.username = slugify(fields.username).toLowerCase();
    }

    if (fields.password && fields.password.length < 6) {
      return res.status(400).json({
        error: "Password should be min 6 characters long",
      });
    }

    fields.questions = JSON.parse(fields.questions);

    user = _.extend(user, fields);
    // user's existing role and email - dont update - keep it same
    user.role = existingRole;
    user.email = existingEmail;

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        });
      }
      user.photo.data = fs.readFileSync(files.photo.filepath);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        console.log("profile udpate error", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      user.photo = undefined;
      user.questions = undefined;
      user.phone = undefined;
      user.idPhoto1 = undefined;
      user.idPhoto2 = undefined;
      res.json(user);
    });
  });
};

exports.photo = (req, res) => {
  const username = req.params.username.toLowerCase();
  User.findOne({ username })
    .select("photo")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: "User not found" });
      }
      if (user.photo.data) {
        res.set("Content-Type", user.photo.type);
        return res.send(user.photo.data);
      }
    });
};
