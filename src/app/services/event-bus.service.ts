import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private bus = new Subject<{ event: string, data: any }>();


  public announce(event: string, data?: any) {
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
