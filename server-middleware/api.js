require('dotenv').config();

const app = require('express')();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const VoiceResponse = require('twilio').twiml.VoiceResponse;

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.NUXT_ENV_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const tag = "nuxtjs-phone-answering-machine";

app.all('/callback', async (request, response) => {

    const body = request.body;

    if (body.CallStatus !== "completed") {
        const twiml = new VoiceResponse();
        twiml.say('Hello. Please leave a message after the beep.');
        twiml.record();
        twiml.hangup();
        response.type('text/xml');
        return response.send(twiml.toString());
    }

    const maskedPhoneNumber = body.From.slice(0, 3) + body.From.slice(3, -2).replace(/[0-9]/g, "*") + body.From.slice(-2);

    const uploaded = await cloudinary.v2.uploader.upload(
        body.RecordingUrl,
        {
            resource_type: "video",
            folder: "nuxtjs-phone-answering-machine",
            tags: [tag],
            context: `From=${maskedPhoneNumber}|FromCountry=${body.FromCountry}|FromCity=${body.FromCity}`
        },
        function (error, result) { console.log(result, error) });

    return response.json({ uploaded });

});

app.all('/list', async (request, response) => {

    return await cloudinary.v2.api.resources_by_tag(
        tag,
        { resource_type: 'video', context: true },
        function (error, result) {
            return response.json(result);
        }
    );

});

module.exports = app