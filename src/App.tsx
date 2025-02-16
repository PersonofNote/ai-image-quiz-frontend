import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { GuessPage } from './views/GuessPage';


const App = () => {
  
  return (
      <MantineProvider forceColorScheme="dark">
        <GuessPage />
      </MantineProvider>
  )
};

export default App
