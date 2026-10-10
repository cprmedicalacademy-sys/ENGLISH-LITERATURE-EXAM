import React, { useRef, useState } from 'react';
import { X, Download, Printer, CheckCircle2, Award, ShieldCheck, ExternalLink } from 'lucide-react';
import { Certificate, OFFICIAL_FB_PAGE } from './Certificate';
import { ExamResult } from '../types/exam';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ExamResult;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleOpenFacebook = () => {
    window.open(OFFICIAL_FB_PAGE, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadPNG = async () => {
    setIsDownloading(true);
    try {
      if (!certRef.current) return;
      const svgElement = certRef.current.querySelector('svg');
      if (!svgElement) return;

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);

      const canvas = document.createElement('canvas');
      canvas.width = 2400;
      canvas.height = 1700;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.fillStyle = '#fcfbf7';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        const filename = `Certificate_${result.studentName.replace(/\s+/g, '_')}_CPR_Medical_Academy.png`;
        link.download = filename;
        link.href = pngUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setIsDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      };

      img.onerror = () => {
        setIsDownloading(false);
        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (err) {
      console.error('Failed to download certificate image', err);
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print-bg">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        {/* Top Header Controls (No-Print) */}
        <div className="bg-slate-950 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>অফিসিয়াল সার্টিফিকেট</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>ভেরিফায়েড</span>
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Candidate: <strong className="text-white">{result.studentName}</strong> · Score: <strong className="text-amber-400 font-mono">{result.finalScore.toFixed(2)}/40.00</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Facebook Link Button */}
            <a
              href={OFFICIAL_FB_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md cursor-pointer"
              title="Visit CPR Medical Academy Facebook Page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>আমাদের ফেসবুক পেইজ</span>
            </a>

            <button
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'ডাউনলোড হচ্ছে...' : 'Download (PNG)'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info banner telling the user clicking certificate visits page */}
        <div className="bg-indigo-950/80 border-b border-indigo-900/60 px-5 py-2 flex items-center justify-between text-xs text-indigo-200 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="bangla-text">
              সার্টিফিকেটে বা QR কোডে ক্লিক করলে সরাসরি CPR Medical Academy-এর ফেসবুক পেইজে নিয়ে যাবে।
            </span>
          </div>
          <a
            href={OFFICIAL_FB_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>fb.com/CPRMedicalAcademy</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Certificate Display */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950/70">
          <div ref={certRef} className="w-full max-w-4xl print-certificate-target">
            <Certificate
              studentName={result.studentName}
              studentRoll={result.studentRoll}
              finalScore={result.finalScore}
              totalQuestions={result.totalQuestions}
              certificateType="participation"
              showScore={true}
              onCertificateClick={handleOpenFacebook}
            />
          </div>
        </div>

        {/* Download notification */}
        {downloadSuccess && (
          <div className="bg-emerald-950 border-t border-emerald-800 text-emerald-200 px-6 py-2.5 text-xs flex items-center justify-between no-print animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>সার্টিফিকেট সফলভাবে ডাউনলোড হয়েছে! (High resolution print-ready PNG)</span>
            </div>
            <span className="text-[11px] text-emerald-300">CPR Medical Academy Verification</span>
          </div>
        )}
      </div>
    </div>
  );
};
