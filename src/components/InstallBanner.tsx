import { useState } from 'react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export default function InstallBanner() {
  const { canInstall, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall || dismissed) return null;

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (!installed) {
      // User dismissed the prompt
      setDismissed(true);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-slide-up">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-white/20">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-slate-900 font-semibold text-sm mb-1">Install Wx</h3>
            <p className="text-slate-600 text-xs mb-3">
              Add to your home screen for quick access and offline use
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors touch-manipulation"
              >
                Install
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 text-sm font-medium rounded-lg transition-colors touch-manipulation"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
