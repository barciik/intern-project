import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import classes from './ItemsPage.module.css';
import { Link } from 'react-router-dom';

const LOAD_ITEMS = gql`
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

export default class Test extends Component {
	testMethod(e) {
		e.stopPropagation();
	}

	render() {
		return (
			<div className={classes.layout}>
				<h2 className={classes.categoryName}>ALL</h2>
				<div className={classes.cards}>
					<Query query={LOAD_ITEMS}>
						{({ loading, error, data }) => {
							if (loading) return <p>Loading…</p>;
							if (error) return <p>Error</p>;
							return data.category.products.map((data) => {
								// console.log(data);
								return (
									<Link to={data.id} className={classes.card} key={data.id}>
										<img src={data.gallery[0]} alt={data.name} />
										<h3>{data.name}</h3>
										<p>{data.prices[0].amount}</p>
										<button
											onClick={this.testMethod.bind(this)}
											className={classes.addToCart}
										>
											<img src='./add-to-cart.svg' alt='add to cart button' />
										</button>
									</Link>
								);
							});
						}}
					</Query>
				</div>
			</div>
		);
	}
}
