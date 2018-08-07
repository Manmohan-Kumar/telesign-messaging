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
      key: 'test_phone_number',
      label: 'Test Phone Number' ,      
      type: 'string',
      helpText: 'Provide your phone number with the international country code to receive a text to verify your credentials. A text will be sent to the number if successful. E.g. +12141112222.',
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
