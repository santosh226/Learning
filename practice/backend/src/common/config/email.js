import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.example.com", // where to get this
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
    try {
    const info = await transporter.sendMail({
        from: '"Example Team" <team@example.com>', // sender address // where to get this
        to,
        subject,
        html
    });
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

const sendVerificationEmail = async (email, token) => {
    const url = ``;
    await sendEmail(
        email,
        "verify your email",
        `<h2> Welcome! </h2> <p> Click <a href = "${url}" here </a> to verify your email</p>`
    );
}

export {
    sendVerificationEmail
}