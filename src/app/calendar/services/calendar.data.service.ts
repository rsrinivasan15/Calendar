import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CalendarEventModel} from "../models/CalendarEvent.model";
import {CalendarUtilService} from "./calendar.util.service";
import * as moment from "moment";

@Injectable()
export class CalendarDataService {
  private eventToMonthMap: Map<number, Map<number, CalendarEventModel[]>> = new Map();
  private getEventsCallPromise;

  constructor(private http: HttpClient,
              private calendarUtilService: CalendarUtilService) {
    this.getEventsCallPromise = new Promise((resolve, reject) => {
      http
        .get('https://gist.githubusercontent.com/poteto/3512bab1ba42f043d58c077b73ac7697/raw/21f70d78772af8374095632cca274727867202d5/events.json')
        .subscribe((response: any) => {
          response.data.forEach((event) => {
            const eventModel = new CalendarEventModel(event);
            const eventFirstOfMonthUnixTime = calendarUtilService.getMomentForFirstOfMonth(eventModel.launch_date).valueOf();
            const eventMidnightUnixTime = calendarUtilService.getMomentForMidnight(eventModel.launch_date).valueOf();
            if (this.eventToMonthMap.has(eventFirstOfMonthUnixTime)) {
              let monthEvents = this.eventToMonthMap.get(eventFirstOfMonthUnixTime);
              if (monthEvents.has(eventMidnightUnixTime)) {
                monthEvents.get(eventMidnightUnixTime).push(eventModel);
              } else {
                monthEvents.set(eventMidnightUnixTime, [eventModel]);
              }
            } else {
              this.eventToMonthMap.set(eventFirstOfMonthUnixTime, new Map().set(eventMidnightUnixTime, [eventModel]));
            }
          });
          console.log('event to month map:', this.eventToMonthMap);
          resolve();
        }, (error) => {
          reject(error);
        })
    });
  }

  public getEventsForMonth(firstDayOfMonth: moment.Moment): Promise<Map<number, CalendarEventModel[]>> {
    return new Promise((resolve, reject) => {
      this.getEventsCallPromise
        .then(() => {
          resolve(this.eventToMonthMap.get(firstDayOfMonth.valueOf()) || new Map());
        }).catch((error) => {
          reject(error);
        });
    });
  }
}