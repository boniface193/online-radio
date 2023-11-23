import {useRoutes} from 'react-router-dom';
import Index from './views/Index';


function App() {
  const elements = useRoutes([
    {path: '/', name: 'index', element: <Index />}
  ])
  return elements;
}

export default App;
