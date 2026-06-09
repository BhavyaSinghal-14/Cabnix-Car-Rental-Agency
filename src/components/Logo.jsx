export default function Logo({ className = "h-12", showText = true, light = false }) {
  const primaryColor = light ? "#F8F9FA" : "#1F6E6E";
  const accentColor = "#F4B942";
  const textColor = light ? "#FFFFFF" : "#2D3436";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Styled Premium SVG Logo Signet */}
      <svg
        viewBox="0 0 500 500"
        className="w-10 h-10 md:w-12 md:h-12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base shadow circular glow */}
        <circle cx="250" cy="380" r="120" stroke={primaryColor} strokeWidth="32" strokeLinecap="round" strokeDasharray="1 300" opacity="0.3" />
        <path
          d="M370 380C370 410.376 316.274 435 250 435C183.726 435 130 410.376 130 380C130 365 150 350 180 345"
          stroke={primaryColor}
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* The Premium Location Pin Body */}
        <path
          d="M250 50C170 50 125 110 125 185C125 285 250 420 250 420C250 420 375 285 375 185C375 110 330 50 250 50Z"
          fill={primaryColor}
        />

        {/* cloud 1 (background white accent inside pin) */}
        <path
          opacity="0.85"
          d="M210 110C210 100 230 100 235 105C240 95 260 95 265 105C270 102 280 105 280 110C280 115 210 115 210 110Z"
          fill="#FFFFFF"
        />

        {/* Paper airplane looping trail */}
        <path
          d="M142 280C110 230 180 180 230 220C280 260 310 150 340 160"
          stroke="#FFFFFF"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="14 14"
        />

        {/* Cloud 2 (foreground bottom cloud overlay) */}
        <path
          opacity="0.9"
          d="M280 300C270 295 265 280 280 275C290 260 315 265 315 280C325 280 330 290 325 298C320 305 280 305 280 300Z"
          fill="#FFFFFF"
        />

        {/* Elegant paper airplane flight tip */}
        <path
          d="M338 120L375 162L348 180L352 153L338 120Z"
          fill={accentColor}
        />
        <path
          d="M338 120L348 180L330 148L338 120Z"
          fill="#FFFFFF"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: textColor, fontFamily: "var(--font-heading)" }}
          >
            Cabnix
          </span>
          <span
            className="text-[9px] uppercase tracking-[0.25em] font-medium"
            style={{ color: light ? "rgba(255,255,255,0.7)" : "#1F6E6E" }}
          >
            Premium Cab Service
          </span>
        </div>
      )}
    </div>
  );
}
