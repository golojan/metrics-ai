import { Models } from "@rematch/core";

import { settings } from "./settings";
import { schools } from "./schools";
import { students } from './students';
import { lecturers } from './lecturers';
import { faculties } from './faculties';
import { departments } from './departments';

export interface RootModel extends Models<RootModel> {
  settings: typeof settings;
  schools: typeof schools;
  students: typeof students;
  lecturers: typeof lecturers;
  faculties: typeof faculties;
  departments: typeof departments;
}

export const models: RootModel = {
  settings,
  schools,
  students,
  lecturers,
  faculties,
  departments,
};
