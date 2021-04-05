const messages = [
  {
    id: '1',
    usedTags: ['phone'],
    _doc: {
      subject: 'This is a great product',
      message: '<p>I ordered a phone from you last week and it is fabulous</P>',
      insights: { priority: 'normal' },
      status: 'open',
    },
  },
  {
    id: '2',
    usedTags: [],
    _doc: {
      subject: 'This is a Bad product',
      message:
        '<p>I ordered a laptop from you last week and it is Horrible</P>',
      insights: { priority: 'high' },
      status: 'open',
    },
  },
];

export default messages;
