const nodemailer = require('nodemailer');

const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `"${name} (via Orbital Net)" <${process.env.EMAIL_USER}>`, 
      
      to: process.env.EMAIL_USER, 
      replyTo: email, 
      
      subject: `New Contact Request: ${subject}`,
      
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; max-width: 600px; margin: 0 auto; border-radius: 8px;">
          <div style="background-color: #f97316; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Orbital Net - New Message</h2>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #eeeeee; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="margin-bottom: 5px; color: #555;"><strong>Sender Info:</strong></p>
            <ul style="list-style-type: none; padding: 0; margin: 0 0 20px 0; border-left: 4px solid #f97316; padding-left: 15px; background-color: #fffaf5; padding-top: 10px; padding-bottom: 10px;">
              <li style="margin-bottom: 8px;">👤 <strong>Name:</strong> ${name}</li>
              <li style="margin-bottom: 8px;">📧 <strong>Email:</strong> ${email}</li>
            </ul>

            <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">${subject}</h3>
            
            <div style="white-space: pre-wrap; color: #444; line-height: 1.6; background-color: #f8f9fa; padding: 15px; border-radius: 5px; border: 1px solid #e9ecef;">
              ${message}
            </div>
            
            <p style="margin-top: 25px; font-size: 12px; color: #888; text-align: center;">
              This email was sent from the Orbital Net website contact form.<br/>
              To reply to the customer, simply click "Reply".
            </p>
          </div>
        </div>
      `,
    };

    // send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email Send Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};

module.exports = { sendMessage };