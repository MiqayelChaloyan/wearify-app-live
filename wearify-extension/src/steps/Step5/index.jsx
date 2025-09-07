import { useEffect, useState } from "react";
import { ClientImageContainer, LoadingContainer, LoadingSpinner, ClientImage, ErrorContainer, ProductImageContainer } from './styles';
import { useSelector } from "react-redux";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

// styles migrated to styled-components below

import product_image from "../../assets/images/product_image.png";

const Step5 = () => {
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
                    src={'https://static.vecteezy.com/system/resources/thumbnails/047/249/331/small_2x/sweater-shirt-hoodie-isolated-png.png'} 
                    alt="product" 
                    loading="lazy"
                />
                <p>Xenia Magera Jersey Set $452</p>
            </ProductImageContainer>
        </ClientImageContainer>
    )
}

export default Step5;