import { useEffect, useState } from 'react';

export const UseScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWidth);

    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  });

  return screenWidth;
};
export const UseScreenDimensions = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', updateDimensions);

    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  });
  return [screenWidth, screenHeight];
};
