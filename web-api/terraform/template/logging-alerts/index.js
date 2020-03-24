const zlib = require('zlib');
const AWS = require('aws-sdk');

const SES = new AWS.SES({
  region: 'us-east-1',
});

exports.handler = async event => {
  if (event.awslogs && event.awslogs.data) {
    const payload = Buffer.from(event.awslogs.data, 'base64');

    const logevents = JSON.parse(zlib.unzipSync(payload).toString()).logEvents;

    for (const logevent of logevents) {
      const [, , level, message] = logevent.message.split('\t');
      if (level.toLowerCase() !== 'error') continue;
      const [path, requestId, requestTime, stack, value] = message.split('|');
      await SES.sendEmail({
        Destination: {
          ToAddresses: ['cseibert@flexion.us'],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `Request Id: ${requestId}<br/>Endpoint: ${path}<br/>Request Time: ${requestTime}<br/>Message: ${value}<br/>Stack Trace: ${stack}`,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `ERROR on ${process.env.STAGE}`,
          },
        },
        Source: process.env.EMAIL_SOURCE,
      }).promise();
    }
  }
};
