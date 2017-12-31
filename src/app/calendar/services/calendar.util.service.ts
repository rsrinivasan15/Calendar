import {Injectable} from "@angular/core";
import * as moment from "moment";

@Injectable()
export class CalendarUtilService {
  public getMomentForFirstOfMonth(momentDate: moment.Moment): moment.Moment {
    return momentDate
      .clone()
      .date(1)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
  }

  public getMomentForMidnight(momentDate: moment.Moment): moment.Moment {
    return momentDate
      .clone()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
  }
}