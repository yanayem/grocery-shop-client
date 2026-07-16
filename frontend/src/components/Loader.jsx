import React from 'react';

// A simple and clean loader used across the project
const Loader = ({ fullPage = false }) => {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Animated Spinner Ring */}
      <div className="w-12 h-12 border-4 border-gray-100 border-t-primary rounded-full animate-spin"></div>
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest animate-pulse">Loading...</p>
    </div>
  );

  // If fullPage is true, it will cover the entire screen
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }

  // Otherwise, it just fills its container
  return (
    <div className="w-full py-20 flex items-center justify-center">
      {loaderContent}
    </div>
  );
};

export default Loader;
