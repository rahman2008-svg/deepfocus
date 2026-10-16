import React from 'react';
import {
  Sparkles,
  Timer,
  CheckCircle2,
  Clock,
  Layers,
  BarChart,
  Volume2,
  User,
  Building2,
  Phone,
  Facebook,
  Instagram,
  ShieldCheck,
  Code2,
  ExternalLink,
} from 'lucide-react';

export const LandingContent: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-20 text-gray-800 bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Hero Header */}
      <div className="p-6 sm:p-10 border-b border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-4">
          An online Pomodoro Timer to boost your productivity
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          DeepFocus is a customizable Pomodoro timer that works on both desktop & mobile browsers.
          The aim of this app is to help you focus on any task you are working on, such as study,
          writing, or coding. This app is inspired by the Pomodoro Technique which is a time management
          method developed by Francesco Cirillo.
        </p>
      </div>

      {/* What is DeepFocus & Pomodoro */}
      <div className="p-6 sm:p-10 space-y-8 bg-gray-50/50">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#ba4949] rounded-sm inline-block"></span>
            What is DeepFocus?
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            DeepFocus is a streamlined, distraction-free productivity suite that combines the
            elegance of the Pomodoro rhythm with intelligent task planning, audio cues, real-time
            progress tracking, and offline data storage. Whether you are tackling an ambitious coding
            sprint or studying for an exam, DeepFocus keeps you in the zone.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#38858a] rounded-sm inline-block"></span>
            What is the Pomodoro Technique?
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            The Pomodoro Technique is created by Francesco Cirillo for a more productive way to work
            and study. The technique uses a timer to break down work into intervals, traditionally 25
            minutes in length, separated by short breaks. Each interval is known as a <em>pomodoro</em>,
            from the Italian word for 'tomato'.
          </p>
        </div>

        {/* How to use the timer: 6 Steps */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#397097] rounded-sm inline-block"></span>
            How to use the Pomodoro Timer?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200/80 shadow-xs">
              <div className="text-xs font-black text-[#ba4949] uppercase tracking-wider mb-1">
                Step 1
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Add tasks to focus on today</h4>
              <p className="text-xs text-gray-600">
                Organize your to-do items into clear, actionable objectives right inside the Tasks panel.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200/80 shadow-xs">
              <div className="text-xs font-black text-[#ba4949] uppercase tracking-wider mb-1">
                Step 2
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Set estimated pomodoros</h4>
              <p className="text-xs text-gray-600">
                Estimate how many 25-minute intervals each task will take (e.g. 1-4 pomodoros).
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200/80 shadow-xs">
              <div className="text-xs font-black text-[#38858a] uppercase tracking-wider mb-1">
                Step 3
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Select a task to work on</h4>
              <p className="text-xs text-gray-600">
                Click any task card to set it as your active focus target.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200/80 shadow-xs">
              <div className="text-xs font-black text-[#38858a] uppercase tracking-wider mb-1">
                Step 4
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Start timer and focus for 25 min</h4>
              <p className="text-xs text-gray-600">
                Hit START, silence distractions, and immerse yourself in single-tasking.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200/80 shadow-xs">
              <div className="text-xs font-black text-[#397097] uppercase tracking-wider mb-1">
                Step 5
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Take a 5-minute breather</h4>
              <p className="text-xs text-gray-600">
                When the alarm chimes, step away from your screen, stretch, hydrate, and relax.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200/80 shadow-xs">
              <div className="text-xs font-black text-[#397097] uppercase tracking-wider mb-1">
                Step 6
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Iterate 4 pomos & take a long break</h4>
              <p className="text-xs text-gray-600">
                After 4 focus rounds, recharge with a restorative 15-30 minute long break!
              </p>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Key Features
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-white p-3.5 rounded-lg border border-gray-200">
              <Timer className="w-5 h-5 text-[#ba4949] mb-1.5" />
              <div className="font-bold text-gray-900">Custom Timers</div>
              <p className="text-xs text-gray-500 mt-1">Adjust pomodoro, short break, and long break intervals freely.</p>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-gray-200">
              <Layers className="w-5 h-5 text-[#38858a] mb-1.5" />
              <div className="font-bold text-gray-900">Dynamic Color Themes</div>
              <p className="text-xs text-gray-500 mt-1">Immersive color transitions switch background per session mode.</p>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-gray-200">
              <Volume2 className="w-5 h-5 text-indigo-600 mb-1.5" />
              <div className="font-bold text-gray-900">Synthetic Web Audio</div>
              <p className="text-xs text-gray-500 mt-1">Chimes, bells, woodblocks, and background clock ticking.</p>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-gray-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1.5" />
              <div className="font-bold text-gray-900">Task Planning</div>
              <p className="text-xs text-gray-500 mt-1">Track actual vs estimated pomodoros, add notes and project tags.</p>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-gray-200">
              <BarChart className="w-5 h-5 text-blue-600 mb-1.5" />
              <div className="font-bold text-gray-900">Activity Report</div>
              <p className="text-xs text-gray-500 mt-1">Visual 7-day focus chart, daily hours logged, and active streaks.</p>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-gray-200">
              <Clock className="w-5 h-5 text-amber-600 mb-1.5" />
              <div className="font-bold text-gray-900">Estimated Finish Time</div>
              <p className="text-xs text-gray-500 mt-1">Automatically calculates when you will complete all scheduled tasks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent About Developer & About Company Section */}
      <div className="p-6 sm:p-10 border-t border-gray-200 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Developer Card */}
          <div className="bg-gradient-to-br from-red-50/60 to-white border border-red-100 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                  About Developer
                </span>
                <h4 className="text-lg font-bold text-gray-900">Prince AR Abdur Rahman</h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
              Independent App Developer passionate about building modern Android applications,
              productivity tools, AI-powered experiences, media players, educational apps, and
              next-generation digital products.
            </p>

            <div className="space-y-1.5 pt-3 border-t border-red-100 text-xs">
              <div className="font-bold text-gray-600 text-[11px] uppercase tracking-wider mb-1">
                Contact:
              </div>
              <div className="flex flex-col gap-1.5">
                <a
                  href="https://wa.me/8801707424006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp: 01707424006</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://wa.me/8801796951709"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp: 01796951709</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://www.facebook.com/share/1BNn32qoJo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-semibold"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-600" />
                  <span>Facebook Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://www.instagram.com/ur___abdur____rahman__2008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-pink-700 hover:text-pink-800 font-semibold"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>Instagram Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Company Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    About Company
                  </span>
                  <h4 className="text-lg font-bold text-gray-900">NexVora Lab's Ofc</h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                NexVora Lab's Ofc focuses on creating innovative Android applications designed to
                improve productivity, entertainment, learning, and digital experiences.
              </p>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Mission</span>
                </div>
                <p className="text-xs text-gray-600 leading-normal">
                  Build fast, beautiful, privacy-friendly, and user-focused applications accessible
                  to everyone.
                </p>
              </div>
            </div>

            {/* Technical Information & Credits */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-gray-600 space-y-1">
              <div className="flex items-center gap-1 font-bold text-gray-700">
                <Code2 className="w-3.5 h-3.5" /> Technical Information
              </div>
              <div>Version: <span className="font-semibold text-gray-900">1.0.0</span></div>
              <div className="pt-1 text-[11px] text-gray-500">
                Developed by <span className="font-medium text-gray-700">Prince AR Abdur Rahman</span> • Published by <span className="font-medium text-gray-700">NexVora Lab's Ofc</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 bg-gray-100 text-center text-xs text-gray-500 border-t border-gray-200">
        <div className="font-semibold text-gray-700 mb-1">
          Developed by Prince AR Abdur Rahman | Published by NexVora Lab's Ofc
        </div>
        <div>© 2026 NexVora Lab's Ofc. All Rights Reserved.</div>
      </footer>
    </div>
  );
};
