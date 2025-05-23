function setUTCHoursStart(date?: Date): Date {
  if (!date) date = new Date();
  let lDate = new Date(date);
  lDate.setUTCHours(3, 0, 0, 0);
  return lDate;
}

function setUTCHoursEnd(date?: Date): Date {
  if (!date) date = new Date();
  let lDate = new Date(date);
  lDate.setUTCHours(23, 59, 59, 998);
  return lDate;
}

function dateToBr() {
  // Get current date for Brazil timezone (GMT-3)
  const now = new Date();
  const brasilDate = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  return brasilDate;
}

export const lib = {
  setUTCHoursStart,
  setUTCHoursEnd,
  dateToBr,
};
