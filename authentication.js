const testTrigger = require('./triggers/init');

const authentication = {
  // TODO: just an example stub - you'll need to complete
  type: 'custom',

  test: testTrigger.operation.perform,

  fields: [
    {
      key: 'customer_id',
      label: 'Customer ID',
      helpText: 'Please enter the Customer ID received from https://portal.telesign.com.',
      type: 'string',
      required: true
    },
    {
      key: 'api_key',
      label: 'API Key',
      helpText: 'Please enter the API Key received from https://portal.telesign.com.',
      type: 'password',
      required: true
    }
  ],
  connectionLabel: '{{customer_id}}'

  //connectionLabel: '{{customer_id}}@{{api_key}}'
};

module.exports = authentication;
