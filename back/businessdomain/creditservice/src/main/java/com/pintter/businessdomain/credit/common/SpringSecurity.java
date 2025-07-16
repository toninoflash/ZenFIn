package com.pintter.businessdomain.credit.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SpringSecurity {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/credit/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/credit/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/credit/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/credit/**").permitAll()
                        .anyRequest().authenticated()
                )
                .build();
    }
}