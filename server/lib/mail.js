//https://nodemailer.com/about/
//https://www.youtube.com/watch?v=-rcRf7yswfM

//https://console.cloud.google.com/apis/credentials?authuser=2&folder=&project=jsprojet2020
//https://developers.google.com/oauthplayground/?code=4/0AY0e-g52YbQewJTAia6acdu5hUHm07h9YT8wRlslKw9Cb4SJl0CInkukT6geyJKm7iVGcA&scope=https://mail.google.com/
import nodemailer from "nodemailer";

import googleapis from 'googleapis';
const  {google} = googleapis;

const clientID = '702271930565-uuumi1db19csujberefugrq67t2eb6g7.apps.googleusercontent.com';
const clientSecret = 'JF0ai0B68YsBaLOKYOWJFIPw';
const redirectURI = 'https://developers.google.com/oauthplayground';
const refreshToken = '1//04K7RlZy-C2LcCgYIARAAGAQSNwF-L9IrupDi4eF_k-4hxcm-ti5LJanacXJXihnKYAND5ow9AKuILMPytF_vDUq2clzuV7vnUR0';

const oAuth2Client = new google.auth.OAuth2(clientID, clientSecret, redirectURI)
oAuth2Client.setCredentials({ refresh_token: refreshToken });

export const sendMail = async (email, html)=> {
  try {
   // console.log("1");
    const accessToken = await oAuth2Client.getAccessToken();
   // console.log("1.1 "+accessToken);

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'drogsproject2020@gmail.com',
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken
      }
    });
    //  console.log("3");

    const mailOptions = {
      from: 'DoNotReplay <drogsproject2020@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Password recovery", // Subject line
      text: "", // plain text body
      html: html, // html body
    };
     // console.log("4");


    transport.sendMail(mailOptions, function (err, data) {
      if (err) console.log("error hppend", err);
      else console.log('email sent! :-)');
    });
    //  console.log("5");
  }
  catch {
    //  console.log("2.2");

  }
  return 0;

}
/*
module.exports = {
  sendMail
};
*/

//----------------------------------------------------------------
/*//without oAuth2
//https://www.youtube.com/watch?v=Va9UKGs1bwI
//you need to authorize low safety in gmail.
const sm= function(mail){
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'ipewzner@g.jct.ac.il',
            pass:'Reptor17'
        }
    });

    const mailOptions = {
        from: 'ipewzner@g.jct.ac.il', // sender address
        to: mail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world? t-rex", // plain text body
    };
    transport.sendMail(mailOptions,function(err,data){
    if(err) console.log("error hppend",err);
    else console.log('email sent! :-)');
});
return 0;
}
module.exports={sm};

*/