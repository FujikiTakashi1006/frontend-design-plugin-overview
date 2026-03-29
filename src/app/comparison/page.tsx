import Link from "next/link";

export default function ComparisonPage() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <Link
        href="/"
        className="absolute top-6 left-6 text-sm text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-colors"
      >
        &larr; Home
      </Link>
      <main className="flex flex-col items-center gap-12 py-24 px-8 w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-black dark:text-white text-center">
          Frontend Design Plugin テスト
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center">
          同じIT企業のホームページを、プラグインあり・なしで比較します
        </p>

        <div className="w-full max-w-2xl">
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            使用プロンプト
          </h2>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-zinc-500 font-mono">prompt</span>
            </div>
            <pre className="p-5 text-sm text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
              IT企業のホームページを作成して
            </pre>
          </div>
        </div>

        <div className="flex gap-6 flex-wrap justify-center">
          <Link
            href="/default"
            className="flex h-14 items-center justify-center rounded-xl bg-zinc-900 px-8 text-white font-medium hover:bg-zinc-700 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            プラグインなし
          </Link>
          <Link
            href="/plugin"
            className="flex h-14 items-center justify-center rounded-xl border-2 border-zinc-900 px-8 text-zinc-900 font-medium hover:bg-zinc-900 hover:text-white transition-colors dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            プラグインあり
          </Link>
          <Link
            href="/plugin2"
            className="flex h-14 items-center justify-center rounded-xl border-2 border-zinc-900 px-8 text-zinc-900 font-medium hover:bg-zinc-900 hover:text-white transition-colors dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            プラグインあり 2回目
          </Link>
        </div>
      </main>
    </div>
  );
}
