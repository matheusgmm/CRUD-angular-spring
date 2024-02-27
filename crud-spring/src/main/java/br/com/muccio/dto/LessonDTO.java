package br.com.muccio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record LessonDTO(
        Long id,
        @NotNull @NotBlank @Length(min = 5, max = 100) String name,
        @NotNull @NotBlank @Length(min = 10, max = 11) String youtubeUrl
) {
}
