import { classInfo } from 'src/app/services/classInfo';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { isNull } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail1',
  templateUrl: './detail1.page.html',
  styleUrls: ['./detail1.page.scss'],
})
export class Detail1Page implements OnInit {
  private classInfo: classInfo = {
      classid: '',
      teachername: '',
      coursename: '',
      classname: '',
      semester: '',
      requirement: '',
      plan: '',
    };
  private role: any;
  constructor(private localService: LocalStorageService,
              private router: Router) {
   }

  ngOnInit() {
    this.role = this.localService.getItem('user').role;
    console.log(this.role);
    if (isNull(this.localService.getItem('classInfo'))) {

    } else {
      this.classInfo = this.localService.getItem('classInfo');
    }

  }

}