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
/**
 * Parent component that orchestrates the data and interaction between CalendarCellsComponent and
 * CalendarMonthChangerComponent. Notifies the CalendarCellsComponent about the month change and
 * events for the month.
 */
export class CalendarComponent {
  @ViewChild(CalendarCellsComponent) calendarCellsComponent: CalendarCellsComponent;
  public firstDayOfMonthShownInCalendar: moment.Moment;


  constructor(private calendarDataService: CalendarDataService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private calendarUtilService: CalendarUtilService) {}


  /**
   * Gets calendar event for the currently selected month and notifies the CalendarCellsComponent
   * about the events and the month selected.
   * @param {moment.Moment} firstDayOfMonth
   */
  private getAndNotifyCalendarEventsForTheCurrentMonth(firstDayOfMonth: moment.Moment) {
    this
      .calendarDataService
      .getEventsForMonth(firstDayOfMonth)
      .then((events) => {
        this.calendarCellsComponent.onMonthAndEventsChange(firstDayOfMonth, events)
      })
  }

  /**
   * Gets year from the url.
   * @returns {string}
   */
  private getYearFromUrl() {
    return this.activatedRoute.snapshot.params.year;
  }

  /**
   * Gets month from the url.
   * @returns {string}
   */
  private getMonthFromUrl() {
    return this.activatedRoute.snapshot.params.month;
  }

  /**
   * Initializes the component by taking month and year from the url.
   */
  private initializeFromUrl() {
    let year = this.getYearFromUrl();
    let month = (this.getMonthFromUrl() - 1) || 0;
    this.onMonthChange(this.calendarUtilService.getMomentForFirstOfMonth(moment().year(year).month(month)));
  }

  /**
   * Called when the component is initialized. If the month and year is present in the url,
   * it initializes the component from the url. Otherwise it defaults to the current month.
   */
  ngOnInit() {
    if (this.getYearFromUrl()) {
      this.initializeFromUrl();
    } else {
      this.setCurrentMonth();
    }
  }

  /**
   * Sets the month to current month.
   */
  setCurrentMonth() {
    this.onMonthChange(this.calendarUtilService.getMomentForFirstOfMonth(moment()));
  }

  /**
   * Called when month is changed.
   * @param {moment.Moment} firstDayOfMonth
   */
  onMonthChange(firstDayOfMonth: moment.Moment) {
    this.firstDayOfMonthShownInCalendar = firstDayOfMonth;
    this.location.replaceState(`calendar/${firstDayOfMonth.year()}/${firstDayOfMonth.month() + 1}`);
    this.getAndNotifyCalendarEventsForTheCurrentMonth(firstDayOfMonth);
  }

}