import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, CheckCircle, Info, Landmark, Clock, MessageSquare } from "lucide-react";
import SEO from "../components/SEO";
import { sendInquiry, validateForm } from "../utils/emailService";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    // Validation
    const validationError = validateForm({
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email
    });

    if (validationError) {
      setErrorMsg(validationError);
      setLoading(false);
      return;
    }

    try {
      await sendInquiry({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        message: formData.message,
        destination: "General Website Feedback"
      });
      setSuccess(true);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        message: ""
      });
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Cabnix | Support Helpline" 
        description="Get in touch with Cabnix client support. Phone: +91 97187 77716, Email: cabnix01@gmail.com. Located at Delhi NCR, serving North India outstations." 
      />

      <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-primary font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-4 py-1.5 rounded-full">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#2D3436]">
              Contact Cabnix Operations
            </h1>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-[#2D3436]/75 text-base sm:text-lg">
              Have questions regarding outstation routing, mountain conditions, or booking configurations? Connect with our dedicated 24/7 service desk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start h-full">
            
            {/* Left Column: Information Card List */}
            <div className="space-y-8">
              
              {/* Contact Card Details */}
              <div className="glass-card rounded-[24px] p-8 space-y-8">
                <h2 className="text-2xl font-bold text-[#2D3436] tracking-tight border-b border-gray-100 pb-4">
                  Official Details
                </h2>

                <div className="space-y-6">
                  {/* Company Name */}
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Company Name</h4>
                      <p className="text-lg font-bold text-[#2D3436]">Cabnix Car Rental</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Direct Hotline</h4>
                      <a href="tel:+919718777716" className="text-lg font-bold text-[#2D3436] hover:text-primary transition-colors">
                        +91 97187 77716
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email Support</h4>
                      <a href="mailto:cabnix01@gmail.com" className="text-lg font-bold text-[#2D3436] hover:text-primary transition-colors">
                        cabnix01@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Location Area */}
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Core Service Regions</h4>
                      <p className="text-sm font-medium text-[#2D3436]/80 leading-relaxed">
                        Delhi NCR, Chandigarh, Haryana, Punjab, Himachal Pradesh, Rajasthan, Uttarakhand, and Jammu & Kashmir.
                      </p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Operational Availability</h4>
                      <p className="text-sm font-medium text-[#2D3436]/80 leading-relaxed">
                        Dispatch and customer support are open 24/7, 365 days a year.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Google Maps Embed Section */}
              <div className="glass-card rounded-[24px] p-4 overflow-hidden h-[300px] relative">
                <iframe
                  title="Cabnix Core Operations Arena Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.94270438699!2d77.12644264667231!3d28.646893049102462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b7153b4ede6!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1717888888888!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "16px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

            </div>

            {/* Right Column: Contact Custom Form with EmailJS */}
            <div className="glass-panel rounded-[24px] p-8 md:p-10">
              <div className="space-y-6 mb-8">
                <span className="text-[#1F6E6E] font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-3 py-1.5 rounded-full inline-block">
                  Operations Desk
                </span>
                <h3 className="text-2xl font-bold text-[#2D3436]">
                  Send an Inquiry Message
                </h3>
                <p className="text-sm text-[#2D3436]/75">
                  Have unique stops or custom billing structures? Fill out the short brief below and receive deep cost estimations directly.
                </p>
              </div>

              {/* Toast indicators */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl text-[#25D366] text-sm font-medium flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Success! Your inquiry message was dispatched. We'll consult you shortly.</span>
                </motion.div>
              )}

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2"
                >
                  <Info className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Arnav Roy"
                    className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">
                    10-Digit Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 9718777716"
                    className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., mail@outlook.com"
                    className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">
                    Message Description
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute right-4 top-4 w-4 h-4 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Specify dates, multiple drops, preferred category, or corporate requests..."
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-4 pr-10 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-[#154c4c] disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <span>Dispatch Message</span>
                  )}
                </button>

              </form>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
