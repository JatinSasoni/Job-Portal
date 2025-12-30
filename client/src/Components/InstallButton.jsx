import { useState, useEffect } from "react";
import { useInstallPrompt } from "../Hooks/useInstallPrompt.jsx";

const InstallButton = ({ className = "" }) => {
  const { deferredPrompt, clearPrompt } = useInstallPrompt();
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Check if app is already installed
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    setIsInstalling(true);

    try {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setIsInstalled(true);
      }

      // Clear the prompt after use
      clearPrompt();
    } catch (error) {
      console.error("Error during installation:", error);
    } finally {
      setIsInstalling(false);
    }
  };

  // Don't render if already installed or no prompt available
  if (isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      disabled={isInstalling}
      className={`
        relative flex items-center justify-center gap-2
        px-6 py-3 rounded-lg
        font-semibold text-white
        bg-blue-500 hover:bg-blue-600
        dark:bg-blue-600 dark:hover:bg-blue-700
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 active:scale-95
        ${className}
      `}
      aria-label="Install app"
    >
      {isInstalling ? (
        <>
          <div className="animate-spin h-5 w-5 border-4 border-blue-100 border-t-transparent rounded-full"></div>
          <span>Installing...</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>Install App</span>
        </>
      )}
    </button>
  );
};

export default InstallButton;
