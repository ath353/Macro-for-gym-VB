# ARCHITECTURE.md — MacroVN

> Tool tính TDEE & Macro miễn phí dành cho gymer Việt Nam — nhập thông tin, nhận kết quả ngay, không cần đăng ký.  
> Toàn bộ logic chạy client-side, không có backend, không lưu dữ liệu.

---

## 1. Tổng quan dự án

**Định nghĩa:** MacroVN là tool tính TDEE (Total Daily Energy Expenditure) và Macro (Protein/Carb/Fat) miễn phí dành cho gymer Việt Nam — nhập thông tin cơ thể, chọn mục tiêu, nhận kết quả ngay. Không cần đăng ký tài khoản.

**Vấn đề giải quyết:**
- Gymer VN phải tự tính tay hoặc dùng app nước ngoài phức tạp, không có tiếng Việt
- Các tool TDEE tiếng Việt hiện tại đều là tool phụ nhúng trong website bán supplement → UI xấu, không tin tưởng
- Không có tool độc lập, đẹp, dùng ngay cho thị trường VN

**Target user:**
- Người mới bắt đầu tập gym, chưa biết gì về dinh dưỡng
- Người tập trung cấp muốn tối ưu macro để tăng cơ / giảm mỡ
- PT (Personal Trainer) tính cho client

**Core value proposition:**
- Kết quả ngay trong 30 giây
- Không đăng ký, không quảng cáo supplement xung quanh
- UI đẹp, mobile-friendly, kết quả dễ share
- Hiển thị đơn giản cho người mới, chi tiết cho người pro (progressive disclosure)

---

## 2. Triết lý thiết kế

```
Đơn giản > Thông minh
Rõ ràng  > Ngắn gọn
Hoạt động > Hoàn hảo
```

- Ship v1 nhanh, lấy user thật, feedback thật
- Mỗi file chỉ làm **1 việc duy nhất**
- Không hardcode hằng số — tất cả vào `constants/appConfig.js`
- Thiết kế sạch từ đầu để thêm Premium sau không phải viết lại

---

## 3. Tech Stack

| Layer      | Technology          | Lý do                                   |
|------------|---------------------|-----------------------------------------|
| Frontend   | React 18 + Vite     | Nhanh, nhẹ, HMR tốt                     |
| Styling    | TailwindCSS         | Responsive nhanh, không viết CSS riêng  |
| State      | Zustand             | Nhẹ, đơn giản, không boilerplate        |
| Deploy     | Vercel              | Free, auto deploy từ GitHub             |

> **Không có backend** — toàn bộ tính toán chạy trên trình duyệt.  
> **Không có database** — không lưu dữ liệu người dùng (v1).

---

## 4. Cấu trúc thư mục

```
macro-vn/
├── src/
│   ├── features/
│   │   ├── calculator-form/
│   │   │   ├── CalculatorForm.jsx         # Form nhập thông tin chính
│   │   │   ├── CalculatorForm.hook.js     # State + validation logic
│   │   │   └── CalculatorForm.util.js     # Pure helpers cho form
│   │   └── result-display/
│   │       ├── ResultDisplay.jsx          # Hiển thị kết quả TDEE + Macro
│   │       ├── MacroBreakdown.jsx         # Breakdown protein/carb/fat
│   │       └── SummaryCard.jsx            # Card tóm tắt cho người mới
│   │
│   ├── common/
│   │   ├── components/                    # UI tái sử dụng
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   └── Divider.jsx
│   │   ├── hooks/
│   │   │   └── useDarkMode.js             # Toggle dark/light mode
│   │   └── utils/
│   │       ├── tdeeCalculator.js          # Công thức tính TDEE (Mifflin-St Jeor)
│   │       ├── macroCalculator.js         # Công thức tính Macro theo goal
│   │       ├── bmiCalculator.js           # Công thức tính BMI
│   │       └── formatNumber.js            # Format số, calo, gram
│   │
│   ├── constants/
│   │   └── appConfig.js                   # Toàn bộ hằng số — không hardcode ở nơi khác
│   │
│   ├── store/
│   │   └── calculatorStore.js             # Zustand store — state toàn app
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
│   └── favicon.svg
│
├── vercel.json                            # Security headers + config deploy
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── architecture.md                        # File này
```

---

## 5. Core Features

### v1 — Free (ship trước)
- Nhập: giới tính, tuổi, chiều cao, cân nặng, mức độ vận động
- Chọn mục tiêu: giảm cân / giữ nguyên / tăng cơ
- Output:
  - TDEE (calo duy trì)
  - Calo mục tiêu theo goal
  - Macro breakdown: Protein / Carb / Fat (gram & %)
  - BMI + phân loại
- Progressive disclosure: người mới thấy tóm tắt đơn giản, người pro xem chi tiết
- Dark mode
- Responsive mobile-first

### v2 — Mở rộng (sau khi có user)
- Tính BMR riêng biệt
- Hiển thị nhiều phương pháp tính (Mifflin, Harris-Benedict, Katch-McArdle)
- Body fat % input cho kết quả chính xác hơn

### v3 — Premium (khi có lượng user ổn định)
- Lưu & theo dõi kết quả theo thời gian
- Thực đơn mẫu theo macro
- Xuất kết quả PDF để share
- Tính cho nhiều người (PT tính cho nhiều client)

---

## 6. Domain Entities

**UserInput** — thông tin người dùng nhập vào
```
├── gender          'male' | 'female'
├── age             number     — tuổi (15–80)
├── height          number     — chiều cao cm (100–250)
├── weight          number     — cân nặng kg (30–300)
├── activityLevel   string     — mức độ vận động (5 cấp)
└── goal            'cut' | 'maintain' | 'bulk'
```

