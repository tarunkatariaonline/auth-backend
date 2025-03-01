const nodemailer = require("nodemailer");

const sendMail = async (email: string, subject: string, text: string) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: 'Tarunkataria "<tarunsoftsol@gmail.com"', // sender address
    to: "tarunkatariain@gmail.com", // list of receivers
    subject: subject, // Subject line
    text: "bhai yaha hu main", // plain text body
    html: text, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

export default sendMail;
