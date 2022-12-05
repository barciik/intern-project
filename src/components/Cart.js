import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, showCart, setAttribute } from '../store';
import cartStyles from './Cart.module.css';
import { Link } from 'react-router-dom';

class Cart extends Component {
	setAttribute(el) {
		this.props.setAttribute(el);
	}

	render() {
		return (
			<div className={cartStyles.cartBody}>
				<h3>My bag, {this.props.totalQuantity} items</h3>
				<div className={cartStyles.cartItems}>
					{this.props.cart.map((item) => {
						return (
							<div
								key={`${item.id} ${Math.random()}`}
								className={cartStyles.cartItem}
							>
								<div className={cartStyles.itemInfo}>
									<h4>{item.name}</h4>
									<p className={cartStyles.price}>
										{this.props.currency}
										{(
											item.prices.find(
												(el) => el.currency.symbol === this.props.currency
											).amount * item.quantity
										).toFixed(2)}
									</p>
									<div className={cartStyles.attrBox}>
										{item.attributes &&
											item.attributes.map((attr) => {
												return (
													<div
														key={attr.name}
														className={cartStyles.attributeLayout}
													>
														<p>{attr.name}: </p>
														<div className={cartStyles.attributes}>
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
																				className={cartStyles.colorSelected}
																				style={{ background: `${val.value}` }}
																			></div>
																		);
																	}
																	return (
																		<div
																			key={val.value}
																			className={cartStyles.attributeSelected}
																		>
																			{val.value}
																		</div>
																	);
																}
																if (attr.type === 'swatch') {
																	return (
																		<div
																			key={val.value}
																			className={cartStyles.color}
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
																		className={cartStyles.attribute}
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
								<div className={cartStyles.cartButtons}>
									<button
										onClick={() => {
											const product = {
												...item,
												selectedAttributes: item.selectedAttributes,
											};
											this.props.addToCart(product);
										}}
									>
										+
									</button>
									<p>{item.quantity}</p>
									<button
										onClick={() => {
											const product = {
												...item,
												selectedAttributes: item.selectedAttributes,
											};
											this.props.removeFromCart(product);
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
	totalPrice: state.cart.totalPrice,
	selectedAttributes: state.cart.selectedAttributes,
	totalQuantity: state.cart.totalQuantity,
});

const mapDispatchToProps = {
	addToCart,
	removeFromCart,
	showCart,
	setAttribute,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
