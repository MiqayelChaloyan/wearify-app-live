import React, { useEffect, useRef } from 'react';
import { 
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalDivider,
  ModalTitle,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalNext,
  ConfirmOverlay,
  ConfirmContainer,
  ConfirmTitle,
  ConfirmText,
  ConfirmActions,
  ConfirmCancel,
  ConfirmDelete,
} from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, hideToaster, showToaster, resetState, clearUploadedImage, clearSelectedFiles } from '../../store/slices/imageUploadSlice';
import Toaster from '../toaster/Toaster';

import { v4 as uuidv4 } from 'uuid';

// styles migrated to styled-components below


const Modal = ({ isOpen, onClose, children, title, currentStepIndex, _handleBack, _handleNext, _handleGoTo, productImageUrl }) => {
  const { uploadedImage, userId, toaster } = useSelector((state) => state.imageUpload);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);


  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // if (e.target === e.currentTarget) {
    //   onClose();
    // }
  };

  const _handleUpload = () => {
    fileInputRef.current?.click();
  };

  const _onFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      try {
        const filesArray = Array.from(files);
        
        // Validate file type
        const file = filesArray[0];
        if (!file.type.startsWith('image/')) {
          dispatch(showToaster({
            message: 'Please select a valid image file.',
            type: 'error'
          }));
          return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          dispatch(showToaster({
            message: 'File size must be less than 5MB.',
            type: 'error'
          }));
          return;
        }
        
        const newImageURL = {
          id: uuidv4(),
          source: URL.createObjectURL(file),
        };

        dispatch(uploadImage(newImageURL));
      } catch (error) {
        dispatch(showToaster({
          message: 'Error processing the selected file. Please try again.',
          type: 'error'
        }));
      }
    }
  };



  const handleNext = () => {
    // if (currentStepIndex === 2) {
    //   // _handleNext();
    //   return
    // }

    _handleNext();
  }

  const handleRemove = () => {
    setConfirmOpen(true);
  };

  const handleConfirmCancel = () => setConfirmOpen(false);
  const handleConfirmDelete = () => {
    try {
      if (uploadedImage && uploadedImage.startsWith('blob:')) {
        URL.revokeObjectURL(uploadedImage);
      }
      dispatch(clearUploadedImage());
      dispatch(clearSelectedFiles());
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setConfirmOpen(false);
    }
  };

  const _handleTryAgain = () => {
    _handleGoTo(0);
    dispatch(resetState());
  }
  


  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContainer>
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          <ModalClose onClick={onClose}>×</ModalClose>
        </ModalHeader>
        <ModalDivider />
        <ModalContent>
          {React.cloneElement(children, { 
            currentStepIndex, 
            handleBack: _handleBack, 
            handleNext: _handleNext, 
            handleGoTo: _handleGoTo,
            productImageUrl,
            ...(currentStepIndex === 3 ? { handleNext: _handleNext } : {}),
            ...(currentStepIndex === 4 ? { handleGoTo: _handleGoTo } : {})
          })}
        </ModalContent>
        <ModalFooter>
          {currentStepIndex === 0 || currentStepIndex === 1 ? (
            <ModalNext onClick={_handleNext}>
              {currentStepIndex === 0 ? 'Continue' : 'Sounds Good'}
            </ModalNext>
          ) : currentStepIndex === 4 ? (
            <ModalNext onClick={_handleTryAgain}>
              Try again
            </ModalNext>
          ) : currentStepIndex === 2 ? (
            <>
             {uploadedImage && userId ? (
              <>
                <ModalNext onClick={handleRemove}>
                  Remove
                </ModalNext>
                <ModalNext onClick={handleNext}>
                  Next
                </ModalNext>
              </>
             ) : (
             <>
              <ModalNext onClick={_handleUpload}>
                Upload Images
              </ModalNext>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={_onFileChange}
              />
             </>
             )}
            </>
          ) : null}
        </ModalFooter>
      </ModalContainer>

      <Toaster
        message={toaster.message}
        type={toaster.type}
        isVisible={toaster.isVisible}
        onClose={() => dispatch(hideToaster())}
      />

      {confirmOpen && (
        <ConfirmOverlay>
          <ConfirmContainer>
            <ConfirmTitle>Remove uploaded image?</ConfirmTitle>
            <ConfirmText>
              This will clear the selected image so you can upload a new one.
            </ConfirmText>
            <ConfirmActions>
              <ConfirmCancel onClick={handleConfirmCancel}>Cancel</ConfirmCancel>
              <ConfirmDelete onClick={handleConfirmDelete}>Delete</ConfirmDelete>
            </ConfirmActions>
          </ConfirmContainer>
        </ConfirmOverlay>
      )}
    </ModalOverlay>
  );
};

export default Modal;

