import * as moment from 'moment';

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

  private validateModelHydration(id, launchDate, title) {
    if (!id) {
      throw new Error('CalendarEvent needs an id');
    }

    if (!launchDate) {
      throw new Error('CalendarEvent needs an launchDate');
    }

    if (!title) {
      throw new Error('CalendarEvent needs an title');
    }
  }
}