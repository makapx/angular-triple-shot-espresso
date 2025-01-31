import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService){}
  injectHtml = '';
  ngOnInit(): void {
    this.apiService.getPostById('01').subscribe((res) => this.injectHtml = res.content);
  }

}
