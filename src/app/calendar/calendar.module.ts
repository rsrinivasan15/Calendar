import {CalendarComponent} from "./calendar.component";
import {NgModule} from "@angular/core";
import {CalendarRoutingModule} from "./calendar.routing.module";
import {CalendarDataService} from "./services/calendar.data.service";

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CalendarRoutingModule
  ],
  providers: [CalendarDataService]
})
export class CalendarModule {}