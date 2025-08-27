// Email service for sending confirmation emails via SendGrid
// Note: This implementation includes both frontend structure and actual email sending
// For production, you may want to move sensitive email operations to a backend API

interface EmailData {
  to: string;
  subject: string;
  content: string;
  customerName: string;
  inquiryType: string;
}

export const emailService = {
  // Send confirmation email for form submissions
  async sendConfirmationEmail(emailData: EmailData): Promise<boolean> {
    try {
      // Check if SendGrid API key is configured
      const apiKey = import.meta.env.VITE_SENDGRID_API_KEY;
      
      if (!apiKey) {
        console.log('📧 SendGrid API key not configured, using mock email sending:', {
          to: emailData.to,
          subject: emailData.subject,
          from: 'info@backroomleeds.co.uk',
          template: 'inquiry_confirmation',
          data: emailData
        });
        
        // Mock email sending with simulated delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
      }

      // Send actual email using SendGrid API
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: emailData.to, name: emailData.customerName }]
          }],
          from: { 
            email: 'info@backroomleeds.co.uk', 
            name: 'The Backroom Leeds' 
          },
          reply_to: { 
            email: 'info@backroomleeds.co.uk', 
            name: 'The Backroom Leeds' 
          },
          subject: emailData.subject,
          content: [{
            type: 'text/plain',
            value: emailData.content
          }]
        })
      });

      if (response.ok) {
        console.log('✅ Confirmation email sent successfully to:', emailData.to);
        return true;
      } else {
        const errorData = await response.text();
        console.error('❌ SendGrid API error:', response.status, errorData);
        return false;
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return false;
    }
  },

  // Generate email content based on inquiry type
  generateEmailContent(formData: any, inquiryType: string): EmailData {
    const customerName = `${formData.firstName} ${formData.lastName}`;
    
    switch (inquiryType) {
      case 'table-bookings':
        return {
          to: formData.email,
          customerName,
          inquiryType: 'Table Booking',
          subject: 'Table Booking Request Received - The Backroom Leeds',
          content: `Dear ${customerName},

Thank you for your table booking request at The Backroom Leeds.

Booking Details:
• Date: ${formData.bookingDate}
• Event: ${formData.bookingTime}
• Party Size: ${formData.partySize} people
• Package: ${formData.packageType === 'preset' ? formData.selectedPackage : 'Custom package'}
• Venue Area: ${formData.venueArea || 'Any available'}

We'll confirm availability within 24 hours and let you know the next steps.

£50 deposit has been authorized and will only be charged if we can confirm your booking.

Best regards,
The Backroom Leeds Team
info@backroomleeds.co.uk
0113 2438666`
        };

      case 'private-hire':
        return {
          to: formData.email,
          customerName,
          inquiryType: 'Private Hire',
          subject: 'Private Hire Enquiry Received - The Backroom Leeds',
          content: `Dear ${customerName},

Thank you for your private hire enquiry at The Backroom Leeds.

Event Details:
• Date: ${formData.eventDate}
• Time: ${formData.eventStartTime} - ${formData.eventEndTime}
• Guest Count: ${formData.guestCount}
• Event Type: ${formData.eventType}
• Venue Space: ${formData.venueSpace}
• Company: ${formData.company || 'N/A'}

We'll review your requirements and provide a quote within 24-48 hours.

Best regards,
The Backroom Leeds Events Team
info@backroomleeds.co.uk
0113 2438666`
        };

      case 'careers':
        return {
          to: formData.email,
          customerName,
          inquiryType: 'Career Application',
          subject: 'Job Application Received - The Backroom Leeds',
          content: `Dear ${customerName},

Thank you for your job application at The Backroom Leeds.

Application Details:
• Position: ${formData.jobType}
• Experience Level: ${formData.experience}
• Availability: ${formData.availability}

We've received your application and will review it carefully. If your profile matches our requirements, we'll contact you within the next two weeks to discuss next steps.

Please remember to email your CV to info@backroomleeds.co.uk with the subject "Job Application - ${formData.jobType}"

Best regards,
The Backroom Leeds HR Team
info@backroomleeds.co.uk`
        };

      case 'general':
      case 'feedback':
        return {
          to: formData.email,
          customerName,
          inquiryType: inquiryType === 'general' ? 'General Enquiry' : 'Feedback',
          subject: `${inquiryType === 'general' ? 'Enquiry' : 'Feedback'} Received - The Backroom Leeds`,
          content: `Dear ${customerName},

Thank you for contacting The Backroom Leeds.

Your ${inquiryType === 'general' ? 'enquiry' : 'feedback'} regarding "${formData.subject}" has been received and we'll respond within 24 hours.

${inquiryType === 'feedback' ? 'We really appreciate you taking the time to share your feedback with us.' : ''}

Best regards,
The Backroom Leeds Team
info@backroomleeds.co.uk
0113 2438666`
        };

      default:
        return {
          to: formData.email,
          customerName,
          inquiryType: 'Enquiry',
          subject: 'Enquiry Received - The Backroom Leeds',
          content: `Dear ${customerName},

Thank you for contacting The Backroom Leeds. We've received your enquiry and will respond within 24 hours.

Best regards,
The Backroom Leeds Team`
        };
    }
  },

  // Send admin notification email
  async sendAdminNotification(formData: any, inquiryType: string): Promise<boolean> {
    try {
      const customerName = `${formData.firstName} ${formData.lastName}`;
      const apiKey = import.meta.env.VITE_SENDGRID_API_KEY;
      
      if (!apiKey) {
        console.log('📧 SendGrid API key not configured, using mock admin notification:', {
          to: 'info@backroomleeds.co.uk',
          subject: `New ${inquiryType} - ${customerName}`,
          from: 'noreply@backroomleeds.co.uk',
          data: {
            inquiryType,
            customerName,
            customerEmail: formData.email,
            submittedAt: new Date().toLocaleString(),
            details: formData
          }
        });
        return true;
      }

      // Generate admin email content
      const adminContent = `
New ${inquiryType} Received

Customer Details:
• Name: ${customerName}
• Email: ${formData.email}
• Phone: ${formData.phone || 'Not provided'}
• Submitted: ${new Date().toLocaleString()}

${inquiryType === 'Table Booking' ? `
Booking Details:
• Date: ${formData.bookingDate}
• Time: ${formData.bookingTime}
• Party Size: ${formData.partySize}
• Package: ${formData.packageType === 'preset' ? formData.selectedPackage : 'Custom package'}
• Venue Area: ${formData.venueArea || 'Any available'}
• Special Requests: ${formData.specialRequests || 'None'}
` : ''}

${inquiryType === 'Private Hire' ? `
Event Details:
• Date: ${formData.eventDate}
• Time: ${formData.eventStartTime} - ${formData.eventEndTime}
• Guest Count: ${formData.guestCount}
• Event Type: ${formData.eventType}
• Venue Space: ${formData.venueSpace}
• Company: ${formData.company || 'N/A'}
• Requirements: ${formData.privateHireRequirements}
` : ''}

${inquiryType === 'Career Application' ? `
Application Details:
• Position: ${formData.jobType}
• Experience: ${formData.experience}
• Availability: ${formData.availability}
• Cover Letter: ${formData.coverLetter}
` : ''}

${inquiryType === 'General Enquiry' || inquiryType === 'Feedback' ? `
Message Details:
• Subject: ${formData.subject}
• Message: ${formData.message}
` : ''}

Please log into the admin dashboard to view and respond to this ${inquiryType.toLowerCase()}.
      `.trim();

      // Send actual admin notification using SendGrid API
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: 'info@backroomleeds.co.uk', name: 'The Backroom Leeds Admin' }]
          }],
          from: { 
            email: 'noreply@backroomleeds.co.uk', 
            name: 'Website Notifications' 
          },
          reply_to: { 
            email: formData.email, 
            name: customerName 
          },
          subject: `New ${inquiryType} - ${customerName}`,
          content: [{
            type: 'text/plain',
            value: adminContent
          }]
        })
      });

      if (response.ok) {
        console.log('✅ Admin notification sent successfully');
        return true;
      } else {
        const errorData = await response.text();
        console.error('❌ SendGrid admin notification error:', response.status, errorData);
        return false;
      }
    } catch (error) {
      console.error('❌ Admin notification failed:', error);
      return false;
    }
  }
};