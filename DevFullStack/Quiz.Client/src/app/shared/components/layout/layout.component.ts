import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  standalone: true,
})
export class LayoutComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
