export const APP_CONFIG = {
  name: "MacroVN",
  version: "1.0.0",

  activityLevels: [
    { value: 1.2,   label: "Ít vận động (ngồi nhiều, không tập)" },
    { value: 1.375, label: "Vận động nhẹ (1–3 ngày/tuần)" },
    { value: 1.55,  label: "Vận động vừa (3–5 ngày/tuần)" },
    { value: 1.725, label: "Vận động nhiều (6–7 ngày/tuần)" },
    { value: 1.9,   label: "Vận động rất nhiều (2 lần/ngày)" },
  ],

  goals: [
    { value: "cut",      label: "Giảm cân",   calorieAdjust: -500 },
    { value: "maintain", label: "Giữ nguyên", calorieAdjust: 0 },
    { value: "bulk",     label: "Tăng cơ",    calorieAdjust: 300 },
  ],

  macroRatios: {
    cut:      { protein: 0.40, carb: 0.35, fat: 0.25 },
    maintain: { protein: 0.30, carb: 0.45, fat: 0.25 },
    bulk:     { protein: 0.30, carb: 0.50, fat: 0.20 },
  },

  // Chuẩn BMI châu Á
  bmiCategories: [
    { max: 18.5,     label: "Gầy",         color: "blue" },
    { max: 23,       label: "Bình thường",  color: "green" },
    { max: 25,       label: "Thừa cân",     color: "yellow" },
    { max: Infinity, label: "Béo phì",      color: "red" },
  ],

  limits: {
    minAge: 15,   maxAge: 80,
    minHeight: 100, maxHeight: 250,
    minWeight: 30,  maxWeight: 300,
  },

  // Calo mỗi gram macro
  calPerGram: {
    protein: 4,
    carb: 4,
    fat: 9,
  },
};
