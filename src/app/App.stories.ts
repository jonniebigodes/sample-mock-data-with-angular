import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { rest } from 'msw';
import { AppComponent } from './app.component';
export default {
  component: AppComponent,
  decorators: [
    moduleMetadata({
      declarations: [AppComponent],
      imports: [HttpClientModule],
    }),
  ],
  title: 'Mocking Data with Pages',
} as Meta;

const PageTemplate: Story<AppComponent> = (args: AppComponent) => ({
  component: AppComponent,
  props: args,
});

const TestData = [
  {
    id: 1,
    userID: 1,
    title: 'Something',
    completed: false,
  },
  {
    id: 2,
    userID: 1,
    title: 'Something',
    completed: false,
  },
  {
    id: 3,
    userID: 2,
    title: 'Something',
    completed: false,
  },
  {
    id: 4,
    userID: 2,
    title: 'Something',
    completed: false,
  },
];

export const MockedSuccess = PageTemplate.bind({});
MockedSuccess.parameters = {
  msw: [
    rest.get(
      'https://jsonplaceholder.typicode.com/todos/',
      (_req, res, ctx) => {
        return res(ctx.json(TestData));
      }
    ),
  ],
};

export const MockedError = PageTemplate.bind({});
MockedError.parameters = {
  msw: [
    rest.get(
      'https://jsonplaceholder.typicode.com/todos/',
      (_req, res, ctx) => {
        return res(ctx.delay(800), ctx.status(403));
      }
    ),
  ],
};
