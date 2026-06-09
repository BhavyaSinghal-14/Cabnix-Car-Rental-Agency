import emailjs from "@emailjs/browser";

// EmailJS Credentials with environment variable bindings as requested by the user
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_zdtytg8";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_z6jr6h6";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "gPZNH787tLpMV8SD0";

/**
 * Validates baseline fields for form submissions
 * @param {Object} data 
 * @returns {string|null} Error string if invalid, null if valid
 */
export function validateForm(data) {
  if (!data.name || data.name.trim().length < 2) {
    return "Please enter a valid name (minimum 2 characters).";
  }
  if (!data.mobile || !/^[6-9]\d{9}$/.test(data.mobile.replace(/\s+/g, ""))) {
    return "Please enter a valid 10-digit mobile number.";
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Please enter a valid email address.";
  }
  return null;
}

/**
 * Sends form data via EmailJS to cabnix01@gmail.com
 * @param {Object} formData 
 * @returns {Promise<Object>} Response promise
 */
export async function sendInquiry(formData) {
  // Format variables beautifully so they are readable in any email template structure
  const templateParams = {
    // Standard parameter names to ensure match in EmailJS template:
    from_name: formData.name,
    from_email: formData.email,
    mobile_number: formData.mobile,
    phone: formData.mobile,
    
    // Trip Specific Fields
    pickup_city: formData.pickupCity || formData.pickupLocation || "N/A",
    pickup_location: formData.pickupLocation || formData.pickupCity || "N/A",
    destination: formData.destination || "N/A",
    travel_date: formData.travelDate || formData.date || "N/A",
    return_date: formData.returnDate || "N/A",
    vehicle_type: formData.vehicleType || "N/A",
    number_of_travellers: formData.numberOfTravellers || formData.travellers || "1",
    special_requirements: formData.specialRequirements || formData.message || "None provided",
    message: formData.message || "Custom Inquiry from Cabnix Website",

    // Supplemental Meta Data
    submission_time: new Date().toLocaleString(),
    to_email: "cabnix01@gmail.com",
    subject: `New Inquiry from ${formData.name} - ${formData.destination || "Cabnix"}`
  };

  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    return { success: true, response: result };
  } catch (error) {
    console.error("EmailJS sending failure:", error);
    throw new Error(error?.text || "Failed to submit inquiry. Please try again or call us directly.");
  }
}
