import { isSameWeek } from "date-fns";
import { DELIVERABLE_TAGS } from "../interfaces/deliveries.interface";

export type ImportantThings =
  | DELIVERABLE_TAGS.IMPORTANT
  | DELIVERABLE_TAGS.NOT_IMPORTANT;
export type UrgentThings =
  | DELIVERABLE_TAGS.URGENT
  | DELIVERABLE_TAGS.NOT_URGENT;

const priorityCalc = {
  [DELIVERABLE_TAGS.IMPORTANT]: 2,
  [DELIVERABLE_TAGS.NOT_IMPORTANT]: 0,
  [DELIVERABLE_TAGS.URGENT]: 2,
  [DELIVERABLE_TAGS.NOT_URGENT]: 1,
};

export const makePriority = (deadline: Date, important: boolean) => {
  const urgency: UrgentThings = isSameWeek(deadline, new Date())
    ? DELIVERABLE_TAGS.URGENT
    : DELIVERABLE_TAGS.NOT_URGENT;

  const importance: ImportantThings = important
    ? DELIVERABLE_TAGS.IMPORTANT
    : DELIVERABLE_TAGS.NOT_IMPORTANT;

  return {
    urgency,
    importance,
  };
};

export type ColorMatrixPreferences = {
  do: string;
  prepare: string;
  delegate: string;
  ignore: string;
};

export const getPriorityColor = (
  importance: ImportantThings,
  urgent: UrgentThings,
  color: ColorMatrixPreferences
) => {
  const prio = priorityCalc[importance] + priorityCalc[urgent];
  switch (prio) {
    case 1:
      return color.ignore;
    case 2:
      return color.delegate;
    case 3:
      return color.prepare;
    default:
      return color.do;
  }
};
