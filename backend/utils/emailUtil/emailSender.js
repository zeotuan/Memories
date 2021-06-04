import nodemailer from 'nodemailer';
import config from '../config.js';


//allow non-secure app to send email in your gmail setting


export const transporter = nodemailer.createTransport({
    service:'smtp.ethereal.email',
    auth:{
        user:config.email,
        password:config.emailPassword,
    }
});

// const sampleMail = {
//     from:'noreply@memories.com',
//     to:'sample@gmail.com',
//     subject:'sending email with nodemailer nodejs',
//     text:'this is an sample mails'
// }

export const createTokenEmail = ({userEmail,token}) =>({
    from:'noreply@memories.com',
    to:userEmail,
    subject: 'Account Verification Token', 
    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp://' + config.host+config.PORT + '/api/users/confirmation/?token='+ token +'.\n'
})

// transporter.sendMail(mai, function (error, info){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Email sent' + info.response);
//     }
// })



