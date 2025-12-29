import React, { useState, useEffect } from "react";
import SellProduct from "./sellProduct";
import { getAllProducts } from "../../utils/contentManagement";
import SELL_PRODUCTS from "../../data/sellProducts";
import "./styles/allSellProducts.css";

const AllSellProducts = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [useFirebase, setUseFirebase] = useState(true);

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		setIsLoading(true);
		
		try {
			// Try to load from Firebase first
			const firebaseProducts = await getAllProducts();
			
			if (firebaseProducts.length > 0) {
				setProducts(firebaseProducts);
				setUseFirebase(true);
			} else {
				// Fallback to local data if Firebase is empty
				setProducts(SELL_PRODUCTS);
				setUseFirebase(false);
			}
		} catch (error) {
			console.error("Failed to load products from Firebase, using local data:", error);
			setProducts(SELL_PRODUCTS);
			setUseFirebase(false);
		}
		
		setIsLoading(false);
	};

	if (isLoading) {
		return (
			<div className="all-sell-products-container">
				<div className="sell-products-loading">
					<p>Loading products...</p>
				</div>
			</div>
		);
	}

	if (products.length === 0) {
		return null; // Don't show section if no products
	}

	return (
		<div className="all-sell-products-container">
			<div className="sell-products-header">
				<h2 className="sell-products-title">🛒 Products for Sale</h2>
				<p className="sell-products-subtitle">
					Professional web applications and custom solutions ready for deployment
				</p>
			</div>

			<div className="sell-products-grid">
				{products.map((product, index) => (
					<div className="sell-products-item" key={product.id || index}>
						<SellProduct
							id={product.id}
							title={product.title}
							description={product.description}
							price={product.price}
							originalPrice={product.originalPrice}
							image={product.image}
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