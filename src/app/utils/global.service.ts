import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
public type = 0;
public score = 0;
public starterMusic = new Subject<boolean>()
public gameOver = new Subject<boolean>()
public bulletFire = new Subject<boolean>()

constructor() {}
}
