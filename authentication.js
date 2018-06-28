const testTrigger = require('./triggers/init');

const authentication = {
  // TODO: just an example stub - you'll need to complete
  type: 'custom',

  test: testTrigger.operation.perform,

  fields: [
    {
      key: 'baseURL',
      label: 'TeleSign Url',
      helpText: 'Please enter the TeleSign REST URL received from https://teleportal.telesign.com (For TeleSign Enterprise customers) or https://portal.telesign.com. (For TeleSign Standard customers)',
      type: 'string',
      required: true
    },
    {
      key: 'customer_id',
      label: 'Customer ID',
      helpText: 'Please enter the Customer ID received from https://teleportal.telesign.com (For TeleSign Enterprise customers) or https://portal.telesign.com (For TeleSign Standard customers).',
      type: 'string',
      required: true
    },
    {
      key: 'api_key',
      label: 'API Key',
      helpText: 'Please enter the API Key received from https://teleportal.telesign.com (For TeleSign Enterprise customers) or https://portal.telesign.com (For TeleSign Standard customers).',
      type: 'password',
      required: true
    }
  ],
  connectionLabel: '{{baseURL}}@{{customer_id}}'  

  //connectionLabel: '{{customer_id}}@{{api_key}}'
};

module.exports = authentication;
