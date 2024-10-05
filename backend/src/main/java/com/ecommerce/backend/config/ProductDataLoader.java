package com.ecommerce.backend.config;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class ProductDataLoader {

    @Bean
    public CommandLineRunner loadInitialData(ProductRepository repository) {
        return (args) -> {
            String imageUrl = "https://firebasestorage.googleapis.com/v0/b/arun-netflix.appspot.com/o/images%2FScreenshot%202024-09-23%20165937.png?alt=media&token=1fda751b-6df3-49c5-ba48-acfce8434ea6";
            String imageUrl2 = "https://firebasestorage.googleapis.com/v0/b/arun-netflix.appspot.com/o/images%2FScreenshot%202024-10-05%20155634.png?alt=media&token=70366efb-d2d4-4e86-8323-aeea2244600b";

            // Add 5 products with different data
            repository.save(new Product(1,"iPhone 16 Pro", "iPhone 16 Pro with the latest most powerful processor", imageUrl, 90000, 100, true));
            repository.save(new Product(2,"Samsung Galaxy S24", "Samsung Galaxy S24 with 8K video recording", imageUrl2, 85000, 120, true));
            repository.save(new Product(3,"Google Pixel 8", "Google Pixel 8 with AI-powered camera", imageUrl, 75000, 50, true));
            repository.save(new Product(4,"OnePlus 12", "OnePlus 12 with 150W fast charging", imageUrl2, 65000, 200, true));
            repository.save(new Product(5,"Xiaomi Mi 14", "Xiaomi Mi 14 with 108MP camera", imageUrl, 55000, 180, true));
            // Add 5 products with different data
            repository.save(new Product(6,"iPhone 16 Pro", "iPhone 16 Pro with the latest most powerful processor", imageUrl, 90000, 100, true));
            repository.save(new Product(7,"Samsung Galaxy S24", "Samsung Galaxy S24 with 8K video recording", imageUrl2, 85000, 120, true));
            repository.save(new Product(8,"Google Pixel 8", "Google Pixel 8 with AI-powered camera", imageUrl, 75000, 50, true));
            repository.save(new Product(9,"OnePlus 12", "OnePlus 12 with 150W fast charging", imageUrl2, 65000, 200, true));
            repository.save(new Product(10,"Xiaomi Mi 14", "Xiaomi Mi 14 with 108MP camera", imageUrl, 55000, 180, true));

        };
    }
}
