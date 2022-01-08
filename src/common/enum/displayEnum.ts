export enum DisplayEnum {
  block = "block",
  none = "none",
}
export function oppositeDisplay(e: DisplayEnum) {
  let result: string = "";
  switch (e) {
    case DisplayEnum.block:
      result = "none";
      break;
    case DisplayEnum.none:
      result = "block";
      break;
  }
  return result;
}