**CalculationResult** — kết quả tính toán
```
├── bmr             number     — Basic Metabolic Rate (calo cơ bản)
├── tdee            number     — Total Daily Energy Expenditure
├── targetCalories  number     — calo mục tiêu theo goal
├── bmi             number     — Body Mass Index
├── bmiCategory     string     — Gầy / Bình thường / Thừa cân / Béo phì
└── macro
│   ├── protein     { grams, calories, percentage }
│   ├── carb        { grams, calories, percentage }
│   └── fat         { grams, calories, percentage }
```

---

## 7. Công thức tính toán

### BMR — Mifflin-St Jeor (chuẩn nhất hiện tại)
```
Nam:   BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5
Nữ:    BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161
```

### TDEE — Activity Multiplier
```
Ít vận động (ngồi nhiều):           BMR × 1.2
Vận động nhẹ (1-3 ngày/tuần):       BMR × 1.375
Vận động vừa (3-5 ngày/tuần):       BMR × 1.55
Vận động nhiều (6-7 ngày/tuần):     BMR × 1.725
Vận động rất nhiều (2 lần/ngày):    BMR × 1.9
```

### Calo mục tiêu theo goal
```
Giảm cân (cut):      TDEE − 500  (giảm ~0.5kg/tuần)
Giữ nguyên:          TDEE
Tăng cơ (bulk):      TDEE + 300
```

### Macro theo goal
```
Giảm cân:   Protein 40% / Carb 35% / Fat 25%
Giữ nguyên: Protein 30% / Carb 45% / Fat 25%
Tăng cơ:    Protein 30% / Carb 50% / Fat 20%

Quy đổi: Protein 4 cal/g | Carb 4 cal/g | Fat 9 cal/g
```

### BMI
```
BMI = weight(kg) / (height(m))²

< 18.5     Gầy
18.5–22.9  Bình thường
23–24.9    Thừa cân
≥ 25       Béo phì
(Theo chuẩn châu Á)
```

---

## 8. Luồng dữ liệu

```
[1] User điền form
    CalculatorForm.jsx
    → CalculatorForm.hook.js (validate + update state)
    → calculatorStore.js (Zustand — lưu input)
         ↓
[2] Tính toán realtime
    tdeeCalculator.js  → BMR → TDEE → targetCalories
    macroCalculator.js → protein / carb / fat (gram & %)
    bmiCalculator.js   → BMI + category
         ↓
[3] Hiển thị kết quả
    ResultDisplay.jsx
    → SummaryCard.jsx      (tóm tắt đơn giản cho người mới)
    → MacroBreakdown.jsx   (chi tiết cho người pro)
```

---

## 9. Constants — appConfig.js

```javascript
export const APP_CONFIG = {
  name: "MacroVN",
  version: "1.0.0",

  activityLevels: [
    { value: 1.2,   label: "Ít vận động (ngồi nhiều, không tập)" },
    { value: 1.375, label: "Vận động nhẹ (1-3 ngày/tuần)" },
    { value: 1.55,  label: "Vận động vừa (3-5 ngày/tuần)" },
    { value: 1.725, label: "Vận động nhiều (6-7 ngày/tuần)" },
    { value: 1.9,   label: "Vận động rất nhiều (2 lần/ngày)" },
  ],

  goals: [
    { value: "cut",      label: "Giảm cân / Giảm mỡ", calorieAdjust: -500 },
    { value: "maintain", label: "Giữ nguyên cân nặng", calorieAdjust: 0 },
    { value: "bulk",     label: "Tăng cơ / Tăng cân",  calorieAdjust: +300 },
  ],

  macroRatios: {
    cut:      { protein: 0.40, carb: 0.35, fat: 0.25 },
    maintain: { protein: 0.30, carb: 0.45, fat: 0.25 },
    bulk:     { protein: 0.30, carb: 0.50, fat: 0.20 },
  },

  bmiCategories: [
    { max: 18.5, label: "Gầy",         color: "blue" },
    { max: 23,   label: "Bình thường", color: "green" },
    { max: 25,   label: "Thừa cân",    color: "yellow" },
    { max: Infinity, label: "Béo phì", color: "red" },
  ],

  limits: {
    minAge: 15, maxAge: 80,
    minHeight: 100, maxHeight: 250,
    minWeight: 30, maxWeight: 300,
  },
};
```

---

## 10. Bảo mật

> Không có backend, không database, không lưu dữ liệu người dùng — bề mặt tấn công gần như bằng 0.

- Validate toàn bộ input (min/max theo APP_CONFIG.limits)
- Không dùng dangerouslySetInnerHTML
- Không có API key trong project
- vercel.json có đầy đủ security headers

---

## 11. Monetize Roadmap

```
v1 — Free hoàn toàn
  → Ship nhanh, lấy user, lấy feedback

v2 — Vẫn free, thêm tính năng
  → Thêm body fat %, so sánh công thức

v3 — Freemium
  Free:    Tính TDEE + macro cơ bản
  Premium: Lưu lịch sử, thực đơn mẫu, xuất PDF, tính nhiều người
```

---

## 12. Checklist trước khi ship v1

```
□ Công thức tính đúng (test với nhiều case)
□ Validate input đầy đủ (không âm, không quá giới hạn)
□ Responsive đẹp trên iPhone SE (320px)
□ Dark mode không bị lỗi màu
□ npm run build không có lỗi
□ Deploy Vercel thành công
□ Test trên Chrome, Safari, Firefox
□ Test trên Android và iOS
```
