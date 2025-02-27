import '../App.css'
import '@mantine/core/styles.css';
import {
    Container,
    Flex
} from '@mantine/core';
import { Footer } from '../components/Footer';



export const MainLayout = ({children}) => {
  
  return (
    <Flex w={"100%"} direction="column" style={{ minHeight: '100vh' }}>
      {/* <Header /> Not needed yet */}
        <main>
            <Container size={768} py="1rem" >
                {children}
            </Container>
        </main>
        <Footer />
      </Flex>
  )
};
