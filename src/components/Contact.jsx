import React, { useState, useEffect } from 'react';
import { Mail, Phone, Github, Send, ExternalLink, CheckCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import '../css/Contact.css';

const Contact = () => {
  const [state, handleSubmit] = useForm("xreyygvw");
  const [showSuccess, setShowSuccess] = useState(false);

  // Pantau jika pengiriman berhasil, ubah state lokal
  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
    }
  }, [state.succeeded]);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        {/* Sisi Kiri: Form atau Success Message */}
        <div className="contact-form-wrapper">
          {showSuccess ? (
            // Tampilan English Success Message (Tanpa Button Reset)
            <div className="success-message-v2" data-aos="zoom-in" data-aos-duration="800">
              <div className="success-icon-wrapper">
                <CheckCircle size={50} className="success-icon" />
              </div>
              <h2 className="contact-title">Thank <span className="highlight">You!</span></h2>
              <p className="success-text">
                Your message has been successfully sent. <br />
                I truly appreciate you reaching out and I'll get back to you as soon as possible.
              </p>
              <div className="success-divider"></div>
              <p className="success-subtext">Let's build something amazing together.</p>
            </div>
          ) : (
            // Tampilan Form Normal
            <>
              <div className="contact-header" data-aos="fade-up" data-aos-duration="800">
                <span className="contact-badge">// GET IN TOUCH</span>
                <h2 className="contact-title">Let's <span className="highlight">Connect</span></h2>
              </div>
              
              <form className="modern-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-duration="800">
                <div className="input-group">
                  <input type="text" id="full-name" name="name" placeholder="Your Name" required />
                  <div className="input-line"></div>
                </div>
                
                <div className="input-group">
                  <input id="email" type="email" name="email" placeholder="Your Email" required />
                  <div className="input-line"></div>
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="error-text" />
                </div>

                <div className="input-group">
                  <textarea id="message" name="message" placeholder="Say hi or ask something..." rows="3" required></textarea>
                  <div className="input-line"></div>
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="error-text" />
                </div>

                <button type="submit" className="submit-btn" disabled={state.submitting} data-aos="fade-up" data-aos-duration="800">
                  <span>{state.submitting ? 'Sending...' : 'Send Message'}</span>
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>

        {/* Sisi Kanan: Minimalist Info (Tetap muncul agar layout tidak timpang) */}
        <div className="contact-info-wrapper">
          <div className="minimal-info-content">
            <div className="info-header-minimal" data-aos="fade-up" data-aos-duration="800">
              <h3>Contact <span className="highlight">Details</span></h3>
              <p className="info-desc">Feel free to reach out for collaborations, tech talk, or just to say hello!</p>
            </div>
            
            <div className="info-list-minimal" data-aos="fade-up" data-aos-duration="800">
              <div className="info-item-minimal">
                <div className="icon-wrapper">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div className="text-wrapper">
                  <label>Email</label>
                  <a href="mailto:allzxxott@gmail.com">allzxxott@gmail.com</a>
                </div>
              </div>

              <div className="info-item-minimal">
                <div className="icon-wrapper">
                  <Phone size={18} strokeWidth={1.5} />
                </div>
                <div className="text-wrapper">
                  <label>WhatsApp</label>
                  <a href="https://wa.me/6285878528337" target="_blank" rel="noreferrer">+62 858 7852 8337</a>
                </div>
              </div>

              <div className="info-item-minimal">
                <div className="icon-wrapper">
                  <Github size={18} strokeWidth={1.5} />
                </div>
                <div className="text-wrapper">
                  <label>Github</label>
                  <a href="https://github.com/allzxxopemula" target="_blank" rel="noreferrer">
                    github.com/allzxxopemula <ExternalLink size={12} style={{opacity: 0.6}} />
                  </a>
                </div>
              </div>
            </div>

            <div className="info-footer-minimal" data-aos="fade-up" data-aos-duration="800">
              <div className="availability-dot"></div>
              <span>Open for collaboration & learning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;