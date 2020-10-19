import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatViewLayoutComponent } from './chat-view-layout.component';

describe('ChatViewComponent', () => {
  let component: ChatViewLayoutComponent;
  let fixture: ComponentFixture<ChatViewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatViewLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatViewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
