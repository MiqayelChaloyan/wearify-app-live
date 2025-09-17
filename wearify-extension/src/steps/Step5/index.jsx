import { useEffect, useState } from "react";
import { ClientImageContainer, LoadingContainer, LoadingSpinner, ClientImage, ErrorContainer, ProductImageContainer } from './styles';
import { useSelector } from "react-redux";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

// styles migrated to styled-components below
// const FALLBACK_PRODUCT_IMAGE = "https://cdn.jsdelivr.net/gh/MiqayelChaloyan/wearify-app-live/assets/images/product_image.png";



const Step5 = ({ productImageUrl, productName, productPrice }) => {
    console.log(productName, 'productName ___________');
    const { userId, resultPath } = useSelector((state) => state.imageUpload);
    
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const storage = getStorage();

    useEffect(() => {
        const fetchResultImage = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // First try to use the resultPath from Redux store (if available)
                if (resultPath) {
                    setUrl(resultPath);
                    setIsLoading(false);
                    return;
                }

                // Fallback: try to fetch from Firebase Storage
                const starsRef = ref(storage, `WEB/${userId}/fitres_${userId}.png`);
                
                const downloadURL = await getDownloadURL(starsRef);
                setUrl(downloadURL);
                setError(null);
            } catch (err) {
                console.error('Error fetching result image:', err);
                setError('Failed to load the result image. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchResultImage();
        }
    }, [userId, resultPath, storage]);

    if (isLoading) {
        return (
            <ClientImageContainer>
                <LoadingContainer>
                    <LoadingSpinner />
                    <p>Loading your AI-generated look...</p>
                </LoadingContainer>
            </ClientImageContainer>
        );
    }

    if (error) {
        return (
            <ClientImageContainer>
                <ErrorContainer>
                    <p style={{ color: '#d73a49' }}>{error}</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        The AI processing may still be in progress. Please wait a moment and refresh.
                    </p>
                </ErrorContainer>
            </ClientImageContainer>
        );
    }

    return (
        <ClientImageContainer>
            {url ? (
                <ClientImage
                    src={url}
                    alt="AI-generated look result"
                    loading="lazy"
                />
            ) : (
                <ErrorContainer>
                    <p style={{ color: '#666' }}>No result image available yet.</p>
                    <p style={{ fontSize: '14px', color: '#999' }}>
                        Please wait for the AI processing to complete.
                    </p>
                </ErrorContainer>
            )}

            <ProductImageContainer>
                <img 
                    src={productImageUrl} 
                    alt="product" 
                    loading="lazy"
                />
                <p>{productName} {productPrice}</p>
            </ProductImageContainer>
        </ClientImageContainer>
    )
}

export default Step5;