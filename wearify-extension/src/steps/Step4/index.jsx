import { useEffect, useState } from "react";
import { Container, ImageComparisonContainer, ImageWrapper, ButtonRetry } from './styles';
import { useDispatch, useSelector } from "react-redux";

import { ref, set } from 'firebase/database';
import { database, storage } from '../../../firebaseDatabase';
import { uploadBytes, ref as sRef } from 'firebase/storage';

import { getGenaiData } from "../../api";
import { setIsLoading, setResultPath, showToaster } from "../../store/slices/imageUploadSlice";

const FALLBACK_PRODUCT_IMAGE = "https://cdn.jsdelivr.net/gh/MiqayelChaloyan/wearify-app-live/assets/images/product_image.png";



// styles migrated to styled-components below
import RotatingText from "../../components/rotatingText";



const clothIds = [
    {
        id: 'black_jacket',
        name: 'Black Jacket'
    },
    {
        id: 'brown_jacket',
        name: 'Brown Jacket'
    },
    {
        id: 'white_jacket',
        name: 'White Jacket'
    },
    {
        id: 'dior',
        name: 'Dior'
    },
]


const Step4 = ({ handleNext, productImageUrl, productName }) => {
    const { uploadedImage, userId, isLoading } = useSelector((state) => state.imageUpload);
    const dispatch = useDispatch();
    const [processingStatus, setProcessingStatus] = useState('uploading');

    // Find the matching clothId based on productName
    const findClothId = (productName) => {
        const matchedCloth = clothIds.find(cloth => 
            cloth.name.toLowerCase() === productName.toLowerCase()
        );
        return matchedCloth ? matchedCloth.id : 'brown_jacket'; // fallback to default
    };

    const clothId = findClothId(productName);

    const _handleSet = async () => {
        try {
            setProcessingStatus('uploading');

            // 1. Fetch the image and convert to blob
            const response = await fetch(uploadedImage);
            const blob = await response.blob();
            const newFile = new File([blob], 'example.png', { type: blob.type });

            // 2. Upload to Firebase Storage
            const storageRef = sRef(storage, `WEB/${userId}/fit_${userId}.png`);
            await uploadBytes(storageRef, newFile);

            // 3. Update database after successful upload
            await set(ref(database, 'avatars/' + userId), {
                isLoading: true,
                isAvatarError: false,
            });

            await set(ref(database, 'new/' + userId), {
                status: 'new',
            });

            setProcessingStatus('processing');

            // 4. Call getGenaiData with longer timeout for AI processing
            const res = await getGenaiData(userId, clothId);

            if (!res) {
                throw new Error('Failed to get AI processing data. Please try again.');
            }

            const { status, code, data } = res || {};

            if (status === 'done') {
                // Store the result path for Step5
                // dispatch(setResultPath(data.presetModel));
                setProcessingStatus('completed');

                // Automatically navigate to Step5 after a short delay
                setTimeout(() => {
                    if (handleNext) {
                        handleNext();
                    }
                }, 2000); // 2 second delay to show success message
            }
        } catch (error) {
            setProcessingStatus('error');

            // Show error toaster
            let errorMessage = 'An error occurred during the process.';

            if (error.message === 'Request timeout: The operation took too long to complete') {
                errorMessage = 'AI processing is taking longer than expected. Please wait or try again.';
            } else if (error.code === 'storage/unauthorized') {
                errorMessage = 'Upload failed: Unauthorized access.';
            } else if (error.code === 'storage/quota-exceeded') {
                errorMessage = 'Upload failed: Storage quota exceeded.';
            } else if (error.code === 'storage/network-request-failed') {
                errorMessage = 'Upload failed: Network error. Please check your connection.';
            } else if (error.message) {
                errorMessage = error.message;
            }

            dispatch(showToaster({
                message: errorMessage,
                type: 'error'
            }));
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    useEffect(() => {
        dispatch(setIsLoading(true));

        const fetchData = async () => {
            await _handleSet();
        };

        fetchData();
    }, []);


    return (
        <div>
            <Container>
                <RotatingText
                    messages={[
                        "Creating the look...",
                        "Uploading your image...",
                        "Rendering your customized look.",
                    ]}
                    speed={2500}
                />
            </Container>
            {uploadedImage ? (
                <ImageComparisonContainer>
                    <ImageWrapper>
                        <img
                            src={uploadedImage}
                            alt="Uploaded image"
                            className="comparison-image uploaded-image"
                            loading="lazy"
                        />
                        <img
                            src={productImageUrl || FALLBACK_PRODUCT_IMAGE}
                            alt="Product image"
                            className="comparison-image product-image"
                            loading="lazy"
                        />
                    </ImageWrapper>
                </ImageComparisonContainer>
            ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <p style={{ color: '#666', fontSize: '16px' }}>No images uploaded yet.</p>
                </div>
            )}
            <Container>
                <p>
                    AI images may include mistakes. <br />
                    Fit and appearance won't be exact.
                </p>

                {/* Show retry button if there's an error */}
                {processingStatus === 'error' && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <ButtonRetry
                            onClick={() => {
                                setProcessingStatus('uploading');
                                _handleSet();
                            }}
                        >
                            Try Again
                        </ButtonRetry>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Step4;