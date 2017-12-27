import {CalendarUtilService} from "./calendar.util.service";
import * as moment from "moment";

describe('Calendar Util Service', () => {
  let utilService: CalendarUtilService;

  beforeEach(() => {
    utilService = new CalendarUtilService();
  });

  it('when given a moment date, it will return the moment date for first date of month', () => {
    const momentDate = moment('2017-02-23 00:00:00');
    const firstOfMonth = utilService.getMomentForFirstOfMonth(momentDate);
    expect(firstOfMonth.date()).toBe(1);
    expect(firstOfMonth.month()).toBe(1);
    expect(firstOfMonth.year()).toBe(2017);
  });
});