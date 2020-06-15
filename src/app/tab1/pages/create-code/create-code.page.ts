import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-code',
  templateUrl: './create-code.page.html',
  styleUrls: ['./create-code.page.scss'],
})
export class CreateCodePage implements OnInit {

  title = 'app';
  elementType = 'url';
  value = '';

  ngOnInit() {
    this.createCode();
  }
  createCode() {
      const code = '';
      for (let i = 0; i < 6; i++) {
        const code = Math.floor(Math.random() * 10);
        this.value += code.toString();
      }
      console.log(this.value);
      return this.value;
  }
}