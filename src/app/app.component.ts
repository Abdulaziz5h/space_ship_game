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
  @ViewChild('spaceship')
  private spaceship: ElementRef;
  @ViewChild('whoosh_fee')
  private whoosh_fee: ElementRef;

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
    this.globalService.spaceship.subscribe((is) => {
      this.spaceshipSound(is);
    });
    this.globalService.whoosh_fee.subscribe((is) => {
      this.set_whoosh_fee(is);
    });

  }
  // TODO: Decorator pattern
  toggleAudio() {
    this.isMute = !this.isMute;
    this.audio_music.nativeElement.muted = this.isMute;
    this.short_laser_gun.nativeElement.muted = this.isMute;
    this.sad_game_over.nativeElement.muted = this.isMute;
    this.spaceship.nativeElement.muted = this.isMute;
    this.whoosh_fee.nativeElement.muted = this.isMute;
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
  spaceshipSound(is) {
    if (is) {
      this.spaceship.nativeElement.play();
    } else {
      this.spaceship.nativeElement.pause();
    }
    this.spaceship.nativeElement.muted = this.isMute;
  }
  bulletFire(is) {
    this.short_laser_gun.nativeElement.volume  = 0.5
    if (is) {
      this.short_laser_gun.nativeElement.play();
    } else {
      this.short_laser_gun.nativeElement.pause();
    }
    this.short_laser_gun.nativeElement.muted = this.isMute;
  }
  set_whoosh_fee(is) {
    this.whoosh_fee.nativeElement.volume  = 0.5
    if (is) {
      this.whoosh_fee.nativeElement.play();
    } else {
      this.whoosh_fee.nativeElement.pause();
    }
    this.whoosh_fee.nativeElement.muted = this.isMute;
  }
  ngOnDestroy() {
    this.audio_music.nativeElement.pause();
  }
}
