export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
