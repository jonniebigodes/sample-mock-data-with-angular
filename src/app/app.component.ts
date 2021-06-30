import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
@Component({
  selector: 'app-root',
  template: `
    <div>
      <div *ngIf="error"><p>There was an error fetching the data!</p></div>
      <div *ngIf="loading"><p>Fetching data</p></div>
      <div>
        <div *ngFor="let todo of todos">
          <h1>This is a sample component</h1>
          <div>
            <h2>Has the following props and values</h2>
            <div>
              <h3>id: {{ todo.id }}</h3>
              <h3>userId: {{ todo.userId }}</h3>
              <h3>title: {{ todo.title }}</h3>
              <h3>completed:{{ todo.completed }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  title = 'intro-storybook-angular-template';
  todos: Todos[] = [];
  errorMessage: string = '';
  error = false;
  loading = true;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get<any>('https://jsonplaceholder.typicode.com/todos/')
      .subscribe({
        next: (data) => {
          /*  this.todos = data.total; */
          this.loading = false;
          console.log(`data`, data);
          this.todos = data;
        },
        error: (error) => {
          this.error = true;
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
}
