import emailjs from '@emailjs/browser';

// EmailJS credentials
const SERVICE_ID = "service_lfyjstr";
const AUTO_REPLY_TEMPLATE_ID = "template_hn28ppl"; // Create this template in EmailJS
const PUBLIC_KEY = "aZO7kou8JUtRem523";

/**
 * Send an automated reply email based on the feedback type
 * @param {Object} userData 
 * @param {string} feedbackType 
 * @returns {Promise} 
 */
export const sendAutoReplyEmail = async (userData) => {
  try {
    // Different messages based on feedback type
    const replyMessages = {
      feedback: {
        subject: "Thank you for your feedback",
        message: "We appreciate you taking the time to share your thoughts with us. Your feedback helps us improve our services and create better experiences for all our users."
      },
      complaint: {
        subject: "We've received your complaint",
        message: "We're sorry to hear you've had a negative experience. Your complaint has been received and our team will review it promptly. We aim to address all issues as quickly as possible."
      },
      suggestion: {
        subject: "Thanks for your suggestion",
        message: "Thank you for your valuable suggestion! We're always looking for ways to improve, and user suggestions are a vital part of our development process. We'll carefully consider your idea."
      }
    };

    // Get the appropriate message based on feedback type
    const replyContent = replyMessages[userData.type] || replyMessages.feedback;

    // Send the auto-reply email
    return await emailjs.send(
      SERVICE_ID,
      AUTO_REPLY_TEMPLATE_ID,
      {
        to_name: userData.name,
        to_email: userData.email,
        subject: replyContent.subject,
        message: replyContent.message,
        type: userData.type
      },
      PUBLIC_KEY
    );
  } catch (error) {
    console.error("Error sending auto-reply email:", error);
    throw error;
  }
};