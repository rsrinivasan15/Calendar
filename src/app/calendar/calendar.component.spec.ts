import {CalendarComponent} from "./calendar.component";
import {CalendarUtilService} from "./services/calendar.util.service";
import * as moment from "moment";

describe('Calendar Component', () => {
  let component: CalendarComponent;
  let mockCalendarDataService;
  let mockActivatedRoute;
  let urlParams;
  let mockLocation;
  let calendarUtilService;


  beforeEach(() => {
    let eventsPromise = new Promise((resolve, reject) => {
      resolve('events')
    });
    mockCalendarDataService = {
      getEventsForMonth: jasmine.createSpy('getEventsForMonth').and.returnValue(eventsPromise)
    };
    urlParams = {
      year: '2017',
      month: '12'
    };
    mockActivatedRoute = {snapshot: {params: urlParams}};
    mockLocation = {
      replaceState: jasmine.createSpy('replaceState')
    };
    calendarUtilService = new CalendarUtilService();
    component = new CalendarComponent(mockCalendarDataService, mockActivatedRoute, mockLocation, calendarUtilService);
    component.calendarCellsComponent = {
      onMonthAndEventsChange: jasmine.createSpy('onMonthAndEventsChange'),
      calendarCells: null
    }
  });

  describe('can handle year and month in the url', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('will set the firstDayOfMonthShownInCalendar from url', () => {
      expect(component.firstDayOfMonthShownInCalendar)
        .toEqual(calendarUtilService.getMomentForFirstOfMonth(moment().year(2017).month(11)))
    });

    it('will get the calendar events for the month and year in the url', () => {
      expect(mockCalendarDataService.getEventsForMonth)
        .toHaveBeenCalledWith(calendarUtilService.getMomentForFirstOfMonth(moment().year(2017).month(11)));
    });
  });

  describe('can handle if no year and month mentioned in the url', () => {
    beforeEach(() => {
      urlParams.year = undefined;
      urlParams.month = undefined;
      component.ngOnInit();
    });

    it('will set the firstDayOfMonthShownInCalendar to current month', () => {
      expect(component.firstDayOfMonthShownInCalendar)
        .toEqual(calendarUtilService.getMomentForFirstOfMonth(moment()));
    });

    it('will get the calendar events for the current month', () => {
      expect(mockCalendarDataService.getEventsForMonth)
        .toHaveBeenCalledWith(calendarUtilService.getMomentForFirstOfMonth(moment()));
    });
  });

  describe('can handle if a month is changed and', () => {
    let firstDayOfMonth;

    beforeEach(() => {
      firstDayOfMonth = calendarUtilService.getMomentForFirstOfMonth(moment());
      component.onMonthChange(firstDayOfMonth);
    });

    it('can set firstDayOfMonthShownInCalendar', () => {
      expect(component.firstDayOfMonthShownInCalendar).toBe(firstDayOfMonth);
    });

    it('can change the url to contain the correct year and month', () => {
      expect(mockLocation.replaceState).toHaveBeenCalledWith(`calendar/${firstDayOfMonth.year()}/${firstDayOfMonth.month() + 1}`);
    });
  })
})