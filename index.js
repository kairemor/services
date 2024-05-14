const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Set up Gmail SMTP transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'debughelp1@gmail.com', // Your Gmail address
        pass: 'gztzxlsqpfaciywg' // Your app password
    }
});

app.get('/', function(req, res) {
    res.send('Welcome to some services app for now we have only /send-email');
})

// Email sending route
app.post('/send-email', (req, res) => {
    const { receiver, subject, content } = req.body;

    const mailOptions = {
        from: 'debughelp1@gmail.com', // Sender address
        to: receiver, // List of receivers
        subject: `${subject}`, // Subject line
        text: content, // Plain text body
        html: `<p>${content}</p>` // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: "Error sending email", error: error.message });
        }
        res.status(200).json({ message: "Email successfully sent", info: info });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


