import { useCalculatorStore } from "../../store/calculatorStore";
import { APP_CONFIG } from "../../constants/appConfig";

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100";

const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400";

export default function CalculatorForm() {
  const { input, updateInput, reset } = useCalculatorStore();

  return (
    <div className="space-y-6">
      {/* Giới tính */}
      <div>
        <p className={labelClass}>Giới tính</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "male",   label: "Nam" },
            { value: "female", label: "Nữ" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateInput({ gender: opt.value })}
              className={`rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                input.gender === opt.value
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tuổi / Chiều cao / Cân nặng */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { field: "age",    label: "Tuổi",      unit: "tuổi", min: 15,  max: 80 },
          { field: "height", label: "Chiều cao", unit: "cm",   min: 100, max: 250 },
          { field: "weight", label: "Cân nặng",  unit: "kg",   min: 30,  max: 300 },
        ].map(({ field, label, unit, min, max }) => {
          const val = Number(input[field]);
          const hasValue = input[field] !== "";
          const isInvalid = hasValue && (val < min || val > max);
          return (
            <div key={field}>
              <label className={labelClass}>{label}</label>
              <div className="relative">
                <input
                  type="number"
                  min={min}
                  max={max}
                  value={input[field]}
                  onChange={(e) => updateInput({ [field]: e.target.value })}
                  placeholder="—"
                  className={
                    inputClass +
                    " pr-10 " +
                    (isInvalid
                      ? "border-red-400 focus:border-red-400"
                      : "focus:border-emerald-500")
                  }
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
                  {unit}
                </span>
              </div>
              {isInvalid && (
                <p className="mt-1 text-xs text-red-500">{min}–{max}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Mức độ vận động */}
      <div>
        <label className={labelClass}>Mức độ vận động</label>
        <select
          value={input.activityLevel}
          onChange={(e) => updateInput({ activityLevel: Number(e.target.value) })}
          className={inputClass}
        >
          {APP_CONFIG.activityLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mục tiêu */}
      <div>
        <p className={labelClass}>Mục tiêu</p>
        <div className="grid grid-cols-3 gap-2">
          {APP_CONFIG.goals.map((goal) => (
            <button
              key={goal.value}
              type="button"
              onClick={() => updateInput({ goal: goal.value })}
              className={`rounded-lg border py-2.5 text-xs font-medium transition-colors ${
                input.goal === goal.value
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={reset}
        className="w-full rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
      >
        Đặt lại
      </button>
    </div>
  );
}
