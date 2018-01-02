import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import * as moment from "moment";

@Injectable()
/**
 * Service to guard from invalid routes.
 */
export class CalendarRouteGuardService {

  constructor(private router: Router) {}

  /**
   * Navigates to the current month.
   */
  private navigateToCurrentMonth() {
    let year = moment().year();
    let month = moment().month() + 1;
    this.router.navigateByUrl(`calendar/${year}/${month}`);
  }

  /**
   * Takes a validate predicate function, if the validation fails
   * it navigates to the current month.
   * @param {Function} validate
   * @returns {boolean}
   */
  private validate(validate: Function) {
    if (!validate()) {
      this.navigateToCurrentMonth();
      return false;
    }
    return true;
  }

  /**
   * Validates the year. Any year greater than 9999 is considered invalid.
   * @param {number} year
   * @returns {boolean}
   */
  private validateYear(year: number) {
    return this.validate(() => year <= 9999);
  }

  /**
   * Validates the month. Any month that is not between 1 & 12 is considered invalid.
   * @param {number} month
   * @returns {boolean}
   */
  private validateMonth(month: number) {
    return this.validate(() => month > 0 && month < 13);
  }

  /**
   * This function will be called by the angular router before navigating to the current route.
   * Returns true if both month and year are valid.
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    const splitUrl = url.split('/');
    let year = parseInt(splitUrl[2], 10);
    let month = parseInt(splitUrl[3], 10);
    return this.validateYear(year) && this.validateMonth(month);
  }
}