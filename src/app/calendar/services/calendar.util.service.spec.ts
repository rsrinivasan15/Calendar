import {CalendarUtilService} from "./calendar.util.service";
import * as moment from "moment";

describe('Calendar Util Service', () => {
  let utilService: CalendarUtilService;

  beforeEach(() => {
    utilService = new CalendarUtilService();
  });

  it('when given a moment date, it will return the moment date for first date of month', () => {
    const momentDate = moment('2017-02-23 22:11:12');
    const firstOfMonth = utilService.getMomentForFirstOfMonth(momentDate);
    expect(firstOfMonth.date()).toBe(1);
    expect(firstOfMonth.month()).toBe(1);
    expect(firstOfMonth.year()).toBe(2017);
    expect(firstOfMonth.hour()).toBe(0);
    expect(firstOfMonth.minute()).toBe(0);
    expect(firstOfMonth.second()).toBe(0);
    expect(firstOfMonth.millisecond()).toBe(0);
  });

  it('when given a moment date, it will return the moment for the midnight of the same day', () => {
    const momentDate = moment('2017-02-23 22:11:12');
    const midnight = utilService.getMomentForMidnight(momentDate);
    expect(midnight.date()).toBe(23);
    expect(midnight.month()).toBe(1);
    expect(midnight.year()).toBe(2017);
    expect(midnight.hour()).toBe(0);
    expect(midnight.minute()).toBe(0);
    expect(midnight.second()).toBe(0);
    expect(midnight.millisecond()).toBe(0);
  });
});