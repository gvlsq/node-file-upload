export type FileResponse = {
  originalName: string
  size: Number
};

export const isFileResponse = (o: any): o is FileResponse => {
  const result = o.originalName !== undefined && o.size !== undefined;

  return result;
}

export const isUndefined = (o: any): o is undefined => {
  const result: boolean = typeof(o) === "undefined";

  return result;
}
