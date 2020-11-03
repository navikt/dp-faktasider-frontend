export function recursivlyReplacePropertyInDeepObject(
  obj,
  propertyToReplace: string,
  replaceFunction: (current) => any
) {
  if (Array.isArray(obj)) {
    return obj.map((v) => recursivlyReplacePropertyInDeepObject(v, propertyToReplace, replaceFunction));
  } else if (obj && typeof obj == "object") {
    return Object.keys(obj).reduce((acc, key) => {
      return {
        ...acc,
        [key]:
          key === propertyToReplace
            ? replaceFunction(obj[key])
            : recursivlyReplacePropertyInDeepObject(obj[key], propertyToReplace, replaceFunction),
      };
    }, {});
  }

  return obj;
}
