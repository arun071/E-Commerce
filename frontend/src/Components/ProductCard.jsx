import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductCard({ 
  productId, 
  productImageUrl, 
  productStockCount, 
  productDescription, 
  productName, 
  productPrice, 
  onProductClick 
}) {
  return (
    <div className="card h-100" onClick={onProductClick} style={{ cursor: 'pointer' }}>
      <div className="text-center">
        <img 
          className="card-img-top img-fluid" 
          src={productImageUrl} 
          alt={`${productName} image`} 
          style={{ maxHeight: '200px', objectFit: 'contain' }} // Ensures uniform image size
        />
      </div>
      <div className="card-body">
        <h5 className="card-title text-capitalize">{productName}</h5>
        {/* Optional stock count or description */}
        {/* <p className="card-text">Available Stock: {productStockCount}</p> */}
        {/* <p className="card-text">{productDescription}</p> */}
        <p className="card-text">
          Price: <span className="font-weight-bold text-primary">${productPrice}</span>
        </p>
        <div className="d-flex justify-content-around">
          <button className="btn btn-primary">
            Buy Now
          </button>
          <button className="btn btn-warning">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
