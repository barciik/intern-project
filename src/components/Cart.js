import React, { Component } from 'react';
import classes from './Cart.module.css';

const DUMMY_ITEMS = [
	{
		name: 'test1',
		id: 'test1',
		img: './woman-4820889_1280.jpg',
		attributes: [
			{
				id: 'size',
				name: 'size',
				items: ['XS', 'S', 'M', 'L', 'XL'],
			},
			{
				id: 'color',
				name: 'color',
				items: ['#44FF03', '#03FFF7', '#030BFF', '#000000'],
			},
		],
		size: 'L',
		availableSizes: ['XS', 'S', 'M', 'L'],
		color: 'blue',
		availableColors: ['blue', 'red', 'green'],
		price: '50$',
		itemCount: '1',
	},
	{
		name: 'test2',
		id: 'test2',
		img: './one-3054354_1280.jpg',
		attributes: [
			{
				id: 'size',
				name: 'size',
				items: ['XS', 'S', 'M', 'L'],
			},
			{
				id: 'color',
				name: 'color',
				items: ['blue', 'red', 'green'],
			},
		],
		price: '13$',
		itemCount: '2',
	},
	{
		name: 'test2',
		id: 'test2',
		img: './one-3054354_1280.jpg',
		attributes: [
			{
				id: 'size',
				name: 'size',
				items: ['XS', 'S', 'M', 'L'],
			},
			{
				id: 'color',
				name: 'color',
				items: ['blue', 'red', 'green'],
			},
		],
		price: '13$',
		itemCount: '2',
	},
	{
		name: 'test2',
		id: 'test2',
		img: './one-3054354_1280.jpg',
		attributes: [
			{
				id: 'size',
				name: 'size',
				items: ['XS', 'S', 'M', 'L'],
			},
			{
				id: 'color',
				name: 'color',
				items: ['blue', 'red', 'green'],
			},
		],
		price: '13$',
		itemCount: '2',
	},
];

export default class Cart extends Component {
	render() {
		return (
			<div className={classes.cartBody}>
				<h3>My bag, {DUMMY_ITEMS.length} items</h3>
				<div className={classes.cartItems}>
					{DUMMY_ITEMS.map((item) => {
						return (
							<div key={item.id} className={classes.cartItem}>
								<div className={classes.itemInfo}>
									<h4>{item.name}</h4>
									<p>{item.price}</p>
									{item.attributes &&
										item.attributes.map((el) => {
											if (el.id === 'size') {
												return (
													<div key={el.id} className={classes.attributes}>
														<p>Size: </p>
														<div className={classes.sizes}>
															{el.items.map((attr) => {
																return (
																	<p key={attr} className={classes.size}>
																		{attr}
																	</p>
																);
															})}
														</div>
													</div>
												);
											} else if (el.id === 'color') {
												return (
													<div key={el.id} className={classes.attributes}>
														<p>Color: </p>
														<div className={classes.colors}>
															{el.items.map((attr) => {
																return (
																	<div
																		key={attr}
																		className={classes.color}
																		style={{ backgroundColor: `${attr}` }}
																	></div>
																);
															})}
														</div>
													</div>
												);
											}
											return (
												<div key={el.id} className={classes.attributes}>
													{el.items.map((attr) => {
														return (
															<div className={classes.attribute} key={attr}>
																<p>{attr}</p>
															</div>
														);
													})}
												</div>
											);
										})}
								</div>
								<div className={classes.cartButtons}>
									<button>+</button>
									<p>{item.itemCount}</p>
									<button>-</button>
								</div>
								<img
									className={classes.itemImg}
									src={item.img}
									alt={item.name}
								></img>
							</div>
						);
					})}
				</div>
				<div className={classes.total}>
					<span>Total: </span>
					<span>200$</span>
				</div>
				<div className={classes.checkoutBtns}>
					<button className={classes.showCartBtn}>view bag</button>
					<button className={classes.checkoutBtn}>checkout</button>
				</div>
			</div>
		);
	}
}

