import { useState, createContext } from 'react';
import './App.css';
import '@mantine/core/styles.css';
import { 
  MantineProvider,  } from '@mantine/core';
import { useDisclosure, useColorScheme } from '@mantine/hooks';
import { GuessPage } from './views/GuessPage';


const App = () => {
  const ColorSchemeContext = createContext(null);
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState(null);

  
  return (
    <ColorSchemeContext.Provider value={{ colorScheme, onChange: setColorScheme }}>
      <MantineProvider theme={{ colorScheme }} forceColorScheme="dark">
        <GuessPage />
      </MantineProvider>
    </ColorSchemeContext.Provider>
  )
};

export default App
