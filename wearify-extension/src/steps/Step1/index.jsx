import { Container, Step1Image } from './styles';
const image = "https://cdn.jsdelivr.net/gh/MiqayelChaloyan/wearify-app-live/assets/images/step1.png";


const Step1 = () => {
    return (
        <div>
            <Container>
                <h2>Create your likeness</h2>
                <p>
                    Your personalized likeness makes it easy to <br />
                    explore new looks and find clothes you'll love.
                </p>
            </Container>
            <Step1Image src={image} alt="Create your likeness" loading="lazy" />
        </div>
    )
}

export default Step1;