import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserAreaComponent } from './chat-user-area.component';

describe('ChatUserAreaComponent', () => {
  let component: ChatUserAreaComponent;
  let fixture: ComponentFixture<ChatUserAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatUserAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
