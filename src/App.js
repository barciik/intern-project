import { Route, Switch } from 'react-router-dom';
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
import ItemPage from './components/ItemPage';
import { Component } from 'react';

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

export class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div className='wrapper'>
					<div className='shadow'></div>
					<Navigation />
					<Switch>
						<Route path='/all' exact>
							<ItemsPage category='All' index='0' />
						</Route>
						<Route path='/tech' exact>
							<ItemsPage category='Tech' index='2' />
						</Route>

						<Route path='/clothes' exact>
							<ItemsPage category='Clothes' index='1' />
						</Route>
            <Route path="/:id" children={<ItemPage />} />
					</Switch>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
