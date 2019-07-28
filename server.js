const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const config = require('./config.json');


const app = express();

const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({ extended: true }));

async function sendEmail (_email, _message) {

    let transporter = nodemailer.createTransport({
        service: 'Yahoo',
        auth: {
            user: config._email,
            pass: config._password
        }
    });

    let mailOptions = {
        from: config._email, // sender address
        to: "amedeekirk+site@gmail.com", // list of receivers
        subject: `Message from ${_email}`, // Subject line
        text: `${_message}` // plain text body
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
}

// define your own email api which points to your server.
app.post( '/email', function(req, res){

    console.log("  --Receiving email request");
    let _email = req.body.email;
    let _message = req.body.msg;
    let status = 200;

    sendEmail (_email, _message)
        .catch((error) =>{
            console.error(error);
            status = 400
        })
        .then(res.sendStatus(status));

});


app.listen(port, () => console.log(`App listening on port ${port}!`));