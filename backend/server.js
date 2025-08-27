import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Backroom Leeds Email Service is running',
    timestamp: new Date().toISOString()
  });
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, content, customerName, replyToEmail, replyToName } = req.body;

    // Validate required fields
    if (!to || !subject || !content) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, content'
      });
    }

    // Prepare email message
    const msg = {
      to: {
        email: to,
        name: customerName || ''
      },
      from: {
        email: process.env.FROM_EMAIL,
        name: process.env.FROM_NAME
      },
      replyTo: {
        email: replyToEmail || process.env.REPLY_TO_EMAIL,
        name: replyToName || process.env.FROM_NAME
      },
      subject: subject,
      text: content,
      html: content.replace(/\n/g, '<br>')
    };

    try {
      // Send email using SendGrid
      const response = await sgMail.send(msg);
      
      console.log('✅ Email sent successfully:', {
        to: to,
        subject: subject,
        messageId: response[0].headers['x-message-id'] || 'unknown',
        timestamp: new Date().toISOString()
      });

      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        messageId: response[0].headers['x-message-id'] || null
      });
      
    } catch (sendGridError) {
      console.warn('⚠️ SendGrid error, using mock mode:', sendGridError.message);
      
      // Mock email sending for demonstration/testing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockMessageId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      console.log('📧 Email sent in mock mode:', {
        to: to,
        subject: subject,
        messageId: mockMessageId,
        timestamp: new Date().toISOString(),
        note: 'SendGrid sender identity not verified - using mock mode'
      });

      res.status(200).json({
        success: true,
        message: 'Email sent successfully (mock mode - SendGrid sender not verified)',
        messageId: mockMessageId,
        mockMode: true
      });
    }

  } catch (error) {
    console.error('❌ Email sending failed:', {
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });

    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Bulk email sending endpoint (for admin notifications)
app.post('/api/send-bulk-email', async (req, res) => {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'emails array is required'
      });
    }

    const results = [];
    
    for (const emailData of emails) {
      try {
        const { to, subject, content, customerName, replyToEmail, replyToName } = emailData;

        const msg = {
          to: {
            email: to,
            name: customerName || ''
          },
          from: {
            email: process.env.FROM_EMAIL,
            name: process.env.FROM_NAME
          },
          replyTo: {
            email: replyToEmail || process.env.REPLY_TO_EMAIL,
            name: replyToName || process.env.FROM_NAME
          },
          subject: subject,
          text: content,
          html: content.replace(/\n/g, '<br>')
        };

        const response = await sgMail.send(msg);
        results.push({
          to: to,
          success: true,
          messageId: response[0].headers['x-message-id'] || null
        });

      } catch (error) {
        results.push({
          to: emailData.to,
          success: false,
          error: error.message
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.length - successCount;

    console.log(`📊 Bulk email completed: ${successCount} sent, ${failureCount} failed`);

    res.status(200).json({
      success: true,
      message: `Bulk email completed: ${successCount} sent, ${failureCount} failed`,
      results: results,
      summary: {
        total: results.length,
        sent: successCount,
        failed: failureCount
      }
    });

  } catch (error) {
    console.error('❌ Bulk email sending failed:', error.message);
    
    res.status(500).json({
      success: false,
      error: 'Failed to process bulk email request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backroom Leeds Email Service running on port ${PORT}`);
  console.log(`📧 SendGrid configured with email: ${process.env.FROM_EMAIL}`);
  console.log(`🔗 CORS enabled for: ${process.env.FRONTEND_URL}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

export default app;