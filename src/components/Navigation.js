import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

let activeStyle = {
	borderBottom: '2px solid #5ECE7B',
	color: '#5ECE7B',
};

class Navigation extends Component {
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
							women
						</NavLink>
					</li>
					<li className={classes.linkContainer}>
						<NavLink
							className={classes.link}
							to='/3'
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							men
						</NavLink>
					</li>
					<li className={classes.linkContainer}>
						<NavLink
							className={classes.link}
							to='/2'
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							kids
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

					<div className={classes.cart}>
						<img src='./cart.svg' alt='cart' />
					</div>
				</div>
			</div>
		);
	}
}

export default Navigation;
