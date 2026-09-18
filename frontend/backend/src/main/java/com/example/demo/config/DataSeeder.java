
package com.example.demo.config;

import com.example.demo.entity.SystemUser;
import com.example.demo.entity.LanguageTrack;
import com.example.demo.repository.SystemUserRepository;
import com.example.demo.repository.LanguageTrackRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {


    @Bean
    CommandLineRunner seedData(SystemUserRepository userRepository,
                               LanguageTrackRepository languageRepository,
                               PasswordEncoder encoder) {

        return args -> {


            // Create Admin User
            if (!userRepository.existsByUsername("admin")) {

                SystemUser admin = new SystemUser();

                admin.setUsername("admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole(SystemUser.Role.ADMIN);

                userRepository.save(admin);
            }



            // Create Languages
            if (languageRepository.count() == 0) {


                LanguageTrack english = new LanguageTrack();

                english.setLanguageName("English");
                english.setDescription("English Language Track");

                languageRepository.save(english);



                LanguageTrack tamil = new LanguageTrack();

                tamil.setLanguageName("Tamil");
                tamil.setDescription("Tamil Language Track");

                languageRepository.save(tamil);



                LanguageTrack hindi = new LanguageTrack();

                hindi.setLanguageName("Hindi");
                hindi.setDescription("Hindi Language Track");

                languageRepository.save(hindi);


                LanguageTrack malayalam = new LanguageTrack();

                malayalam.setLanguageName("Malayalam");
                malayalam.setDescription("Malayalam Language Track");

                languageRepository.save(malayalam);

            }

        };
    }
}