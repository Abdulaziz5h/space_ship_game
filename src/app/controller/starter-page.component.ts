import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from "src/app/utils/global.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-starter-page',
  templateUrl: '../views/starter-page/starter-page.component.html',
  styleUrls: ['../views/starter-page/starter-page.component.scss']
})
export class StarterPageComponent implements OnInit, OnDestroy {
  infoModel = false
  constructor(public globalService: GlobalService, private router: Router) {}

  startPlay() {
    this.router.navigate(['/start'])
  }
  ngOnInit() {
    this.globalService.starterMusic.next(true)
  }
  ngOnDestroy() {
    this.globalService.starterMusic.next(false)
  }
}
