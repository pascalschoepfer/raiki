import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

// Simple in-memory rate limiting store
// In production, you'd want to use Redis or a database
const rateLimitStore = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 3;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requests = rateLimitStore.get(ip);
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => now - timestamp < windowMs);
  rateLimitStore.set(ip, validRequests);

  if (validRequests.length >= maxRequests) {
    return true;
  }

  // Add current request
  validRequests.push(now);
  rateLimitStore.set(ip, validRequests);
  
  return false;
}

async function verifyTurnstileToken(token, ip) {
  // In development, allow bypass with special token
  if (process.env.NODE_ENV === 'development' && token === 'dev-bypass') {
    return true;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    // In development, be more lenient with verification failures
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    return false;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input) {
  return input.trim().replace(/<[^>]*>/g, ''); // Basic HTML tag removal
}

export async function POST(request) {
  try {
    const { name, email, message, turnstileToken } = await request.json();

    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
               request.headers.get('x-real-ip') || 
               request.ip || 
               'unknown';

    // Rate limiting check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate required fields
    if (!name || !email || !message || !turnstileToken) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Validate field lengths
    if (sanitizedName.length > 100) {
      return NextResponse.json(
        { error: 'Name must be less than 100 characters.' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be less than 2000 characters.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    const isTurnstileValid = await verifyTurnstileToken(turnstileToken, ip);
    if (!isTurnstileValid) {
      return NextResponse.json(
        { error: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'Raiki Kontaktformular <noreply@raiki.xyz>',
      to: ['contactform@raiki.xyz'],
      replyTo: sanitizedEmail,
      subject: `Neue Anfrage von ${sanitizedName}`,
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Courier New', Consolas, monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111; border-radius: 8px; overflow: hidden; border: 1px solid #333;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center; border-bottom: 1px solid #333;">
              <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 400; letter-spacing: 8px; font-family: 'Courier New', monospace;">RAIKI</h1>
              <p style="margin: 10px 0 0; color: #666; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">Kontaktformular</p>
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td style="padding: 30px 30px 20px; text-align: center;">
              <h2 style="margin: 0; color: #0f0; font-size: 14px; font-weight: 400; letter-spacing: 2px; font-family: 'Courier New', monospace;">&gt;&gt; NEUE ANFRAGE</h2>
            </td>
          </tr>
          <!-- Contact Details -->
          <tr>
            <td style="padding: 10px 30px 25px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border: 1px solid #333;">
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #333;">
                    <span style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Name</span><br>
                    <span style="color: #fff; font-size: 16px;">${sanitizedName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 20px;">
                    <span style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">E-Mail</span><br>
                    <a href="mailto:${sanitizedEmail}" style="color: #0f0; font-size: 16px; text-decoration: none;">${sanitizedEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <p style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px;">&gt; Nachricht</p>
              <div style="background-color: #0a0a0a; border-left: 2px solid #0f0; padding: 20px; font-family: 'Courier New', monospace;">
                <p style="margin: 0; color: #ccc; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 20px 30px; text-align: center; border-top: 1px solid #333;">
              <p style="margin: 0; color: #444; font-size: 11px; font-family: 'Courier New', monospace;">// raiki.xyz</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      text: `Neue Kontaktanfrage - Raiki\n\nName: ${sanitizedName}\nE-Mail: ${sanitizedEmail}\n\nNachricht:\n${sanitizedMessage}`
    });

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'An error occurred while sending your message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}