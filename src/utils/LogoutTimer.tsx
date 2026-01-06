import React, { useState, useEffect } from 'react';

const LogoutTimer: React.FC<{ timeout: number; logout: () => void }> = ({
  timeout,
  logout,
}) => {
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      setLogoutTimer(setTimeout(logoutUser, timeout));
    };

    const logoutUser = () => {
      logout();
      console.log('User logged out due to inactivity');
      // Perform any navigation actions here if needed
    };

    const handleUserActivity = () => {
      resetTimer();
    };

    // Listen for user activity events
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);

    // Initialize timer on component mount
    resetTimer();

    // Clean up event listeners on component unmount
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
    };
  }, [logoutTimer, timeout, logout]);

  return <div>Logout timer component</div>;
};

export default LogoutTimer;
