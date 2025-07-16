package com.pintter.businessdomain.userservice.services;

import com.pintter.businessdomain.userservice.dto.UserDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements IEmailService {

    private String appBaseUrl;
    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendConfirmationEmail(UserDto userDto) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        String confirmationUrl = "http://localhost:4200/confirm-registration?email=" + userDto.getEmail() + "&username=" + userDto.getUsername() ;;
        String htmlContent = "<h1>Bienvenido a nuestra aplicación</h1>" +
                "<p>Por favor confirma tu registro haciendo clic en el siguiente botón:</p>" +
                "<a href=\"" + confirmationUrl + "\" style=\"" +
                "display: inline-block; padding: 10px 20px; " +
                "background-color: #4CAF50; color: white; " +
                "text-decoration: none; border-radius: 5px;\">" +
                "Confirmar Registro</a>" +
                "<p>Si no has solicitado este registro, ignora este mensaje.</p>";

        helper.setFrom("toninoflash89@gmail.com");
        helper.setTo(userDto.getEmail());
        helper.setSubject("Confirma tu registro");
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }
}
