import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, selectAttributes, sendOrder } from '../store';
import checkoutStyles from './Checkout.module.css';

class Checkout extends Component {
	render() {
		return (
			<div className={checkoutStyles.cartBody}>
				<h3 className={checkoutStyles.title}>CART</h3>
				<div className={checkoutStyles.cartItems}>
					{this.props.cart.map((item) => {
						return (
							<div key={item.id} className={checkoutStyles.cartItem}>
								<div className={checkoutStyles.itemInfo}>
									<h4 className={checkoutStyles.name}>{item.name}</h4>
									<h5 className={checkoutStyles.brand}>{item.brand}</h5>
									<p className={checkoutStyles.price}>
										{this.props.currency}
										{(
											item.prices.find(
												(el) => el.currency.symbol === this.props.currency
											).amount * item.quantity
										).toFixed(2)}
									</p>
									<div className={checkoutStyles.attrBox}>
										{item.attributes &&
											item.attributes.map((attr) => {
												if (attr.id.toLowerCase() === 'color') {
													return (
														<div
															key={attr.id}
															className={checkoutStyles.attributes}
														>
															<p className={checkoutStyles.attrTitle}>
																Color:{' '}
															</p>
															<div className={checkoutStyles.colors}>
																{attr.items.map((val) => {
																	if (
																		this.props.selectedAttributes.find(
																			(el) =>
																				el.id === item.id &&
																				el.value === val.value &&
																				el.attributeId === attr.id
																		)
																	) {
																		return (
																			<div
																				key={val.value}
																				className={checkoutStyles.color}
																				style={{
																					backgroundColor: `${val.value}`,
																					border: '2px solid #5ece7b',
																				}}
																			></div>
																		);
																	}

																	return (
																		<div
																			key={val.value}
																			className={checkoutStyles.color}
																			style={{
																				backgroundColor: `${val.value}`,
																			}}
																			onClick={() => {
																				this.props.selectAttributes({
																					id: attr.id,
																					value: val.value,
																					itemId: item.id,
																				});
																			}}
																		></div>
																	);
																})}
															</div>
														</div>
													);
												} else {
													return (
														<div
															key={attr.id}
															className={checkoutStyles.attributes}
														>
															<p className={checkoutStyles.attrTitle}>
																{attr.id}:{' '}
															</p>
															<div className={checkoutStyles.sizes}>
																{attr.items.map((val) => {
																	if (
																		this.props.selectedAttributes.find(
																			(el) =>
																				el.id === item.id &&
																				el.value === val.value &&
																				el.attributeId === attr.id
																		)
																	) {
																		return (
																			<p
																				key={val.value}
																				className={checkoutStyles.size}
																				style={{
																					background: '#1d1f22',
																					border: '1px solid #1d1f22',
																					color: '#fff',
																				}}
																			>
																				{val.value}
																			</p>
																		);
																	}
																	return (
																		<p
																			key={val.value}
																			className={checkoutStyles.size}
																			onClick={() => {
																				this.props.selectAttributes({
																					id: attr.id,
																					value: val.value,
																					itemId: item.id,
																				});
																			}}
																		>
																			{val.value}
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
								<div className={checkoutStyles.rightInfo}>
									<div className={checkoutStyles.cartButtons}>
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
									<div className={checkoutStyles.itemImg}>
										<img src={item.gallery[0]} alt={item.name}></img>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className={checkoutStyles.priceInfo}>
					<p className={checkoutStyles.tax}>
						Tax 21%:{' '}
						<span>
							{this.props.currency}
							{((this.props.totalPrice / 100) * 21).toFixed(2)}
						</span>
					</p>
					<p className={checkoutStyles.quantity}>
						Quantity: <span>{this.props.totalQuantity}</span>
					</p>
					<p className={checkoutStyles.total}>
						Total:{' '}
						<span>
							{this.props.currency}
							{this.props.totalPrice.toFixed(2)}
						</span>
					</p>
					<button className={checkoutStyles.orderBtn} onClick={() => {this.props.sendOrder()}}>ORDER</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cart: state.cart.cart,
	currency: state.cart.currency,
	totalPrice: state.cart.totalPrice,
	selectedAttributes: state.cart.selectedAttributes,
	totalQuantity: state.cart.totalQuantity,
});

const mapDispatchToProps = { addToCart, removeFromCart, selectAttributes, sendOrder };

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
