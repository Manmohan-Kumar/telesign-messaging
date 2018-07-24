// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!
//const { createUrl } = require('../utils');
//const authentication = require('../authentication');


const makeRequest = (z, bundle) => {
  const voice_url = '/v1/voice';
  //url = createUrl(voice_url, bundle);
  baseURL = bundle.authData.baseURL;
  url = baseURL + voice_url;
  let voiceParam = (bundle.inputData.voice == undefined) ? 'f-en-US' : bundle.inputData.voice;
  let countryCode = (bundle.inputData.country_code == undefined) ? '' : bundle.inputData.country_code;
  const responsePromise = z.request({
    url: url,
    method: 'POST',
    body: 'phone_number=' + countryCode + bundle.inputData.phone_number + '&message=' + bundle.inputData.message + '&message_type=' + bundle.inputData.message_type + '&voice=' + voiceParam,

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
    description: "'Sends an voice call (alerts, reminders, notifications, or verification messages containing time-based one-time passcodes).",
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'message',
        label: 'Message',
        helpText:
          'The message limit is 1600 characters or 2000 code points. If you send a message longer than the limit, TeleSign splits your message into multiple messages.',
        type: 'text',
        required: true
      },
      {
        key: 'message_type',
        label: 'Message Type',        
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
        helpText: 'Example: UK - country code 44. France - country code 33, Otherwise you may use the Phone Number field to supply country code along with Phone Number.',
        type: 'string',
        required: false
      },
      {
        key: 'phone_number',
        label: 'Phone Number',        
        type: 'string',
        required: true
      },
      {
        key: 'voice',
        label: 'Voice',
        helpText: 'Voice to be used for text to speech message. Default voice is English (US).',
        type: 'string',        
        required: false,
        choices: {
          'f-zh-HK': 'Chinese (Hong Kong, Cantonese)',
          'f-zh-CN': 'Chinese (Mandarin)',
          'f-zh-TW': 'Chinese (Taiwan)',
          'f-da-DK': 'Danish',
          'f-nl-NL': 'Dutch',
          'f-en-AU': 'English (Australian)',
          'f-en-GB': 'English (UK)',
          'f-en-US': 'English (US)',
          'f-en-CA': 'English (Canadian)',
          'f-en-IN': 'English (India)',
          'f-fi-FI': 'Finnish',
          'f-fr-FR': 'French',
          'f-fr-CA': 'French (Canadian)',
          'f-de-DE': 'German',
          'f-it-IT': 'Italian',
          'f-ja-JP': 'Japanese',
          'f-ko-KR': 'Korean',
          'f-nb-NO': 'Norweigan',
          'f-pl-PL': 'Polish',
          'f-pt-BR': 'Portuguese (Brazil)',
          'f-pt-PT': 'Portuguese (Europe)',
          'f-ru-RU': 'Russian',
          'f-es-MX': 'Spanish (Mexico)',
          'f-es-ES': 'Spanish (Spain, Castilian)',
          'f-ca-ES': 'Spanish (Catalan)',
          'f-sv-SE': 'Swedish'
        }
      }
    ],
    outputFields: [
      {
        key: 'additional_info__message_parts_count',
        type: 'string',
        label: 'Number of Parts in Message'
      },
      {
        key: 'reference_id',
        type: 'string',
        label: 'Reference Id'
      },
      {
        key: 'voice',
        type: 'string',
        label: 'Voice tag for language selected for language'
      },
      {
        key: 'status__code',
        type: 'string',
        label: 'Status Code'
      },
      {
        key: 'status__description',
        type: 'string',
        label: 'Status text'
      },
      {
        key: 'status__updated_on',
        type: 'string',
        label: 'Updated last'
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
