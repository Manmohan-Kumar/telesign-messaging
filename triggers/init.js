const { replaceVars } = require('../utils');

const getList = (z, bundle) => {  
  baseURL = bundle.authData.baseURL?bundle.authData.baseURL:'https://rest-api.telesign.com';

  let authMsgTestURL = '/v1/messaging';
  url = baseURL + authMsgTestURL;
  url = replaceVars(url, bundle);
  const responsePromise = z.request({ 
    url: url,
    method: 'POST',
    body: 'phone_number=' + bundle.authData.test_phone_number+'&message=Zapier welcomes you to TeleSign'+'&message_type=ARN',
   });
  return responsePromise.then(response => {
    let errorMessage = 'The credentials you provided are invalid.';
    if(!(response.status >= 200 && response.status <=299)) {
      var tsRes = z.JSON.parse(response.content);
      if((tsRes.status.code == 10028) || (tsRes.status.code == 10009)){// Missing Authorization Header
        errorMessage = "description: " + errorMessage;
      } else if((tsRes.status.code == 11000)||(tsRes.status.code == 11001)){ // Invalid Phone Number or country code
        errorMessage = "description: " + tsRes.status.description;
      } else {
        z.console.log('In triggers>init response is: ' + response_string);
        errorMessage = "description: " + tsRes.status.description + '. ' + errorMessage;
      }
      z.console.log('In triggers>init url getting used is: ' + url + ' Telesign returned status code as ' + tsRes.status.code); 
      throw new Error(errorMessage);   
    }     
    return 'Successfully Connected to Zapier';
  });
};

module.exports = {
  key: 'init',
  noun: 'Init',

  display: {
    label: 'Init Trigger',
    description: 'Tests trigger mandated by zapier.',
    hidden: true,
    important: false
  },

  operation: {
    inputFields: [
      {
        key: 'message',
        label: 'Message',
        type: 'string',        
        default: 'I am coming from Zapier.'
      },
      {
        key: 'message_type',
        label: 'Arn',
        type: 'string',        
        default: 'ARN'
      },
      {
        key: 'country_code',
        label: 'Country Code',
        type: 'string',        
        default: '91'
      },
      {
        key: 'phone_number',
        label: 'Phone_number',
        type: 'string',        
        default: '917003400580'
      }
    ],
    outputFields: [
      {
        key: 'additional_info__message_parts_count',
        type: 'string'
      },
      {
        key: 'reference_id',
        type: 'string'
      },
      {
        key: 'status__code',
        type: 'string'
      },
      {
        key: 'status__description',
        type: 'string'
      },
      {
        key: 'status__updated_on',
        type: 'string'
      }
    ],
    perform: getList,
    sample: {
      additional_info: { message_parts_count: 1 },
      reference_id: '0123456789ABCDEF0123456789ABCDEF',
      status: { code: 290, description: 'Message in progress', updated_on: '2015-10-03T14:51:28.709526Z' }
    }
  }
};
