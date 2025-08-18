import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepPreviewComponent } from './prep-preview.component';

describe('PrepPreviewComponent', () => {
  let component: PrepPreviewComponent;
  let fixture: ComponentFixture<PrepPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
