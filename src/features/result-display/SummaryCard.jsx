import { formatNumber } from "../../common/utils/formatNumber";
import { useCalculatorStore } from "../../store/calculatorStore";
import { APP_CONFIG } from "../../constants/appConfig";

const bmiColorMap = {
  blue:   "text-blue-500 dark:text-blue-400",
  green:  "text-emerald-500 dark:text-emerald-400",
  yellow: "text-yellow-500 dark:text-yellow-400",
  red:    "text-red-500 dark:text-red-400",
};

export default function SummaryCard() {
  const result = useCalculatorStore((s) => s.result);
  const input  = useCalculatorStore((s) => s.input);

  if (!result) {
    return (
      <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
        <p className="text-sm text-zinc-400">Nhập thông tin để xem kết quả</p>
      </div>
    );
  }

  const goalLabel = APP_CONFIG.goals.find((g) => g.value === input.goal)?.label ?? "";

  return (
    <div className="space-y-3">
      {/* Calo mục tiêu — nổi bật nhất */}
      <div className="rounded-xl bg-emerald-500 p-5 text-white">
        <p className="text-sm font-medium opacity-80">Calo mục tiêu mỗi ngày</p>
        <p className="mt-1 text-4xl font-bold tracking-tight">
          {formatNumber(result.targetCalories)}
          <span className="ml-1 text-lg font-normal opacity-80">kcal</span>
        </p>
        <p className="mt-1 text-xs opacity-70">{goalLabel}</p>
      </div>

      {/* TDEE + BMR */}
      <div className="grid grid-cols-2 gap-3">
        <Stat
          label="TDEE"
          value={formatNumber(result.tdee)}
          unit="kcal"
          hint="Tổng calo bạn đốt mỗi ngày khi tính cả vận động"
        />
        <Stat
          label="BMR"
          value={formatNumber(result.bmr)}
          unit="kcal"
          hint="Calo cơ thể cần để duy trì sự sống khi nằm yên"
        />
      </div>

      {/* BMI */}
      <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">Chỉ số BMI <span className="text-zinc-400">(chuẩn châu Á)</span></p>
            <p className="mt-0.5 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{result.bmi}</p>
          </div>
          <span className={`text-sm font-semibold ${bmiColorMap[result.bmiCategory.color]}`}>
            {result.bmiCategory.label}
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, unit, hint }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
      <p className="text-xs font-semibold text-zinc-500">{label}</p>
      <p className="mt-0.5 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {value} <span className="text-xs font-normal text-zinc-400">{unit}</span>
      </p>
      {hint && <p className="mt-1 text-xs leading-relaxed text-zinc-400">{hint}</p>}
    </div>
  );
}
