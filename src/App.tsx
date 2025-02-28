import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ViewTabs } from './components/ViewTabs';


const App = () => {
  
  return (
      <MantineProvider forceColorScheme="dark">
        <ViewTabs/>
      </MantineProvider>
  )
};

export default App
