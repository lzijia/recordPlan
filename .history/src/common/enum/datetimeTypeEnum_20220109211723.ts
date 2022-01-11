export enum DatetimeTypeEnum {
  everyDay = 0,
  everyMonth = 1,
  everyYear = 2,
}
export function datetimeTypeByIndex(e: DatetimeTypeEnum) {
  let result: string = "";
  switch (e) {
    case DatetimeTypeEnum.everyDay:
      result = "everyDay";
      break;
    case DatetimeTypeEnum.everyMonth:
      result = "everyMonth";
      break;
    case DatetimeTypeEnum.everyYear:
      result = "everyYear";
      break;
    default: result = ""; break;
  }
  return result;
}