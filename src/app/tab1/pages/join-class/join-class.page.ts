import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-join-class',
  templateUrl: './join-class.page.html',
  styleUrls: ['./join-class.page.scss'],
})
export class JoinClassPage implements OnInit {
  public slideIndex: any = 0;
  @ViewChild('classSlides', { static: true }) classSlides: IonSlides;

  ngOnInit() {
    this.classSlides.lockSwipes(true);
  }

  onNext() {
    this.classSlides.lockSwipes(false);
    this.classSlides.slideNext();
    this.slideIndex++;
    this.classSlides.lockSwipes(true);
  }
}