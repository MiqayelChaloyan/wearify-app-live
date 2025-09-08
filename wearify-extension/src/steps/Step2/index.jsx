// import image from "../../assets/images/step2.png";
import { Container, Step2Image } from './styles';
const image = "https://cdn.jsdelivr.net/gh/MiqayelChaloyan/wearify-app-live/assets/images/step2.png";


const Step2 = () => {
    return (
        <div>
            <Step2Image src={image} alt="We care about privacy" loading="lazy"/>
            <Container>
                <h2>We care about privacy</h2>
                <p>
                    Your images are only used to create your <br />
                    likeness, never sold, shared, or used otherwise.
                </p>
            </Container>
        </div>
    )
}

export default Step2;