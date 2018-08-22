const authentication = require('./authentication');
const InitTrigger = require('./triggers/init');
const SendsmsCreate = require('./creates/send_sms');
const SendcallCreate =require('./creates/send_call');
const { replaceVars } = require('./utils');

const maybeIncludeAuth = (request, z, bundle) => {
  teleSignURL = '{{baseURL}}';
  if(!teleSignURL){
    teleSignURL = 'https://rest-api.telesign.com';
  }
  const mapping = {
    username: '{{customer_id}}',
    password: '{{api_key}}',
    baseURL: '{{baseURL}}'
  };
  const username = replaceVars(mapping.username, bundle);
  const password = replaceVars(mapping.password, bundle);
  const encoded = Buffer.from(`${username}:${password}`).toString('base64');
  request.headers.Authorization = `Basic ${encoded}`;  
  
  return request;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [maybeIncludeAuth],

  afterResponse: [],

  resources: {},

  triggers: {
    [InitTrigger.key]: InitTrigger
  },

  searches: {},

  creates: {
    [SendsmsCreate.key]: SendsmsCreate,    
    [SendcallCreate.key]:SendcallCreate
  }
};

module.exports = App;
