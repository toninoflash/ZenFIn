package com.pintter.businessdomain.userservice.services;

import com.pintter.businessdomain.userservice.dto.UserDto;
import jakarta.mail.MessagingException;

public interface IEmailService {
    void sendConfirmationEmail(UserDto user) throws MessagingException;
}
