import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationTriangle, faSync, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
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

	// Loading state
	if (isLoading) {
		return (
			<div className="sell-products-section">
				<div className="sell-products-header">
					<h2 className="sell-products-title">Products for Sale</h2>
					<p className="sell-products-description">
						Explore my curated collection of premium products available for purchase. Each item has been carefully selected to ensure quality and value. Browse through the catalog, read detailed descriptions, check customer reviews, and find the perfect product that meets your needs. If you have any questions or need recommendations, feel free to reach out!
					</p>
					<div className="sell-products-divider"></div>
				</div>
				<div className="sell-products-loading">
					<FontAwesomeIcon icon={faSpinner} spin size="2x" />
					<p>Loading products...</p>
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="sell-products-section">
				<div className="sell-products-header">
					<h2 className="sell-products-title">Products for Sale</h2>
					<p className="sell-products-description">
						Explore my curated collection of premium products available for purchase. Each item has been carefully selected to ensure quality and value. Browse through the catalog, read detailed descriptions, check customer reviews, and find the perfect product that meets your needs. If you have any questions or need recommendations, feel free to reach out!
					</p>
					<div className="sell-products-divider"></div>
				</div>
				<div className="sell-products-error">
					<FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
					<p>{error}</p>
					<button className="retry-button" onClick={handleRefresh}>
						<FontAwesomeIcon icon={faSync} />
						<span>Refresh</span>
					</button>
				</div>
			</div>
		);
	}

	// Empty state
	if (products.length === 0) {
		return (
			<div className="sell-products-section">
				<div className="sell-products-header">
					<h2 className="sell-products-title">Products for Sale</h2>
					<p className="sell-products-description">
						Explore my curated collection of premium products available for purchase. Each item has been carefully selected to ensure quality and value. Browse through the catalog, read detailed descriptions, check customer reviews, and find the perfect product that meets your needs. If you have any questions or need recommendations, feel free to reach out!
					</p>
					<div className="sell-products-divider"></div>
				</div>
				<div className="sell-products-empty">
					<div className="empty-icon">
						<FontAwesomeIcon icon={faShoppingBag} size="3x" />
					</div>
					<p>There are no products that will be sold again later</p>
				</div>
			</div>
		);
	}

	// Success state with products
	return (
		<div className="sell-products-section">
			<div className="sell-products-header">
				<h2 className="sell-products-title">Products for Sale</h2>
				<p className="sell-products-description">
					Explore my curated collection of premium products available for purchase. Each item has been carefully selected to ensure quality and value. Browse through the catalog, read detailed descriptions, check customer reviews, and find the perfect product that meets your needs. If you have any questions or need recommendations, feel free to reach out!
				</p>
				<div className="sell-products-divider"></div>
			</div>
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