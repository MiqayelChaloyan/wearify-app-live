import image from "../../assets/images/step3.png";
import { Container, Step3Image } from './styles';


const Step3 = () => {
    return (
        <div>
             <Container>
                <h2>1 full-length pic</h2>
                <p>In order to understand your body shape <br />
                we need two full-length photos of you.</p>
            </Container>
            <Step3Image style={{ backgroundImage: `url(${image})` }}/>
            <Container>
                <h4>For Best Results</h4>
                <p>
                    Just you, no friends <br />
                    Full-length, but close-up <br />
                    No bags, pets or phones <br />
                    No glasses, hats, or airpods
                </p>
            </Container>
        </div>
    )
}

export default Step3;