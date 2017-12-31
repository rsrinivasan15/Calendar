import {RouterModule, Routes} from "@angular/router";
import {CalendarComponent} from "./calendar.component";
import {NgModule} from "@angular/core";
import {CalendarRouteGuardService} from "./calendar-route-guard.service";

const calendarRoutes: Routes = [
  {
    path: 'calendar',
    canActivate: [CalendarRouteGuardService],
    children: [
      {path: ':year', component: CalendarComponent},
      {path: ':year/:month', component: CalendarComponent},
      {path: '', component: CalendarComponent},
    ]
  },

]

@NgModule({
  imports: [
    RouterModule.forChild(calendarRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CalendarRouteGuardService
  ]
})
export class CalendarRoutingModule {}