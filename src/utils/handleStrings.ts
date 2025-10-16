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
