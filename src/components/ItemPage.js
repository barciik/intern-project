import React, { Component } from 'react';
import itemPage from './ItemPage.module.css';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { getProduct } from '../GraphQL/Queries';

class ItemPage extends Component {
	test() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			const item = data.categories[0].products.find(
				(el) => el.id === this.props.match.params.id
			);
			console.log(item);
			return (
				<div className={itemPage.infoSection}>
					<h2>{item.name}</h2>
					<p>{item.brand}</p>
					{item.attributes.map((attr) => {
						if (attr.id === 'Color') {
							return (
								<div key={attr.id} className={itemPage.attributes}>
									<p>{attr.id}: </p>
									{attr.items.map((val) => {
										return (
											<div
												key={val.value}
												style={{ backgroundColor: `${val.value}` }}
                                                className={itemPage.color}
											>
												test
											</div>
										);
									})}
								</div>
							);
						}
						return (
                            <div key={attr.id} className={itemPage.attributes}>
									<p>{attr.id}: </p>
									{attr.items.map((val) => {
										return (
											<div
												key={val.value}
                                                className={itemPage.attribute}
											>
												{val.value}
											</div>
										);
									})}
								</div>
                        );
					})}
                    <p>{item.prices[0].amount}{item.prices[0].currency.symbol}</p>
                    <button className={itemPage.addToCartBtn}>ADD TO CART</button>
                    <p>{item.description}</p>
				</div>
			);
		}
	}
	render() {
		return (
			<div className={itemPage.itemPageBody}>
				{/* {this.props.match.params.id} */}
				{this.test()}
			</div>
		);
	}
}

export default withRouter(graphql(getProduct)(ItemPage));
