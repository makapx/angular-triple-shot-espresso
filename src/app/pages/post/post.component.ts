import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Post } from '../../types/post';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { ContainerComponent } from '../../components/layout/container/container.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { CommentComponent } from '../../components/comment/comment.component';

@Component({
  selector: 'app-post',
  imports: [
    CommonModule,
    HeaderComponent,
    ContainerComponent,
    BreadcrumbModule,
    DividerModule,
    FieldsetModule,
    SafeHtmlPipe,
    CommentComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  public id: string | null = null;
  protected post: Post | null = null;
  protected breadcrumb: MenuItem[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');

    if (this.id) {
      this.apiService.getPostById(this.id).subscribe((res) => {
        this.post = res;
        this.breadcrumb = [
          {
            label: 'HOME',
          },
          {
            label: 'POSTS',
          },
          {
            label: this.post?.metadata.categories[0].toLocaleUpperCase(),
          },
          {
            label: this.post?.metadata.title.toLocaleUpperCase(),
          },
        ];
      });
    }
  }
}
