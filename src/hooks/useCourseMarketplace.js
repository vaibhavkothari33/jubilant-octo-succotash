import { useState, useEffect, useCallback } from 'react';
import { CourseMarketplaceClient } from '../utils/blockchain';

// Singleton instance
let clientInstance = null;

/**
 * Custom hook for managing the CourseMarketplace client
 * @returns {Object} Client instance and utility functions
 */
export const useCourseMarketplace = () => {
  const [isInitialized, setIsInitialized] = useState(!!clientInstance);
  const [error, setError] = useState(null);

  // Initialize the client
  const initialize = useCallback((provider, contractAddress, account) => {
    try {
      if (!clientInstance) {
        clientInstance = new CourseMarketplaceClient(provider, contractAddress);
        clientInstance.setDefaultAccount(account);
        setIsInitialized(true);
      }
      return clientInstance;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Get the client instance
  const getClient = useCallback(() => {
    if (!clientInstance) {
      const err = new Error('CourseMarketplace client not initialized');
      setError(err.message);
      throw err;
    }
    return clientInstance;
  }, []);

  // Reset the client (useful for testing or when switching accounts)
  const reset = useCallback(() => {
    clientInstance = null;
    setIsInitialized(false);
    setError(null);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Optionally reset the client when the component unmounts
      // Uncomment the line below if you want this behavior
      // reset();
    };
  }, [reset]);

  return {
    client: clientInstance,
    isInitialized,
    error,
    initialize,
    getClient,
    reset
  };
}; 