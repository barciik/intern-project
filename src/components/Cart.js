import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, showCart } from '../store';
import cartStyles from './Cart.module.css';
import { Link } from 'react-router-dom';

class Cart extends Component {
	render() {
		return (
			<div className={cartStyles.cartBody}>
				<h3>My bag, {this.props.cart.length} items</h3>
				<div className={cartStyles.cartItems}>
					{this.props.cart.map((item) => {
						return (
							<div key={item.id} className={cartStyles.cartItem}>
								<div className={cartStyles.itemInfo}>
									<h4>{item.name}</h4>
									<p>
										{this.props.currency}
										{(
											item.prices.find(
												(el) => el.currency.symbol === this.props.currency
											).amount * item.quantity
										).toFixed(2)}
									</p>
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
																			style={{
																				backgroundColor: `${attr.value}`,
																			}}
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
																		<p
																			key={attr.value}
																			className={cartStyles.size}
																		>
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
									<button
										onClick={() => {
											this.props.addToCart(item);
										}}
									>
										+
									</button>
									<p>{item.quantity}</p>
									<button
										onClick={() => {
											this.props.removeFromCart(item);
										}}
									>
										-
									</button>
								</div>
								<div className={cartStyles.itemImg}>
									<img src={item.gallery[0]} alt={item.name}></img>
								</div>
							</div>
						);
					})}
				</div>
				<div className={cartStyles.total}>
					<span>Total: </span>
					<span>
						{this.props.currency}
						{this.props.totalPrice.toFixed(2)}
					</span>
				</div>
				<div className={cartStyles.checkoutBtns}>
					<Link to='/checkout'>
						<button
							className={cartStyles.showCartBtn}
							onClick={() => {
								this.props.showCart();
							}}
						>
							view bag
						</button>
					</Link>
					<button className={cartStyles.checkoutBtn}>checkout</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cart: state.cart.cart,
	currency: state.cart.currency,
	totalPrice: state.cart.totalPrice
});

const mapDispatchToProps = { addToCart, removeFromCart, showCart };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
