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
            <Step1Image src={step1Image} alt="Create your likeness" loading="lazy" />
        </div>
    )
}

export default Step1;