import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface ContactEmailData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  plan?: string;
  subject: string;
  message: string;
}

interface TicketEmailData {
  name: string;
  email: string;
  company?: string;
  priority: string;
  category: string;
  subject: string;
  description: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const htmlContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.plan ? `<p><strong>Interested Plan:</strong> ${data.plan}</p>` : ''}
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || 'contact@harvierait.com',
    subject: `Contact Form: ${data.subject}`,
    html: htmlContent,
    replyTo: data.email,
  });
}

export async function sendTicketEmail(data: TicketEmailData) {
  const htmlContent = `
    <h2>New Support Ticket</h2>
    <p><strong>Priority:</strong> <span style="color: ${getPriorityColor(data.priority)};">${data.priority.toUpperCase()}</span></p>
    <p><strong>Category:</strong> ${data.category}</p>
    <hr>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Description:</strong></p>
    <p>${data.description.replace(/\n/g, '<br>')}</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.SUPPORT_EMAIL || 'support@harvierait.com',
    subject: `[${data.priority.toUpperCase()}] Support Ticket: ${data.subject}`,
    html: htmlContent,
    replyTo: data.email,
  });
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent':
      return '#dc2626';
    case 'high':
      return '#ea580c';
    case 'medium':
      return '#d97706';
    case 'low':
      return '#65a30d';
    default:
      return '#6b7280';
  }
}
