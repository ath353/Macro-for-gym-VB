import useDarkMode from "./common/hooks/useDarkMode";
import CalculatorForm from "./features/calculator-form/CalculatorForm";
import SummaryCard from "./features/result-display/SummaryCard";
import MacroBreakdown from "./features/result-display/MacroBreakdown";

export default function App() {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <div className="min-h-screen bg-zinc-50 transition-colors duration-150 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">MacroVN</h1>
            <p className="text-xs text-zinc-400">Tính TDEE & Macro cho gymer Việt</p>
          </div>
          <button
            type="button"
            onClick={toggleDark}
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form bên trái */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Thông tin của bạn
            </h2>
            <CalculatorForm />
          </section>

          {/* Kết quả bên phải */}
          <section className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Kết quả
            </h2>
            <SummaryCard />
            <MacroBreakdown />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-zinc-400">
        MacroVN · Miễn phí, không cần đăng ký
      </footer>
    </div>
  );
}
