/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.roles.repository;

import com.pintter.businessdomain.roles.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Pc
 */
public interface RoleRepository  extends JpaRepository<Role, Long> {

    
}
