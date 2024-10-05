package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProduct() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(int prodId) {
        productRepository.deleteById(prodId);
    }

    public Optional<Product> getProductById(int prodId) {
        return productRepository.findById(prodId);
    }

    public Product updateProduct(int prodId, Product updatedProduct) {
        Optional<Product> existingProduct = productRepository.findById(prodId);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            product.setProductStockCount(updatedProduct.getProductStockCount());
            product.setProductName(updatedProduct.getProductName());
            product.setProductPrice(updatedProduct.getProductPrice());
            product.setProductImageUrl(updatedProduct.getProductImageUrl());
            product.setProductDescription(updatedProduct.getProductDescription());
            return productRepository.save(product);
        } else {
            throw new RuntimeException("Product not found");
        }
    }

}
