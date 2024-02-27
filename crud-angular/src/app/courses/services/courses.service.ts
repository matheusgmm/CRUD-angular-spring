import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Course } from '../model/course';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(
    private httpClient: HttpClient,

    ) { }

  list(page = 0, pageSize = 10) {
    return this.httpClient.get<CoursePage>(this.API, { params: { page, pageSize } })
      .pipe(
        first(),
        // delay(5000),
        tap(courses => console.log(courses))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`)
  }

  save(record: Partial<Course>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record)
    .pipe(
      first()
    );
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record)
      .pipe(
        first()
      );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`)
      .pipe(
        first()
      );
  }
}
