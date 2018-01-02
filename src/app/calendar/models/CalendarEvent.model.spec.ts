import {CalendarEventModel} from "./CalendarEvent.model";
import * as moment from "moment";

describe('CalendarEventModel', () => {

  it('can hydrate the model through constructor', () => {
    let event = new CalendarEventModel({
      id: 'title_1',
      launch_date: '2017-12-1 00:00:00',
      title: 'title1'
    });
    expect(event.id).toBe('title_1');
    expect(event.launch_date).toEqual(moment('2017-12-1 00:00:00'));
    expect(event.title).toBe('title1');
  });

  describe('can validate model hydration and throw error', () => {
    it('if the id is missing', () => {
      expect(() => {new CalendarEventModel({
        id: undefined,
        launch_date: '2017-12-1 00:00:00',
        title: 'title1'
      })}).toThrowError('CalendarEvent needs an id');
    });

    it('if the launch date is missing', () => {
      expect(() => {new CalendarEventModel({
        id: 'id',
        launch_date: undefined,
        title: 'title1'
      })}).toThrowError('CalendarEvent needs a launchDate');
    });

    it('if the title is missing', () => {
      expect(() => {new CalendarEventModel({
        id: 'id',
        launch_date: '2017-12-1 00:00:00',
        title: undefined
      })}).toThrowError('CalendarEvent needs a title');
    });
  });
});