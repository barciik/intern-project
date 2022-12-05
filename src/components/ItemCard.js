import React, { Component, Fragment } from 'react';
import classes from './ItemCard.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeCurrency, addToCart } from '../store';

class ItemCard extends Component {
	displayCards() {
		const data = this.props.data;
		const price = data.prices.find(
			(price) => price.currency.symbol === this.props.currency
		);
		if (!data.inStock) {
			return (
				<div className={classes.cardInactive} key={data.id}>
					<Link className={classes.link} to={data.id}>
						<span className={classes.outOfStock}>out of stock</span>
						<img src={data.gallery[0]} alt={data.name} />
						<h3 className={classes.title}>{data.name}</h3>
						<p className={classes.price}>
							{price.currency.symbol}
							{price.amount}
						</p>
					</Link>

					<button className={classes.addToCart}>
						<img src='./add-to-cart.svg' alt='add to cart button' />
					</button>
				</div>
			);
		}
		return (
			<div className={classes.card} key={data.id}>
				<Link className={classes.link} to={data.id}>
					<img src={data.gallery[0]} alt={data.name} />
					<h3 className={classes.title}>{data.name}</h3>
					<p className={classes.price}>
						{price.currency.symbol}
						{price.amount}
					</p>
				</Link>
				<button
					onClick={() => {
						const product = { ...data, selectedAttributes: [] };
						this.props.addToCart(product);
					}}
					className={classes.addToCart}
				>
					<img src='./add-to-cart.svg' alt='add to cart button' />
				</button>
			</div>
		);
	}

	render() {
		return <Fragment>{this.displayCards()}</Fragment>;
	}
}

const mapStateToProps = (state) => ({
	currency: state.cart.currency,
});

const mapDispatchToProps = { changeCurrency, addToCart };

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
