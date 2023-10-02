const removeEmptyValueObj = (obj: Object) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== ''));
};

const isEmptyObj = (obj: Object) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export { removeEmptyValueObj, isEmptyObj };
