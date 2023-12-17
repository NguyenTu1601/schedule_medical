import EventEmitter3, { ListenerFn } from 'eventemitter3';

export default class EventEmitter extends EventEmitter3 {
  constructor() {
    super();
  }

  public asObservable() {
    const listeners: { type: string; cb: ListenerFn }[] = [];
    const observable = {
      on: (type: string, cb: ListenerFn) => {
        listeners.push({ type, cb });
        this.on(type, cb);
        return observable;
      },
      once: (type: string, cb: ListenerFn) => {
        listeners.push({ type, cb });
        this.once(type, cb);
        return observable;
      },
      removeListener: (type: string, cb: ListenerFn) => {
        this.removeListener(type, cb);
        return observable;
      },
      off: (type: string, cb: ListenerFn) => {
        this.off(type, cb);
        return observable;
      },
      removeAllListener() {
        listeners.forEach(({ type, cb }) => {
          this.off(type, cb);
        });

        listeners.length = 0;
        return observable;
      },
      unsubscribe() {
        return observable.removeAllListener();
      },
      reEmit(eventEmitter: EventEmitter, eventNames: string[]) {
        for (let e of eventNames) {
          observable.on(e, (...args) => {
            eventEmitter.emit(e, ...args);
          });
        }

        return observable;
      }
    };

    return observable;
  }

  public reEmit(e: EventEmitter, eventNames: string[]) {
    const observable = e.asObservable();
    for (const e of eventNames) {
      observable.on(e, (...args) => {
        this.emit(e, ...args);
      });
    }

    return observable;
  }
}
