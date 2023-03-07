import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdenesComponent } from './list-ordenes.component';

describe('ListOrdenesComponent', () => {
  let component: ListOrdenesComponent;
  let fixture: ComponentFixture<ListOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
