const makeRequest = (z, bundle) => {
  const voice_url = '/v1/voice';
  
  baseURL = bundle.authData.baseURL?bundle.authData.baseURL:'https://rest-api.telesign.com';
  url = baseURL + voice_url;
  let voiceParam = (bundle.inputData.voice == undefined) ? 'f-en-US' : bundle.inputData.voice;
  
  const responsePromise = z.request({
    url: url,
    method: 'POST',
    body: 'phone_number=' + bundle.inputData.phone_number + '&message=' + bundle.inputData.message + '&message_type=' + bundle.inputData.message_type + '&voice=' + voiceParam,

    headers: {
      'Content-Type': 'application/json'
    }

  });
  return responsePromise.then(response => {
    var tsRes = z.JSON.parse(response.content);
    var errorMessage = 'description: ' + tsRes.status.description;
    tsRes.phone_number = bundle.inputData.phone_number;
    response_string = JSON.stringify(tsRes);    
    if(!(response.status >= 200 && response.status <=299)) {
      if(tsRes.status.code == 10034){
        errorMessage = "description: " + "Voice calls with Message Type ‘Marketing’ are blocked by default in the country of your phone number.  Please contact [TeleSign Support](https://portal.telesign.com/portal/contact-us) to request an exception";
      }
      throw new Error(errorMessage);
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
        key: 'phone_number',
        label: 'Phone Number',
        helpText: 'Please enter Phone Number prefixed with country code. Example: UK - country code 44, phone number 7911123456 to be entered as 447911123456. Trial account users should enter verified Phone Number.',
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
        key: 'external_id',
        type: 'string',
        label: 'External Id'
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
      external_id: 'external_id',
      reference_id: '0123456789ABCDEF0123456789ABCDEF',
      status: { code: 290, description: 'Message in progress', updated_on: '2015-10-03T14:51:28.709526Z' },
      voice: {caller_id: '+1234434343'}
    }
  }
};
