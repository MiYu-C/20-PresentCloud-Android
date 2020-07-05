import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Record2Page } from './record2.page';

describe('Record2Page', () => {
  let component: Record2Page;
  let fixture: ComponentFixture<Record2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Record2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Record2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
