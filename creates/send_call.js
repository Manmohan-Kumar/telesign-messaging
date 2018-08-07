// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!
//const { createUrl } = require('../utils');
//const authentication = require('../authentication');


const makeRequest = (z, bundle) => {
  const voice_url = '/v1/voice';
  //url = createUrl(voice_url, bundle);  
  baseURL = bundle.authData.baseURL?bundle.authData.baseURL:'https://rest-api.telesign.com';
  url = baseURL + voice_url;
  let voiceParam = (bundle.inputData.voice == undefined) ? 'f-en-US' : bundle.inputData.voice;
  let countryCode = (bundle.inputData.country_code == undefined) ? '' : bundle.inputData.country_code;
  let errorMessage = (bundle.inputData.country_code == undefined)?'Please also verify if country code is present in either the Phone Number or Country Dialing Code field.':'';
  const responsePromise = z.request({
    url: url,
    method: 'POST',
    body: 'phone_number=' + countryCode + bundle.inputData.phone_number + '&message=' + bundle.inputData.message + '&message_type=' + bundle.inputData.message_type + '&voice=' + voiceParam,

    headers: {
      'Content-Type': 'application/json'
    }

  });
  return responsePromise.then(response => {
    var tsRes = z.JSON.parse(response.content);
    var res = 'description :' + tsRes.status.description;
    tsRes.phone_number = countryCode+bundle.inputData.phone_number;
    response_string = JSON.stringify(tsRes);
    z.console.log('response : ' + response_string);
    //response_string = JSON.stringify(res);
    //z.console.log('In creates>sms response is: ' + response_string);
    //response.throwForStatus();
    if(!(response.status >= 200 && response.status <=299)) {
      throw new Error(res + errorMessage);
    }
    return z.JSON.parse(response_string);
  });
};

module.exports = {
  key: 'send_call',
  noun: 'Call',

  display: {
    label: 'Sends a Voice Call',
    description: "Sends a voice call (alerts, reminders, notifications, or verification messages containing time-based one-time passcodes).",
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
        key: 'phone_number',
        type: 'string',
        label: 'Phone Number'
      },
      {
        key: 'reference_id',
        type: 'string',
        label: 'Reference Id'
      },
      {
        key: 'voice__caller_id',
        type: 'string',
        label: 'caller Id'
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
      phone_number: 'Phone Number',
      reference_id: '0123456789ABCDEF0123456789ABCDEF',
      status: { code: 290, description: 'Message in progress', updated_on: '2015-10-03T14:51:28.709526Z' },
      voice: {caller_id: '+1234434343'}
    }
  }
};
