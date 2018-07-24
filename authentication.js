const testTrigger = require('./triggers/init');

const authentication = {
  // TODO: just an example stub - you'll need to complete
  type: 'custom',

  test: testTrigger.operation.perform,

  fields: [
    {
      key: 'baseURL',
      label: 'REST Endpoint',
      helpText: 'REST Endpoint, Customer ID, and API Key can all be found on the Account Settings page under Settings. Navigate to Account Settings at https://portal.telesign.com/portal/account-settings. (For TeleSign Standard customers) or https://teleportal.telesign.com/ (For TeleSign Enterprise customers).',
      type: 'string',
      required: true
    },
    {
      key: 'customer_id',
      label: 'Customer ID',      
      type: 'string',
      required: true
    },
    {
      key: 'api_key',
      label: 'API Key',      
      type: 'password',
      required: true
    }
  ],
  connectionLabel: '{{baseURL}}@{{customer_id}}'    
};

module.exports = authentication;
