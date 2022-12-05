import React, { Component } from 'react';

import { graphql } from '@apollo/client/react/hoc';
import classes from './ItemsPage.module.css';
import ItemCard from './ItemCard';
import { connect } from 'react-redux';
import { changeCurrency } from '../store';
import { getCategoryItems } from '../GraphQL/Queries';

class ItemsPage extends Component {
	displayItems() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			const category = data.category.products;
			return category.map((item) => {
				return (
					<ItemCard
						key={item.id}
						data={item}
						priceSymbol={this.props.currency}
					/>
				);
			});
		}
	}

	render() {
		return (
			<div className={classes.layout}>
				<h2 className={classes.categoryName}>{this.props.category}</h2>
				{this.props.errorMessage && <p className={classes.error}>{this.props.errorMessage}</p>}
				<div className={classes.cards}>{this.displayItems()}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currency: state.cart.currency,
	errorMessage: state.cart.errorMessage
});

const mapDispatchToProps = { changeCurrency };

export default graphql(getCategoryItems, {
	options: (ownProps) => ({
		variables: {
			input: {
				title: ownProps.category,
			},
		},
	}),
})(connect(mapStateToProps, mapDispatchToProps)(ItemsPage));
