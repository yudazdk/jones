require('dotenv').config();
const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        name: 'Yehuda',
        likes: [
            'React',
            'Football'
        ]
    });
});

app.post('/send', (req, res) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const {firstName, lastName, mailAddress, phoneNumber} = req.body;

    const mailBody = `<p><strong>First Name: </strong>${firstName}<p>
                      <p><strong>Last Name: </strong>${lastName}<p>
                      <p><strong>Mail Address: </strong>${mailAddress}<p>
                      <p><strong>Phone Number: </strong>${phoneNumber}<p>`;

    const msg = {
        to: mailAddress,
        from: mailAddress,
        subject: 'New Lead',
        html: mailBody,
    };

    try {
        sgMail.send(msg);

        res.send ({
            success: 'ok'
        });
    } catch(err) {
        res.send ({
            error: 'Failed'
        });
    }
});


app.listen(80);