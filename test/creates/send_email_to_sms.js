require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Creates - Send email to SMS', () => {
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
        message: 'I am coming from Zapier, email to sms',
        message_type: 'ARN',
        phone_number: '917009600580'
      }
    };

    appTester(App.creates['send_email_to_sms'].operation.perform, bundle)
      .then(result => {        
        result.should.not.be.an.Array();
        console.log('In test>creates>send_email_to_sms');
        done();
      })
      .catch(done);
  });
});
