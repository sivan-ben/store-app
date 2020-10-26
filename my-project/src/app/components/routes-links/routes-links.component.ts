import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-routes-links',
  templateUrl: './routes-links.component.html',
  styleUrls: ['./routes-links.component.css']
})
export class RoutesLinksComponent implements OnInit {
  @Input() routes;
  constructor() { }

  ngOnInit(): void {
  }

}
