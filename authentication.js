const testTrigger = require('./triggers/init');

const authentication = {
  // TODO: just an example stub - you'll need to complete
  type: 'custom',

  test: testTrigger.operation.perform,

  fields: [    
    {
      key: 'customer_id',
      label: 'Customer ID',      
      type: 'string',
      helpText: 'Customer ID, API Key, can be found on your TeleSign Portal [Account Settings](https://portal.telesign.com/portal/account-settings) page (For TeleSign Standard customers) or at [Teleportal](https://teleportal.telesign.com) (For TeleSign Enterprise customers).',
      required: true
    },
    {
      key: 'api_key',
      label: 'API Key',      
      type: 'password',
      required: true
    },
    {
      key: 'test_phone_number',
      label: 'Test Phone Number' ,      
      type: 'string',
      helpText: 'Used to verify credentials only',
      required: true
    },
    {
      key: 'baseURL',
      label: 'REST Endpoint',
      helpText: 'Telesign URL for Enterprise Customers',
      type: 'string',
      required: false
    },

  ],
  connectionLabel: '{{customer_id}}@{{test_phone_number}}'
};

module.exports = authentication;
