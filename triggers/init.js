const { replaceVars } = require('../utils');

const getList = (z, bundle) => {  
  baseURL = bundle.authData.baseURL?bundle.authData.baseURL:'https://rest-api.telesign.com';  
  let authTestURL = '/v1/phoneid/' + '18008503485';

  url = baseURL + authTestURL;
  url = replaceVars(url, bundle);
  const responsePromise = z.request({
    url: url,
    method: 'POST'
   });
  return responsePromise.then(response => {
    let successMsg = 'Authentication successful';
    let errorMessage = 'The Customer ID / API Key you provided are invalid.';
    let eRATE_LIMIT = 'Please try again.';
    if(!(response.status >= 200 && response.status <=299)) {
      var tsRes = z.JSON.parse(response.content);
      if((tsRes.status.code == 10033)||(tsRes.status.code == 10012)){
        response.status = 200;
        return successMsg;
      }
      if((tsRes.status.code == 10028) || (tsRes.status.code == 10009)){
        errorMessage = "description: " + errorMessage;
      } else if(tsRes.status.code == 10019){
        errorMessage = "description: " + eRATE_LIMIT;
      } else {
        errorMessage = "description: " + tsRes.status.description;
      }      
      throw new Error(errorMessage);   
    }     
    return successMsg;
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
      }      
    ],
    outputFields: [      
      {
        key: 'reference_id',
        type: 'string'
      },
      { key: 'phone_type__code',
        type: 'string'
      },
      { key: 'phone_type__description',
        type: 'string'
      },
      { key: 'numbering__original__phone_number',
        type: 'string'
      },
      { key: 'numbering__original__complete_phone_number',
        type: 'string'
      },
      { key: 'numbering__original__country_code',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__call__cleansed_code',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__call__country_code',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__call__max_length',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__call__min_length',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__call__phone_number',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__sms__cleansed_code',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__sms__country_code',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__sms__max_length',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__sms__min_length',
        type: 'string'
      },
      {
        key: 'numbering__cleansing__sms__phone_number',
        type: 'string'
      },
      {
        key: 'location__city',
        type: 'string'
      },
      {
        key: 'location__county',
        type: 'string'
      },
      {
        key: 'location__state',
        type: 'string'
      },
      {
        key: 'location__zip',
        type: 'string'
      },
      {
        key: 'country__iso2',
        type: 'string'
      },
      {
        key: 'country__iso3',
        type: 'string'
      },
      {
        key: 'country__name',
        type: 'string'
      },
      {
        key: 'timezone__name',
        type: 'string'
      },
      {
        key: 'timezone__utc_offset_max',
        type: 'string'
      },
      {
        key: 'timezone__utc_offset_min',
        type: 'string'
      },
      {
        key: 'coordinates__latitude',
        type: 'string'
      },
      {
        key: 'coordinates__longitude',
        type: 'string'
      },
      {
        key: 'metro_code',
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
      reference_id: '0123456789ABCDEF0123456789ABCDEF',
      phone_type:{code: '3', description: 'PREPAID'},
      numbering: {original:{phone_number:'6026021234', complete_phone_number:'6026021234', country_code:'1'}, 
                cleansing:{call:{cleansed_code:'100',country_code:'1', max_length:'1', min_length:'1',phone_number:'6026021234'},
                           sms:{cleansed_code:'100',country_code:'1', max_length:'1', min_length:'1',phone_number:'6026021234'}}},
      location: {city:'New York', county:'New York County', state:'New York', zip:'10001'},
      country: {iso2:'US', iso3:'USA', name:'United States'},
      timezone:{name:'America/Los_Angeles', utc_offset_max:'-08:00', utc_offset_min: '-08:00'},
      coordinates:{latitude:'34.18264', longitude:'-118.30840'},
      metro_code:'4480',
      status: { code: 290, description: 'Message in progress', updated_on: '2015-10-03T14:51:28.709526Z' }
    }
  }
};
