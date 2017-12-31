import {CalendarDataService} from "./calendar.data.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as moment from 'moment';
import {CalendarUtilService} from "./calendar.util.service";
import {fakeAsync} from "@angular/core/testing";

describe('Calendar Data Service', () => {
  let dataService: CalendarDataService;
  let calendarUtilService: CalendarUtilService;

  beforeEach(() => {
    let calendarEventResponse = new BehaviorSubject(
    {
      data: [
        {
          id: 'event1',
          launch_date: '2017-01-09 00:00:00',
          title: 'Title 1'
        },
        {
          id: 'event2',
          launch_date: '2017-01-10 00:00:00',
          title: 'Title 2'
        },
        {
          id: 'event3',
          launch_date: '2017-02-21 00:00:00',
          title: 'Title 3'
        },
        {
          id: 'event4',
          launch_date: '2017-03-22 00:00:00',
          title: 'Title 4'
        },
      ]
    });
    let mockHttpClient = jasmine.createSpyObj(['get']);
    mockHttpClient.get.and.returnValue(calendarEventResponse);
    calendarUtilService = new CalendarUtilService();
    dataService = new CalendarDataService(mockHttpClient, calendarUtilService);
  });

  describe('will get events for the month', () => {
    it('can return all the events as a map if a month has multiple events', fakeAsync(() => {
      const firstDayOfMonth = moment('2017-01-01 00:00:00');
      const firstEventMoment = moment('2017-01-09 00:00:00');
      const secondEventMoment = moment('2017-01-10 00:00:00');
      const eventsPromise = dataService.getEventsForMonth(firstDayOfMonth);
      eventsPromise.then((eventsMap) => {
        expect(eventsMap.size).toBe(2);
        expect(eventsMap.get(calendarUtilService.getMomentForMidnight(firstEventMoment).valueOf())[0].id).toBe('event1');
        expect(eventsMap.get(calendarUtilService.getMomentForMidnight(secondEventMoment).valueOf())[0].id).toBe('event2');
      });
    }));

    it('can return a map with one event if a month has one event', fakeAsync(() => {
      const eventDay = moment('2017-02-21 00:00:00');
      const firstDayOfMonth = moment('2017-02-01 00:00:00');
      const eventsPromise = dataService.getEventsForMonth(firstDayOfMonth);
      eventsPromise.then((eventsMap) => {
        expect(eventsMap.size).toBe(1);
        expect(eventsMap.get(calendarUtilService.getMomentForMidnight(eventDay).valueOf())[0].id).toBe('event3');
      });
    }));

    it('can return a map with no elements if there are no events for the month', () => {
      const firstDayOfMonth = moment('2017-04-01 00:00:00');
      const eventsPromise = dataService.getEventsForMonth(firstDayOfMonth);
      eventsPromise.then((eventsMap) => {
        expect(eventsMap.size).toBe(0);
      });
    });
  });
});