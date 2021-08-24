import { match, __, when, not } from "ts-pattern";
import { isFunction, isDate, isEmpty, isNumber } from "lodash";

const someValue: any = 4;

const isTruthy = (v) => !!v;
const isEven = (v: number) => isNumber(v) && v % 2 === 0;
const isOdd = (v: number) => isNumber(v) && v % 2 !== 0;

const infoAboutInput = match<any, string>(someValue)
  .with(when(isFunction), () => "function")
  .with(when(isDate), () => "date")
  .with(when(isEven), () => "even number")
  .when(isOdd, () => "odd number")
  .with(not(0), () => "not 0")
  .with(when(isEmpty), () => "empty object")
  .with(__.string, () => "is string value")
  .with(__.number, () => "is number value")
  .with(__.boolean, () => "is boolean value")
  .with(when(isTruthy), () => "is truthy value")
  .otherwise(() => `Don't know what this is`);

console.log(infoAboutInput);
