package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin
public class ProductController {
    private ProductService productService;

    @Autowired

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping("/products")
    public List<Product> getProducts() {
        System.out.println(productService.getProduct());
        return productService.getProduct();
    }

    @PostMapping("/product")
    public void addProducts(@RequestBody Product product) {
        productService.addProduct(product);
    }

    @GetMapping("/product/{prodId}")
    public Optional<Product> getProductById(@PathVariable int prodId) {
        return productService.getProductById(prodId);
    }

    @DeleteMapping("/product/{prodId}")
    public void deleteProduct(@PathVariable int prodId) {
        productService.deleteProduct(prodId);
    }

    @PutMapping("/product/{prodId}")
    public void updateProduct(@PathVariable int prodId,@RequestBody Product product) {
        productService.updateProduct(prodId,product);
    }

}
