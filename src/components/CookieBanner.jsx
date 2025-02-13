import React, { useState, useEffect } from 'react';

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

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
