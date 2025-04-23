import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherToysFormComponent } from './other-toys-form.component';

describe('OtherToysFormComponent', () => {
  let component: OtherToysFormComponent;
  let fixture: ComponentFixture<OtherToysFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), OtherToysFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherToysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
