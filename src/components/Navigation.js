import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import classes from './Navigation.module.css';

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
	
	render() {
		return (
			<div className={classes.body}>
				<ul className={classes.links}>
					<li className={classes.linkContainer}>
						<NavLink
							className={classes.link}
							to='/1'
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							all
						</NavLink>
					</li>
					<li className={classes.linkContainer}>
						<NavLink
							className={classes.link}
							to='/3'
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							tech
						</NavLink>
					</li>
					<li className={classes.linkContainer}>
						<NavLink
							className={classes.link}
							to='/2'
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							clothes
						</NavLink>
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

export default Navigation;
