import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export interface CertificateProps {
  studentName: string;
  studentRoll: string;
  examDate?: string;
  finalScore?: number;
  totalQuestions?: number;
  certificateType?: 'participation' | 'merit';
  showScore?: boolean;
  onCertificateClick?: () => void;
}

export const OFFICIAL_FB_PAGE = 'https://www.facebook.com/profile.php?id=61574859873464';

export const Certificate: React.FC<CertificateProps> = ({
  studentName,
  studentRoll,
  examDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  finalScore,
  totalQuestions = 40,
  certificateType = 'participation',
  onCertificateClick,
}) => {
  const displayRoll = studentRoll && studentRoll !== 'N/A' ? studentRoll : 'CPR-2026-BCS';
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate actual scannable QR code pointing to official FB page
    QRCode.toDataURL(OFFICIAL_FB_PAGE, {
      width: 240,
      margin: 1,
      color: {
        dark: '#0c2340',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, []);

  return (
    <div
      onClick={onCertificateClick}
      className="relative w-full aspect-[1.414/1] max-w-4xl mx-auto bg-[#faf8f2] shadow-2xl rounded-sm overflow-hidden border border-slate-300 select-none certificate-container cursor-pointer transition-transform hover:shadow-3xl"
      title="Click to visit official CPR Medical Academy Facebook Page"
    >
      <svg
        viewBox="0 0 1200 848.5"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          {/* Subtle Security Diagonal Guilloche Lines Pattern */}
          <pattern
            id="certPattern"
            width="24"
            height="24"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="24" stroke="#ede7d8" strokeWidth="0.8" />
          </pattern>

          {/* Gold Gradient for Seal and Borders */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3d889" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#aa820a" />
            <stop offset="100%" stopColor="#f7e199" />
          </linearGradient>

          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0a2240" />
            <stop offset="50%" stopColor="#103768" />
            <stop offset="100%" stopColor="#0a2240" />
          </linearGradient>
        </defs>

        {/* 1. Base Paper Canvas */}
        <rect width="1200" height="848.5" fill="#fcfbf7" />
        <rect width="1200" height="848.5" fill="url(#certPattern)" opacity="0.65" />

        {/* 2. Top-Left Geometric Accents (Dark Navy & Gold) */}
        <polygon points="0,0 240,0 0,180" fill="#0c2340" />
        <polygon points="0,180 240,0 290,0 0,218" fill="url(#goldGradient)" />
        <polygon points="0,218 290,0 305,0 0,229" fill="#0c2340" opacity="0.8" />

        {/* 3. Bottom-Right Geometric Accents (Dark Navy & Gold) */}
        <polygon points="1200,848.5 960,848.5 1200,668.5" fill="#0c2340" />
        <polygon points="1200,668.5 960,848.5 910,848.5 1200,630.5" fill="url(#goldGradient)" />
        <polygon points="1200,630.5 910,848.5 895,848.5 1200,619.5" fill="#0c2340" opacity="0.8" />

        {/* 4. Elegant Double Gold Borders with Inset */}
        <rect x="24" y="24" width="1152" height="800.5" fill="none" stroke="#0c2340" strokeWidth="1.2" opacity="0.5" />
        <rect x="34" y="34" width="1132" height="780.5" fill="none" stroke="url(#goldGradient)" strokeWidth="3" />
        <rect x="42" y="42" width="1116" height="764.5" fill="none" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.85" />

        {/* 5. Header: CPR Medical Academy Logo & Branding */}
        <g transform="translate(370, 78)">
          <g transform="translate(0, 0)">
            {/* Open Book Base */}
            <path
              d="M10,75 C25,65 50,65 60,78 C70,65 95,65 110,75 L110,105 C95,95 70,95 60,108 C50,95 25,95 10,105 Z"
              fill="#0c2340"
            />
            <path d="M15,78 C30,70 50,70 58,80 L58,103 C50,94 30,94 15,101 Z" fill="#ffffff" opacity="0.25" />
            <path d="M105,78 C90,70 70,70 62,80 L62,103 C70,94 90,94 105,101 Z" fill="#ffffff" opacity="0.25" />

            {/* Gold Book Spine Brackets */}
            <path d="M10,75 L10,105 M110,75 L110,105" stroke="url(#goldGradient)" strokeWidth="3" />
            <path d="M22,70 L22,108" stroke="url(#goldGradient)" strokeWidth="4" />
            <path d="M98,70 L98,108" stroke="url(#goldGradient)" strokeWidth="4" />

            {/* Rod of Asclepius (Staff with Serpent) */}
            <line x1="60" y1="20" x2="60" y2="78" stroke="url(#goldGradient)" strokeWidth="3.5" strokeLinecap="round" />
            <path
              d="M52,30 C68,34 68,42 52,47 C68,52 68,60 52,65 C68,70 65,76 60,76"
              fill="none"
              stroke="#0c2340"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Graduation Cap (Mortarboard) */}
            <polygon points="60,2 108,18 60,34 12,18" fill="#0c2340" />
            <polygon points="60,6 98,18 60,30 22,18" fill="#14345c" />
            <path d="M60,2 L60,8" stroke="url(#goldGradient)" strokeWidth="3" />
            <circle cx="60" cy="18" r="3.5" fill="url(#goldGradient)" />
            <path d="M60,18 C78,22 84,32 84,40" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" />
            <circle cx="84" cy="42" r="3" fill="url(#goldGradient)" />
          </g>

          {/* Logo Typography */}
          <text
            x="130"
            y="52"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="48"
            fontWeight="900"
            letterSpacing="3"
            fill="#0c2340"
          >
            CPR
          </text>
          <text
            x="130"
            y="88"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="26"
            fontWeight="800"
            letterSpacing="2.5"
            fill="#0c2340"
          >
            MEDICAL ACADEMY
          </text>
          <text
            x="132"
            y="114"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="14"
            fontWeight="600"
            letterSpacing="6.5"
            fill="#0c2340"
            opacity="0.9"
          >
            LEARN | PRACTICE | EXCEL
          </text>
        </g>

        {/* 6. Top Right Motto: "Your Success Our Commitment" */}
        <text
          x="1090"
          y="84"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="18"
          fontStyle="italic"
          fontWeight="600"
          fill="#0c2340"
          textAnchor="end"
        >
          Your Success
        </text>
        <text
          x="1140"
          y="108"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="18"
          fontStyle="italic"
          fontWeight="600"
          fill="#0c2340"
          textAnchor="end"
        >
          Our Commitment
        </text>

        {/* 7. Gold Medallion Rosette Seal: "BCS DREAM BUILDS HERE" */}
        <g transform="translate(1070, 240)">
          <polygon
            points="-22,50 -44,140 -20,118 0,140 -6,50"
            fill="url(#goldGradient)"
            stroke="#aa820a"
            strokeWidth="1"
          />
          <polygon
            points="6,50 0,140 20,118 44,140 22,50"
            fill="url(#goldGradient)"
            stroke="#aa820a"
            strokeWidth="1"
          />

          <circle cx="0" cy="0" r="74" fill="url(#goldGradient)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
          <circle cx="0" cy="0" r="68" fill="#d4af37" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="56" fill="#0c2340" stroke="url(#goldGradient)" strokeWidth="2.5" />

          <path
            d="M-42,15 C-48,-15 -35,-38 -15,-46 M42,15 C48,-15 35,-38 15,-46"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />

          <text x="0" y="-34" textAnchor="middle" fill="url(#goldGradient)" fontSize="11" letterSpacing="3">
            ★ ★ ★
          </text>

          <text
            x="0"
            y="-14"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="18"
            fontWeight="900"
            fill="#ffffff"
            letterSpacing="2"
          >
            BCS
          </text>
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="11"
            fontWeight="800"
            fill="#f7e199"
            letterSpacing="1.5"
          >
            DREAM
          </text>
          <text
            x="0"
            y="20"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="11"
            fontWeight="800"
            fill="#f7e199"
            letterSpacing="1.5"
          >
            BUILDS
          </text>
          <text
            x="0"
            y="35"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="11"
            fontWeight="800"
            fill="#f7e199"
            letterSpacing="1.5"
          >
            HERE
          </text>

          <text x="0" y="48" textAnchor="middle" fill="url(#goldGradient)" fontSize="10" letterSpacing="3">
            ★ ★ ★
          </text>
        </g>

        {/* 8. Main Certificate Title */}
        <line x1="250" y1="262" x2="330" y2="262" stroke="url(#goldGradient)" strokeWidth="2" />
        <circle cx="335" cy="262" r="2.5" fill="url(#goldGradient)" />

        <text
          x="600"
          y="278"
          textAnchor="middle"
          fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
          fontSize="66"
          fontWeight="800"
          letterSpacing="10"
          fill="#0c2340"
        >
          CERTIFICATE
        </text>

        <circle cx="865" cy="262" r="2.5" fill="url(#goldGradient)" />
        <line x1="870" y1="262" x2="950" y2="262" stroke="url(#goldGradient)" strokeWidth="2" />

        <text
          x="600"
          y="318"
          textAnchor="middle"
          fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
          fontSize="24"
          fontWeight="700"
          letterSpacing="7"
          fill="#b8860b"
        >
          {certificateType === 'merit' ? 'OF MERIT & EXCELLENCE' : 'OF PARTICIPATION'}
        </text>

        {/* Gold Floral Filigree Divider */}
        <g transform="translate(600, 342)">
          <path
            d="M-130,0 L-30,0 C-15,-6 -10,-10 0,0 C10,-10 15,-6 30,0 L130,0"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1.8"
          />
          <circle cx="0" cy="0" r="4" fill="url(#goldGradient)" />
          <polygon points="-12,-3 0,-10 12,-3 0,4" fill="url(#goldGradient)" />
        </g>

        {/* 9. Presentation Body Statement */}
        <text
          x="600"
          y="390"
          textAnchor="middle"
          fontFamily="'Merriweather', 'Times New Roman', Georgia, serif"
          fontSize="21"
          fontStyle="italic"
          fill="#2b3b4e"
        >
          This is to certify that
        </text>

        {/* Candidate Name Presentation */}
        <g transform="translate(600, 452)">
          <text
            x="-400"
            y="-4"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="26"
            fontWeight="700"
            fill="#0c2340"
          >
            Name :
          </text>
          <text
            x="-290"
            y="-2"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="30"
            fontWeight="800"
            fill="#0c2340"
          >
            {studentName}
          </text>
          <line x1="-300" y1="12" x2="400" y2="12" stroke="#14345c" strokeWidth="1.5" />
        </g>

        {/* Participation clause */}
        <text
          x="600"
          y="498"
          textAnchor="middle"
          fontFamily="'Merriweather', 'Times New Roman', Georgia, serif"
          fontSize="20"
          fontStyle="italic"
          fill="#2b3b4e"
        >
          has successfully participated in the
        </text>

        {/* 10. Distinctive Ribbon Banner: "SPECIAL BCS CRYSTAL BATCH" */}
        <g transform="translate(600, 545)">
          <polygon points="-350,0 -380,-18 -365,0 -380,18" fill="#081a30" />
          <polygon points="-350,-18 -365,-18 -350,0" fill="#caa035" />

          <polygon points="350,0 380,-18 365,0 380,18" fill="#081a30" />
          <polygon points="350,-18 365,-18 350,0" fill="#caa035" />

          <polygon
            points="-350,-24 350,-24 335,24 -335,24"
            fill="url(#ribbonGradient)"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
          />

          <text
            x="0"
            y="9"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="26"
            fontWeight="900"
            letterSpacing="3"
            fill="#ffffff"
          >
            SPECIAL <tspan fill="#f7d057">BCS CRYSTAL</tspan> BATCH
          </text>
        </g>

        {/* Organizer text */}
        <text
          x="600"
          y="598"
          textAnchor="middle"
          fontFamily="'Merriweather', Georgia, serif"
          fontSize="19"
          fill="#2b3b4e"
        >
          Organized by <tspan fontWeight="bold" fill="#0c2340">CPR Medical Academy</tspan>
        </text>

        {/* 11. Official Exam Result & Score Plaque */}
        <g transform="translate(600, 630)">
          <rect
            x="-240"
            y="-16"
            width="480"
            height="32"
            rx="16"
            fill="#0c2340"
            stroke="url(#goldGradient)"
            strokeWidth="2"
          />
          <rect
            x="-236"
            y="-12"
            width="472"
            height="24"
            rx="12"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="0.75"
            opacity="0.6"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="0.6"
            fill="#ffffff"
          >
            TOPIC: ENGLISH LITERATURE  ·  OBTAINED SCORE: <tspan fill="#f7d057" fontWeight="900" fontSize="13.5">{finalScore !== undefined ? finalScore.toFixed(2) : '0.00'}</tspan> / {totalQuestions}.00
          </text>
        </g>

        {/* 12. Metadata Row: Registration No & Date */}
        <g transform="translate(200, 666)">
          <text
            x="0"
            y="0"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="16"
            fontWeight="700"
            fill="#0c2340"
          >
            Registration No. :
          </text>
          <text
            x="145"
            y="0"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="16"
            fontWeight="700"
            fill="#0c2340"
          >
            {displayRoll}
          </text>
          <line x1="140" y1="6" x2="340" y2="6" stroke="#0c2340" strokeWidth="1" />
        </g>

        <g transform="translate(730, 666)">
          <text
            x="0"
            y="0"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="16"
            fontWeight="700"
            fill="#0c2340"
          >
            Date :
          </text>
          <text
            x="60"
            y="0"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="16"
            fontWeight="700"
            fill="#0c2340"
          >
            {examDate}
          </text>
          <line x1="55" y1="6" x2="255" y2="6" stroke="#0c2340" strokeWidth="1" />
        </g>

        {/* 13. Bottom Row: Signatures & Real Official Facebook QR Verification */}

        {/* Left Signature: Course Coordinator */}
        <g transform="translate(280, 744)">
          <path
            d="M-40,-25 C-20,-50 -10,-10 10,-35 C25,-5 40,-25 55,-20 C35,-15 15,-10 0,-15 C20,-20 40,-20 60,-22"
            fill="none"
            stroke="#0c2340"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line x1="-70" y1="-5" x2="70" y2="-5" stroke="#0c2340" strokeWidth="1.2" />
          <text
            x="0"
            y="14"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="13"
            fontWeight="700"
            fill="#0c2340"
          >
            Course Coordinator
          </text>
          <text
            x="0"
            y="29"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="11"
            fontWeight="500"
            fill="#5a6b7d"
          >
            CPR Medical Academy
          </text>
        </g>

        {/* Slanted Bottom-Left Motto */}
        <g transform="translate(100, 792) rotate(-8)">
          <text
            x="0"
            y="0"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="15"
            fontStyle="italic"
            fontWeight="700"
            fill="#0c2340"
          >
            Better Preparation
          </text>
          <text
            x="12"
            y="18"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="15"
            fontStyle="italic"
            fontWeight="700"
            fill="#0c2340"
          >
            Brighter Future
          </text>
          <path d="M0,23 C30,30 90,30 110,24" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" />
        </g>

        {/* Center: Real Clean QR Verification Block pointing to Facebook Page */}
        <g transform="translate(600, 735)">
          {/* QR Code Container with Gold Border */}
          <rect
            x="-36"
            y="-52"
            width="72"
            height="72"
            rx="5"
            fill="#ffffff"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
          />

          {/* Render Real Scannable QR Code Image */}
          {qrCodeDataUrl ? (
            <image
              href={qrCodeDataUrl}
              x="-33"
              y="-49"
              width="66"
              height="66"
            />
          ) : (
            <g transform="translate(-27, -44)">
              <rect x="0" y="0" width="16" height="16" fill="#0c2340" />
              <rect x="3" y="3" width="10" height="10" fill="#ffffff" />
              <rect x="6" y="6" width="4" height="4" fill="#0c2340" />
              <rect x="38" y="0" width="16" height="16" fill="#0c2340" />
              <rect x="41" y="3" width="10" height="10" fill="#ffffff" />
              <rect x="44" y="6" width="4" height="4" fill="#0c2340" />
              <rect x="0" y="38" width="16" height="16" fill="#0c2340" />
              <rect x="3" y="41" width="10" height="10" fill="#ffffff" />
              <rect x="6" y="44" width="4" height="4" fill="#0c2340" />
            </g>
          )}

          {/* Verification Instruction */}
          <text
            x="0"
            y="29"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="10"
            fontWeight="700"
            fill="#0c2340"
          >
            Scan QR to Verify on Facebook Page
          </text>

          {/* Official Facebook Link Pill */}
          <a
            href={OFFICIAL_FB_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <rect
              x="-115"
              y="35"
              width="230"
              height="22"
              rx="11"
              fill="#0c2340"
              stroke="url(#goldGradient)"
              strokeWidth="1"
            />
            <text
              x="0"
              y="50"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.4"
              fill="#ffffff"
            >
              fb.com/CPRMedicalAcademy
            </text>
          </a>

          <text
            x="0"
            y="70"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="9"
            fontWeight="600"
            fill="#5a6b7d"
          >
            Click or Scan to Visit Official Page
          </text>
        </g>

        {/* Right Signature: Director */}
        <g transform="translate(860, 744)">
          <path
            d="M-35,-20 C-15,-45 0,-40 15,-15 C25,-30 40,-35 55,-15 C35,-10 15,-10 -5,-15 C15,-15 35,-15 50,-18"
            fill="none"
            stroke="#0c2340"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line x1="-70" y1="-5" x2="70" y2="-5" stroke="#0c2340" strokeWidth="1.2" />
          <text
            x="0"
            y="14"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="13"
            fontWeight="700"
            fill="#0c2340"
          >
            Director
          </text>
          <text
            x="0"
            y="29"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="11"
            fontWeight="500"
            fill="#5a6b7d"
          >
            CPR Medical Academy
          </text>
        </g>
      </svg>
    </div>
  );
};
