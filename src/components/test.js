import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';

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
	render() {
		return (
			<Query query={LOAD_ITEMS}>
				{({ loading, error, data }) => {
					if (loading) return <p>Loading…</p>;
					if (error) return <p>Error</p>;
					return data.category.products.map((data) => {
						console.log(data);
						return <div key={data.id}>
                            <h3>{data.name}</h3>
                            <p>{data.description}</p>
                            <img src={data.gallery[0]} alt={data.name}/>
                        </div>;
					});
				}}
			</Query>
		);
	}
}
