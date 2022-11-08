import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	addToCart,
	removeFromCart,
	showCart,
	selectAttributes,
} from '../store';
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
											item.attributes.map((attr) => {
												if (attr.id === 'Color') {
													return (
														<div key={attr.id} className={cartStyles.attributes}>
															<p>Color: </p>
															<div className={cartStyles.colors}>
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
																				className={cartStyles.color}
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
																			className={cartStyles.color}
																			onClick={() => {
																				this.props.selectAttributes({
																					id: attr.id,
																					value: val.value,
																					itemId: item.id,
																				});
																			}}
																			style={{
																				backgroundColor: `${val.value}`,
																			}}
																		></div>
																	);
																})}
															</div>
														</div>
													);
												} else {
													return (
														<div key={attr.id} className={cartStyles.attributes}>
															<p>{attr.id}: </p>
															<div className={cartStyles.sizes}>
																{attr.items.map((val) => {
																	if(this.props.selectedAttributes.find(
																		(el) =>
																			el.id === item.id &&
																			el.value === val.value &&
																			el.attributeId === attr.id
																	)){
																		return (
																			<p
																			key={val.value}
																			className={cartStyles.size}
																			style={{
																				background: '#1d1f22',
																				border: '1px solid #1d1f22',
																				color: '#fff',
																			}}
																			>	
																			{val.value}
																		</p>
																		)
																	}
																	return (
																		<p
																			key={val.value}
																			className={cartStyles.size}
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
	totalPrice: state.cart.totalPrice,
	selectedAttributes: state.cart.selectedAttributes,
});

const mapDispatchToProps = {
	addToCart,
	removeFromCart,
	showCart,
	selectAttributes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
