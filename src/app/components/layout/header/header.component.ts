import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink, RouterLinkActive, RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MenubarModule, RouterModule],
  providers: [ RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  protected menuItem = [
    {label: 'Più letti', url : ''},
    {label: 'Categorie', url : '/category'},
    {label: 'Tag', url : '/tag'},
  ];
}
