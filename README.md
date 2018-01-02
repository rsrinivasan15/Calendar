# Calendar Project
> Server-Side Rendering

Application has isomorphic rendering where the initial render happens on the server and subsequent renders happens at the client.


### Installation
* `npm install` or `yarn`

### Development (Client-side only rendering)
* run `npm run start` which will start `ng serve`

### Production (also for testing SSR/Pre-rendering locally)
**`npm run build:ssr && npm run serve:ssr`** - Compiles your application and spins up a Node Express to serve your Universal application on `http://localhost:4000`.

### run unit tests
```bash
npm run test
```

### run unit tests with coverage
```bash
npm run test:coverage
```

## Application Design

> This application primarily has three components,

1) <b>AppComponent</b> - This is a parent container component and contains only the CalendarComponent
   for now. Having AppComponent might sound like an overkill for the calendar application, but
   I had it in there purely to demonstrate it's use if we were to add more than Calendar feature to
   this application
   
2) <b>CalendarComponent</b> - This is a parent container component that holds other related components for the calendar
   like CalendarMonthChangeComponent and CalendarCellsComponent. This component orchestrates the interaction
   and data between its child components.
   
3) <b>CalendarMonthChangeComponent</b> - This is a pure component responsible for changing the month. It takes in the current
   month and allows the user to increment or decrement the month. It fires an event back when a month is changed.
   
4) <b>CalendarCellsComponent</b> - This is a pure component responsible for rendering the calendar cells with event and date.

> At a high level, <b>CalendarComponent</b> listens to the month change from the <b>CalendarMonthChangeComponent</b>
  and fetches the events for the selected month from <b>CalendarDataService</b> and informs the
  <b>CalendarCellsComponent</b> about this change. <b>CalendarCellsComponent</b> will render the calendar cells
  filled with date and its corresponding events. 
  
> <b>CalendarUtilService</b> is a pure service (that maintains no state), that helps in dealing
  with calendar/date manipulation that way those logic are isolated in a single place.
    