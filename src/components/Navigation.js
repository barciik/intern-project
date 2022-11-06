import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import classes from './Navigation.module.css';
import { getCategories } from '../GraphQL/Queries';
import { graphql } from '@apollo/client/react/hoc';

let activeStyle = {
	borderBottom: '2px solid #5ECE7B',
	color: '#5ECE7B',
};

class Navigation extends Component {
	constructor() {
		super();
		this.state = {
			showCart: false,
			selectedCurrency: '$',
			dropdownVisible: false,
		};
	}

	showCart() {
		this.setState(() => {
			return {
				showCart: !this.state.showCart,
				dropdownVisible: false
			};
		});
	}

	showDropdown() {
		this.setState(() => {
			return {
				dropdownVisible: !this.state.dropdownVisible,
				showCart: false
			};
		});
	}

	selectCurrency(el) {
		this.setState({
			selectedCurrency: el
		});
	}

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
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
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
					<li key={item.label} onClick={() => {
						this.selectCurrency(item.symbol)
					}}>
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
						onClick={this.showDropdown.bind(this)}
					>
						{this.state.selectedCurrency}
						<img className={classes.vector} src='./Vector.svg' alt='vector' />
						{this.state.dropdownVisible && (
							<ul id='currency' className={classes.currencySwitcher}>
								{this.displayCurrencies()}
							</ul>
						)}
					</div>

					<button onClick={this.showCart.bind(this)} className={classes.cart}>
						<img src='./cart.svg' alt='cart' />
					</button>
					{this.state.showCart && <Cart />}
				</div>
			</div>
		);
	}
}

export default graphql(getCategories)(Navigation);
