import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faSpinner,
  faExclamationTriangle,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from '../../utils/contentManagement';

import './styles/productsManagement.css';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    price: '',
    originalPrice: '',
    category: '',
    features: '',
    technologies: '',
    delivery: '1-2 days',
    support: '24/7',
    license: 'Single use',
    featured: false
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const featuresArray = formData.features
        .split('\n')
        .filter(f => f.trim() !== '')
        .map(f => f.trim());
      
      const technologiesArray = formData.technologies
        .split(',')
        .filter(t => t.trim() !== '')
        .map(t => t.trim());

      const productData = {
        id: parseInt(formData.id),
        title: formData.title,
        description: formData.description,
        image: formData.image || '/no_image.png',
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        category: formData.category,
        features: featuresArray,
        technologies: technologiesArray,
        delivery: formData.delivery,
        support: formData.support,
        license: formData.license,
        featured: formData.featured
      };

      if (editingProduct) {
        await updateProduct(editingProduct.documentId, productData);
      } else {
        await addProduct(productData);
      }

      await loadProducts();
      resetForm();
      alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product: ' + err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id || '',
      title: product.title || '',
      description: product.description || '',
      image: product.image && product.image !== '/no_image.png' ? product.image : '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      category: product.category || '',
      features: product.features ? product.features.join('\n') : '',
      technologies: product.technologies ? product.technologies.join(', ') : '',
      delivery: product.delivery || '1-2 days',
      support: product.support || '24/7',
      license: product.license || 'Single use',
      featured: product.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (documentId, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteProduct(documentId);
        await loadProducts();
        alert('Product deleted successfully!');
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      image: '',
      price: '',
      originalPrice: '',
      category: '',
      features: '',
      technologies: '',
      delivery: '1-2 days',
      support: '24/7',
      license: 'Single use',
      featured: false
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="cms-loading">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cms-error">
        <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
        <p>{error}</p>
        <button onClick={loadProducts} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="products-management">
      <div className="management-header">
        <h2>Products Management</h2>
        <button 
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add New Product
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={resetForm} className="close-button">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product ID *</label>
                  <input
                    type="number"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                    disabled={!!editingProduct}
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
                    placeholder="e.g., Web Development"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Product title"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    placeholder="Product description"
                  />
                </div>

                <div className="form-group full-width">
                  <label>
                    <FontAwesomeIcon icon={faImage} /> Image URL (optional)
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg (leave empty for placeholder)"
                  />
                  <small className="form-hint">
                    Leave empty to use default placeholder image
                  </small>
                </div>

                <div className="form-group">
                  <label>Price (Rp) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="299000"
                  />
                </div>

                <div className="form-group">
                  <label>Original Price (Rp)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="399000 (optional)"
                  />
                </div>

                <div className="form-group">
                  <label>Delivery Time</label>
                  <input
                    type="text"
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleInputChange}
                    placeholder="1-2 days"
                  />
                </div>

                <div className="form-group">
                  <label>Support</label>
                  <input
                    type="text"
                    name="support"
                    value={formData.support}
                    onChange={handleInputChange}
                    placeholder="24/7"
                  />
                </div>

                <div className="form-group full-width">
                  <label>License Type</label>
                  <input
                    type="text"
                    name="license"
                    value={formData.license}
                    onChange={handleInputChange}
                    placeholder="Single use"
                  />
                </div>

                <div className="form-group full-width">
                  <label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      style={{ width: 'auto', marginRight: '10px' }}
                    />
                    Mark as Featured Product
                  </label>
                  <small className="form-hint">
                    Featured products will display a special badge
                  </small>
                </div>

                <div className="form-group full-width">
                  <label>Features (one per line)</label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Technologies (comma separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="cancel-button">
                  <FontAwesomeIcon icon={faTimes} />
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  <FontAwesomeIcon icon={faSave} />
                  {editingProduct ? 'Update' : 'Save'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  No products found. Click "Add New Product" to create one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.documentId || product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img 
                      src={product.image || '/no_image.png'} 
                      alt={product.title}
                      className="product-thumbnail"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/no_image.png';
                      }}
                    />
                  </td>
                  <td className="product-title">{product.title}</td>
                  <td>{product.category}</td>
                  <td>Rp {product.price?.toLocaleString('id-ID')}</td>
                  <td>
                    {product.featured ? (
                      <span className="badge-featured">⭐ Yes</span>
                    ) : (
                      <span className="badge-normal">No</span>
                    )}
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => handleEdit(product)}
                      className="edit-button"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.documentId, product.title)}
                      className="delete-button"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsManagement;