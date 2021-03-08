import analyzeText from 'lib/textAnalytics';
import type { NextApiRequest, NextApiResponse } from 'next';
import transporter from '../../lib/transporter';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    receiverEmail,
    senderEmail,
    name,
    subject,
    htmlMessage,
    textMessage,
  } = req.body;
  try {
    await analyzeText(textMessage);
    //   headers: {
    //     "x-priority": "5",
    //     "x-msmail-priority": "Low",
    //     importance: "low"
    // }
    await transporter(name).sendMail({
      to: receiverEmail,
      subject,
      text: textMessage,
      html: htmlMessage,
      replyTo: senderEmail,
      headers: {
        'x-priority': '1',
        'x-msmail-priority': 'High',
        importance: 'high',
      },
      messageId: 'xxxxxxx2020',
    });
    res.status(200).json({
      message: 'Message successfully sent',
      success: true,
    });
  } catch (error) {
    res
      .status(error.reponseCode || 500)
      .json({ message: 'Something went wrong', success: false });
  }
};
