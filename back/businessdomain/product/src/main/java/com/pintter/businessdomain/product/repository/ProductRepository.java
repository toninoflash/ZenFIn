/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.product.repository;

import com.pintter.businessdomain.product.dto.ProductDto;
import com.pintter.businessdomain.product.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Pc
 */
public interface ProductRepository  extends JpaRepository<Product, Long> {

    List<Product> findByUid(Long uid);
    List<Product> findByAid(Long aid);

}
