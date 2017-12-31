import {Component, ViewChild} from "@angular/core";
import {CalendarDataService} from "./services/calendar.data.service";
import * as moment from "moment";
import {CalendarUtilService} from "./services/calendar.util.service";
import {CalendarCellsComponent} from "./components/calendar-cells/calendar-cells.component";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @ViewChild(CalendarCellsComponent) calendarCellsComponent: CalendarCellsComponent;
  public firstDayOfMonthShownInCalendar: moment.Moment;


  constructor(private calendarDataService: CalendarDataService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private calendarUtilService: CalendarUtilService) {}

  private getCalendarEventsForTheCurrentMonth(firstDayOfMonth: moment.Moment) {
    this
      .calendarDataService
      .getEventsForMonth(firstDayOfMonth)
      .then((events) => {
        this.calendarCellsComponent.notifyMonthAndEventsChange(firstDayOfMonth, events)
      })
  }

  private getYearFromUrl() {
    return this.activatedRoute.snapshot.params.year;
  }

  private getMonthFromUrl() {
    return this.activatedRoute.snapshot.params.month;
  }

  private initializeFromUrl() {
    let year = this.getYearFromUrl();
    let month = (this.getMonthFromUrl() - 1) || 0;
    this.onMonthChange(this.calendarUtilService.getMomentForFirstOfMonth(moment().year(year).month(month)));
  }

  ngOnInit() {
    if (this.getYearFromUrl()) {
      this.initializeFromUrl();
    } else {
      this.setCurrentMonth();
    }
  }

  setCurrentMonth() {
    this.onMonthChange(this.calendarUtilService.getMomentForFirstOfMonth(moment()));
  }

  onMonthChange(firstDayOfMonth: moment.Moment) {
    this.firstDayOfMonthShownInCalendar = firstDayOfMonth;
    this.location.replaceState(`calendar/${firstDayOfMonth.year()}/${firstDayOfMonth.month() + 1}`);
    this.getCalendarEventsForTheCurrentMonth(firstDayOfMonth);
  }







}