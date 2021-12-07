export const isUndefined = (o: any): o is undefined => {
  const result: boolean = typeof(o) === "undefined";

  return result;
}
