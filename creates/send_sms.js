// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!
//const { createUrl } = require('../utils');
const makeRequest = (z, bundle) => {
    
  const messaging_url = '/v1/messaging';
  baseURL = bundle.authData.baseURL;  
  // url = createUrl(messaging_url, bundle);
  url = baseURL + messaging_url;
  let countryCode = (bundle.inputData.country_code==undefined)?'':bundle.inputData.country_code;
  // Exclude create fields that uncheck "Send to Action Endpoint URL in JSON body"
  // https://zapier.com/developer/documentation/v2/action-fields/#send-to-action-endpoint-url-in-json-body
  const responsePromise = z.request({
    url: url,
    method: 'POST',
    body: 'phone_number='+countryCode+bundle.inputData.phone_number+'&message='+bundle.inputData.message+'&message_type='+bundle.inputData.message_type,
    //body: bundle.inputData,
    headers: {
      'Content-Type': 'application/json'
    }
    //body: 'phone_number=917009600580&message=Your message here&message_type=ARN'
  });
  return responsePromise.then(response => {
    console.log('In creates>send_sms');
    response.throwForStatus();
    return z.JSON.parse(response.content);
  });
};

module.exports = {
  key: 'send_sms',
  noun: 'Sms',

  display: {
    label: 'Send SMS',
    description: 'Sends SMS to given phone number.',
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
        // default: 'ARN',
        // choices: {
        //   OTP: 'One time passwords',
        //   ARN: 'Alerts, reminders,and notifications',
        //   MKT: 'Marketing traffic'
        // }
      },
      {
        key: 'country_code',
        label: 'Country Dialing Code',
        helpText: 'Please enter the country Code. \nExample: UK - country code 44. France - country code 33, Otherwise you may use the Phone Number field to supply country code along with Phone Number.',
        type: 'string',
        required: false
      },
      {
        key: 'phone_number',
        label: 'Phone Number',
        helpText: 'Please enter the Phone Number.',
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
