import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from './utils/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('audio_music')
  private audio_music: ElementRef;
  @ViewChild('short_laser_gun')
  private short_laser_gun: ElementRef;
  @ViewChild('sad_game_over')
  private sad_game_over: ElementRef;

  // TODO: Decorator pattern
  isMute = true;
  selected = false;
  constructor(private globalService: GlobalService) {}
  ngOnInit() {
    this.globalService.gameOver.subscribe((is) => {
      this.gameOver(is);
    });
    this.globalService.starterMusic.subscribe((is) => {
      this.starterMusic(is);
    });
    this.globalService.bulletFire.subscribe((is) => {
      this.bulletFire(is);
    });
  }
  // TODO: Decorator pattern
  toggleAudio() {
    this.isMute = !this.isMute;
    this.audio_music.nativeElement.muted = this.isMute;
    this.short_laser_gun.nativeElement.muted = this.isMute;
    this.sad_game_over.nativeElement.muted = this.isMute;
  }
  gameOver(is) {
    if (is) {
      this.audio_music.nativeElement.pause();
      this.sad_game_over.nativeElement.play();
    } else {
      this.audio_music.nativeElement.play();
      this.sad_game_over.nativeElement.pause();
    }
    this.audio_music.nativeElement.muted = this.isMute;
    this.sad_game_over.nativeElement.muted = this.isMute;
  }
  starterMusic(is) {
    if (is) {
      this.audio_music.nativeElement.play();
    } else {
      this.audio_music.nativeElement.pause();
    }
    this.audio_music.nativeElement.muted = this.isMute;
  }
  bulletFire(is) {
    if (is) {
      this.short_laser_gun.nativeElement.play();
    } else {
      this.short_laser_gun.nativeElement.pause();
    }
    this.short_laser_gun.nativeElement.muted = this.isMute;
  }
  ngOnDestroy() {
    this.audio_music.nativeElement.pause();
  }
}
