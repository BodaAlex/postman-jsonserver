
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// MailerLite API key
const apiKey = process.env.MAILERLITE_API_KEY;;

// Load the HTML report
const reportPath = path.join(__dirname, '..', 'newman', 'report.html');
console.log("Report path is: ", reportPath)
const reportHtml = fs.readFileSync(reportPath, 'utf-8');

// Email configuration
const data = {
  from: {
    email: 'boda.alexandruflorin@yahoo.com',
    name: 'Sender'
  },
  to: [
    {
      email: 'boda.alexandruflorin@yahoo.com',
      name: 'Receiver'
    }
  ],
  subject: 'Automated Test Report',
  html: reportHtml
};

// Send the request to MailerLite API
axios.post('https://api.mailerlite.com/v2/email', data, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }
})
.then(response => {
  console.log('Email sent successfully:', response.data);
})
.catch(error => {
  console.error('Error sending email:', error.response ? error.response.data : error.message);
});
