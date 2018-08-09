// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!
//const { createUrl } = require('../utils');
const makeRequest = (z, bundle) => {
    
  const messaging_url = '/v1/messaging';
  baseURL = bundle.authData.baseURL?bundle.authData.baseURL:'https://rest-api.telesign.com';
  
  url = baseURL + messaging_url;
  let countryCode = (bundle.inputData.country_code==undefined)?'':bundle.inputData.country_code;
  let errorMessage = (bundle.inputData.country_code==undefined)?' Please also verify if country code is present in either the Phone Number or Country Dialing Code field.':'';
  
  const responsePromise = z.request({
    url: url,
    method: 'POST',
    body: 'phone_number='+countryCode+bundle.inputData.phone_number+'&message='+bundle.inputData.message+'&message_type='+bundle.inputData.message_type,
  
    headers: {
      'Content-Type': 'application/json'
    }
  
  });
  return responsePromise.then(response => {    
    var tsRes = z.JSON.parse(response.content);
    var res = 'description: ' + tsRes.status.description;
    tsRes.phone_number = countryCode+bundle.inputData.phone_number;
    response_string = JSON.stringify(tsRes);
    z.console.log('response : ' + response_string);    
    if(!(response.status >= 200 && response.status <=299)) {
      throw new Error(res + errorMessage);
    }
    return z.JSON.parse(response_string);
  });
};

module.exports = {
  key: 'send_sms',
  noun: 'Sms',

  display: {
    label: 'Send SMS',
    description: 'Sends a SMS to a given phone number.',
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
        key: 'status__code',
        type: 'string',
        label: 'Status Code'
      },
      {
        key: 'status__description',
        type: 'string',
        label: 'Status Text'
      }
    ],
    perform: makeRequest,
    sample: {
      phone_number: 'Phone Number',
      external_id: 'external_id',
      reference_id: '0123456789ABCDEF0123456789ABCDEF',
      status: { code: 290, description: 'Message in progress' }
    }
  }
};
