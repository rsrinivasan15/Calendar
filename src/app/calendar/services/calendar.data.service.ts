import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CalendarEventModel} from "../models/CalendarEvent.model";

@Injectable()
export class CalendarDataService {

  private calendarEvents: CalendarEventModel[] = [];

  constructor(private http: HttpClient) {
    console.log('service instantiated');
    http
      .get('https://gist.githubusercontent.com/poteto/3512bab1ba42f043d58c077b73ac7697/raw/21f70d78772af8374095632cca274727867202d5/events.json')
      .subscribe((response: any) => {
        console.log('obtained the events:', response.data);
      })
  }
}