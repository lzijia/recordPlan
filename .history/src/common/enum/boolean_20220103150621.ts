export enum BooleanEnum {
  true = "true",
  false = "false",
}
export function oppositeBoolean(e: string) {
  let result: string = "false";
  switch (e) {
    case BooleanEnum.true:
      result = BooleanEnum.false;
      break;
    case BooleanEnum.false:
      result = BooleanEnum.true;
      break;
  }
  return result;
}
