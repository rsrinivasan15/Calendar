import {RouterModule, Routes} from "@angular/router";
import {CalendarComponent} from "./calendar.component";
import {NgModule} from "@angular/core";

const calendarRoutes: Routes = [
  {path: 'calendar', component: CalendarComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(calendarRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CalendarRoutingModule {}