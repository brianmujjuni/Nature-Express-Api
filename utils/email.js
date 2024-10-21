const nodemailer = require('nodemailer')

const sendEmail =async options => {
    const transpoter = nodemailer.createTransport({
        // service: 'Gmail',
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            password: process.env.EMAIL_PASSWORD
        }
        
    })
    const mailOptions ={
        from: 'Automex Technologies',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    }
   await transpoter.sendMail(mailOptions)
}
module.exports = sendEmail