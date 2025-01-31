import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
/* import { PostComponent } from './post/post.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component'; */

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Home Page
 /*  { path: 'post/:postId', component: PostComponent },  // Post Page with dynamic postId
  { path: 'category', component: CategoryComponent },  // Category Page
  { path: 'tag', component: TagComponent },  // Tag Page
  { path: '**', redirectTo: '' }  // Wildcard route for undefined paths */
];
