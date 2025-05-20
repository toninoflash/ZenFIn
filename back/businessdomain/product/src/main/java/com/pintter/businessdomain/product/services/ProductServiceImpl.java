/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.product.services;


import com.pintter.businessdomain.product.dto.MovementDto;
import com.pintter.businessdomain.product.dto.ProductDto;
import com.pintter.businessdomain.product.entities.Product;
import com.pintter.businessdomain.product.exceptions.BusinessRuleException;
import com.pintter.businessdomain.product.transactions.BusinessTransactions;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.pintter.businessdomain.product.mapper.ProductMapper;
import com.pintter.businessdomain.product.repository.ProductRepository;

/**
 *
 * @author Pc
 */
@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private BusinessTransactions businessTransactions;
    // Add any required dependencies here (e.g., repositories, mappers)

    @Override
    public List<ProductDto> getAllProducts() {
        List<ProductDto> listProductDto = productMapper.toDtoList(productRepository.findAll());

        return listProductDto;
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        Optional<Product> opt = productRepository.findById(id);
        return opt;
    }

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        Product product = productMapper.toEntity(productDto);
        product = productRepository.save(product);
        MovementDto movementDto = new MovementDto();
        movementDto.setUid(product.getUid());
        movementDto.setCreatedAt(product.getCreatedAt());
        movementDto.setAid(product.getAid());
        movementDto.setCuota(product.getCuota());
        movementDto.setCurrency(product.getCurrency());
        movementDto.setName(product.getName());
        movementDto.setType(product.getType());
        movementDto.setProgram(product.getProgram());
        movementDto = businessTransactions.createMovement(movementDto);

        return productMapper.toDto(product);
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto productDto) throws BusinessRuleException {
        // Implementation here
        Optional<Product> opt = productRepository.findById(id);
        log.info("resRole:::::::" + opt.get());
        Product resProduct = productMapper.toOptional(opt);
        log.info("resRole:::::::" + resProduct);

        if (resProduct != null) {
            resProduct = productMapper.toEntity(productDto);
            resProduct.setId(id);
            

        } else {
            BusinessRuleException businessRuleException = new BusinessRuleException("0002", "Error validación. Transacion no localizada. ", HttpStatus.PRECONDITION_FAILED);
            throw businessRuleException;
        }
        log.info("resRole:::::::" + resProduct);
        ProductDto save = productMapper.toDto(productRepository.save(resProduct));
        return save;
    }

    @Override
    public void deleteProduct(Long id) {
        // Implementation here
    }

    @Override
    public  List<ProductDto> findByUid(Long uid) {
        return productMapper.toDtoList(productRepository.findByUid(uid));
    }
    @Override
    public  List<ProductDto> findByAid(Long aid) {
        return productMapper.toDtoList(productRepository.findByAid(aid));
    }
}
