function extractDateInfo(date: Date): number[] {
  return [date.getDate(), date.getFullYear()];
}

function isGreaterorEqual(minDate: number[], date: number[]) {
  return minDate[0] <= date[0] && minDate[1] <= date[1];
}
function isLessorEqual(maxDate: number[], date: number[]) {
  return date[0] <= maxDate[0] && date[1] <= maxDate[1];
}
export default function isInRange(date: number, range: number[]) {
  const minDate = extractDateInfo(new Date(range[0]));
  const maxDate = extractDateInfo(new Date(range[1]));
  const toFilterDate = extractDateInfo(new Date(date));

  return (
    isGreaterorEqual(minDate, toFilterDate) &&
    isLessorEqual(maxDate, toFilterDate)
  );
}
