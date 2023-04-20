const { sendEmailWithNodemailer } = require("../helpers/email");

exports.contactForm = (req, res) => {
  const { name, email, message } = req.body;

  const emailData = {
    to: process.env.EMAIL_TO, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
    from: email, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
    subject: `Contact form - ${process.env.APP_NAME}`,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
        <h4>Email received from contact form:</h4>
        <p>Sender name: ${name}</p>
        <p>Sender email: ${email}</p>
        <p>Sender message: ${message}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p></p>
    `,
  };

  sendEmailWithNodemailer(req, res, emailData).then(() => {
    return res.json({
      success: true,
    });
  });
};

exports.contactBlogAuthorForm = (req, res) => {
  const { authorEmail, name, email, message } = req.body;
  let mailList = [authorEmail, process.env.EMAIL_TO];
  const emailData = {
    to: mailList, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
    from: email, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
    subject: `Someone messaged you form - ${process.env.APP_NAME}`,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
          <h4>Email received from :</h4>
          <p> name: ${name}</p>
          <p> email: ${email}</p>
          <p> message: ${message}</p>
          <hr />
          <p>This email may contain sensitive information</p>
          <p>https://onemancode.com</p>
      `,
  };

  sendEmailWithNodemailer(req, res, emailData).then(() => {
    return res.json({
      success: true,
    });
  });
};
