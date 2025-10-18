export const getFullName = ({
  firstName = '',
  middleName = '',
  lastName = '',
}: {
  firstName: string;
  middleName?: string;
  lastName: string;
}) => {
  return [firstName, middleName, lastName].filter(Boolean).join(' ');
};

export const capitalizeFirst = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
