import React, { Component } from 'react';

import { graphql } from '@apollo/client/react/hoc';
import classes from './ItemsPage.module.css';
import { getProduct } from '../GraphQL/Queries';
import ItemCard from './ItemCard';
import { connect } from 'react-redux';
import { changeCurrency } from '../store';

class ItemsPage extends Component {
	displayItems() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			return data.categories
				.find((cat) => cat.name === this.props.category.toLowerCase())
				.products.map((data) => {
					return <ItemCard key={data.id} data={data} priceSymbol={this.props.currency}/>;
				});
		}
	}

	render() {
		return (
			<div className={classes.layout}>
				<h2 className={classes.categoryName}>{this.props.category}</h2>
				<div className={classes.cards}>{this.displayItems()}</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	currency: state.cart.currency
});

const mapDispatchToProps = {changeCurrency}

export default graphql(getProduct)(connect(mapStateToProps, mapDispatchToProps)(ItemsPage));
