export const get = (obj: Record<string, any>, path: string, defaultValue?: any) => {
  const result = String.prototype.split.call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res: any[], key: number) => (res !== null && res !== undefined) ? res[key] : res, obj);

  return (result === undefined || result === obj) ? defaultValue : result;
};
