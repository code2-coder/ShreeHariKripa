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

export class ZeptoMailService {
  constructor() {
    this.appName = process.env.APP_NAME || 'Shreeharikripa';
  }

  static logDebugInfo() {
    const url = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.in/v1.1/email';
    const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL || 'Not Configured';
    const fromName = process.env.ZEPTOMAIL_FROM_NAME || 'Not Configured';
    const keyExists = !!process.env.ZEPTOMAIL_API_KEY;

    console.log('--- ZeptoMail Service Configuration ---');
    console.log(`API Endpoint     : ${url}`);
    console.log(`Sender Name      : ${fromName}`);
    console.log(`Sender Email     : ${fromEmail}`);
    console.log(`ZeptoMail Config : ${keyExists ? 'Ready (API Key Present)' : 'Missing Key'}`);
    console.log('---------------------------------------');
  }

  static validateConfig() {
    const key = process.env.ZEPTOMAIL_API_KEY;
    const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;
    const fromName = process.env.ZEPTOMAIL_FROM_NAME;

    if (!key) {
      throw new Error("ZeptoMail Config Error: ZEPTOMAIL_API_KEY is missing.");
    }
    if (!fromEmail) {
      throw new Error("ZeptoMail Config Error: ZEPTOMAIL_FROM_EMAIL is missing.");
    }
    if (!fromName) {
      throw new Error("ZeptoMail Config Error: ZEPTOMAIL_FROM_NAME is missing.");
    }

    // Email validation
    if (!fromEmail.includes('@') || !fromEmail.includes('.')) {
      throw new Error(`ZeptoMail Config Error: ZEPTOMAIL_FROM_EMAIL is not a valid email address. Got: "${fromEmail}"`);
    }
  }

  getFromAddress() {
    return {
      address: process.env.ZEPTOMAIL_FROM_EMAIL,
      name: process.env.ZEPTOMAIL_FROM_NAME || this.appName
    };
  }

  getOTPHtmlTemplate(name, otp) {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Verification Code</title>
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
        <p style="margin-bottom: 20px;">We received a request to reset the password for your account. Please use the verification code below to proceed with the password reset:</p>
        
        <!-- OTP Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
          <tr>
            <td align="center" style="background-color: #fafaf9; border: 1px dashed #d6d3d1; border-radius: 12px; padding: 24px;">
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: bold; color: #1c1917; letter-spacing: 10px; padding-left: 10px; display: inline-block;">${otp}</span>
            </td>
          </tr>
        </table>
        
        <p style="font-size: 13px; color: #78716c; text-align: center; margin-top: 16px;">This code is valid for <strong style="color: #1c1917;">10 minutes</strong>.</p>

        <!-- Security Warning -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
          <tr>
            <td style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 16px; color: #b45309; font-size: 13px; line-height: 20px;">
              <strong style="display: block; margin-bottom: 4px; font-size: 14px; color: #92400e;">Security Notice:</strong>
              If you did not request a password reset, please ignore this email or contact support if you suspect unauthorized access.
            </td>
          </tr>
        </table>
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

  async sendOTPEmail(to, name, otp) {
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
      subject: "Reset Your Password - Verification Code",
      htmlbody: this.getOTPHtmlTemplate(name, otp)
    };

    try {
      console.log(`Sending OTP email to ${to} via ZeptoMail API (Axios)...`);
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

export default new ZeptoMailService();
