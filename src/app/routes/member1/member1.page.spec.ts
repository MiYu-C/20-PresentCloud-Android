import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Member1Page } from './member1.page';

describe('Member1Page', () => {
  let component: Member1Page;
  let fixture: ComponentFixture<Member1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Member1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Member1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
