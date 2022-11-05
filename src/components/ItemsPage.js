import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import classes from './ItemsPage.module.css';
import { Link } from 'react-router-dom';

const getItemsQuery = gql`
	{
		
		category {
			name
			products {
				id
				name
				inStock
				gallery
				description
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
		}
	}
`;

class Test extends Component {
	testMethod(e) {
		e.stopPropagation();
	}
	displayItems() {
		const data = this.props.data;
		if (data.loading) {
			return <p>Loading...</p>;
		} else if (!data.loading) {
			return data.category.products.map((data) => {
				// console.log(data);
				if (!data.inStock) {
					return (
						<div className={classes.cardInactive} key={data.id}>
							<div className={classes.cardShadow}></div>
							<span className={classes.outOfStock}>out of stock</span>
							<img src={data.gallery[0]} alt={data.name} />
							<h3>{data.name}</h3>
							<p>
								{data.prices[0].amount}
								{data.prices[0].currency.symbol}
							</p>
							<button
								onClick={this.testMethod.bind(this)}
								className={classes.addToCart}
							>
								<img src='./add-to-cart.svg' alt='add to cart button' />
							</button>
						</div>
					);
				}
				return (
					<Link to={data.id} className={classes.card} key={data.id}>
						<img src={data.gallery[0]} alt={data.name} />
						<h3>{data.name}</h3>
						<p>
							{data.prices[0].amount}
							{data.prices[0].currency.symbol}
						</p>
						<button
							onClick={this.testMethod.bind(this)}
							className={classes.addToCart}
						>
							<img src='./add-to-cart.svg' alt='add to cart button' />
						</button>
					</Link>
				);
			});
		}
	}

	render() {
		return (
			<div className={classes.layout}>
				<h2 className={classes.categoryName}>All</h2>
				<div className={classes.cards}>
					{this.displayItems()}
				</div>
			</div>
		);
	}
}

export default graphql(getItemsQuery)(Test);
