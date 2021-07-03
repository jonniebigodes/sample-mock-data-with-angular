import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-sample-graphql',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">There was an error fetching the data!</div>
    <div *ngIf="films">
      <div *ngFor="let film of films">
        <article>
          <h4>{{ film.title }}</h4>
          <p>{{ film.opening_crawl }}</p>
        </article>
      </div>
    </div>
  `,
})
export class SampleGraphqlComponent implements OnInit {
  films: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
        query AllFilmsQuery {
          allFilms {
            films {
              title
              episode_id: episodeID
              opening_crawl: openingCrawl
            }
          }
        }
      `,
    }).valueChanges.subscribe((result:any)=>{
      this.films= result?.data?.allFilms?.films;
      this.loading= result.loading;
      console.log(`result obtained`,result) 
      this.error= result.errors[0].message;  // errors is an array and we're getting the first item only
      console.log(`this.error`,this.error)
    });
  }
}
