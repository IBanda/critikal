/* eslint-disable no-nested-ternary */
const notificationColors = {
  success: 'bg-green-500',
  loading: 'bg-blue-500',
  error: 'bg-red-500',
};
export default function getAlertColor(success: boolean, loading: boolean) {
  return success
    ? notificationColors.success
    : loading
    ? notificationColors.loading
    : notificationColors.error;
}
