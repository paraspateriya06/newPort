import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || 'true') === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function json(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { message: 'Method not allowed.' });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return json(response, 500, {
      message: 'Mail service is not configured yet.',
    });
  }

  const { name, email, subject, message, website } = request.body || {};

  if (website) {
    return json(response, 200, { message: 'Message sent successfully.' });
  }

  if (!name || !email || !subject || !message) {
    return json(response, 400, {
      message: 'Please fill in all required fields.',
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return json(response, 400, {
      message: 'Please enter a valid email address.',
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO || 'paraspaterya74@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="margin-bottom: 12px;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return json(response, 200, {
      message: 'Your message is on its way. I will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form send failed:', error);
    return json(response, 500, {
      message: 'Message could not be sent right now. Please try again later.',
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
