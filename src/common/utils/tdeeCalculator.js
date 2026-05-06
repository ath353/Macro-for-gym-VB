/**
 * Tính BMR theo công thức Mifflin-St Jeor (chuẩn nhất hiện tại)
 * @param {'male'|'female'} gender
 * @param {number} weight - kg
 * @param {number} height - cm
 * @param {number} age - tuổi
 * @returns {number} BMR (calo/ngày)
 */
export function calculateBMR(gender, weight, height, age) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

/**
 * Tính TDEE từ BMR × activity multiplier
 * @param {number} bmr
 * @param {number} activityLevel - hệ số (1.2 → 1.9)
 * @returns {number} TDEE (calo/ngày)
 */
export function calculateTDEE(bmr, activityLevel) {
  return Math.round(bmr * activityLevel);
}

/**
 * Tính calo mục tiêu theo goal
 * @param {number} tdee
 * @param {number} calorieAdjust - số calo +/- từ appConfig.goals
 * @returns {number}
 */
export function calculateTargetCalories(tdee, calorieAdjust) {
  return Math.max(1200, tdee + calorieAdjust);
}
