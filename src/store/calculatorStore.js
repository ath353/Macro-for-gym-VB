import { create } from "zustand";
import { APP_CONFIG } from "../constants/appConfig";
import { calculateBMR, calculateTDEE, calculateTargetCalories } from "../common/utils/tdeeCalculator";
import { calculateMacros } from "../common/utils/macroCalculator";
import { calculateBMI, getBMICategory } from "../common/utils/bmiCalculator";

const defaultInput = {
  gender: "male",
  age: "",
  height: "",
  weight: "",
  activityLevel: 1.55,
  goal: "maintain",
};

function isValidInput(input) {
  const { age, height, weight } = input;
  const { limits } = APP_CONFIG;

  const a = Number(age);
  const h = Number(height);
  const w = Number(weight);

  if (!a || !h || !w) return false;
  if (a < limits.minAge    || a > limits.maxAge)    return false;
  if (h < limits.minHeight || h > limits.maxHeight) return false;
  if (w < limits.minWeight || w > limits.maxWeight) return false;

  return true;
}

function computeResult(input) {
  const { gender, age, height, weight, activityLevel, goal } = input;

  if (!isValidInput(input)) return null;

  const a = Number(age);
  const h = Number(height);
  const w = Number(weight);

  const goalConfig = APP_CONFIG.goals.find((g) => g.value === goal);
  const calorieAdjust = goalConfig?.calorieAdjust ?? 0;

  const bmr            = Math.round(calculateBMR(gender, w, h, a));
  const tdee           = calculateTDEE(bmr, activityLevel);
  const targetCalories = calculateTargetCalories(tdee, calorieAdjust);
  const macros         = calculateMacros(targetCalories, goal);
  const bmi            = calculateBMI(w, h);
  const bmiCategory    = getBMICategory(bmi);

  return { bmr, tdee, targetCalories, macros, bmi, bmiCategory };
}

export const useCalculatorStore = create((set, get) => ({
  input: defaultInput,
  result: null,

  updateInput: (fields) => {
    const nextInput = { ...get().input, ...fields };
    const result = computeResult(nextInput);
    set({ input: nextInput, result });
  },

  reset: () => set({ input: defaultInput, result: null }),
}));
