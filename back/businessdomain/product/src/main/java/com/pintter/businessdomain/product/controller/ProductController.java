/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.product.controller;

import com.pintter.businessdomain.product.dto.ProductDto;
import com.pintter.businessdomain.product.entities.Product;
import com.pintter.businessdomain.product.exceptions.BusinessRuleException;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pintter.businessdomain.product.mapper.ProductMapper;
import com.pintter.businessdomain.product.repository.ProductRepository;
import com.pintter.businessdomain.product.services.ProductService;

/**
 *
 * @author Pc
 */
@Slf4j
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductMapper productMapper;
    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        List<ProductDto> listProductDto = productService.getAllProducts();
        if (listProductDto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.ok(listProductDto);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable(name = "id") Long id) {
        
        Optional<Product> opt = productService.getProductById(id);
        if (opt.isPresent()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(productMapper.toDto(opt.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No existe el usuario");
        }
    }


    @GetMapping("/full/{aid}")
    public ResponseEntity<List<ProductDto>> getFull(@PathVariable(name = "aid") Long aid) throws BusinessRuleException {
        List<ProductDto> productDtoList = productService.findByAid(aid);
        if (productDtoList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.ok(productDtoList);
        }
    }


    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductDto productDto) throws BusinessRuleException, UnknownHostException {
        // Convertir DTO a Entidad
        ProductDto product = productService.createProduct(productDto);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable(name = "id") Long id) {
        Optional<Product> find = productRepository.findById(id);
        if (find.isPresent()) {
            ProductDto productDto = productMapper.toDto(find.get());
            productRepository.delete(find.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(productDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable(name="id") Long id, @RequestBody ProductDto productDto) throws BusinessRuleException {
        if (productDto != null) {
            ProductDto dto = productService.updateProduct(id, productDto);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
}
