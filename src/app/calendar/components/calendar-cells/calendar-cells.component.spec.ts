import {CalendarCellsComponent} from "./calendar-cells.component";
import {CalendarUtilService} from "../../services/calendar.util.service";
import * as moment from "moment";
import {CalendarEventModel} from "../../models/CalendarEvent.model";

describe('CalendarCellsComponent', () => {
  let component: CalendarCellsComponent;
  let calendarUtilService: CalendarUtilService;

  beforeEach(() => {
    component = new CalendarCellsComponent();
    calendarUtilService = new CalendarUtilService();
  });

  it('can prepare calendarCells with events and dates', () => {
    let firstDayOfMonth = calendarUtilService.getMomentForFirstOfMonth(moment('2017-12-12 00:00:00'));
    let event1 = new CalendarEventModel({title: 'event 1', id: 'evt_1', launch_date: '2017-12-12 00:00:00'});
    let event2 = new CalendarEventModel({title: 'event 2', id: 'evt_2', launch_date: '2017-12-14 00:00:00'});
    let eventsMap = new Map();
    eventsMap.set(calendarUtilService.getMomentForMidnight(moment('2017-12-12 00:00:00')).valueOf(), [event1]);
    eventsMap.set(calendarUtilService.getMomentForMidnight(moment('2017-12-14 00:00:00')).valueOf(), [event2]);
    component.onMonthAndEventsChange(firstDayOfMonth, eventsMap);
    expect(component.calendarCells[2][2].events).toEqual([event1]);
    expect(component.calendarCells[2][4].events).toEqual([event2]);
  });

  describe('can render 42 cells or 35 cells depending on the number of days in a month & the day first of the month falls', () => {
    it('by rendering 42 cells if dayOfFirstOfMonth + totalDaysInMonth is greater than 35', () => {
      let firstDayOfMonth = calendarUtilService.getMomentForFirstOfMonth(moment('2017-12-12 00:00:00'));
      let eventsMap = new Map();
      component.onMonthAndEventsChange(firstDayOfMonth, eventsMap);
      expect(component.calendarCells.length).toBe(6);
      expect(component.calendarCells[0].length).toBe(7);
      expect(component.calendarCells[1].length).toBe(7);
      expect(component.calendarCells[2].length).toBe(7);
      expect(component.calendarCells[3].length).toBe(7);
      expect(component.calendarCells[4].length).toBe(7);
      expect(component.calendarCells[5].length).toBe(7);
    });

    it('by rendering 35 cells if dayOfFirstOfMonth + totalDaysInMonth is less than 36', () => {
      let firstDayOfMonth = calendarUtilService.getMomentForFirstOfMonth(moment('2017-09-12 00:00:00'));
      let eventsMap = new Map();
      component.onMonthAndEventsChange(firstDayOfMonth, eventsMap);
      expect(component.calendarCells.length).toBe(5);
      expect(component.calendarCells[0].length).toBe(7);
      expect(component.calendarCells[1].length).toBe(7);
      expect(component.calendarCells[2].length).toBe(7);
      expect(component.calendarCells[3].length).toBe(7);
      expect(component.calendarCells[4].length).toBe(7);
    });
  })
});