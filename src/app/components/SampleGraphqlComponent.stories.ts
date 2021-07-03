import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { MockGraphQLModule } from './mock-graphql.module'
import { graphql } from 'msw';
import { SampleGraphqlComponent } from './SampleGraphqlComponent';
import { HttpClientModule } from '@angular/common/http';
export default {
  component: SampleGraphqlComponent,
  decorators: [
    moduleMetadata({
      declarations: [SampleGraphqlComponent],
      imports: [HttpClientModule,MockGraphQLModule],
    }),
  ],
  title: 'Mocking Data with GraphQL',
} as Meta;

const MockTemplate: Story<SampleGraphqlComponent> = (
  args: SampleGraphqlComponent
) => ({
  component: SampleGraphqlComponent,
  props: args,
});

const films = [
  {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: `(Mocked) Rebel spaceships have won their first victory against the evil Galactic Empire.`,
  },
  {
    title: 'Empire Strikes Back',
    episode_id: 5,
    opening_crawl: `(Mocked) Imperial troops are pursuing the Rebel forces across the galaxy.`,
  },
  {
    title: 'Return of the Jedi',
    episode_id: 6,
    opening_crawl: `(Mocked) Luke Skywalker has returned to his home planet of Tatooine to rescue Han Solo.`,
  },
];

export const MockedSuccess = MockTemplate.bind({});
MockedSuccess.parameters = {
  msw: [
    graphql.query('AllFilmsQuery', (req, res, ctx) => {
      return res(
        ctx.data({
          allFilms: {
            films,
          },
        })
      );
    }),
  ],
};

export const MockedError = MockTemplate.bind({});
MockedError.parameters = {
  msw: [
    graphql.query('AllFilmsQuery', (req, res, ctx) => {
      return res(
        ctx.delay(800),
        ctx.errors([
          {
            message: 'Access denied',
          },
        ])
      );
    }),
  ],
};
