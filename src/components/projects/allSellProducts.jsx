import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationTriangle, faSync } from "@fortawesome/free-solid-svg-icons";
import SellProduct from "./sellProduct";
import { getAllProducts } from "../../utils/contentManagement";

import "./styles/allSellProducts.css";

const AllSellProducts = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const firebaseProducts = await getAllProducts();
			setProducts(firebaseProducts);
		} catch (error) {
			console.error("Failed to load products:", error);
			setError("Failed to load products from server. Please try refreshing the page.");
		}
		
		setIsLoading(false);
	};

	const handleRefresh = () => {
		loadProducts();
	};

	if (isLoading) {
		return (
			<div className="sell-products-section">
				<div className="title sell-products-title">Products for Sale</div>
				<div className="sell-products-loading">
					<FontAwesomeIcon icon={faSpinner} spin size="2x" />
					<p>Loading products...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="sell-products-section">
				<div className="title sell-products-title">Products for Sale</div>
				<div className="sell-products-error">
					<FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
					<p>{error}</p>
					<button className="retry-button" onClick={handleRefresh}>
						<FontAwesomeIcon icon={faSync} />
						<span>Refresh</span>
					</button>
				</div>
			</div>
		);
	}

	if (products.length === 0) {
		return null;
	}

	return (
		<div className="sell-products-section">
			<div className="title sell-products-title">Products for Sale</div>
			<div className="sell-products-container">
				{products.map((product) => (
					<SellProduct 
						key={product.documentId || product.id}
						id={product.id}
						title={product.title}
						description={product.description}
						image={product.image || '/no_image.png'}
						price={product.price}
						originalPrice={product.originalPrice}
						category={product.category}
						featured={product.featured}
					/>
				))}
			</div>
		</div>
	);
};

export default AllSellProducts;