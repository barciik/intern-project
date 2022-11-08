import React, { Component, Fragment } from 'react';
import itemPage from './ItemPage.module.css';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { getProduct } from '../GraphQL/Queries';
import { connect } from 'react-redux';
import { addToCart, selectAttributes } from '../store';

class ItemPage extends Component {
	constructor() {
		super();

		this.state = {
			imgIndex: 0,
		};
	}

	changeImg(ind) {
		this.setState({
			imgIndex: ind
		})
	}

	displayItem() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			const item = data.categories[0].products.find(
				(el) => el.id === this.props.match.params.id
			);
			
			return (
				<Fragment>
					<div className={itemPage.imgSelector}>
						{item.gallery.map((photo) => {
							return (
								<img
									src={photo}
									key={photo}
									alt={item.name}
									onClick={() => {this.changeImg(item.gallery.indexOf(photo))}}
								/>
							);
						})}
					</div>
					<img
						className={itemPage.mainImg}
						src={item.gallery[this.state.imgIndex]}
						alt={item.name}
					/>

					<div className={itemPage.infoSection}>
						<h2 className={itemPage.title}>{item.name}</h2>
						<p className={itemPage.brand}>{item.brand}</p>
						{item.attributes.map((attr) => {
							if (attr.id === 'Color') {
								return (
									<Fragment key={attr.id}>
										<p className={itemPage.attrTitle}>{attr.id}: </p>
										<div key={attr.id} className={itemPage.attributes}>
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
															style={{
																backgroundColor: `${val.value}`,
																border: '2px solid #5ece7b',
															}}
															className={itemPage.color}
														></div>
													);
												}
												return (
													<div
														key={val.value}
														style={{ backgroundColor: `${val.value}` }}
														className={itemPage.color}
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
									</Fragment>
								);
							}
							return (
								<Fragment key={attr.id}>
									<p className={itemPage.attrTitle}>{attr.id}: </p>
									<div key={attr.id} className={itemPage.attributes}>
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
														className={itemPage.attribute}
														
														style={{
															background: '#1d1f22',
															border: '1px solid #1d1f22',
															color: '#fff',
														}}
													>
														{val.value}
													</div>
												);
											}
											return (
												<div
													key={val.value}
													className={itemPage.attribute}
													onClick={() => {
														this.props.selectAttributes({
															id: attr.id,
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
							{item.prices[0].currency.symbol}
							{item.prices[0].amount}
						</p>
						<button
							className={itemPage.addToCartBtn}
							onClick={() => {
								this.props.addToCart(item, this.state.selectedAttributes);
							}}
						>
							ADD TO CART
						</button>
						<p className={itemPage.description}>{item.description}</p>
					</div>
				</Fragment>
			);
		}
	}
	render() {
		return (
			<div className={itemPage.itemPageBody}>
				{this.displayItem()}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currency: state.cart.currency,
	selectedAttributes: state.cart.selectedAttributes,
});

const mapDispatchToProps = { addToCart, selectAttributes };

export default withRouter(
	graphql(getProduct)(connect(mapStateToProps, mapDispatchToProps)(ItemPage))
);
