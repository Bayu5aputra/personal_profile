import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faEdit,
	faTrash,
	faEye,
	faSave,
	faTimes,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
	getAllProducts,
	addProduct,
	updateProduct,
	deleteProduct,
} from "../../utils/contentManagement";
import "./styles/productsManagement.css";

const ProductsManagement = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		shortDescription: "",
		price: "",
		originalPrice: "",
		image: "",
		category: "",
		featured: false,
		features: [],
		technologies: [],
	});

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		setIsLoading(true);
		const data = await getAllProducts();
		setProducts(data);
		setIsLoading(false);
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleArrayInput = (e, fieldName) => {
		const value = e.target.value;
		const array = value.split("\n").filter((item) => item.trim() !== "");
		setFormData((prev) => ({
			...prev,
			[fieldName]: array,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const productData = {
			...formData,
			price: parseFloat(formData.price),
			originalPrice: parseFloat(formData.originalPrice) || null,
		};

		let result;
		if (editingProduct) {
			// Update existing product
			result = await updateProduct(editingProduct.id, productData);
		} else {
			// Add new product - generate numeric ID
			const allProducts = await getAllProducts();
			
			// Find maximum numeric ID from existing products
			const maxId = allProducts.reduce((max, product) => {
				// Check both document ID and numeric ID field
				const productId = product.id || product.documentId || 0;
				// Convert to number if possible
				const numId = typeof productId === 'number' ? productId : 
							(!isNaN(productId) ? parseInt(productId) : 0);
				return numId > max ? numId : max;
			}, 0);
			
			// Add numeric ID to product data for compatibility with existing system
			productData.id = maxId + 1;
			
			result = await addProduct(productData);
		}

		if (result.success) {
			alert(
				editingProduct
					? "Product updated successfully!"
					: "Product added successfully!"
			);
			resetForm();
			loadProducts();
		} else {
			alert("Failed to save product: " + result.error);
		}

		setIsLoading(false);
	};

	const handleEdit = (product) => {
		setEditingProduct(product);
		setFormData({
			title: product.title || "",
			description: product.description || "",
			shortDescription: product.shortDescription || "",
			price: product.price?.toString() || "",
			originalPrice: product.originalPrice?.toString() || "",
			image: product.image || "",
			category: product.category || "",
			featured: product.featured || false,
			features: product.features || [],
			technologies: product.technologies || [],
		});
		setShowForm(true);
	};

	const handleDelete = async (productId) => {
		if (
			window.confirm(
				"Are you sure you want to delete this product? This action cannot be undone."
			)
		) {
			const result = await deleteProduct(productId);
			if (result.success) {
				alert("Product deleted successfully!");
				loadProducts();
			} else {
				alert("Failed to delete product: " + result.error);
			}
		}
	};

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			shortDescription: "",
			price: "",
			originalPrice: "",
			image: "",
			category: "",
			featured: false,
			features: [],
			technologies: [],
		});
		setEditingProduct(null);
		setShowForm(false);
	};

	// Helper function to get numeric ID for view URL
	const getProductNumericId = (product) => {
		// If product has numeric ID field, use it
		if (product.id && typeof product.id === 'number') {
			return product.id;
		}
		// If product has id field that's a string number
		if (product.id && !isNaN(product.id)) {
			return parseInt(product.id);
		}
		// Fallback: use Firebase document ID hash as number
		if (product.documentId) {
			// Create a simple hash from the document ID
			let hash = 0;
			for (let i = 0; i < product.documentId.length; i++) {
				hash = ((hash << 5) - hash) + product.documentId.charCodeAt(i);
				hash = hash & hash;
			}
			return Math.abs(hash) % 10000; // Keep it within reasonable range
		}
		// Last resort: use index
		return products.indexOf(product) + 1;
	};

	if (isLoading && products.length === 0) {
		return (
			<div className="cms-loading">
				<FontAwesomeIcon icon={faSpinner} spin size="2x" />
				<p>Loading products...</p>
			</div>
		);
	}

	return (
		<div className="products-management">
			<div className="management-header">
				<h2>Products Management</h2>
				{!showForm && (
					<button
						className="btn-add"
						onClick={() => setShowForm(true)}
					>
						<FontAwesomeIcon icon={faPlus} />
						Add New Product
					</button>
				)}
			</div>

			{showForm && (
				<div className="product-form-container">
					<div className="form-header">
						<h3>
							{editingProduct ? "Edit Product" : "Add New Product"}
						</h3>
						<button className="btn-close" onClick={resetForm}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>

					<form onSubmit={handleSubmit} className="product-form">
						<div className="form-row">
							<div className="form-group">
								<label>Title *</label>
								<input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="form-group">
								<label>Category *</label>
								<input
									type="text"
									name="category"
									value={formData.category}
									onChange={handleInputChange}
									required
								/>
							</div>
						</div>

						<div className="form-group">
							<label>Short Description *</label>
							<input
								type="text"
								name="shortDescription"
								value={formData.shortDescription}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="form-group">
							<label>Full Description *</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								rows="4"
								required
							/>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label>Price (Rp) *</label>
								<input
									type="number"
									name="price"
									value={formData.price}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="form-group">
								<label>Original Price (Rp)</label>
								<input
									type="number"
									name="originalPrice"
									value={formData.originalPrice}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						<div className="form-group">
							<label>Image URL *</label>
							<input
								type="text"
								name="image"
								value={formData.image}
								onChange={handleInputChange}
								placeholder="/products/product-name.png"
								required
							/>
						</div>

						<div className="form-group">
							<label>
								Features (one per line) *
								<small>Press Enter after each feature</small>
							</label>
							<textarea
								value={formData.features.join("\n")}
								onChange={(e) => handleArrayInput(e, "features")}
								rows="6"
								placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
								required
							/>
						</div>

						<div className="form-group">
							<label>
								Technologies (one per line) *
								<small>Press Enter after each technology</small>
							</label>
							<textarea
								value={formData.technologies.join("\n")}
								onChange={(e) =>
									handleArrayInput(e, "technologies")
								}
								rows="4"
								placeholder="React&#10;Node.js&#10;MongoDB"
								required
							/>
						</div>

						<div className="form-group checkbox-group">
							<label>
								<input
									type="checkbox"
									name="featured"
									checked={formData.featured}
									onChange={handleInputChange}
								/>
								<span>Featured Product</span>
							</label>
						</div>

						<div className="form-actions">
							<button
								type="submit"
								className="btn-save"
								disabled={isLoading}
							>
								<FontAwesomeIcon icon={faSave} />
								{editingProduct ? "Update Product" : "Save Product"}
							</button>
							<button
								type="button"
								className="btn-cancel"
								onClick={resetForm}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			<div className="products-list">
				<h3>Existing Products ({products.length})</h3>

				{products.length === 0 ? (
					<div className="empty-state">
						<p>No products yet. Add your first product!</p>
					</div>
				) : (
					<div className="products-grid">
						{products.map((product, index) => {
							const numericId = getProductNumericId(product);
							const firebaseId = product.id || product.documentId;
							
							return (
								<div key={firebaseId} className="product-card">
									<div className="product-card-image">
										<img
											src={product.image}
											alt={product.title}
											onError={(e) => {
												e.target.onerror = null;
												e.target.src = "/products/placeholder.jpg";
											}}
										/>
										{product.featured && (
											<span className="badge-featured">
												Featured
											</span>
										)}
									</div>

									<div className="product-card-content">
										<h4>{product.title}</h4>
										<p className="product-category">
											{product.category}
										</p>
										<p className="product-price">
											Rp {product.price?.toLocaleString("id-ID")}
										</p>
										<p className="product-id">
											ID: {numericId} {firebaseId && `(Firebase: ${firebaseId.substring(0, 8)}...)`}
										</p>

										<div className="product-card-actions">
											<button
												className="btn-action btn-view"
												onClick={() =>
													window.open(
														`/product/${numericId}`,
														"_blank"
													)
												}
												title="View Product"
											>
												<FontAwesomeIcon icon={faEye} />
											</button>
											<button
												className="btn-action btn-edit"
												onClick={() => handleEdit(product)}
												title="Edit Product"
											>
												<FontAwesomeIcon icon={faEdit} />
											</button>
											<button
												className="btn-action btn-delete"
												onClick={() =>
													handleDelete(firebaseId)
												}
												title="Delete Product"
											>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductsManagement;