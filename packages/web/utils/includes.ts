export default function includes(arrayA: string[], arrayB: string[]) {
  const lowerCaseArrayA = arrayA.map((item) => item.toLowerCase());
  const lowerCaseArrayB = arrayB.map((item) => item.toLowerCase());

  const sharedItems = lowerCaseArrayA.filter((item) => {
    let isContained = false;
    lowerCaseArrayB.forEach((itemB) => {
      if (itemB.includes(item)) {
        isContained = true;
      }
    });
    return isContained;
  });
  return sharedItems;
}
