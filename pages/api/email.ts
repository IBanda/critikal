import analyzeText from 'lib/textAnalytics';
import type { NextApiResponse } from 'next';
import Email from 'models/email';
import db from 'lib/db';
import transporter from 'lib/transporter';
import withSession from 'lib/session';
import { NextApiReqWithSession } from 'lib/interfaces';
import formatData from 'utils/formatData';

export default withSession(
  async (req: NextApiReqWithSession, res: NextApiResponse) => {
    const subscriber = req.session.get('subscriber');
    try {
      await db();
      switch (req.method) {
        case 'POST': {
          const {
            id,
            receiverEmail,
            senderEmail,
            name,
            subject,
            htmlMessage,
            textMessage,
          } = req.body;
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

          await Email.create({
            id: messageId,
            name,
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
          break;
        }
        case 'GET': {
          const { id } = req.query;
          if (id) {
            const email = await Email.findOne({ id: String(id) });
            res.status(200).json(email);
          } else {
            let data = [];
            const emails = await Email.find(
              { emailId: subscriber.id },
              'id senderEmail subject insights created_on'
            );
            if (emails.length) {
              data = formatData(emails);
            }
            res.status(200).json(data);
          }
          break;
        }
        case 'PATCH': {
          const { id, status } = req.query;

          if (status === 'actionable' || status === 'resolved') {
            await Email.findOneAndUpdate({ id: String(id) }, { status });
            res
              .status(200)
              .json({ message: 'status successfully updated', success: true });
          }
          break;
        }
        case 'DELETE': {
          const { id } = req.query;
          await Email.findOneAndDelete({ id: String(id) });
          res
            .status(200)
            .json({ message: 'Message succssfully deleted', success: true });
          break;
        }
        default:
          throw new Error('Unsupported Method');
      }
    } catch (error) {
      res
        .status(error.reponseCode || 500)
        .json({ message: 'Something went wrong', success: false });
    }
  }
);
