import Link from "next/link";

export default function DefaultPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-zinc-900 dark:text-white">
            NexTech Solutions
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-600 dark:text-zinc-400">
            <a href="#services" className="hover:text-zinc-900 dark:hover:text-white">サービス</a>
            <a href="#about" className="hover:text-zinc-900 dark:hover:text-white">会社概要</a>
            <a href="#team" className="hover:text-zinc-900 dark:hover:text-white">チーム</a>
            <a href="#contact" className="hover:text-zinc-900 dark:hover:text-white">お問い合わせ</a>
          </nav>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            ← 戻る
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
          テクノロジーで、<br />ビジネスを次のステージへ。
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          NexTech Solutionsは、最先端のテクノロジーを活用し、企業のデジタルトランスフォーメーションを支援するIT企業です。
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="#contact"
            className="inline-flex h-12 items-center px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            お問い合わせ
          </a>
          <a
            href="#services"
            className="inline-flex h-12 items-center px-6 rounded-lg border border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
          >
            サービスを見る
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-zinc-50 dark:bg-zinc-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">サービス</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">お客様のニーズに合わせたソリューションを提供します</p>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Webアプリケーション開発",
                description: "モダンなWeb技術を活用した、スケーラブルなアプリケーションを開発します。",
                icon: "🌐",
              },
              {
                title: "クラウドインフラ構築",
                description: "AWS・Azure・GCPを活用した、最適なクラウドインフラを設計・構築します。",
                icon: "☁️",
              },
              {
                title: "AIソリューション",
                description: "機械学習・自然言語処理を活用した、業務効率化ソリューションを提供します。",
                icon: "🤖",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">会社概要</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                NexTech Solutionsは2018年に設立されたITソリューション企業です。
                「テクノロジーで社会をより良くする」をミッションに、
                Web開発、クラウド構築、AI導入支援を中心に事業を展開しています。
              </p>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                東京を拠点に、大手企業からスタートアップまで、
                幅広いお客様のデジタル化を支援してきました。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "設立", value: "2018年" },
                { label: "従業員数", value: "120名" },
                { label: "取引実績", value: "300社以上" },
                { label: "プロジェクト", value: "500件以上" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4">
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-zinc-50 dark:bg-zinc-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">チーム</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">経験豊富なエンジニアが在籍しています</p>
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {[
              { name: "田中 太郎", role: "CEO / Founder" },
              { name: "佐藤 花子", role: "CTO" },
              { name: "鈴木 一郎", role: "Lead Engineer" },
              { name: "高橋 美咲", role: "Design Lead" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-zinc-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">お問い合わせ</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">お気軽にご連絡ください</p>
          <form className="mt-8 max-w-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">お名前</label>
              <input
                type="text"
                className="mt-1 w-full h-10 rounded-lg border border-zinc-300 px-3 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">メールアドレス</label>
              <input
                type="email"
                className="mt-1 w-full h-10 rounded-lg border border-zinc-300 px-3 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">お問い合わせ内容</label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="h-10 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              送信する
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-500">
          © 2025 NexTech Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
