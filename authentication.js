const testTrigger = require('./triggers/init');

const authentication = {  
  type: 'custom',

  test: testTrigger.operation.perform,

  fields: [    
    {
      key: 'customer_id',
      label: 'Customer ID',      
      type: 'string',
      helpText: 'Customer ID and API Key can be found on your [TeleSign Portal](https://portal.telesign.com/signup).',
      required: true
    },
    {
      key: 'api_key',
      label: 'API Key',      
      type: 'password',
      required: true
    },
    {
      key: 'baseURL',
      label: 'TeleSign URL',
      helpText: 'For [Enterprise](https://portal.telesign.com/login) Customers please change to https://rest-ww.telesign.com',
      type: 'string',
      required: true,
      default: 'https://rest-api.telesign.com'
    },

  ],
  connectionLabel: '{{customer_id}}'
};

module.exports = authentication;
