import React from "react";
import SellProduct from "./sellProduct";
import SELL_PRODUCTS from "../../data/sellProducts";
import "./styles/allSellProducts.css";

const AllSellProducts = () => {
	return (
		<div className="all-sell-products-container">
			<div className="sell-products-header">
				<h2 className="sell-products-title">🛒 Products for Sale</h2>
				<p className="sell-products-subtitle">
					Professional web applications and custom solutions ready for deployment
				</p>
			</div>

			<div className="sell-products-grid">
				{SELL_PRODUCTS.map((product, index) => (
					<div className="sell-products-item" key={index}>
						<SellProduct
							id={product.id}
							title={product.title}
							description={product.description}
							price={product.price}
							originalPrice={product.originalPrice}
							image={product.image}
							rating={product.rating}
							category={product.category}
							featured={product.featured}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllSellProducts;