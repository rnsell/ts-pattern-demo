import { match, __, when, not } from "ts-pattern";
import { isFunction, isDate, isEmpty, isNumber } from "lodash";

(async () => {
  const someValue: any = 4;

  const infoAboutInput = await match<any, Promise<string>>(someValue)
    .with(when(isFunction), async () => "function")
    .otherwise(async () => "not a function");

  console.log(infoAboutInput);
})();
