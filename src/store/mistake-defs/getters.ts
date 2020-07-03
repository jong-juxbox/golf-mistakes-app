import {
  MISTAKES, CATEGORIES,
  SHOTS_CATEGORIES_WITH_SUMMARY,
  CURRENT_EDITING_TAB,
  CATEGORIES_WITH_SHOTS,
  DETAILS_FOR_SHOT,
} from './getter-types';
import { MistakeDefsState, MistakeDetails } from './types.d';

export function getDetailsForShot(shotId: number, mistakeDetails: Array<MistakeDetails>) {
  const details = mistakeDetails.filter((detail: MistakeDetails) => detail.mistakeId === shotId);

  const detailsByDate = details.sort((a: MistakeDetails, b: MistakeDetails) =>
    new Date(b.date).getTime() - new Date(a.date).getTime());

  return detailsByDate[0];
}

export function getIndexForShotDetails(details: MistakeDetails,
  mistakeDetails: Array<MistakeDetails>) {
  return mistakeDetails.findIndex((item) =>
    item.mistakeId === details.mistakeId && item.date === details.date);
}

const getters = {
  [MISTAKES](state: MistakeDefsState) {
    return state.mistakeDefs.map((mistake) => {
      const mistakeDetails = getDetailsForShot(mistake.id, state.mistakeDetails);

      return {
        mistakeDef: mistake,
        mistakeDetails,
      };
    });
  },
  [CATEGORIES](state: MistakeDefsState) {
    return state.shotCategories;
  },
  [SHOTS_CATEGORIES_WITH_SUMMARY](state: MistakeDefsState) {
    return state.shotCategories.map((category) => {
      let totalShots = 0;
      let totalMistakes = 0;
      const shots =
        state.mistakeDefs.filter((mistake) => mistake.categoryId === category.id);
      const groupedShots = shots.map((shot) => {
        const details = getDetailsForShot(shot.id, state.mistakeDetails);
        totalShots += details.totalShots || 0;
        totalMistakes += details.totalMistakes || 0;

        return {
          mistakeDef: shot,
          mistakeDetails: details,
        };
      });

      const average = totalShots ? Math.round((totalMistakes / totalShots) * 100) : 0;

      return {
        ...category,
        shots: groupedShots,
        totalShots,
        totalMistakes,
        average,
        active: false,
      };
    });
  },
  [CURRENT_EDITING_TAB](state: MistakeDefsState) {
    return state.currentEditingTab;
  },
  [CATEGORIES_WITH_SHOTS](state: MistakeDefsState) {
    return state.shotCategories.map((category) => {
      const shots =
        state.mistakeDefs.filter((mistake) => mistake.categoryId === category.id);

      const groupedShots = shots.map((shot) => ({
        mistakeDef: shot,
        mistakeDetails: getDetailsForShot(shot.id, state.mistakeDetails),
      }));

      return { ...category, shots: groupedShots, active: false };
    });
  },
  [DETAILS_FOR_SHOT]: (state: MistakeDefsState) => (shotId: number) => {
    getDetailsForShot(shotId, state.mistakeDetails);
  },
};

export default getters;
