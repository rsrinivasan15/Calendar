import {Component} from "@angular/core";
import {CalendarDataService} from "./services/calendar.data.service";

@Component({
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent {
  constructor(private calendarDataService: CalendarDataService) {}

  ngOnInit() {
    console.log('Calendar Component is instantiated');
  }
}