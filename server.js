const express = require('express');
const env = require('dotenv').config()
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({extended: true}));

AWS.config.update({region: 'us-west-2'});


async function sendEmail(_email, _message) {
    const params = {
        Destination: {
            ToAddresses: [
                'amedeekirk@yahoo.com',
            ]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: _message
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `New website message from ${_email}`
            }
        },
        Source: 'amedeekirk@gmail.com',
        ReplyToAddresses: [
            _email
        ],
    }

    const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    sendPromise.then(
        function(data) {
            console.log(data.MessageId);
            return data
        }).catch(
        function(err) {
            console.error(err, err.stack);
        });
}

// define your own email api which points to your server.
app.post('/email', function (req, res) {

    console.log("  --Receiving email request");
    let _email = req.body.email;
    let _message = req.body.msg;
    let status = 200;

    sendEmail(_email, _message)
        .catch((error) => {
            console.error(error);
            status = 400
        })
        .then(res.sendStatus(status));

});


app.listen(port, () => console.log(`App listening on port ${port}!`));