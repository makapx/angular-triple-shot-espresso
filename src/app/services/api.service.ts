import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * Get posts
   *
   * @returns {Array<Post>} - posts list
   */
  getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.apiUrl}/posts`);
  }

  /**
   * Get post by ID
   *
   * @returns {Post} - posts
   */
  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/post/${postId}`);
  }
}
