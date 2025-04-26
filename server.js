// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/make-call', (req, res) => {
    const { to } = req.body;
    client.calls
        .create({
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER,
            url: 'http://demo.twilio.com/docs/voice.xml'
        })
        .then(call => res.json({ callSid: call.sid }))
        .catch(error => {
            console.error("Twilio call error:", error);
            res.json({ error: "Failed to make an emergency call." });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
