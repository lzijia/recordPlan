export enum datetimeTypeEnum {
  everyDay = 0,
  everyMonth = 1,
  everyYear = 2,
}
export function datetimeType(e: datetimeTypeEnum) {
  let result: string = "";
  switch (e) {
    case datetimeTypeEnum.everyDay:
      result = "everyDay";
      break;
    case datetimeTypeEnum.everyMonth:
      result = "everyMonth";
      break;
    case datetimeTypeEnum.everyYear:
      result = "everyYear";
      break;
  }
  return result;
}