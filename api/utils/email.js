import nodemailer from 'nodemailer'

const sendEmail = async (option) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
     }
    })
    // send mail with defined transport object
    const   emailOptions = {
        from: 'Cineflix support<support@cineflix.com', // sender address
        to: option.email, // list of receivers
        subject: option.subject, // Subject line
        text: option.message // plain text body
    
        
    }
    await transporter.sendMail(emailOptions)

   
}

export default sendEmail