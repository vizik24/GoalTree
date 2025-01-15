import React, { useState } from 'react';

function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => setVisible(false);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-base-100 text-base-content shadow-lg p-4 z-50">
      <div className="flex justify-between items-center">
        <p>We use cookies to improve your experience on our site.</p>
        <button
          className="btn btn-primary"
          onClick={handleClose}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
