import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASS,
    },
  },
  {
    from: 'critikal@ianbanda.com',
  }
);

export default transporter;
