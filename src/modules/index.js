// ================================================
// MODULE REGISTRY
// To add a new module:
//   1. Create YourModule.jsx in this folder
//   2. Import it below
//   3. Add it to the MODULES object with its segment id
// ================================================

import CultureQuiz from './CultureQuiz';
import ScratchCard  from './ScratchCard';
import CityQuest    from './CityQuest';
import FoodGallery  from './FoodGallery';
import HanfuStyle   from './HanfuStyle';

const MODULES = {
  quiz:    CultureQuiz,
  scratch: ScratchCard,
  map:     CityQuest,
  food:    FoodGallery,
  hanfu:   HanfuStyle,
};

export default MODULES;
