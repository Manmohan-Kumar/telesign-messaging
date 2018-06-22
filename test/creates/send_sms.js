require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Creates - Send SMS', () => {
  zapier.tools.env.inject();

  it('should send an sms', done => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
        customer_id: process.env.CUSTOMER_ID
      },

      inputData: {
        // TODO: Pulled from input fields' default values. Edit if necessary.
        message: 'I am coming from Zapier',
        message_type: 'ARN',
        phone_number: '917009600580'
      }
    };

    appTester(App.creates['send_sms'].operation.perform, bundle)
      .then(result => {        
        result.should.not.be.an.Array();
        console.log('In app tester');
        done();
      })
      .catch(done);
  });
});
