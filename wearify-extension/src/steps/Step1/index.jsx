import { Container, Step1Image } from './styles';
import { step1Image as image } from '../../constants';

const Step1 = () => {
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
                <h2>Create your likeness</h2>
                <p>
                    Your personalized likeness makes it easy to <br />
                    explore new looks and find clothes you'll love.
                </p>
            </Container>
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <Step1Image src={image} alt="Create your likeness" loading="lazy" />
           </div>
        </div>
    )
}

export default Step1;