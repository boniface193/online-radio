import { useRoutes } from 'react-router-dom';
import Index from './views/Index';
import RadioSearch from './views/search';
import Channels from './views/channels';
import Bookmarked from './views/bookmarked';
import CountrySearch from './views/country';


function App() {
  const elements = useRoutes([
    {
      path: '/', name: 'index', element: <Index />, children: [
        { path: 'search', name: 'search', element: <RadioSearch /> },
        { path: 'channels', name: 'channels', element: <Channels /> },
        { path: 'bookmarked', name: 'bookmerked', element: < Bookmarked /> },
        { path: 'country', name: 'country', element: <CountrySearch /> }
      ]
    }
  ]);
  return elements;
}

export default App;
