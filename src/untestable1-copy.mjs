const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Returns yesterday because of time zones, not a problem if christmas day also does
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25); // Return christmas eve because of time zones, not a problem if today is also -1 day
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
