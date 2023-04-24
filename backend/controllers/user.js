const User = require("../models/user");
const Blog = require("../models/blog");
const Request = require("../models/request");
const Report = require("../models/report");
const { PrivateRoom, RoomStatus } = require("../models/chat");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
const questions = require("../questions.json");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers/dbErrorHandler");
const mongoose = require("mongoose");
const { sendEmailWithNodemailer } = require("../helpers/email");
const ObjectId = mongoose.Types.ObjectId;

exports.setUserRoomStatus = async (req, res) => {
  const roomId = req.body.roomId;
  const status = req.body.status;
  const senderUser = await User.findOne({ username: req.body.username });
  const rejectionReason = req.body.rejectionReason;

  PrivateRoom.findOne({ roomId }).exec(async (err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      if (senderUser) {
        if (senderUser.gender === "man") {
          data.roomStatus.manStatus = status;
        } else {
          data.roomStatus.womanStatus = status;
        }
      }

      if (status === "2") {
        data.roomStatus.rejectionReason = rejectionReason;

        const update = { status: 3 };
        Request.findByIdAndUpdate(new ObjectId(data.roomId), update, {
          new: true,
        }).exec((err, data) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }

          const emailData = {
            from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
            to: data.reciever.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
            subject: ` لقد تم الرد على طلب القبول الذي أرسلته - ${process.env.APP_NAME}`,
            html: `
                  <h4>لقد تلقيت هذا البريد من موقع لتسكنوا:</h4>
                  <p>لقد قام المستخدم كود - ${data.sender.username} - </p>
                  <p>بالاعتذار عن الاستمرار في طلب التواصل بسبب ${rejectionReason}</p>
                  <hr />
                  <p>https://letaskono.vercel.app/users/${data.reciever.username}</p>
              `,
          };
          sendEmailWithNodemailer(req, res, emailData);
          User.findByIdAndUpdate(
            data.sender,
            { userStatus: 0 },
            { new: true }
          ).exec((err, data) => {});
          User.findByIdAndUpdate(
            data.reciever,
            { userStatus: 0 },
            { new: true }
          ).exec((err, data) => {});
        });
      } else if (status === "1") {
        if (
          data.roomStatus.manStatus === "1" &&
          data.roomStatus.womanStatus === "1"
        ) {
          //both man and woman agreed then update request status to Finished

          const update = { status: 5 };
          Request.findByIdAndUpdate(new ObjectId(data.roomId), update, {
            new: true,
          }).exec(async (err, data) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            }
            const emailData = {
              from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
              to: data.reciever.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
              subject: ` لقد تم الرد على طلب القبول الذي أرسلته - ${process.env.APP_NAME}`,
              html: `
                    <h4>لقد تلقيت هذا البريد من موقع لتسكنوا:</h4>
                    <p>لقد قام المستخدم كود - ${data.sender.username} - </p>
                    <p>بالموافقة على الانتقال لمرحلة الرؤية الشرعية ويمكنك العثور على بياناته من خلال هذا الرابط</p>
                    <hr />
                    <p>https://letaskono.vercel.app/user/${data.roomId}</p>
                `,
            };
            sendEmailWithNodemailer(req, res, emailData);
            User.findByIdAndUpdate(
              data.sender,
              { userStatus: 1 },
              { new: true }
            ).exec((err, data) => {});
            User.findByIdAndUpdate(
              data.reciever,
              { userStatus: 1 },
              { new: true }
            ).exec((err, data) => {});
          });

          return res.json({ message: "تم القبول", data });
        }
      }

      await data.save();
      return res.json({ message: "في انتظار الطرف الاخر", data });
    }
  });
};

