import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClient]
})
export class AppComponent {
  title = 'd280-project';

  constructor(private http: HttpClient) {}
}
