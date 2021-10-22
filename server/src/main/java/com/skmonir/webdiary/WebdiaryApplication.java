package com.skmonir.webdiary;

import com.skmonir.webdiary.model.Category;
import com.skmonir.webdiary.model.User;
import com.skmonir.webdiary.model.Note;
import com.skmonir.webdiary.repository.CategoryRepo;
import com.skmonir.webdiary.repository.NoteRepo;
import com.skmonir.webdiary.repository.UserRepo;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
public class WebdiaryApplication {
	@Autowired
	UserRepo userRepo;

	@Autowired
	CategoryRepo categoryRepo;

	@Autowired
	NoteRepo noteRepo;

	public static void main(String[] args) {
		SpringApplication.run(WebdiaryApplication.class, args);
	}

	@Bean
	InitializingBean sendDatabase() {
		return () -> {
			try {
				userRepo.save(new User("admin", "admin"));
				categoryRepo.save(new Category("admin", "My NoteBook"));
				categoryRepo.save(new Category("admin", "Artwork"));
				categoryRepo.save(new Category("admin", "Travel"));
				categoryRepo.save(new Category("admin", "Recipe"));
				categoryRepo.save(new Category("admin", "Ideas"));
				categoryRepo.save(new Category("admin", "Quotes"));
				categoryRepo.save(new Category("admin", "Research"));
				noteRepo.save(new Note(
						1,
						"admin",
						"Demo Note",
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
						new Date(),
						new Date()
				));
			} catch (Exception e) {
				e.printStackTrace();
			}
		};
	}
}
