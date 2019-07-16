import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutFooterComponent } from '@app/shared/layouts/main-layout-footer/main-layout-footer.component';


describe('MainLayoutFooterComponent', () => {
  let component: MainLayoutFooterComponent;
  let fixture: ComponentFixture<MainLayoutFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
