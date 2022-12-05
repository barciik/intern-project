import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import classes from './Navigation.module.css';
import { getCategories } from '../GraphQL/Queries';
import { graphql } from '@apollo/client/react/hoc';
import { changeCurrency, showDropdown, showCart } from '../store/index';
import { connect } from 'react-redux';

class Navigation extends Component {
	displayCategories() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			return data.categories.map((item) => {
				return (
					<NavLink
						className={classes.link}
						to={item.name}
						style={(isActive) => ({
							borderBottom: isActive ? '2px solid #5ECE7B' : '',
							color: isActive ? '#5ECE7B' : '',
						})}
						key={item.name}
					>
						{item.name}
					</NavLink>
				);
			});
		}
	}

	displayCurrencies() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			return data.currencies.map((item) => {
				return (
					<li
						key={item.label}
						onClick={() => {
							this.props.changeCurrency(item.symbol);
						}}
					>
						{item.symbol} {item.label}
					</li>
				);
			});
		}
	}

	render() {
		return (
			<div className={classes.body}>
				<ul className={classes.links}>
					<li className={classes.linkContainer}>{this.displayCategories()}</li>
				</ul>
				<div className={classes.logo}>
					<img src='./logo.svg' alt='logo' />
				</div>
				<div className={classes.cartArea}>
					<div
						className={classes.selectedCurrency}
						onClick={() => {
							this.props.showDropdown();
						}}
					>
						{this.props.currency}
						<img className={classes.vector} src='./Vector.svg' alt='vector' />
						{this.props.dropDownIsVisible && (
							<ul id='currency' className={classes.currencySwitcher}>
								{this.displayCurrencies()}
							</ul>
						)}
					</div>

					<button
						onClick={() => {
							this.props.showCart();
						}}
						className={classes.cart}
					>
						<img src='./cart.svg' alt='cart' />
						<div className={classes.cartCount}>{this.props.quantity}</div>
					</button>
					{this.props.cartIsVisible && <Cart />}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currency: state.cart.currency,
	cartIsVisible: state.cart.cartIsVisible,
	dropDownIsVisible: state.cart.dropDownIsVisible,
	categories: state.cart.categories,
	quantity: state.cart.totalQuantity,
});

const mapDispatchToProps = {
	changeCurrency,
	showDropdown,
	showCart,
};

export default graphql(getCategories)(
	connect(mapStateToProps, mapDispatchToProps)(Navigation)
);
