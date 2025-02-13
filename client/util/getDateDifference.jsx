export const getDateDifference = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - createdAtDate;
  return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
};
