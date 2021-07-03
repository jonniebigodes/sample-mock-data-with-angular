import { Component } from '@angular/core';

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
      <h1>Graphql</h1>
      <app-sample-graphql></app-sample-graphql>
    </div>
  `,
})
export class AppComponent  {
  title = 'intro-storybook-angular-template';
}
