import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import ItemsPage from './components/ItemsPage';
import ItemPage from './components/ItemPage';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { showCart } from './store';
import Checkout from './components/Checkout';
import { graphql } from '@apollo/client/react/hoc';
import { getCategories } from './GraphQL/Queries';

export class App extends Component {
	displayItems() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			const category = data.categories;
			return (
				<Switch>
					{category.map((cat) => {
						return (
							<Route key={cat.name} path={`/${cat.name}`} exact>
								<ItemsPage category={cat.name} />
							</Route>
						);
					})}
					<Route path='/checkout' exact>
						<Checkout />
					</Route>
					<Route path='/:id'>
						<ItemPage />
					</Route>
					<Redirect from='/' to='/all'></Redirect>
				</Switch>
			);
		}
	}

	render() {
		return (
			<Fragment>
				<div className='wrapper'>
					{this.props.cartIsVisible && (
						<div
							onClick={() => {
								this.props.showCart();
							}}
							className='shadow'
						></div>
					)}
					<Navigation />
					{this.displayItems()}
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	cartIsVisible: state.cart.cartIsVisible,
});

const mapDispatchToProps = { showCart };

export default graphql(getCategories)(
	connect(mapStateToProps, mapDispatchToProps)(App)
);
