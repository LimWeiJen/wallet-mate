import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a SMTP transporter for sending email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'limweijen43@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmailNotification = (error: unknown) => {
	const mailOptions = {
	  from: 'limweijen43@gmail.com',
	  to: 'limweijen96@gmail.com',
	  subject: 'Server Down Notification',
	  text: error!,
	};
	
	transporter.sendMail(mailOptions, (error, info) => {
	  if (error) {
	    console.log('Error sending email:', error);
	  } else {
	    console.log('Email notification sent:', info.response);
	  }
	});
}