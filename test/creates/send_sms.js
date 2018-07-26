require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Creates - Send SMS', () => {
  zapier.tools.env.inject();

  it('should send an sms', done => {
    const bundle = {
      authData: {
        baseURL: process.env.TS_URL,
        api_key: process.env.API_KEY,
        customer_id: process.env.CUSTOMER_ID
      },

      inputData: {
        // TODO: Pulled from input fields' default values. Edit if necessary.
        message: process.env.TEST_MESSAGE,
        message_type: 'ARN',
        //country_code: '91',
        phone_number: process.env.TEST_PHONE_NUMBER
      }
    };

    appTester(App.creates['send_sms'].operation.perform, bundle)
      .then(result => {        
        result.should.not.be.an.Array();
        console.log('In test>creates>send_sms');
        done();
      })
      .catch(done);
  });
});
