import { useEffect } from "react";

export default function SEO({ title, description }) {
  useEffect(() => {
    // Update Document Title
    const baseTitle = "Cabnix | Premium Cab Services North India";
    document.title = title ? `${title} | Cabnix` : baseTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    const defaultDesc = "Travel comfortably across North India with Cabnix. Premium Hatchback, Sedan, and SUV rides for one-way, round-trip, and airport transfers.";
    
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description || defaultDesc);

    // Open Graph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title ? `${title} | Cabnix` : baseTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description || defaultDesc);

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      document.head.appendChild(ogType);
    }
    ogType.setAttribute("content", "website");

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      document.head.appendChild(ogImage);
    }
    // High premium travel image for Open Graph
    ogImage.setAttribute("content", "/images/hero_drive.svg");

  }, [title, description]);

  return null;
}
