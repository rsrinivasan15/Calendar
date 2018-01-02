import {CalendarRouteGuardService} from "./calendar-route-guard.service";
import * as moment from "moment";

describe('CalendarRouteGuardService', () => {
  let guardService;
  let mockRouter;

  beforeEach(() => {
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    guardService = new CalendarRouteGuardService(mockRouter);
  });

  it('will return true if the year and month is valid', () => {
    let state = {url: '/calendar/9999/1'};
    expect(guardService.canActivate({}, state)).toBe(true);
  });

  describe('will return false if the routes are not valid', () => {
    it('if the year is valid and month is greater than 12', () => {
      let state = {url: '/calendar/9999/13'};
      expect(guardService.canActivate({}, state)).toBe(false);
    });

    it('if the year is valid and month is less than than 0', () => {
      let state = {url: '/calendar/9999/-1'};
      expect(guardService.canActivate({}, state)).toBe(false);
    });

    it('if the year is greater than 9999 but the month is valid', () => {
      let state = {url: '/calendar/10000/1'};
      expect(guardService.canActivate({}, state)).toBe(false);
    });
  });

  it('will redirect to current year and month if the year or month is invalid', () => {
    let state = {url: '/calendar/10000/1'};
    guardService.canActivate({}, state);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`calendar/${moment().year()}/${moment().month() + 1}`);
  });
});