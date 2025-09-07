import image from "../../assets/images/step1.png";
import { Container, Step1Image } from './styles';


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
            <Step1Image style={{ backgroundImage: `url(${image})` }} />
        </div>
    )
}

export default Step1;