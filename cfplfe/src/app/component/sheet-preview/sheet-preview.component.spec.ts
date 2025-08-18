import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetPreviewComponent } from './sheet-preview.component';

describe('SheetPreviewComponent', () => {
  let component: SheetPreviewComponent;
  let fixture: ComponentFixture<SheetPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
