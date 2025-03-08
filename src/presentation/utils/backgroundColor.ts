import {MomentOfDay} from './momentOfDay';
import {colors} from '../../constants/colors';

export const getBackgroundColor = (moment: MomentOfDay): string => {
  switch (moment) {
    case MomentOfDay.Night:
      return colors.backgroundNight;
    case MomentOfDay.Dawn:
      return colors.backgroundDawn;
    case MomentOfDay.Day:
      return colors.backgroundDay;
    case MomentOfDay.Dusk:
      return colors.backgroundDusk;
    default:
      return colors.backgroundDay;
  }
};
