import { APP_CONFIG } from "../../constants/appConfig";

/**
 * Tính macro breakdown từ calo mục tiêu và goal
 * @param {number} targetCalories
 * @param {'cut'|'maintain'|'bulk'} goal
 * @returns {{ protein, carb, fat }} — mỗi field: { grams, calories, percentage }
 */
export function calculateMacros(targetCalories, goal) {
  const ratios = APP_CONFIG.macroRatios[goal] ?? APP_CONFIG.macroRatios.maintain;
  const { calPerGram } = APP_CONFIG;

  const proteinCal = targetCalories * ratios.protein;
  const carbCal    = targetCalories * ratios.carb;
  const fatCal     = targetCalories * ratios.fat;

  return {
    protein: {
      grams:      Math.round(proteinCal / calPerGram.protein),
      calories:   Math.round(proteinCal),
      percentage: Math.round(ratios.protein * 100),
    },
    carb: {
      grams:      Math.round(carbCal / calPerGram.carb),
      calories:   Math.round(carbCal),
      percentage: Math.round(ratios.carb * 100),
    },
    fat: {
      grams:      Math.round(fatCal / calPerGram.fat),
      calories:   Math.round(fatCal),
      percentage: Math.round(ratios.fat * 100),
    },
  };
}
