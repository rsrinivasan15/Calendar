import {Component} from "@angular/core";
import {CalendarDataService} from "./services/calendar.data.service";
import * as moment from "moment";
import {CalendarUtilService} from "./services/calendar.util.service";

@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  public firstDayOfMonthShownInCalendar: moment.Moment;
  public daysInMonth: number;
  public monthFirstDayOfWeek: number;

  constructor(private calendarDataService: CalendarDataService,
              private calendarUtilService: CalendarUtilService) {}

  ngOnInit() {
    this.firstDayOfMonthShownInCalendar = this.calendarUtilService.getMomentForFirstOfMonth(moment());
    this.daysInMonth = this.firstDayOfMonthShownInCalendar.daysInMonth();
    this.monthFirstDayOfWeek = this.firstDayOfMonthShownInCalendar.day();
    console.log('Calendar Component is instantiated');
  }





}