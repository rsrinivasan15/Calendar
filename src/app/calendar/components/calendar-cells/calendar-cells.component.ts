import {Component} from "@angular/core";
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
/**
 * Renders the calendar cells with dates and events based on the month selected.
 */
export class CalendarCellsComponent {

  public calendarCells: CalendarCellView[][];

  /**
   * Called by the parent component when the month and events change.
   * @param {moment.Moment} firstDayOfMonth
   * @param {Map<number, CalendarEventModel[]>} eventsMap
   */
  onMonthAndEventsChange(firstDayOfMonth: moment.Moment, eventsMap: Map<number, CalendarEventModel[]>) {
    this.calendarCells = [];
    let dayOfFirstOfMonth = firstDayOfMonth.day();
    let totalDaysInMonth = firstDayOfMonth.daysInMonth();
    // Decide whether to display 42 cells or 35 cells in the calendar depending on the total days in the month
    // and the day of first of the month.
    let noOfCellsToDisplay = (dayOfFirstOfMonth + totalDaysInMonth) > 35 ? 42 : 35;

    // Build the calendar cell by mapping date to events and disable the cell if it's not valid.
    // Note: Some cells will be invalid if the current month does not have a valid day for a certain
    // day of week. For example, a month might start on Friday, so all the cells on the first row
    // from Sunday - Thursday will be invalid.
    let flatCalendarCells = new Array(noOfCellsToDisplay).fill(0).map((value, index) => {
      let date = (index - dayOfFirstOfMonth) + 1;
      let isDisabled = (index - dayOfFirstOfMonth) < 0 || (index - dayOfFirstOfMonth + 1) > totalDaysInMonth;
      let momentForCurrentDay = firstDayOfMonth.clone().date(date);
      let events = isDisabled ? null : (eventsMap.get(momentForCurrentDay.valueOf()) || []);

      return {
        index,
        date,
        isDisabled,
        events
      }
    });

    // Make it a 2D array, where each row will contain the data for Sunday to Saturday.
    // This transformation is made to make the view rendering logic easier.
    for (let i = 0; i < noOfCellsToDisplay / 7; i++) {
      this.calendarCells.push(flatCalendarCells.slice(i * 7, (i * 7) + 7));
    }
  }
}