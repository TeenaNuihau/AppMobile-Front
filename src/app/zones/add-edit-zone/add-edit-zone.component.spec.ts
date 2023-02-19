import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditZoneComponent } from './add-edit-zone.component';

describe('AddEditZoneComponent', () => {
  let component: AddEditZoneComponent;
  let fixture: ComponentFixture<AddEditZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
