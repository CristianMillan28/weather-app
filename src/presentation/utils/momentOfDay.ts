export enum MomentOfDay {
  Night = 'night',
  Dawn = 'dawn',
  Day = 'day',
  Dusk = 'dusk',
}

export const getMomentOfDay = (
  current: number,
  sunrise: number,
  sunset: number,
): MomentOfDay => {
  if (current < sunrise) { return MomentOfDay.Night; }
  if (current < sunrise + 3600) { return MomentOfDay.Dawn; }
  if (current < sunset - 3600) { return MomentOfDay.Day; }
  if (current < sunset) { return MomentOfDay.Dusk; }
  return MomentOfDay.Night;
};
