const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL, //sender
        pass: process.env.PASSWORD // app pw in google
    }
});

// async..await is not allowed in global scope, must use a wrapper
const sendResetMail = async (senderAddress, resetLink) =>  {
    error = false;
    try {
        
        // send mail with defined transport object
        const info = await transporter.sendMail({
        from: '"Connecting World Education Foundation(CWEF)" <shresthsaurav8@gmail.com>', // sender address
        to: senderAddress, // list of receivers
        subject: "RESET PASSWORD LINK", // Subject line
        html: `<b> Reset your account by clicking <a href="${resetLink}">here</a></b>`, // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    } catch (error) {
        error = true
        // return res.json({err: error})
    }
    return error
}

module.exports = {sendResetMail}