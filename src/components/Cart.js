import React, { Component } from 'react';
import cartStyles from './Cart.module.css';

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
			<div className={cartStyles.cartBody}>
				<h3>My bag, {DUMMY_ITEMS.length} items</h3>
				<div className={cartStyles.cartItems}>
					{DUMMY_ITEMS.map((item) => {
						return (
							<div key={item.id} className={cartStyles.cartItem}>
								<div className={cartStyles.itemInfo}>
									<h4>{item.name}</h4>
									<p>{item.price}</p>
									{item.attributes &&
										item.attributes.map((el) => {
											if (el.id === 'size') {
												return (
													<div key={el.id} className={cartStyles.attributes}>
														<p>Size: </p>
														<div className={cartStyles.sizes}>
															{el.items.map((attr) => {
																return (
																	<p key={attr} className={cartStyles.size}>
																		{attr}
																	</p>
																);
															})}
														</div>
													</div>
												);
											} else if (el.id === 'color') {
												return (
													<div key={el.id} className={cartStyles.attributes}>
														<p>Color: </p>
														<div className={cartStyles.colors}>
															{el.items.map((attr) => {
																return (
																	<div
																		key={attr}
																		className={cartStyles.color}
																		style={{ backgroundColor: `${attr}` }}
																	></div>
																);
															})}
														</div>
													</div>
												);
											}
											return (
												<div key={el.id} className={cartStyles.attributes}>
													{el.items.map((attr) => {
														return (
															<div className={cartStyles.attribute} key={attr}>
																<p>{attr}</p>
															</div>
														);
													})}
												</div>
											);
										})}
								</div>
								<div className={cartStyles.cartButtons}>
									<button>+</button>
									<p>{item.itemCount}</p>
									<button>-</button>
								</div>
								<img
									className={cartStyles.itemImg}
									src={item.img}
									alt={item.name}
								></img>
							</div>
						);
					})}
				</div>
				<div className={cartStyles.total}>
					<span>Total: </span>
					<span>200$</span>
				</div>
				<div className={cartStyles.checkoutBtns}>
					<button className={cartStyles.showCartBtn}>view bag</button>
					<button className={cartStyles.checkoutBtn}>checkout</button>
				</div>
			</div>
		);
	}
}

