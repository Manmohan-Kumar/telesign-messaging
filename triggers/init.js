// Trigger stub created by 'zapier convert'. This is just a stub - you will need to edit!
const { replaceVars } = require('../utils');

const getList = (z, bundle) => {
  //let url = 'https://rest-ww.telesign.com/v1/messaging/0123456789ABCDEF0123456789ABCDEF';
  let url = 'https://rest-ww.telesign.com/v1/messaging';
  url = replaceVars(url, bundle);
  const responsePromise = z.request({ url });
  return responsePromise.then(response => {
    if(response.status === 405) 
    {
      return 200;      
    }
    //console.log('In triggers>init');
    //response.throwForStatus();
    //return z.JSON.parse(response.content);
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
        //required: true,
        default: 'I am coming from Zapier.'
      },
      {
        key: 'message_type',
        label: 'Arn',
        type: 'string',
        //required: true,
        default: 'ARN'
      },
      {
        key: 'country_code',
        label: 'Country Code',
        type: 'string',
        //required: true,
        default: '91'
      },
      {
        key: 'phone_number',
        label: 'Phone_number',
        type: 'string',
        //required: true,
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
