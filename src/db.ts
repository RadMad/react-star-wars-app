import Dexie, { Table } from 'dexie';
import { Character } from './types/types';

export class MyAppDatabase extends Dexie {
  characters!: Table<Character, number>; // number = type of the primkey

  constructor() {
    super('myAppDatabase');
    this.version(1).stores({
      characters: '++id,name,height,mass,hair_color,skin_color,eye_color,birth_year,gender', // Primary key and indexed props
    });
  }
}

export const db = new MyAppDatabase();
