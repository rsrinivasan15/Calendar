import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import * as moment from "moment";

@Injectable()
export class CalendarRouteGuardService {

  constructor(private router: Router) {}

  private navigateToCurrentMonth() {
    let year = moment().year();
    let month = moment().month() + 1;
    this.router.navigateByUrl(`calendar/${year}/${month}`);
  }

  private validateYear(year: number) {
    if (year > 9999) {
      this.navigateToCurrentMonth();
      return false;
    }
    return true;
  }

  private validateMonth(month: number) {
    if (month < 1 || month > 12) {
      this.navigateToCurrentMonth();
      return false;
    }
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    const splitUrl = url.split('/');
    let year = parseInt(splitUrl[2], 10);
    let month = parseInt(splitUrl[3], 10);
    return this.validateYear(year) && this.validateMonth(month);
  }
}