exports.fetchRequest = (req, res) => {
  const requestId = req.body.requestId;
  Request.findById(requestId)
    .populate("sender")
    .populate("reciever")
    .populate("privateRoom")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json({ data });
    });
};

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
  const REQUEST_TIME = "1d";
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
                        return res.json({
                          message: "اتق الله ولا تتشبه بقوم لوط",
                        });
                      }

                      const request = new Request();

                      const token = jwt.sign(
                        { senderUsername, recieverUsername },
                        process.env.JWT_ACCEPTANCE_REQUEST,
                        {
                          expiresIn: "1d",
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
                                const emailData = {
                                  from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
                                  to: reciever.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
                                  subject: ` لقد تلقيت طلب قبول مبدئي - ${process.env.APP_NAME}`,
                                  html: `
                                        <h4>لقد تلقيت هذا البريد من موقع لتسكنوا:</h4>
                                        <p>لقد قام المستخدم كود - ${sender.username} - </p>
                                        <p>بارسال طلب قبول مبدئي لك يمكنك الدخول على الموقع والرد على هذا الطلب بنفسك</p>     
                                        <hr />
                                        <p>https://letaskono.vercel.app/users/${sender.username}</p>
                                    `,
                                };
                                sendEmailWithNodemailer(req, res, emailData);
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
                  return res.json({
                    message:
                      "لا يمكنك ارسال طلب جديد قبل انتهاء مدة طلبك السابق",
                  });
                }
              }
            );
          }
        } else if (lastRequestStatus == 2) {
          return res.json({
            message: "لا يمكنك ارسال طلب جديد لانك بالفعل مرتبط بشخص أخر",
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
                  expiresIn: REQUEST_TIME,
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
                        const emailData = {
                          from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
                          to: reciever.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
                          subject: ` لقد تلقيت طلب قبول مبدئي - ${process.env.APP_NAME}`,
                          html: `
                                <h4>لقد تلقيت هذا البريد من موقع لتسكنوا:</h4>
                                <p>لقد قام المستخدم كود - ${sender.username} - </p>
                                <p>بارسال طلب قبول مبدئي لك يمكنك الدخول على الموقع والرد على هذا الطلب بنفسك</p>     
                                <hr />
                                <p>https://letaskono.vercel.app/users/${sender.username}</p>
                            `,
                        };
                        sendEmailWithNodemailer(req, res, emailData);
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
                expiresIn: REQUEST_TIME,
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
                      const emailData = {
                        from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
                        to: reciever.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
                        subject: ` لقد تلقيت طلب قبول مبدئي - ${process.env.APP_NAME}`,
                        html: `
                              <h4>لقد تلقيت هذا البريد من موقع لتسكنوا:</h4>
                              <p>لقد قام المستخدم كود - ${sender.username} - </p>
                              <p>بارسال طلب قبول مبدئي لك يمكنك الدخول على الموقع والرد على هذا الطلب بنفسك</p>     
                              <hr />
                              <p>https://letaskono.vercel.app/users/${sender.username}</p>
                          `,
                      };
                      sendEmailWithNodemailer(req, res, emailData);
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

exports.acceptRequest = (req, res) => {
  const requestId = req.body.requestId;

  Request.findById({ _id: requestId })
    .populate("sender")
    .populate("reciever")
    .exec(async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        //get only pending request from sender and receiver and convert them to timeover status
        //then accept the only one request for the sender and receiver
        const requestsToUpdate = data.reciever.recievedRequests
          .concat(data.reciever.sentRequests)
          .concat(data.sender.recievedRequests);
        const emailData = {
          from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
          to: data.reciever.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
          subject: ` لقد تم الرد على طلب القبول الذي أرسلته - ${process.env.APP_NAME}`,
          html: `
                <h4>لقد تلقيت هذا البريد من موقع لتسكنوا:</h4>
                <p>لقد قام المستخدم كود - ${data.sender.username} - </p>
                <p>بقبول طلب التواصل الذي أرسلته ويمكنكما الأن الدخول لمرحلة الأسئلة</p>
                <hr />
                <p>https://letaskono.vercel.app/users/${data.reciever.username}</p>
            `,
        };
        sendEmailWithNodemailer(req, res, emailData);
        const requestData = data;
        User.updateOne(
          { _id: requestData.sender._id },
          {
            userStatus: 1,
          },
          { new: true }
        ).exec((err, data) => {
          User.updateOne(
            { _id: requestData.reciever._id },
            {
              userStatus: 1,
            },
            { new: true }
          ).exec((err, data) => {});
        });

        Request.updateOne(
          { _id: requestId },
          {
            status: "2",
          },
          { new: true }
        ).exec((err, data) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          } else {
            Request.updateMany(
              {
                _id: {
                  $in: requestsToUpdate,
                },
                status: 0, // only update requests with status = 0
              },
              { $set: { status: 4 } },
              { new: true }
            )
              .then((result) =>
                res.json({
                  message: "تم قبول الطلب بنجاح ... ستنتقل الان لمرحلة الأسئلة",
                })
              )
              .catch((error) => console.error(error));
          }
        });
      }
    });
};

