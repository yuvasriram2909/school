/**
 * YUVA'S SCHOOL - Form Handler
 * Manages contact and admission form submissions
 */

class FormHandler {
  constructor() {
    this.init();
  }

  init() {
    this.attachContactFormListener();
    this.attachAdmissionFormListener();
  }

  /**
   * Attach listener to contact form
   */
  attachContactFormListener() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => this.handleContactSubmit(e));
  }

  /**
   * Attach listener to admission form
   */
  attachAdmissionFormListener() {
    const form = document.getElementById('admission-form');
    if (!form) return;

    form.addEventListener('submit', (e) => this.handleAdmissionSubmit(e));
  }

  /**
   * Handle contact form submission
   */
  async handleContactSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    // Validate form
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await apiClient.submitContactForm({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
      });

      if (response.success) {
        // Show success message
        this.showNotification('success', response.message);
        form.reset();
        form.classList.remove('was-validated');
      } else {
        const detail = response.error?.detail || response.message || 'Failed to send message';
        this.showNotification('error', detail);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      const detail = error.data?.error?.detail || error.message || 'Error sending message. Please try again.';
      this.showNotification('error', detail);
    } finally {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  /**
   * Handle admission form submission
   */
  async handleAdmissionSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    // Validate form
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    try {
      const response = await apiClient.submitAdmissionForm({
        studentName: formData.get('studentName'),
        parentName: formData.get('parentName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        classApplying: formData.get('classApplying'),
        message: formData.get('additionalInfo') || ''
      });

      if (response.success) {
        // Show success popup
        this.showSuccessPopup();
        form.reset();
        form.classList.remove('was-validated');
      } else {
        this.showNotification('error', response.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Admission form error:', error);
      this.showNotification('error', error.message || 'Error submitting application. Please try again.');
    } finally {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  /**
   * Show notification toast
   */
  showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto remove
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  /**
   * Show success popup (for admissions)
   */
  showSuccessPopup() {
    const popup = document.getElementById('success-popup');
    const overlay = document.getElementById('popup-overlay');

    if (popup && overlay) {
      popup.classList.add('show');
      overlay.classList.add('show');

      // Auto close after 5 seconds
      setTimeout(() => {
        popup.classList.remove('show');
        overlay.classList.remove('show');
      }, 5000);

      // Close button
      const closeBtn = document.getElementById('popup-close');
      if (closeBtn) {
        closeBtn.onclick = () => {
          popup.classList.remove('show');
          overlay.classList.remove('show');
        };
      }
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
  });
} else {
  new FormHandler();
}
