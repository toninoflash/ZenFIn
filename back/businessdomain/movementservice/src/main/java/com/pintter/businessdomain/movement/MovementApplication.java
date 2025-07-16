package com.pintter.businessdomain.movement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class MovementApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovementApplication.class, args);
	}
	@Bean
	@LoadBalanced
	public WebClient.Builder loadBalanceWebClientBuilder() {
		return WebClient.builder();
	}
}