exports.rejectRequest = (req, res) => {
  const requestId = req.body.requestId;
  Request.updateOne(
    { _id: requestId },
    {
      status: "3",
    },
    { new: true }
  ).exec((err, data) => {
    if (err) {
      // console.log(err);
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      return res.json({
        message: "تم رفض الطلب ... وفقكم الله لمن هو خير",
      });
    }
  });
};

exports.getUsers = (req, res) => {
  let pageSize = req.body.pageSize ? parseInt(req.body.pageSize) : 20;
  let pageNumber = req.body.pageNumber ? parseInt(req.body.pageNumber) : 1;
  let gender = req.body.gender;
  let generalStatus = req.body.status;
  let country = req.body.country;
  let nationality = req.body.nationality;
  let state = req.body.state;

  const skip = (pageNumber - 1) * pageSize;
  const limit = pageSize;
  let users;

  let query = { role: 0, confirmed: 1 };
  if (gender) {
    query.gender = gender;
  }

  if (generalStatus) {
    query["questions.0"] = generalStatus;
  }

  if (country) {
    query["questions.1"] = country;
  }

  if (nationality) {
    query["questions.36"] = nationality;
  }

  if (state) {
    query["questions.16"] = state;
  }

  User.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec(async (err, data) => {
      console.log(err);
      if (err) {
        return res.json({ error: errorHandler(err) });
      }

      users = data;
      const totalSize = await User.countDocuments(query);

      return res.json({ users, size: totalSize });
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

  User.find({ idPhoto1: { $ne: "" } })
    .sort({ createdAt: -1 })
    .allowDiskUse(true)
    .skip(skip)
    .limit(1)
    .exec((err, users) => {
      if (err || !users) {
        console.log(err);

        return res.status(400).json({
          error: "No users found",
        });
      }
      res.json({
        users,
      });
    });
};

exports.getUsersReports = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Report.find({ confirmed: 0 })

    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec((err, reports) => {
      if (err || !reports) {
        return res.status(400).json({
          error: "No reports found",
        });
      }
      res.json({
        reports,
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
    user.idPhoto1 = "";
    user.idPhoto2 = "";
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
    user.idPhoto1 = "";
    user.idPhoto2 = "";
    user.save((err, result) => {
      if (err) {
        console.log("profile udpate error", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      const emailData = {
        from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        to: user.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
        subject: ` لقد تم تفعيل حسابك - ${process.env.APP_NAME}`,
        html: `
            <h4>لقد تلقيت هذا البريد من موقع لتسكنوا:</h4>
            <p>لقد تم الأن تفعيل حسابك في موقع لتسكنوا</p>     
            <p>يمكنك الأن إرسال الطلبات واستقبالها</p>     
            <hr />
            <p>https://letaskono.vercel.app</p>
        `,
      };
      sendEmailWithNodemailer(req, res, emailData);
      res.json({ message: `لقد تم تفعيل حساب المستخدم ${user.name}` });
    });
  });
};

exports.publicProfile = (req, res) => {
  let username = req.params.username;
  let user;
  let blogs;
  User.findOne({ username })
    .select(
      "username _id questions gender sentRequests recievedRequests userStatus confirmed role"
    )
    .populate("recievedRequests", "sender status createdAt token")
    .populate({
      path: "recievedRequests",
      populate: { path: "sender", select: "username" },
    })
    .populate("sentRequests", "reciever status createdAt token")
    .populate({
      path: "sentRequests",
      populate: { path: "reciever", select: "username" },
    })
    .exec((err, userFromDB) => {
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
          user.hashed_password = undefined;
          user.phone = undefined;
          user.name = undefined;
          user.idPhoto1 = undefined;
          user.idPhoto2 = undefined;
          user.idNumber = undefined;
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
