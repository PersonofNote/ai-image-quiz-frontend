import { useState, useEffect } from 'react'
import '../App.css'
import '@mantine/core/styles.css';
import { 
  Button, 
  Box,
  Flex, 
  Space, 
  Image,
  Alert,
  Text
} from '@mantine/core';
import { MainLayout } from '../components/MainLayout';

const AnimatedText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <Box
    style={{
      opacity: 0,
      animation: `fadeIn 0.5s ease-in-out ${delay}ms forwards`
    }}
  >
    {children}
  </Box>
);

const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Add keyframes to document
const style = document.createElement('style');
style.innerHTML = fadeInKeyframes;
document.head.appendChild(style);

export const GuessPage = () => {

  const [isAi, setIsAi] = useState<boolean | null>(null);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageKey, setImageKey ] = useState(null);
  const [resultText, setResultText] = useState<{header: string, text: string, flavorText: string} | null>(null);
  const [loading, setLoading] = useState(true);

  const getResponse = async() => {
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://spot-the-synth-api-production.apersonofnote.workers.dev' 
      : 'http://127.0.0.1:8787';
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.metadata || !data.metadata.image_key) {
        throw new Error('Invalid response structure from API');
      }
      
      setImageKey(data.metadata.image_key);
      setImageSrc(data.image_url);
      setIsAi(data.metadata.is_ai === 'True' ? true : false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching image:', error);
      setLoading(false);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    getResponse();
  },[]);

  const handleGuess = async(guess: boolean) => {
    setUserGuess(guess);
    const message = `You guessed: ${guess ? 'AI' : 'Real'}`;
    guess === isAi ? setResultText({header: "Correct!", text: message, flavorText: "You got it!"}) : setResultText({header: "Incorrect", text: message, flavorText: "Not this time"})
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://spot-the-synth-api.apersonofnote.workers.dev' 
      : 'http://127.0.0.1:8787';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ guess: isAi, image_key: imageKey, username: null, correct: guess === isAi })
    };
      const response = await fetch(apiUrl, requestOptions);
      void await response.json();
  };

  const handleClick = () => {
    setLoading(true);
    setResultText(null);
    getResponse();
  };
  
  return (
    <MainLayout>
          <h1>Was this image AI generated?</h1>
          {loading ? (
            <Flex align="center" gap="10px" justify="center" h={300}>
              <div>Loading...</div>
            </Flex>
          ) : (
            imageSrc ? (
            <Flex align="center" justify="center">
              <Image
                radius="md"
                h={600}
                w={600}
                src={imageSrc}
              /> 
          </Flex>
          ) : (<Flex align="center" gap="10px" justify="center" h={300}>
            <p>Error...</p>
          </Flex>)
          )}
          {resultText && 
            <Alert
              w={300}
              m="auto"
              variant="light"
              color={userGuess === isAi ? "green" : "red"}
              radius="md"
              title={resultText.header}
              mt="md"
            >
              <AnimatedText delay={0}>
                <Text component="div">
                  <strong>{resultText.text}</strong>
                </Text>
              </AnimatedText>
              <AnimatedText delay={500}>
                <Text>
                  {resultText.flavorText}
                </Text>
              </AnimatedText>
            </Alert>
          }
          <Space h="md" />
          <Flex align="center" gap="10px" justify="center">
            <Button size="lg" disabled={loading || !!resultText} onClick={() => handleGuess(true)}>AI</Button> 
            <Button size="lg"disabled={loading || !!resultText} onClick={() => handleGuess(false)}>Real</Button></Flex>
          <Space h="md" />
          <Button disabled={loading} onClick={handleClick}>Show another</Button>
    </MainLayout>
  )
};
