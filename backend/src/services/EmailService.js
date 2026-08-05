import axios from 'axios';

export class ZeptoMailError extends Error {
  constructor({ statusCode, errorCode, message, details }) {
    super(message || "ZeptoMail sending failed");
    this.name = 'ZeptoMailError';
    this.statusCode = statusCode || 500;
    this.errorCode = errorCode || 'ZEPTOMAIL_ERROR';
    this.details = details || null;
    this.isZeptoMailError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class EmailService {
  constructor() {
    this.appName = process.env.APP_NAME || 'Shreeharikripa';
    this.clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  }

  static logDebugInfo() {
    const url = process.env.ZEPTOMAIL_API_URL || 'Not Configured';
    const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL || 'Not Configured';
    const fromName = process.env.ZEPTOMAIL_FROM_NAME || 'Not Configured';
    const keyExists = !!process.env.ZEPTOMAIL_API_KEY;
    let keyPreview = 'Not Configured';
    
    if (keyExists) {
      const key = process.env.ZEPTOMAIL_API_KEY;
      keyPreview = key.length > 8 ? `${key.substring(0, 8)}********` : `${key}********`;
    }

    console.log('--- ZeptoMail Debug Configuration ---');
    console.log(`API Endpoint : ${url}`);
    console.log(`Sender Name  : ${fromName}`);
    console.log(`Sender Email : ${fromEmail}`);
    console.log(`API Key Exists: ${keyExists}`);
    console.log(`API Key      : ${keyPreview}`);
    console.log('------------------------------------');
  }

  static validateConfig() {
    const key = process.env.ZEPTOMAIL_API_KEY;
    const url = process.env.ZEPTOMAIL_API_URL;
    const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;
    const fromName = process.env.ZEPTOMAIL_FROM_NAME;

    if (!key) {
      throw new Error("ZeptoMail Configuration Error: ZEPTOMAIL_API_KEY is missing.");
    }
    if (!url) {
      throw new Error("ZeptoMail Configuration Error: ZEPTOMAIL_API_URL is missing.");
    }
    if (!fromEmail) {
      throw new Error("ZeptoMail Configuration Error: ZEPTOMAIL_FROM_EMAIL is missing.");
    }
    if (!fromName) {
      throw new Error("ZeptoMail Configuration Error: ZEPTOMAIL_FROM_NAME is missing.");
    }

    // URL format check
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error(`ZeptoMail Configuration Error: ZEPTOMAIL_API_URL must start with http:// or https://. Got: "${url}"`);
    }

    // Email format check
    if (!fromEmail.includes('@') || !fromEmail.includes('.')) {
      throw new Error(`ZeptoMail Configuration Error: ZEPTOMAIL_FROM_EMAIL is not a valid email address. Got: "${fromEmail}"`);
    }
  }

  getFromAddress() {
    return {
      address: process.env.ZEPTOMAIL_FROM_EMAIL || 'noreply@shreeharikripa.com',
      name: process.env.ZEPTOMAIL_FROM_NAME || this.appName
    };
  }

  getEmailLayout({ name, title, bodyContent, otpBlock = '', ctaBlock = '', noteBlock = '', warningBlock = '' }) {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf9f6; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03); border: 1px solid #f0edf4;">
    <!-- Top Branding Gold Accent Bar -->
    <tr>
      <td style="background-color: #B8934E; height: 6px;"></td>
    </tr>
    <!-- Header Logo -->
    <tr>
      <td style="background-color: #ffffff; padding: 40px 40px 24px 40px; text-align: center;">
        <a href="https://www.shreeharikripa.com/" target="_blank" style="text-decoration: none; display: inline-block;">
          <img src="https://www.shreeharikripa.com/logo_jew.png" alt="Shree Hari Kripa Jewellery Logo" style="height: 70px; width: auto; display: block; margin: 0 auto;" />
        </a>
        <h1 style="font-size: 20px; font-weight: 700; color: #1c1917; margin: 16px 0 0 0; letter-spacing: 1px; text-transform: uppercase; font-family: Georgia, serif;">Shree Hari Kripa</h1>
      </td>
    </tr>
    <!-- Body Content -->
    <tr>
      <td style="padding: 16px 40px 40px 40px; color: #44403c; font-size: 15px; line-height: 25px;">
        <p style="margin-top: 0; font-size: 16px; font-weight: 600; color: #1c1917;">Hello ${name},</p>
        
        ${bodyContent}
        
        ${otpBlock}
        
        ${ctaBlock}
        
        ${noteBlock}
        
        ${warningBlock}
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color: #1c1917; padding: 32px 40px; text-align: center; color: #a8a29e;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding-bottom: 16px;">
              <a href="https://www.shreeharikripa.com/" target="_blank" style="color: #B8934E; text-decoration: none; font-size: 13px; font-weight: 600; margin: 0 10px; letter-spacing: 0.5px;">Visit Store</a>
              <span style="color: #44403c;">|</span>
              <a href="https://www.shreeharikripa.com/profile" target="_blank" style="color: #B8934E; text-decoration: none; font-size: 13px; font-weight: 600; margin: 0 10px; letter-spacing: 0.5px;">My Account</a>
            </td>
          </tr>
          <tr>
            <td style="font-size: 11px; line-height: 18px; color: #78716c;">
              You received this transactional email in relation to your account on shreeharikripa.com.<br>
              &copy; ${new Date().getFullYear()} Shree Hari Kripa. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  async sendWelcomeEmail(email, name) {
    const htmlContent = this.getEmailLayout({
      name,
      title: `Welcome to ${this.appName}!`,
      bodyContent: `
        <p style="margin-bottom: 20px;">Thank you for registering with Shree Hari Kripa. We are thrilled to have you as part of our exclusive community.</p>
        <p style="margin-bottom: 20px;">Shree Hari Kripa offers an exquisite collection of luxury jewellery crafted with precision, beauty, and passion. We hope you enjoy exploring our timeless pieces.</p>
      `,
      ctaBlock: `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
          <tr>
            <td align="center">
              <a href="${this.clientUrl}" target="_blank" style="background-color: #B8934E; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px; display: inline-block; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 12px rgba(184, 147, 78, 0.2);">Explore Store</a>
            </td>
          </tr>
        </table>
      `
    });

    return this.sendEmail({
      to: email,
      subject: `Welcome to ${this.appName}!`,
      html: htmlContent
    });
  }

  async sendVerificationEmail(email, name, otp) {
    const htmlContent = this.getEmailLayout({
      name,
      title: "Verify Your Account",
      bodyContent: `<p style="margin-bottom: 20px;">Thank you for registering. Please use the following One-Time Password (OTP) to verify your account and complete registration:</p>`,
      otpBlock: `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
          <tr>
            <td align="center" style="background-color: #fafaf9; border: 1px dashed #d6d3d1; border-radius: 12px; padding: 24px;">
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: bold; color: #1c1917; letter-spacing: 10px; padding-left: 10px; display: inline-block;">${otp}</span>
            </td>
          </tr>
        </table>
      `,
      noteBlock: `<p style="font-size: 13px; color: #78716c; text-align: center; margin-top: 16px;">This code is valid for <strong style="color: #1c1917;">10 minutes</strong>. Please do not share this OTP with anyone.</p>`
    });

    return this.sendEmail({
      to: email,
      subject: `Verify your ${this.appName} account`,
      html: htmlContent
    });
  }

  async sendPasswordResetEmail(email, name, otp) {
    const htmlContent = this.getEmailLayout({
      name,
      title: "Reset Your Password",
      bodyContent: `<p style="margin-bottom: 20px;">We received a request to reset the password for your account. Please use the verification code below to proceed with the password reset:</p>`,
      otpBlock: `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
          <tr>
            <td align="center" style="background-color: #fafaf9; border: 1px dashed #d6d3d1; border-radius: 12px; padding: 24px;">
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: bold; color: #1c1917; letter-spacing: 10px; padding-left: 10px; display: inline-block;">${otp}</span>
            </td>
          </tr>
        </table>
      `,
      noteBlock: `<p style="font-size: 13px; color: #78716c; text-align: center; margin-top: 16px;">This code is valid for <strong style="color: #1c1917;">10 minutes</strong>.</p>`,
      warningBlock: `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
          <tr>
            <td style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 16px; color: #b45309; font-size: 13px; line-height: 20px;">
              <strong style="display: block; margin-bottom: 4px; font-size: 14px; color: #92400e;">Security Notice:</strong>
              If you did not request a password reset, please ignore this email or contact support if you suspect unauthorized access.
            </td>
          </tr>
        </table>
      `
    });

    return this.sendEmail({
      to: email,
      subject: `Reset your ${this.appName} password`,
      html: htmlContent
    });
  }

  async sendPasswordChangedEmail(email, name) {
    const htmlContent = this.getEmailLayout({
      name,
      title: "Password Changed Successfully",
      bodyContent: `
        <p style="margin-bottom: 20px;">This is a confirmation that the password for your Shree Hari Kripa account has been successfully changed.</p>
        <p style="margin-bottom: 20px;">If you made this change, no further action is required.</p>
      `,
      warningBlock: `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
          <tr>
            <td style="background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; padding: 16px; color: #b91c1c; font-size: 13px; line-height: 20px;">
              <strong style="display: block; margin-bottom: 4px; font-size: 14px; color: #991b1b;">Security Alert:</strong>
              If you did not make this change, please contact our support team immediately to secure your account.
            </td>
          </tr>
        </table>
      `
    });

    return this.sendEmail({
      to: email,
      subject: `Your ${this.appName} password has been updated`,
      html: htmlContent
    });
  }

  async sendAddressVerificationEmail(email, name, otp) {
    const htmlContent = this.getEmailLayout({
      name,
      title: "Confirm Your Delivery Address",
      bodyContent: `<p style="margin-bottom: 20px;">Please use the following One-Time Password (OTP) to confirm your delivery address and complete saving it:</p>`,
      otpBlock: `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
          <tr>
            <td align="center" style="background-color: #fafaf9; border: 1px dashed #d6d3d1; border-radius: 12px; padding: 24px;">
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: bold; color: #1c1917; letter-spacing: 10px; padding-left: 10px; display: inline-block;">${otp}</span>
            </td>
          </tr>
        </table>
      `,
      noteBlock: `<p style="font-size: 13px; color: #78716c; text-align: center; margin-top: 16px;">This code is valid for <strong style="color: #1c1917;">10 minutes</strong>. Please do not share this OTP with anyone.</p>`
    });

    return this.sendEmail({
      to: email,
      subject: `Confirm your delivery address - ${this.appName}`,
      html: htmlContent
    });
  }

  async sendEmail({ to, subject, html }) {
    const url = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.in/v1.1/email';
    const key = process.env.ZEPTOMAIL_API_KEY;

    if (!key) {
      throw new ZeptoMailError({
        statusCode: 500,
        errorCode: 'CONFIG_ERROR',
        message: 'ZeptoMail API key is missing'
      });
    }

    const payload = {
      from: this.getFromAddress(),
      to: [
        {
          email_address: {
            address: to,
            name: to.split('@')[0]
          }
        }
      ],
      subject,
      htmlbody: html
    };

    try {
      console.log(`Sending email to ${to} via ZeptoMail API (Axios)...`);
      const response = await axios.post(url, payload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Zoho-enczapikey ${key}`
        }
      });
      return response.data;
    } catch (error) {
      let statusCode = 500;
      let errorCode = 'ZEPTOMAIL_API_ERROR';
      let message = error.message;
      let details = null;

      if (error.response) {
        statusCode = error.response.status;
        const resData = error.response.data;
        details = resData;
        if (resData && resData.error) {
          errorCode = resData.error.code || errorCode;
          message = resData.error.message || message;
          details = resData.error.details || resData;
        }
      }

      console.error("ZeptoMail API send failed:", { statusCode, errorCode, message, details });
      throw new ZeptoMailError({
        statusCode,
        errorCode,
        message,
        details
      });
    }
  }
}

export default new EmailService();
