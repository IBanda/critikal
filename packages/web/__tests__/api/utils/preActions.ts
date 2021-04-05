/* eslint-disable @typescript-eslint/no-use-before-define */
import db from 'lib/db';
import { createMocks, RequestOptions } from 'node-mocks-http';
import loginHandler from 'pages/api/signin';
import signupHandler from 'pages/api/signup';
import Subscriber from 'models/subscriber';
import msgHandler from 'pages/api/message';
import Message from 'models/message';
import mongoose from 'mongoose';

export async function login({
  email = 'ian7991@outlook.com',
  password = '123456',
} = {}) {
  await db();
  const { req, res } = _createMocks({
    method: 'POST',
    body: {
      email,
      password,
    },
  });
  await loginHandler(req, res);
  return { req, res };
}

async function getSubID() {
  const sub = await Subscriber.findOne({ email: 'ian7991@outlook.com' });
  return sub.id;
}

export async function createMessage() {
  await db();
  const id = await getSubID();
  const { req, res } = _createMocks({
    body: {
      id,
      receiverEmail: 'ian7991@outlook.com',
      senderEmail: 'ian.d.banda@gmail.com',
      name: 'Ian',
      subject: 'Mail outage',
      htmlMessage: `<p>I'm very disappointed with the service you've provided this far</p>`,
      textMessage: `I'm very disappointed with the service you've provided this far`,
    },
  });
  await msgHandler(req, res);

  return { req, res };
}

export async function signup() {
  await db();
  const { req, res } = _createMocks({
    body: {
      name: 'Critikal',
      email: 'ian7991@outlook.com',
      password: '123456',
    },
  });
  await signupHandler(req, res);
  return { req, res };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function _createMocks(options: RequestOptions) {
  const { req, res } = createMocks({
    method: 'POST',
    ...options,
    headers: {
      'content-type': 'application/json',
    },
  });

  return { req, res };
}

export async function resetAndClose() {
  await db();
  await Subscriber.deleteMany();
  await Message.deleteMany();
  await mongoose.connection.close();
}

export async function getMessage() {
  const msg = await Message.findOne({ senderEmail: 'ian.d.banda@gmail.com' });
  return msg;
}
