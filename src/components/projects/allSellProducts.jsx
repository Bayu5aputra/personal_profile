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
			
			if (firebaseProducts.length > 0) {
				setProducts(firebaseProducts);
			} else {
				// Tidak set error, biarkan products kosong untuk menampilkan empty state
				setProducts([]);
			}
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
				<div className="title sell-products-title">Products for Sale</div>
				<div className="sell-products-loading">
					<FontAwesomeIcon icon={faSpinner} spin size="2x" />
					<p>Loading products...</p>
				</div>
			</div>
		);
	}

	// Error state (only for actual errors, not empty data)
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

	// Empty state (no products available - this is NOT an error)
	if (products.length === 0) {
		return (
			<div className="sell-products-section">
				<div className="title sell-products-title">Products for Sale</div>
				<div className="sell-products-empty">
					<div className="empty-icon">
						<FontAwesomeIcon icon={faShoppingBag} size="3x" />
					</div>
					<h3>No Products Available</h3>
					<p>There are no products for sale yet, please come back later</p>
					<button className="retry-button-secondary" onClick={handleRefresh}>
						<FontAwesomeIcon icon={faSync} />
						<span>Check Again</span>
					</button>
				</div>
			</div>
		);
	}

	// Success state with products
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
						category={product.category}
					/>
				))}
			</div>
		</div>
	);
};

export default AllSellProducts;