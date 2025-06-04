import nodemailer from 'nodemailer';

interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

const sendMailer = async ({ to, subject, html }: MailOptions): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Send email
        await transporter.sendMail({
            from: `"Black Cat Mailer" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        });

        console.log(`Mail sent to ${to}`);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
};

export default sendMailer