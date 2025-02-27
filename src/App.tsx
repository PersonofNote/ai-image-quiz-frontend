import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ViewTabs } from './components/ViewTabs';
import { GuessPage } from './views/GuessPage';


const App = () => {
  
  return (
      <MantineProvider forceColorScheme="dark">
        <ViewTabs/>
      </MantineProvider>
  )
};

export default App
