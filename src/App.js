import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
	from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import ItemsPage from './components/ItemsPage';


const errorLink = onError(({ graphqlErrors, networkError }) => {
	if (graphqlErrors) {
		graphqlErrors.map(({ message, location, path }) => {
			return alert(`Graphql error ${message}`);
		});
	}
});

const link = from([errorLink, new HttpLink({ uri: 'http://localhost:4000/' })]);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: link,
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='wrapper'>
      <div className='shadow'></div>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='/1' element={<ItemsPage />} />
            <Route path='/2' element={<h1>skrrt</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}


export default App;
