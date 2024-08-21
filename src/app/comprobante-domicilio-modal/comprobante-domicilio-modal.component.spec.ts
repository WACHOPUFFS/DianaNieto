import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComprobanteDomicilioModalComponent } from './comprobante-domicilio-modal.component';

describe('ComprobanteDomicilioModalComponent', () => {
  let component: ComprobanteDomicilioModalComponent;
  let fixture: ComponentFixture<ComprobanteDomicilioModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobanteDomicilioModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComprobanteDomicilioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
