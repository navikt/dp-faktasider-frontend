// TODO: Fix typing
// @ts-ignore
function getPropertyRecursivlyFromDeepObject<T = any>(value, key: string): Array<T> {
  if (Array.isArray(value)) {
    return value.flatMap((v) => getPropertyRecursivlyFromDeepObject(v, key));
  } else if (value && typeof value === "object") {
    return Object.keys(value)
      .flatMap((currentKey) =>
        currentKey === key ? value[key] : getPropertyRecursivlyFromDeepObject(value[currentKey], key)
      )
      .filter((it) => it);
  }
  return [];
}

export default getPropertyRecursivlyFromDeepObject;
