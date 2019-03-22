import { Injectable, Inject } from '@angular/core';
import { PREFIX } from 'projects/local-storage/src/lib/tokens';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  constructor(@Inject(PREFIX) private prefix = '') {}

  getItem(index: string): unknown {

    let value = null;

    try {
      const unparsedValue = localStorage.getItem(index);
      value = unparsedValue ? JSON.parse(unparsedValue) : null;
    } catch (error) {
      value = null;
    }

    return value;

  }

  setItem(index: string, value: any): void {

    localStorage.setItem(index, JSON.stringify(value));

  }

  removeItem(index: string): void {

    localStorage.removeItem(index);

  }

  clear(): void {

    localStorage.clear();

  }

}
