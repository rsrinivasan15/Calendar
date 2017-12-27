import {CalendarComponent} from "./calendar.component";
import {NgModule} from "@angular/core";
import {CalendarRoutingModule} from "./calendar.routing.module";
import {CalendarDataService} from "./services/calendar.data.service";
import {CalendarUtilService} from "./services/calendar.util.service";
import {CalendarMonthChangerComponent} from "./components/calendar-month-changer/calendar-month-changer.component";

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarMonthChangerComponent
  ],
  imports: [
    CalendarRoutingModule
  ],
  providers: [CalendarDataService, CalendarUtilService]
})
export class CalendarModule {}