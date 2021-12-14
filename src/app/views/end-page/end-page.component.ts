import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "src/app/utils/global.service";
@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss']
})
export class EndPageComponent implements OnInit, OnDestroy {
  constructor(public globalService: GlobalService, private router: Router) { }
  backHome() {
    this.globalService.score = 0;
    this.router.navigate(['/']);
  }
  ngOnInit() {
    this.globalService.gameOver.next(true)
  }
  ngOnDestroy() {
    this.globalService.gameOver.next(false)
  }
}
