import nodemailer from 'nodemailer';

export default function transporter(senderEmail: string) {
  return nodemailer.createTransport(
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
      from: `"${senderEmail}" <critikal@ianbanda.com>`,
    }
  );
}
