export enum datetimeTypeEnum {
  everyDay = 0,
  everyMonth = 1,
  everyYear = 2
}
export function datetimeType(e: datetimeTypeEnum) {
  let result: string = "";
  switch (e) {
    case datetimeTypeEnum.block:
      result = "none";
      break;
    case DisplayEnum.none:
      result = "block";
      break;
  }
  return result;
}