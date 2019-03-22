import { LocalStorage } from './local-storage.service';

describe('LocalStorageService', () => {

  let localStorageService: LocalStorage;

  beforeEach(() => {
    localStorage.clear();

    localStorageService = new LocalStorage();

  });

  it('should serialize', () => {
    const key = 'test';
    const value = { test: 'test' };

    localStorageService.setItem(key, value);

    const result = localStorageService.getItem(key);

    expect(result).toEqual(value);

  });

});
