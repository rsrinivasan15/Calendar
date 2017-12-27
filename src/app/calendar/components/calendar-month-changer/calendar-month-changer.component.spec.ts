import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import { CalendarMonthChangerComponent  } from './calendar-month-changer.component';
import * as moment from "moment";

describe('Calendar Month Changer Component', () => {
  let component: CalendarMonthChangerComponent;
  let fixture: ComponentFixture<CalendarMonthChangerComponent>;
  let componentElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarMonthChangerComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(CalendarMonthChangerComponent);
    component = fixture.debugElement.componentInstance;
    componentElement = fixture.debugElement.nativeElement;
    component.firstDayOfMonth = moment('2017-01-01 00:00:00');
    fixture.detectChanges();
  }));

  it('will display the month and year', async(() => {
    expect(componentElement.querySelector('.month-year-display').textContent).toContain('January 2017');
  }));

  describe('can increment the month by one and', () => {
    it('update the view', async(() => {
      componentElement.querySelector('.month-change-right-arrow').click();
      fixture.detectChanges();
      expect(componentElement.querySelector('.month-year-display').textContent).toContain('February 2017');
    }));

    it('emit an event to inform the change', () => {
      let emittedValue: moment.Moment;
      component.firstDayOfMonthChange.subscribe(value => emittedValue = value);
      componentElement.querySelector('.month-change-right-arrow').click();
      fixture.detectChanges();
      expect(emittedValue.month()).toBe(1);
      expect(emittedValue.year()).toBe(2017);
    });
  });

  describe('can decrement the month by one and', () => {
    it('update the view', async(() => {
      componentElement.querySelector('.month-change-left-arrow').click();
      fixture.detectChanges();
      expect(componentElement.querySelector('.month-year-display').textContent).toContain('December 2016');
    }));

    it('emit an event to inform the change', () => {
      let emittedValue: moment.Moment;
      component.firstDayOfMonthChange.subscribe(value => emittedValue = value);
      componentElement.querySelector('.month-change-left-arrow').click();
      fixture.detectChanges();
      expect(emittedValue.month()).toBe(11);
      expect(emittedValue.year()).toBe(2016);
    });
  })

});