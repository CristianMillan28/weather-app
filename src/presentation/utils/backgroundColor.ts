import {gradients} from '../../constants/gradients';
import { MomentOfDay } from './momentOfDay';

export const getBackgroundGradient = (moment: MomentOfDay): string[] => {
  switch (moment) {
    case MomentOfDay.Night:
      return gradients.night;
    case MomentOfDay.Dawn:
      return gradients.dawn;
    case MomentOfDay.Day:
      return gradients.day;
    case MomentOfDay.Dusk:
      return gradients.dusk;
    default:
      return gradients.day;
  }
};
