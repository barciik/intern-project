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
		}
	}

	showCart() {
		this.setState(() => {
			return {
				showCart: !this.state.showCart
			}
		})
	}

	displayCategories() {
		const data = this.props.data
		if(data.loading) {
			return <p>Loading...</p>
		} else if(!data.loading) {
			return (
				data.categories.map(item => {
					return (
						<NavLink className={classes.link} to={item.name}style={({ isActive }) => (isActive ? activeStyle : undefined)} key={item.name}>{item.name}</NavLink>
					)
				})
			)
		}
	}
	
	render() {
		return (
			<div className={classes.body}>
				<ul className={classes.links}>
					<li className={classes.linkContainer}>
						{this.displayCategories()}
					</li>
				</ul>
				<div className={classes.logo}>
					<img src='./logo.svg' alt='logo' />
				</div>
				<div className={classes.cartArea}>
					<select id='currency' className={classes.currencySwitcher}>
						<option defaultValue={'$'} value={'USD'}>
							$ USD
						</option>
						<option value={'EUR'}>€ EUR</option>
						<option value={'JPY'}>¥ JPY</option>
					</select>

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
