import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.USER;
const pass = process.env.PASS;

if (!user || !pass) {
  throw new Error('Environment variables NODEMAIL_USER and NODEMAIL_PASS must be set');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: user,
    pass: pass,
  },
});

const mailOptions = {
  from: {
    name: "AarizeCommerce",
    address: user,
  },
  subject: 'Welcome to AarizeCommerce',
  text: 'Welcome dear friend to AarizeCommerce! Chalo Shop karte hai!!!!!!!!',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to AarizeCommerce</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #333;
      font-size: 28px;
      margin-bottom: 20px;
    }
    p {
      color: #666;
      font-size: 18px;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to AarizeCommerce</h1>
    <p>Dear User,</p>
    <p>Thank you for registering with AarizeCommerce! We are excited to have you join our community.</p>
    <p>Start exploring our wide range of products and enjoy a seamless shopping experience.</p>
    <a href="#" class="button">Shop Now</a>
  </div>
</body>
</html>`,
};

async function sendEmail(email) {
  try {
    mailOptions.to=email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export{
    sendEmail
};
