import { useCalculatorStore } from "../../store/calculatorStore";

const macroConfig = [
  {
    key: "protein",
    label: "Protein",
    color: "bg-blue-500",
    textColor: "text-blue-600 dark:text-blue-400",
    hint: (g) => `≈ ${Math.round(g / 25)} ức gà (100g) hoặc ${Math.round(g / 20)} hộp sữa chua Hy Lạp`,
  },
  {
    key: "carb",
    label: "Carb",
    color: "bg-yellow-400",
    textColor: "text-yellow-600 dark:text-yellow-400",
    hint: (g) => `≈ ${Math.round(g / 45)} chén cơm trắng hoặc ${Math.round(g / 30)} lát bánh mì`,
  },
  {
    key: "fat",
    label: "Fat",
    color: "bg-rose-400",
    textColor: "text-rose-600 dark:text-rose-400",
    hint: (g) => `≈ ${Math.round(g / 14)} muỗng canh dầu ăn hoặc ${Math.round(g / 8)} quả bơ`,
  },
];

export default function MacroBreakdown() {
  const result = useCalculatorStore((s) => s.result);

  if (!result) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Phân bổ Macro
        </h3>
        <span className="text-xs text-zinc-400">mỗi ngày</span>
      </div>

      {/* Progress bar */}
      <div className="mb-5 flex h-3 overflow-hidden rounded-full">
        {macroConfig.map((m) => (
          <div
            key={m.key}
            className={`${m.color} transition-all`}
            style={{ width: `${result.macros[m.key].percentage}%` }}
          />
        ))}
      </div>

      {/* Chi tiết từng macro */}
      <div className="space-y-4">
        {macroConfig.map((m) => {
          const data = result.macros[m.key];
          return (
            <div key={m.key}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${m.color}`} />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {m.label}
                  </span>
                  <span className={`text-xs font-semibold ${m.textColor}`}>
                    {data.percentage}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {data.grams}g
                  </span>
                  <span className="ml-2 text-xs text-zinc-400">{data.calories} kcal</span>
                </div>
              </div>
              <p className="mt-1 pl-5 text-xs text-zinc-400">{m.hint(data.grams)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
