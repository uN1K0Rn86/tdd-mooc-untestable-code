const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas() {
  const now = new Date(); // Untestable
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Returns yesterday because of time zones
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25); // Return christmas eve because of time zones
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
