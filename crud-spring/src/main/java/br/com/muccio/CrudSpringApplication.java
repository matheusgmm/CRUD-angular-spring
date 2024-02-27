package br.com.muccio;

import br.com.muccio.enums.Category;
import br.com.muccio.model.Course;
import br.com.muccio.model.Lesson;
import br.com.muccio.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	@Profile("dev")
	CommandLineRunner initDatabase(CourseRepository courseRepository) {
		return args -> {
			courseRepository.deleteAll();

			for (int i = 0; i < 20; i++) {

				Course c = new Course();
				c.setName("Angular com Spring " + i);
				c.setCategory(Category.BACKEND);

				Lesson l = new Lesson();
				l.setName("Introdução");
				l.setYoutubeUrl("watch#?v=1");
				l.setCourse(c);
				c.getLessons().add(l);

				Lesson l1 = new Lesson();
				l1.setName("Angular");
				l1.setYoutubeUrl("watch#?v=2");
				l1.setCourse(c);
				c.getLessons().add(l1);

				courseRepository.save(c);
			}
		};
	}
}
