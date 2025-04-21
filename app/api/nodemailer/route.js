import nodemailer from 'nodemailer'

// Force this route to be dynamic (not statically generated)
export const dynamic = 'force-dynamic';

export async function POST(req) {

  const { username, useremail } = await req.json();

  const transporter = nodemailer.createTransport({
    secure: process.env.SMTP_PORT == 465,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: useremail,
    subject: 'Confirmaiton of Restaurant Reservation',
    text: `Thank you for your reservation, ${username}! We will contact you soon.`
  }

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Message sent:', result.messageId);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error sending email', error: error.message }), { status: 500 });
  }
}