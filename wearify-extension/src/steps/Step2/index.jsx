// import image from "../../assets/images/step2.png";
import { Container, Step2Image } from './styles';
import { step2Image as image } from '../../constants';

const Step2 = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '60vh',
            textAlign: 'center'
        }}>
          
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Step2Image src={image} alt="We care about privacy" loading="lazy"/>
            </div>
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