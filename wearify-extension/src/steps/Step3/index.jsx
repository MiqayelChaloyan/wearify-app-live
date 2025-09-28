import { Container, Step3Image } from './styles';
import { step3Image as image } from '../../constants';

const Step3 = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '60vh',
            textAlign: 'center'
        }}>
            <Container>
                <h2>1 full-length pic</h2>
                <p>In order to understand your body shape <br />
                we need two full-length photos of you.</p>
            </Container>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Step3Image src={image} alt="1 full-length pic" loading="lazy"/>
            </div>
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