// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!
//const { createUrl } = require('../utils');
//const authentication = require('../authentication');

const makeRequest = (z, bundle) => {    
  const messaging_url = '/v1/messaging';
  //console.log('baseURL: ' + bundle.authData.baseURL);
  //url = createUrl(messaging_url, bundle);
  baseURL = bundle.authData.baseURL;
  url = baseURL + messaging_url;
  // console.log(url);

  const responsePromise = z.request({
    url: url,
    method: 'POST',
    body: 'phone_number='+bundle.inputData.phone_number+'&message='+bundle.inputData.message+'&message_type='+bundle.inputData.message_type,
  
    headers: {
      'Content-Type': 'application/json'
    }
  
  });
  return responsePromise.then(response => {    
    response.throwForStatus();
    return z.JSON.parse(response.content);
  });
};

module.exports = {
  key: 'send_email_to_sms',
  noun: 'Sms',

  display: {
    label: 'Send SMS Notification',
    description: 'Use this when sending SMS to given phone number having country code appended.',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'message',
        label: 'Message to Be Sent.',
        helpText:
          'Text of the message to be sent to the end user. You are limited to 1600 characters or 2000 code points. If you send a very long message, TeleSign splits your message into separate parts. TeleSign recommends against sending messages that require multiple SMSes when possible.',
        type: 'string',
        required: true
      },
      {
        key: 'message_type',
        label: 'Message Type',
        helpText:
          'This parameter specifies the traffic type being sent in the message. You can provide one of the following values:\nOTP - One time passwords\nARN - Alerts, reminders, and notifications\nMKT - Marketing traffic.',
        type: 'string',
        required: true,
        default: 'ARN',
        choices: {
          OTP: 'One time passwords',
          ARN: 'Alerts, reminders,and notifications',
          MKT: 'Marketing traffic'
        }
      },      
      {
        key: 'phone_number',
        label: 'Phone Number',
        helpText: 'Please enter Country code. \nExample: [UK - country code 44. France - country code 33] + Phone Number.',
        type: 'string',
        required: true
      }
    ],
    outputFields: [
      {
        key: 'additional_info__message_parts_count',
        type: 'string',
        label: 'Displays the number of parts your message was split into.'
      },
      {
        key: 'reference_id',
        type: 'string',
        label: 'A 32-digit hex value used to identify the web service request.'
      },
      {
        key: 'status__code',
        type: 'string',
        label: 'Describes the status of your transaction.'
      },
      {
        key: 'status__description',
        type: 'string',
        label: 'A text description of the status code.'
      },
      {
        key: 'status__updated_on',
        type: 'string',
        label: 'timestamp showing when your transaction status was updated last.'
      }
    ],
    perform: makeRequest,
    sample: {
      additional_info: { message_parts_count: 1 },
      reference_id: '0123456789ABCDEF0123456789ABCDEF',
      status: { code: 290, description: 'Message in progress', updated_on: '2015-10-03T14:51:28.709526Z' }
    }
  }
};
