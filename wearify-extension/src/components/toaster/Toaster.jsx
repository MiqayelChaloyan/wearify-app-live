import React, { useEffect, useState } from 'react';
import { ToasterOverlay, ToasterContainer, ToasterContent, ToasterIcon, ToasterMessage, ToasterClose } from './styles';

const Toaster = ({ message, type = 'error', isVisible, onClose, duration = 5000 }) => {
  const [isShowing, setIsShowing] = useState(true);

      useEffect(() => {
        if (isVisible && message) {
          setIsShowing(true);
        
          // Auto-hide after duration
          const timer = setTimeout(() => {
            setIsShowing(false);
            setTimeout(() => onClose(), 1200); // Wait for fade out animation
          }, duration);

          return () => clearTimeout(timer);
        }
      }, [isVisible, message, duration, onClose]);

      if (!isVisible || !message) return null;

  return (
   <ToasterOverlay>
     <ToasterContainer className={`${type} ${isShowing ? 'show' : ''}`}>
      <ToasterContent>
        <ToasterIcon>
          {type === 'error' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
          {type === 'success' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {type === 'warning' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </ToasterIcon>
        <ToasterMessage>{message}</ToasterMessage>
        <ToasterClose onClick={() => {
          setIsShowing(false);
          setTimeout(() => onClose(), 300);
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ToasterClose>
      </ToasterContent>
    </ToasterContainer>
   </ToasterOverlay>
  );
};

export default Toaster;
