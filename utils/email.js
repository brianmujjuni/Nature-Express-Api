const nodemailer = require('nodemailer')

const sendEmail = options => {
    const transpoter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: process.env.EMAIL_USERNAME,
            password: process.env.EMAIL_PASSWORD
        }
    })
}