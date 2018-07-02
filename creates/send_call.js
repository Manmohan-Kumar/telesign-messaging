// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!
//const { createUrl } = require('../utils');
//const authentication = require('../authentication');


const makeRequest = (z, bundle) => {  
  const voice_url = '/v1/voice';
  //url = createUrl(voice_url, bundle);
  baseURL = bundle.authData.baseURL;
  url = baseURL + voice_url;  
  let voiceParam = (bundle.inputData.voice==undefined)?'f-en-US':bundle.inputData.voice;
  let countryCode = (bundle.inputData.country_code==undefined)?'':bundle.inputData.country_code;
  const responsePromise = z.request({
    url: url,
    method: 'POST',
    body: 'phone_number='+countryCode+bundle.inputData.phone_number + '&message='+bundle.inputData.message + '&message_type='+bundle.inputData.message_type + '&voice='+voiceParam,
  
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
  key: 'send_call',
  noun: 'Call',

  display: {
    label: 'Send Voice Call',
    description: "TeleSign's Voice API allows you to easily send voice messages. You can send alerts, reminders, and notifications, or you can send verification messages containing time-based one-time passcodes (TOTP).",
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'message',
        label: 'Message to Be Sent.',
        helpText:
          'Text of the message to be converted to a voice message and sent to the end user. You are limited to 1600 characters or 2000 code points. If you send a very long message, TeleSign splits your message into separate parts. TeleSign recommends against sending messages that require multiple SMSes when possible.',
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
        key: 'country_code',
        label: 'Country Dialing Code',
        helpText: 'Please enter the country Code. \nExample: UK - country code 44. France - country code 33, Otherwise you may use the Phone Number field to supply country code along with Phone Number.',
        type: 'string',
        required: false
      },   
      {
        key: 'phone_number',
        label: 'Phone Number',
        helpText: 'Please enter Phone Number. \nPlease use Country Code + Phone Number in case the trigger puts a restriction on output fields. \nFor Example an Email App(it only has subject + body)',
        type: 'string',
        required: true
      },
      {
        key: 'voice',
        label: 'Voice',
        helpText: 'The voice parameter allows you to specify a voice to be used to speak your text to speech message. If you do not specify a voice, the default f-en-US is used. For more info visit [TeleSign](https://enterprise.telesign.com/docs/voice-api#section-request-parameters)',
        type: 'string',
        required: false
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
        key: 'voice',
        type: 'string',
        label: 'The voice tag you selected for language appears here. If you did not use this parameter, the default f-en-US is displayed.'
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
