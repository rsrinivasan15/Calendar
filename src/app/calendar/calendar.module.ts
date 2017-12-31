import {CalendarComponent} from "./calendar.component";
import {NgModule} from "@angular/core";
import {CalendarRoutingModule} from "./calendar.routing.module";
import {CalendarDataService} from "./services/calendar.data.service";
import {CalendarUtilService} from "./services/calendar.util.service";
import {CalendarMonthChangerComponent} from "./components/calendar-month-changer/calendar-month-changer.component";
import {CalendarCellsComponent} from "./components/calendar-cells/calendar-cells.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarMonthChangerComponent,
    CalendarCellsComponent
  ],
  imports: [
    CalendarRoutingModule,
    BrowserModule
  ],
  providers: [CalendarDataService, CalendarUtilService]
})
export class CalendarModule {}