const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const morgan = require('morgan');
require('dotenv').config();


const app = new express;
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

const route = express.Router();

const PORT = process.env.PORT;

app.use('/api',route);

app.listen(PORT,()=>{
    console.log(`Server listenin on port ${PORT}`);
})


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'shimonadeveloper@gmail.com',
        pass: 'blpx xqii tnql vnvg',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});



route.post('/text-mail', (req, res) => {
    const {to, subject, text } = req.body;
    const mailData = {
        from: 'shimonadeveloper@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});
