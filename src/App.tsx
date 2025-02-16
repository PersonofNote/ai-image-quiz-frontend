import { useState, useEffect, createContext } from 'react';
import './App.css';
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
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';

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
