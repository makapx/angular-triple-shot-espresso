import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { ApiService } from '../../services/api.service';
import { ContainerComponent } from '../../components/layout/container/container.component';
import { Post } from '../../types/post';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ContainerComponent, CardModule, CommonModule, RouterModule],
  providers: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  protected posts: Array<Post> = [];

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getPosts().subscribe((res) => (this.posts = res));
  }
}
