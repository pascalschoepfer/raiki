import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

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
      from: 'Contact Form <contactform@raiki.xyz>',
      to: ['contactform@raiki.xyz'],
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 30px;">
    <h1 style="margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
  </div>
  
  <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #495057; margin-top: 0; font-size: 18px; border-bottom: 2px solid #dee2e6; padding-bottom: 10px;">Contact Details</h2>
    
    <div style="margin-bottom: 15px;">
      <strong style="color: #6c757d; display: inline-block; width: 70px;">Name:</strong>
      <span style="background: white; padding: 8px 12px; border-radius: 4px; display: inline-block; border: 1px solid #dee2e6;">${sanitizedName}</span>
    </div>
    
    <div style="margin-bottom: 15px;">
      <strong style="color: #6c757d; display: inline-block; width: 70px;">Email:</strong>
      <span style="background: white; padding: 8px 12px; border-radius: 4px; display: inline-block; border: 1px solid #dee2e6;">
        <a href="mailto:${sanitizedEmail}" style="color: #007bff; text-decoration: none;">${sanitizedEmail}</a>
      </span>
    </div>
  </div>
  
  <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #495057; margin-top: 0; font-size: 18px; border-bottom: 2px solid #dee2e6; padding-bottom: 10px;">Message</h2>
    <div style="background: white; padding: 20px; border-radius: 4px; border: 1px solid #dee2e6; white-space: pre-wrap; font-family: inherit;">${sanitizedMessage}</div>
  </div>
  
  <div style="text-align: center; padding: 20px; background: #e9ecef; border-radius: 8px; margin-top: 30px;">
    <p style="margin: 0; color: #6c757d; font-size: 14px;">
      Submitted from: <strong>${ip}</strong><br>
      Time: <strong>${new Date().toLocaleString()}</strong>
    </p>
  </div>
</body>
</html>`,
      text: `New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

Submitted from: ${ip}
Time: ${new Date().toLocaleString()}`
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