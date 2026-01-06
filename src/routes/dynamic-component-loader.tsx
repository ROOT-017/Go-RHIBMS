import React, { useState, useEffect, ComponentType } from 'react';
import { DefaultErrorFallback } from '../components/ErrorBoundary/fallback';
import toast from 'react-hot-toast';

interface DynamicComponentLoaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importFunction: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactElement;
  animated?: boolean;
}

const DynamicComponentLoader: React.FC<DynamicComponentLoaderProps> = ({ importFunction, fallback, animated }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const loadComponent = () => {
    importFunction()
      .then((module) => {
        setComponent(() => module.default);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to load module:', err);
        setError(err);
      });
  };

  useEffect(() => {
    // Try to load the component initially
    loadComponent();

    const handleOnline = () => {
      toast.success('Network connection restored, retrying...');
      loadComponent();
    };

    // Add event listener for online event
    window.addEventListener('online', handleOnline);

    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener('online', handleOnline);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <DefaultErrorFallback message="Error loading component. Please check your network connection." />;
  }

  return Component ? (
    animated ? (
        <div className="page-box animate-fade-in">{<Component />}</div>
      ) : (
        <Component />
      )
  ) : (fallback ?? <div>Loading...</div>);
};

export default DynamicComponentLoader;
