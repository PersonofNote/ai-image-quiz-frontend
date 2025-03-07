import { useState, useEffect } from 'react'
import '../App.css'
import '@mantine/core/styles.css';
import { 
  Button, 
  Flex, 
  Space, 
  Image,
} from '@mantine/core';
import { MainLayout } from '../components/MainLayout';

export const GuessPage = () => {

  const [isAi, setIsAi] = useState<boolean | null>(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageKey, setImageKey ] = useState(null);
  const [resultText, setResultText] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const getResponse = async() => {
    // TODO env-aware url
    const response = await fetch('https://q2vbfktlbc.execute-api.us-east-1.amazonaws.com/prod/fetch-random-image');
    const data = await response.json();
    console.log(data);
    setImageKey(data.metadata.image_key);
    setImageSrc(data.image_url);
    setIsAi(data.metadata.is_ai === 'True' ? true : false);
    setLoading(false);
  };

  useEffect(() => {
    getResponse();
  },[]);

  const handleGuess = async(guess: boolean) => {
    console.log(guess, isAi)
    const message = `You guessed: ${guess ? 'AI' : 'Real'}`;
    guess === isAi ? setResultText(message + " This is CORRECT") : setResultText(message + " INCORRECT")
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ guess: isAi, image_key: imageKey, username: null, correct: guess === isAi })
    };
      const response = await fetch('https://q2vbfktlbc.execute-api.us-east-1.amazonaws.com/prod/fetch-random-image', requestOptions);
      const data = await response.json();
      console.log(data)
  };

  const handleClick = () => {
    setLoading(true);
    setResultText('');
    getResponse();
  };
  
  return (
    <MainLayout>
          <h1>Was this image AI generated?</h1>
          {loading ? (
            <Flex align="center" gap="10px" justify="center" h={400}>
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
          ) : <p>Error...</p>
          )}
          {resultText && 
            <div>{resultText}</div>
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
