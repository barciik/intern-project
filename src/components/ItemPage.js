import React, { Component, Fragment } from 'react';
import itemPage from './ItemPage.module.css';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import { addToCart, setAttribute } from '../store';
import parse from 'html-react-parser';
import { getProduct } from '../GraphQL/Queries';

class ItemPage extends Component {
	constructor() {
		super();

		this.state = {
			imgIndex: 0,
			selectedAttributes: [],
		};
	}

	changeImg(ind) {
		this.setState({
			imgIndex: ind,
		});
	}

	setAttribute(attr) {
		this.setState((prevState) => {
			const existingAttribute = prevState.selectedAttributes.find(
				(el) => el.id === attr.id && el.itemId === attr.itemId
			);
			if (existingAttribute) {
				existingAttribute.value = attr.value;
				return { selectedAttributes: [...prevState.selectedAttributes] };
			}
			return {
				selectedAttributes: [...prevState.selectedAttributes, attr],
			};
		});
	}

	displayItem() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			const item = data.product;

			return (
				<Fragment>
					<div className={itemPage.imgSelector}>
						{item.gallery.map((photo) => {
							return (
								<img
									src={photo}
									key={photo}
									alt={item.name}
									onClick={() => {
										this.changeImg(item.gallery.indexOf(photo));
									}}
								/>
							);
						})}
					</div>
					<div className={itemPage.imgContainer}>
						<img
							className={itemPage.mainImg}
							src={item.gallery[this.state.imgIndex]}
							alt={item.name}
						/>
					</div>

					<div className={itemPage.infoSection}>
						<h2 className={itemPage.title}>{item.name}</h2>
						<p className={itemPage.brand}>{item.brand}</p>
						{item.attributes.map((attr) => {
							return (
								<Fragment key={attr.name}>
									<p className={itemPage.attrTitle}>{attr.name}: </p>
									<div key={attr.name} className={itemPage.attributes}>
										{attr.items.map((val) => {
											if (
												this.state.selectedAttributes.find(
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
															className={itemPage.colorSelected}
															style={{ background: `${val.value}` }}
														></div>
													);
												}
												return (
													<div
														key={val.value}
														className={itemPage.attributeSelected}
													>
														{val.value}
													</div>
												);
											}
											if (attr.type === 'swatch') {
												return (
													<div
														key={val.value}
														className={itemPage.color}
														style={{ background: `${val.value}` }}
														onClick={() => {
															this.setAttribute({
																id: attr.name,
																value: val.value,
																itemId: item.id,
															});
														}}
													></div>
												);
											}
											return (
												<div
													key={val.value}
													className={itemPage.attribute}
													onClick={() => {
														this.setAttribute({
															id: attr.name,
															value: val.value,
															itemId: item.id,
														});
													}}
												>
													{val.value}
												</div>
											);
										})}
									</div>
								</Fragment>
							);
						})}
						<span className={itemPage.attrTitle}>PRICE: </span>
						<p className={itemPage.price}>
							{this.props.currency}
							{item.prices
								.find((el) => el.currency.symbol === this.props.currency)
								.amount.toFixed(2)}
						</p>
						{item.inStock ? (
							<button
								className={itemPage.addToCartBtn}
								onClick={() => {
									const singleItem = {
										...item,
										selectedAttributes: this.state.selectedAttributes,
									};
									this.props.addToCart(singleItem);
									this.setState({
										selectedAttributes: [],
									});
								}}
							>
								ADD TO CART
							</button>
						) : (
							<button className={itemPage.addToCartBtnDisabled}>
								OUT OF STOCK
							</button>
						)}

						<div className={itemPage.description}>
							{parse(`${item.description}`)}
						</div>
					</div>
				</Fragment>
			);
		}
	}
	render() {
		return <div className={itemPage.itemPageBody}>{this.displayItem()}</div>;
	}
}

const mapStateToProps = (state) => ({
	currency: state.cart.currency,
});

const mapDispatchToProps = { addToCart, setAttribute };

export default withRouter(
	graphql(getProduct, {
		options: (ownProps) => ({
			variables: {
				id: ownProps.match.params.id,
			},
		}),
	})(connect(mapStateToProps, mapDispatchToProps)(ItemPage))
);
