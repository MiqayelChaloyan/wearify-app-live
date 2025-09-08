import { useState } from 'react'
import { FloatingButton } from './App.styles.js'




import { useSelector } from "react-redux";


import { useMultistepForm } from './hooks/useMultistepForm';

import { useEffect } from 'react';

import Modal from './components/modal/Modal';

import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';

function App() {
  const [isOpen, setIsOpen] = useState(false)


  const el = document.getElementById('wearify-root');
  const productId = el?.dataset.productId;
  const imageUrl = el?.dataset.productImage || '';
  const productName = el?.dataset.productName || '';
  const productPrice = el?.dataset.productPrice || '';

  
    const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
    const [buttonTop, setButtonTop] = useState(typeof window !== 'undefined' && window.innerHeight * 0.45);
  
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
  
    const { isLoading: isLoadingImageStore } = useSelector((state) => state.imageUpload);
  
    const { currentStepIndex, step, back, next, goTo } =
      useMultistepForm([
        <Step1 />,
        <Step2 />,
        <Step3 />,
        <Step4 />,
        <Step5 />,
      ]);
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setDragStartY(e.clientY - buttonTop);
    };
  
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newTop = e.clientY - dragStartY;
        const maxTop = window.innerHeight - 60; // Button height + some padding
        const constrainedTop = Math.max(20, Math.min(newTop, maxTop));
        setButtonTop(constrainedTop);
      }
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };
  
    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
  
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, dragStartY]);
  
    // Handle window resize to maintain center positioning
    useEffect(() => {
      const handleResize = () => {
        if (!isDragging) {
          setButtonTop((window.innerHeight - 60) / 2);
        }
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [isDragging]);
  
    useEffect(() => {
      if (currentStepIndex === 3 && !isLoadingImageStore) {
        // Remove the hardcoded timeout and let Step4 handle the navigation
        // The navigation should happen when AI processing is complete
        // This will be handled by the parent component or navigation logic
      }
    }, [currentStepIndex, isLoadingImageStore]);
  
    return (
      <>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <FloatingButton
            onClick={() => setIsSmallModalOpen(true)}
            onMouseDown={handleMouseDown}
            style={{ top: `${buttonTop}px` }}
          >
            Try It On
          </FloatingButton>
        </div>
  
        <Modal
          isOpen={isSmallModalOpen}
          onClose={() => setIsSmallModalOpen(false)}
          title="Virtual Fitting"
          currentStepIndex={currentStepIndex}
          _handleBack={back}
          _handleNext={next}
          _handleGoTo={goTo}
          productImageUrl={imageUrl}
          productName={productName}
          productPrice={productPrice}
        >
          {step}
        </Modal>
  
      </>
  )
}

export default App
