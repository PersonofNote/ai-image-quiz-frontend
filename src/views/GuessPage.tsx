import { useState, useEffect, createContext } from 'react'
import '../App.css'
import '@mantine/core/styles.css';
import { 
  AppShell, 
  Button, 
  MantineProvider, 
  Burger, 
  Group, 
  Skeleton, 
  Flex, 
  Space, 
  Image,
  Drawer } from '@mantine/core';
import { useDisclosure, useColorScheme } from '@mantine/hooks';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';


export const GuessPage = () => {

  const [isAi, setIsAi] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [resultText, setResultText] = useState(null);
  const [loading, setLoading] = useState(true);

  const getResponse = async() => {
    const response = await fetch('http://localhost:3000/local-image');
    const data = await response.json();
    console.log(data);
    setImageSrc(data.imageUrl);
    setIsAi(data.isAI);
    setLoading(false);
  };

  useEffect(() => {
    getResponse();
  },[]);

  const handleGuess = (guess: boolean) => {
    const message = `You guessed: ${guess ? 'AI' : 'Not AI'}`;
    guess === isAi ? setResultText(message + " This is CORRECT") : setResultText(message + " INCORRECT")
  };

  const handleClick = () => {
    setLoading(true);
    setResultText(null);
    getResponse();
  }

  
  return (
    <Flex w={"100%"} direction="column" style={{ minHeight: '100vh' }}>
      {/* <Header /> Not needed yet */}
        <main>
        <div>
          <h1>Was this image AI generated?</h1>
        </div>
          {loading ? (
            <Flex align="center" gap="10px" justify="center" h={400}>
              <div>Loading...</div>
            </Flex>
          ) : (
            imageSrc ? (
            <Flex align="center" justify="center">
              <Image
            radius="md"
            h={400}
            w={400}
            src={imageSrc}
          /> 
          </Flex>
          ) : <p>Error...</p>
          )}
          {resultText && 
            <div>{resultText}</div>
          }
          <Space h="md" />
          <Flex align="center" gap="10px" justify="center">
            <Button size="lg" disabled={loading || !!resultText} onClick={() => handleGuess(true)}>AI</Button> 
            <Button size="lg"disabled={loading || !!resultText} onClick={() => handleGuess(false)}>Not AI</Button></Flex>
          <Space h="md" />
          <Button disabled={loading} onClick={handleClick}>Show another</Button>
        </main>
        <Footer />
      </Flex>
  )
};
