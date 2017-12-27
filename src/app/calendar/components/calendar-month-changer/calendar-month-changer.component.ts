import {Component, EventEmitter, Input, Output} from "@angular/core";
import * as moment from "moment";

/**
 * Component responsible for,
 * 1) Displaying the current month.
 * 2) Incrementing and decrementing the current month
 */
@Component({
  selector: 'calendar-month-changer',
  templateUrl: './calendar-month-changer.component.html',
  styleUrls: ['./calendar-month-changer.component.scss']
})
export class CalendarMonthChangerComponent {
  @Input() firstDayOfMonth: moment.Moment;
  @Output() firstDayOfMonthChange: EventEmitter<moment.Moment> = new EventEmitter();

  /**
   * Increments by one month.
   */
  incrementMonth() {
    this.firstDayOfMonth.add(1, 'months');
    this.firstDayOfMonthChange.emit(this.firstDayOfMonth);
  }

  /**
   * Decrements by one month
   */
  decrementMonth() {
    this.firstDayOfMonth.subtract(1, 'months');
    this.firstDayOfMonthChange.emit(this.firstDayOfMonth);
  }
}