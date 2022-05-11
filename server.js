const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const email_user = process.env.EMAILUSER;
const email_pass = process.env.EMAILPASS;
//data parsing
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "cdnjs.cloudflare.com",
        "fonts.gstatic.com",
        "fonts.googleapis.com",
      ],
      scriptSrc: [
        "'self'",
        "unpkg.com",
        "ajax.googleapis.com",
        "'unsafe-inline'",
      ],
      fontSrc: [
        "'self'",
        "cdnjs.cloudflare.com",
        "fonts.gstatic.com",
        "fonts.googleapis.com",
      ],
    },
  })
);

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/cdsimages", express.static(__dirname + "public/cdsimages"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/email", (req, res) => {
  //send email
  const JSONdata = JSON.stringify(req.body);
  const info = JSON.parse(JSONdata);
  if (info.uurl != "") {
    return;
  }
  const output = `<h3>New Schedule Request</h3>
    <h4>Name: </h4><p>${info.uname}</p>
    <h4>Email: </h4><p>${info.uemail}</p>
    <h4>Date: </h4><p>${info.udate}</p>
    <h4>Time: </h4><p>${info.utime}</p>
    <h4>Info: </h4><p>${info.utext}</p>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    service: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: email_user, // generated ethereal user
      pass: email_pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
    requireTLS: true,
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"CDS Mail Contact" <cdsremohost@hotmail.com>', // sender address
    to: "cdsremohost@hotmail.com", // list of receivers
    subject: "Schedule Request", // Subject line
    text: "output", // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email Sent");
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    //   res.render('contact', {msg:'Email has been sent'});
  });
});

app.listen(process.env.PORT || 3000);
