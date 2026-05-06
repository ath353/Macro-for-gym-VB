import { describe, it, expect } from 'vitest'
import { calculateBMR, calculateTDEE, calculateTargetCalories } from '../common/utils/tdeeCalculator'
import { calculateMacros } from '../common/utils/macroCalculator'
import { calculateBMI, getBMICategory } from '../common/utils/bmiCalculator'
import { formatNumber } from '../common/utils/formatNumber'

// ─── BMR ────────────────────────────────────────────────────
describe('calculateBMR', () => {
  it('tính đúng BMR cho nam', () => {
    // 10×68 + 6.25×178 - 5×23 + 5 = 680 + 1112.5 - 115 + 5 = 1682.5
    expect(calculateBMR('male', 68, 178, 23)).toBeCloseTo(1682.5, 0)
  })

  it('tính đúng BMR cho nữ', () => {
    // 10×55 + 6.25×160 - 5×30 - 161 = 550 + 1000 - 150 - 161 = 1239
    expect(calculateBMR('female', 55, 160, 30)).toBeCloseTo(1239, 0)
  })

  it('BMR luôn dương với input hợp lệ', () => {
    expect(calculateBMR('male', 50, 160, 20)).toBeGreaterThan(0)
    expect(calculateBMR('female', 45, 150, 25)).toBeGreaterThan(0)
  })
})

// ─── TDEE ───────────────────────────────────────────────────
describe('calculateTDEE', () => {
  it('tính đúng TDEE với activity 1.55', () => {
    const bmr = 1682.5
    expect(calculateTDEE(bmr, 1.55)).toBe(Math.round(bmr * 1.55))
  })

  it('TDEE lớn hơn BMR', () => {
    const bmr = 1500
    expect(calculateTDEE(bmr, 1.2)).toBeGreaterThan(bmr)
  })

  it('activity cao hơn → TDEE cao hơn', () => {
    const bmr = 1500
    expect(calculateTDEE(bmr, 1.725)).toBeGreaterThan(calculateTDEE(bmr, 1.375))
  })
})

// ─── Target Calories ────────────────────────────────────────
describe('calculateTargetCalories', () => {
  it('giảm cân → TDEE - 500', () => {
    expect(calculateTargetCalories(2500, -500)).toBe(2000)
  })

  it('giữ nguyên → bằng TDEE', () => {
    expect(calculateTargetCalories(2500, 0)).toBe(2500)
  })

  it('tăng cơ → TDEE + 300', () => {
    expect(calculateTargetCalories(2500, 300)).toBe(2800)
  })

  it('không được thấp hơn 1200 kcal', () => {
    expect(calculateTargetCalories(1500, -500)).toBe(1200)
  })
})

// ─── Macro ──────────────────────────────────────────────────
describe('calculateMacros', () => {
  it('tổng % macro phải bằng 100%', () => {
    const macros = calculateMacros(2000, 'maintain')
    const total = macros.protein.percentage + macros.carb.percentage + macros.fat.percentage
    expect(total).toBe(100)
  })

  it('giảm cân: protein 40%, carb 35%, fat 25%', () => {
    const macros = calculateMacros(2000, 'cut')
    expect(macros.protein.percentage).toBe(40)
    expect(macros.carb.percentage).toBe(35)
    expect(macros.fat.percentage).toBe(25)
  })

  it('giữ nguyên: protein 30%, carb 45%, fat 25%', () => {
    const macros = calculateMacros(2000, 'maintain')
    expect(macros.protein.percentage).toBe(30)
    expect(macros.carb.percentage).toBe(45)
    expect(macros.fat.percentage).toBe(25)
  })

  it('tăng cơ: protein 30%, carb 50%, fat 20%', () => {
    const macros = calculateMacros(2000, 'bulk')
    expect(macros.protein.percentage).toBe(30)
    expect(macros.carb.percentage).toBe(50)
    expect(macros.fat.percentage).toBe(20)
  })

  it('tổng calo macro xấp xỉ target calories', () => {
    const target = 2000
    const macros = calculateMacros(target, 'maintain')
    const total = macros.protein.calories + macros.carb.calories + macros.fat.calories
    expect(total).toBeCloseTo(target, -1)
  })

  it('gram protein tính đúng (calo / 4)', () => {
    const macros = calculateMacros(2000, 'maintain')
    expect(macros.protein.grams).toBe(Math.round(macros.protein.calories / 4))
  })

  it('gram fat tính đúng (calo / 9)', () => {
    const macros = calculateMacros(2000, 'maintain')
    expect(macros.fat.grams).toBe(Math.round(macros.fat.calories / 9))
  })
})

// ─── BMI ────────────────────────────────────────────────────
describe('calculateBMI', () => {
  it('tính đúng BMI', () => {
    // 68 / (1.78²) = 68 / 3.1684 ≈ 21.5
    expect(calculateBMI(68, 178)).toBe(21.5)
  })

  it('BMI luôn dương', () => {
    expect(calculateBMI(50, 160)).toBeGreaterThan(0)
  })
})

describe('getBMICategory', () => {
  it('BMI < 18.5 → Gầy', () => {
    expect(getBMICategory(17).label).toBe('Gầy')
  })

  it('BMI 18.5–22.9 → Bình thường', () => {
    expect(getBMICategory(21.5).label).toBe('Bình thường')
  })

  it('BMI 23–24.9 → Thừa cân', () => {
    expect(getBMICategory(24).label).toBe('Thừa cân')
  })

  it('BMI ≥ 25 → Béo phì', () => {
    expect(getBMICategory(27).label).toBe('Béo phì')
  })
})

// ─── formatNumber ────────────────────────────────────────────
describe('formatNumber', () => {
  it('format số có dấu phân cách', () => {
    expect(formatNumber(2609)).toBe('2.609')
  })

  it('format số 0', () => {
    expect(formatNumber(0)).toBe('0')
  })

  it('format null → 0', () => {
    expect(formatNumber(null)).toBe('0')
  })

  it('format NaN → 0', () => {
    expect(formatNumber(NaN)).toBe('0')
  })
})
