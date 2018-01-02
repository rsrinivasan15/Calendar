import * as moment from 'moment';

/**
 * Model to hold a calendar event.
 */
export class CalendarEventModel {
  id: string;
  launch_date: moment.Moment;
  title: string;

  constructor({id, launch_date, title}) {
    this.validateModelHydration(id, launch_date, title);
    this.id = id;
    this.launch_date = moment(launch_date);
    this.title = title;
  }

  /**
   * Throw an error if id, launchDate or title is missing.
   * @param {string} id
   * @param {string} launchDate
   * @param {string} title
   */
  private validateModelHydration(id:string, launchDate:string, title:string) {
    if (!id) {
      throw new Error('CalendarEvent needs an id');
    }

    if (!launchDate) {
      throw new Error('CalendarEvent needs a launchDate');
    }

    if (!title) {
      throw new Error('CalendarEvent needs a title');
    }
  }
}