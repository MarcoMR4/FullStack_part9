import diaryData from '../../data/entries.json'

import { DiaryEntry, NonSensitiveDiaryEntry } from '../types/dairyEntry';

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};