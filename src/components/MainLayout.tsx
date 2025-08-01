
import '../App.css'
import '@mantine/core/styles.css';
import {
    Container,
    Flex
} from '@mantine/core';
// import { Footer } from '../components/Footer';



import { ReactNode } from 'react';

export const MainLayout = ({ children }: { children: ReactNode[] | ReactNode }) => {
  
  return (
    <Flex w={"100%"} direction="column">
      {/* <Header /> Not needed yet */}
        <main>
            <Container size={768} py="1rem" >
                {children}
            </Container>
        </main>
      </Flex>
  )
};
