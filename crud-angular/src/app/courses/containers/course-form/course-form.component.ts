import { Location, NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { CoursesService } from '../../services/courses.service';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatError, MatPrefix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardHeader, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatToolbar, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatHint, NgIf, MatError, MatSelect, MatOption, MatIconButton, MatIcon, NgFor, MatPrefix, MatCardActions, MatButton]
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuild: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
    ) { }

   ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuild.group({
      _id: [course._id],
      name: [course.name, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuild.array(this.retrieveLeassons(course), Validators.required)
    });
   }

   private retrieveLeassons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
   }

   private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuild.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)]]
    });
   }

   getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
   }

   addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
   }

   removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
   }

   onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.onSuccess();
        },
        error: (error) => {
          this.onError();
        }
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }

   }

   onCancel() {
    this.location.back();
   }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }

}
