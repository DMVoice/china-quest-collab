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
// import HanfuStyle from './HanfuStyle';  ← uncomment when ready
// import FoodGuide  from './FoodGuide';

const MODULES = {
  quiz:    CultureQuiz,
  scratch: ScratchCard,
  map:     CityQuest,
  // hanfu: HanfuStyle,
  // food:  FoodGuide,
};

export default MODULES;
