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
import { connect } from 'react-redux';
import { showCart } from './store';
import Checkout from './components/Checkout';

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
					{this.props.cartIsVisible && <div onClick={() => {this.props.showCart()}} className='shadow'></div>}
					<Navigation />
					<Switch>
						{/* add dynamic routing*/}
						<Route path='/all' exact>
							<ItemsPage category='All' />
						</Route>
						<Route path='/tech' exact>
							<ItemsPage category='Tech' />
						</Route>
						<Route path='/clothes' exact>
							<ItemsPage category='Clothes' />
						</Route>
						<Route path='/:id'>
              <ItemPage />
            </Route>
            <Route path='/checkout'>
              <Checkout />
            </Route>
					</Switch>
				</div>
			</ApolloProvider>
		);
	}
}

const mapStateToProps = (state) => ({
	cartIsVisible: state.cart.cartIsVisible,
});

const mapDispatchToProps = {showCart}

export default connect(mapStateToProps, mapDispatchToProps)(App);
