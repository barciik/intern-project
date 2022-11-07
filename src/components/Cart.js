import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../store';
import cartStyles from './Cart.module.css';
import { Link } from 'react-router-dom';

const DUMMY_ITEMS = [
	{
		name: 'test1',
		id: 'test1',
		gallery: ['./woman-4820889_1280.jpg'],
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
		quantity: '1',
	},
	{
		name: 'test2',
		id: 'test2',
		gallery: ['./one-3054354_1280.jpg'],
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
		prices: [{ amount: '13', currencies: { symbol: '$' } }],
		quantity: '2',
	},
];



class Cart extends Component {
	render() {
		return (
			<div className={cartStyles.cartBody}>
				<h3>My bag, {DUMMY_ITEMS.length} items</h3>
				<div className={cartStyles.cartItems}>
                    {console.log(this.props.cart)}
					{this.props.cart.map((item) => {
						return (
							<div key={item.id} className={cartStyles.cartItem}>
								<div className={cartStyles.itemInfo}>
									<h4>{item.name}</h4>
                                    {console.log(item, this.props.currency)}
									<p>{this.props.currency}{item.prices.find(el => el.currency.symbol === this.props.currency).amount * item.quantity}</p>
                                    <div className={cartStyles.attrBox}>

									{item.attributes &&
										item.attributes.map((el) => {
											if (el.id.toLowerCase() === 'color') {
												return (
													<div key={el.id} className={cartStyles.attributes}>
														<p>Color: </p>
														<div className={cartStyles.colors}>
															{el.items.map((attr) => {
																return (
																	<div
																		key={attr.value}
																		className={cartStyles.color}
																		style={{ backgroundColor: `${attr.value}` }}
																	></div>
																);
															})}
														</div>
													</div>
												);
											} else {
												return (
													<div key={el.id} className={cartStyles.attributes}>
														<p>{el.id}: </p>
														<div className={cartStyles.sizes}>
															{el.items.map((attr) => {
																return (
																	<p key={attr.value} className={cartStyles.size}>
																		{attr.value}
																	</p>
																);
															})}
														</div>
													</div>
												);
											} 
											
										})}
                                    </div>
								</div>
								<div className={cartStyles.cartButtons}>
									<button onClick={() => {
                                        this.props.addToCart(item)
                                    }}>+</button>
									<p>{item.quantity}</p>
									<button>-</button>
								</div>
								<img
									className={cartStyles.itemImg}
									src={item.gallery[0]}
									alt={item.name}
								></img>
							</div>
						);
					})}
				</div>
				<div className={cartStyles.total}>
					<span>Total: </span>
					<span>{this.props.cart.forEach(el => el.prices.find(el => el.currency.symbol === this.props.currency).amount)}{this.props.currency}</span>
				</div>
				<div className={cartStyles.checkoutBtns}>
					<Link><button className={cartStyles.showCartBtn}>view bag</button></Link>
					<button className={cartStyles.checkoutBtn}>checkout</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
    cart: state.cart.cart,
    currency: state.cart.currency,
})

const mapDispatchToProps = {addToCart}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)