import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, setAttribute, sendOrder } from '../store';
import checkoutStyles from './Checkout.module.css';

class Checkout extends Component {
	setAttribute(el) {
		this.props.setAttribute(el);
	}

	render() {
		return (
			<div className={checkoutStyles.cartBody}>
				<h3 className={checkoutStyles.title}>CART</h3>
				<div className={checkoutStyles.cartItems}>
					{this.props.cart.map((item) => {
						return (
							<div
								key={`${item.id} ${Math.random()}`}
								className={checkoutStyles.cartItem}
							>
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
										{item.attributes.map((attr) => {
											return (
												<div
													key={attr.name}
													className={checkoutStyles.attributes}
												>
													<p className={checkoutStyles.attrTitle}>
														{attr.name}:{' '}
													</p>
													<div className={checkoutStyles.sizes}>
														{attr.items.map((val) => {
															if (
																item.selectedAttributes.find(
																	(el) =>
																		el.id === attr.name &&
																		el.value === val.value &&
																		el.itemId === item.id
																)
															) {
																if (attr.type === 'swatch') {
																	return (
																		<div
																			key={val.value}
																			className={checkoutStyles.colorSelected}
																			style={{ background: `${val.value}` }}
																		></div>
																	);
																}
																return (
																	<div
																		key={val.value}
																		className={checkoutStyles.attributeSelected}
																	>
																		{val.value}
																	</div>
																);
															}
															if (attr.type === 'swatch') {
																return (
																	<div
																		key={val.value}
																		className={checkoutStyles.color}
																		style={{ background: `${val.value}` }}
																		onClick={() => {
																			this.setAttribute({
																				id: attr.name,
																				value: val.value,
																				itemId: item.id,
																				selectedAttributes:
																					item.selectedAttributes,
																			});
																		}}
																	></div>
																);
															}
															return (
																<div
																	key={val.value}
																	className={checkoutStyles.attribute}
																	onClick={() => {
																		this.setAttribute({
																			id: attr.name,
																			value: val.value,
																			itemId: item.id,
																			selectedAttributes:
																				item.selectedAttributes,
																		});
																	}}
																>
																	{val.value}
																</div>
															);
														})}
													</div>
												</div>
											);
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
					<button
						className={checkoutStyles.orderBtn}
						onClick={() => {
							this.props.sendOrder();
						}}
					>
						ORDER
					</button>
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

const mapDispatchToProps = {
	addToCart,
	removeFromCart,
	setAttribute,
	sendOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
