import {Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';


export class EventBus {
  private bus = new Subject<{event: string, data: any}>();

  public announce(event: string, data?: any) {
    console.log(data);
    this.bus.next({event: event, data: data});
  }

  public listen(event: string): Observable<any> {
    return this.bus.asObservable()
      .pipe(
        filter(item => item.event === event),
        map(item => item.data)
      );
  }
}
