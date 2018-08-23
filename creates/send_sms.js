var qs = require("querystring");
const makeRequest = (z, bundle) => {
    
  const messaging_url = '/v1/messaging';
  baseURL = bundle.authData.baseURL?bundle.authData.baseURL:'https://rest-api.telesign.com';
  
  url = baseURL + messaging_url;
    
  const responsePromise = z.request({
    url: url,
    method: 'POST',  
    body: qs.stringify({
      phone_number:bundle.inputData.phone_number,
      message:bundle.inputData.message,
      message_type:bundle.inputData.message_type
    }),
  
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  
  });
  return responsePromise.then(response => {    
    var tsRes = z.JSON.parse(response.content);
    var errorMessage = 'description: ' + tsRes.status.description;
    tsRes.phone_number = bundle.inputData.phone_number;
    response_string = JSON.stringify(tsRes);        
    if(!(response.status >= 200 && response.status <=299)) {      
      if(tsRes.status.code == 10034){
        errorMessage = "description: " + "SMS messages with Message Type ‘Marketing’ are blocked by default in the country of your phone number.  Please contact [TeleSign Support](https://portal.telesign.com/portal/contact-us) to request an exception";
      }
      throw new Error(errorMessage);
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
        key: 'phone_number',
        label: 'Phone Number',
        helpText: 'Please enter Phone Number prefixed with country code. Example: UK - country code 44, phone number 7911123456 to be entered as 447911123456. Trial account users should enter verified Phone Number.',
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
