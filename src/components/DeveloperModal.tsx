import React from 'react';
import {
  X,
  User,
  Building2,
  Phone,
  Facebook,
  Instagram,
  CheckCircle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Code2,
} from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl text-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-red-50/50 via-white to-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">About Developer & Company</h3>
              <p className="text-xs text-gray-500 font-medium">DeepFocus • Version 1.0.0</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm">
          {/* About Developer Card */}
          <div className="bg-gradient-to-br from-red-50/70 via-white to-orange-50/40 border border-red-100 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-200">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-red-600 tracking-wider uppercase">
                  Lead Developer
                </span>
                <h4 className="text-xl font-bold text-gray-900">Prince AR Abdur Rahman</h4>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm mt-2">
              Independent App Developer passionate about building modern Android applications,
              productivity tools, AI-powered experiences, media players, educational apps, and
              next-generation digital products.
            </p>

            {/* Contact Badges */}
            <div className="mt-4 pt-3 border-t border-red-100/70 space-y-2">
              <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                Direct Contact & Socials:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* WhatsApp 1 */}
                <a
                  href="https://wa.me/8801707424006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-lg font-medium text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">WhatsApp: 01707424006</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>

                {/* WhatsApp 2 */}
                <a
                  href="https://wa.me/8801796951709"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-lg font-medium text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">WhatsApp: 01796951709</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1BNn32qoJo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100/80 text-blue-800 border border-blue-200 px-3 py-2 rounded-lg font-medium text-xs transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">Facebook Profile</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ur___abdur____rahman__2008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100/80 text-pink-800 border border-pink-200 px-3 py-2 rounded-lg font-medium text-xs transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                  <span className="truncate">Instagram Profile</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* About Company Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                  Publisher & Studio
                </span>
                <h4 className="text-lg font-bold text-gray-900">NexVora Lab's Ofc</h4>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm mt-2">
              NexVora Lab's Ofc focuses on creating innovative Android applications designed to
              improve productivity, entertainment, learning, and digital experiences.
            </p>

            <div className="mt-3 bg-white border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Mission Statement
              </div>
              <p className="text-xs text-gray-600 leading-normal">
                Build fast, beautiful, privacy-friendly, and user-focused applications accessible to
                everyone.
              </p>
            </div>
          </div>

          {/* Technical Info & Credits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 font-bold text-gray-800 mb-1">
                <Code2 className="w-4 h-4 text-gray-600" /> Technical Information
              </div>
              <div className="text-gray-600">
                <div>Version: <span className="font-semibold text-gray-900">1.0.0</span></div>
                <div>Runtime: Modern React 19 + TypeScript + Vite</div>
                <div>Storage: Encrypted Local Offline Storage</div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 font-bold text-gray-800 mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Official Credits
              </div>
              <div className="text-gray-600">
                <div>Developed by: <span className="font-semibold text-gray-900">Prince AR Abdur Rahman</span></div>
                <div>Published by: <span className="font-semibold text-gray-900">NexVora Lab's Ofc</span></div>
                <div className="mt-1 text-[11px] text-gray-500">© 2026 NexVora Lab's Ofc. All Rights Reserved.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            © 2026 NexVora Lab's Ofc
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 font-bold bg-gray-900 hover:bg-black text-white rounded text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
