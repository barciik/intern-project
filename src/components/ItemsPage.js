import React, { Component } from 'react';

import { graphql } from '@apollo/client/react/hoc';
import classes from './ItemsPage.module.css';
import { Link } from 'react-router-dom';
import { getItemsQuery } from '../GraphQL/Queries';

class Test extends Component {
	testMethod(e) {
		console.log('object');
	}
	displayItems() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			return data.categories[this.props.index].products.map((data) => {
				// console.log(data);
				if (!data.inStock) {
					return (
						<div className={classes.cardInactive} key={data.id}>
							<div className={classes.cardShadow}></div>
							<span className={classes.outOfStock}>out of stock</span>
							<img src={data.gallery[0]} alt={data.name} />
							<h3 className={classes.title}>{data.name}</h3>
							<p className={classes.price}>
								{data.prices[0].amount}
								{data.prices[0].currency.symbol}
							</p>
							<button
								onClick={this.testMethod.bind(this)}
								className={classes.addToCart}
							>
								<img src='./add-to-cart.svg' alt='add to cart button' />
							</button>
						</div>
					);
				}
				return (
					<div className={classes.card} key={data.id}>
						<Link className={classes.link} to={data.id} >
							<img src={data.gallery[0]} alt={data.name} />
							<h3 className={classes.title}>{data.name}</h3>
							<p className={classes.price}>
								{data.prices[0].amount}
								{data.prices[0].currency.symbol}
							</p>
						</Link>
						<button
							onClick={this.testMethod.bind(this)}
							className={classes.addToCart}
						>
							<img src='./add-to-cart.svg' alt='add to cart button' />
						</button>
					</div>
				);
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

export default graphql(getItemsQuery)(Test);
