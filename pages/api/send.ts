import analyzeText from 'lib/textAnalytics';
import type { NextApiRequest, NextApiResponse } from 'next';
import Email from 'models/email';
import db from 'lib/db';
import transporter from 'lib/transporter';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    id,
    receiverEmail,
    senderEmail,
    name,
    subject,
    htmlMessage,
    textMessage,
  } = req.body;
  try {
    const textInsights = await analyzeText(textMessage);
    const isHigh = textInsights.priority === 'high';
    const messageId = id + Date.now();

    await transporter(name).sendMail({
      to: receiverEmail,
      subject,
      text: textMessage,
      html: htmlMessage,
      replyTo: senderEmail,
      messageId,
      headers: {
        'x-priority': isHigh ? '1' : '3',
        'x-msmail-priority': isHigh ? 'High' : 'Normal',
        importance: isHigh ? 'high' : 'normal',
      },
    });

    await db();
    await Email.create({
      id: messageId,
      emailId: id,
      subject,
      message: htmlMessage,
      senderEmail,
      insights: {
        sentiment: textInsights.sentiment,
        keyPhrases: textInsights.keyPhrases,
        priority: textInsights.priority,
      },
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
