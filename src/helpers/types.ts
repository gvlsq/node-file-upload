export const isUndefined = (object: any): object is undefined => {
  return typeof(object) === "undefined";
}
