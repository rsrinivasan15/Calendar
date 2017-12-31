import {Component, ElementRef, Input} from "@angular/core";
import * as moment from "moment";
import {CalendarEventModel} from "../../models/CalendarEvent.model";

interface CalendarCellView {
  index: number;
  date: number;
  isDisabled: boolean;
  events: CalendarEventModel[]
}

@Component({
  selector: 'calendar-cells',
  templateUrl: './calendar-cells.component.html',
  styleUrls: ['./calendar-cells.component.scss']
})
export class CalendarCellsComponent {

  public showSpinner = false;
  public calendarCells: CalendarCellView[][];

  notifyMonthAndEventsChange(firstDayOfMonth: moment.Moment, eventsMap: Map<number, CalendarEventModel[]>) {
    this.calendarCells = [];
    console.log('change notified for:', firstDayOfMonth.format('MMMM'));
    let dayOfFirstOfMonth = firstDayOfMonth.day();
    let totalDaysInMonth = firstDayOfMonth.daysInMonth();
    let noOfCellsToDisplay = (dayOfFirstOfMonth + totalDaysInMonth) > 35 ? 42 : 35;
    let flatCalendarCells = new Array(noOfCellsToDisplay).fill(0).map((value, index) => {
      let date = (index - dayOfFirstOfMonth) + 1;
      let isDisabled = (index - dayOfFirstOfMonth) < 0 || (index - dayOfFirstOfMonth + 1) > totalDaysInMonth;
      let momentForCurrentDay = firstDayOfMonth.clone().date(date)
      let events = isDisabled ? null : (eventsMap.get(momentForCurrentDay.valueOf()) || []);

      return {
        index,
        date,
        isDisabled,
        events
      }
    });
    for (let i = 0; i < noOfCellsToDisplay / 7; i++) {
      this.calendarCells.push(flatCalendarCells.slice(i * 7, (i * 7) + 7));
    }
    console.log('calendarCells:', this.calendarCells);
  }
}