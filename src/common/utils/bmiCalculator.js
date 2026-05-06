import { APP_CONFIG } from "../../constants/appConfig";

/**
 * Tính BMI
 * @param {number} weight - kg
 * @param {number} height - cm
 * @returns {number}
 */
export function calculateBMI(weight, height) {
  const heightM = height / 100;
  return parseFloat((weight / (heightM * heightM)).toFixed(1));
}

/**
 * Phân loại BMI theo chuẩn châu Á
 * @param {number} bmi
 * @returns {{ label: string, color: string }}
 */
export function getBMICategory(bmi) {
  return (
    APP_CONFIG.bmiCategories.find((cat) => bmi < cat.max) ??
    APP_CONFIG.bmiCategories[APP_CONFIG.bmiCategories.length - 1]
  );
}
