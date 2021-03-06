import type { NextApiRequest, NextApiResponse } from 'next';
import transporter from '../../lib/transporter';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sender, subject, message } = req.body;
  try {
    await transporter.sendMail({
      to: sender,
      subject,
      text: '',
      html: message,
    });
    res.status(200).json({
      message: 'Message successfully sent',
    });
  } catch (error) {
    res
      .status(error.reponseCode || 500)
      .json(error || { message: 'Something went wrong' });
  }
  res.status(200).json({ name: 'John Doe' });
};
