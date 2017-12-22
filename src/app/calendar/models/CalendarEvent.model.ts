export class CalendarEventModel {
  id: string;
  launch_date: string;
  title: string;

  constructor({id, launchDate, title}) {
    this.validateModelHydration(id, launchDate, title);
    this.id = id;
    this.launch_date = launchDate;
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