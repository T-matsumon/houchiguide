/*
 * Footer Component
 * Design: 「煌夜の宮廷」 - 深藍背景 + 金縁ライン
 */

import { Link } from 'wouter';
import { Youtube, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'oklch(0.08 0.02 265)',
        borderTop: '1px solid oklch(0.72 0.12 75 / 0.2)',
      }}
    >
      {/* 金色のトップライン */}
      <div className="crimson-line" />

      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ブランド */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}>
              まつモン
            </h3>
            <p className="text-sm mb-4" style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif', lineHeight: '1.8' }}>
              放置少女の攻略情報・キャラ評価・ダメージ計算を解説するサイトです。
              YouTubeチャンネルも運営中！
            </p>
            <a
              href="https://www.youtube.com/@matsumon_game2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200 hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, oklch(0.48 0.18 25), oklch(0.55 0.2 25))',
                color: 'white',
                fontFamily: 'Noto Sans JP, sans-serif',
              }}
            >
              <Youtube size={16} />
              YouTubeチャンネル
              <ExternalLink size={12} />
            </a>
          </div>

          {/* ナビゲーション */}
          <div>
            <h4 className="text-sm font-bold mb-3" style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}>
              コンテンツ
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'トップページ' },
                { href: '/videos', label: '動画一覧' },
                { href: '/guides', label: '攻略情報' },
                { href: '/characters', label: 'キャラ評価' },
                { href: '/forum', label: '掲示板' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className="text-sm transition-colors duration-200 hover:text-[oklch(0.72_0.12_75)]"
                      style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 免責事項 */}
          <div>
            <h4 className="text-sm font-bold mb-3" style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}>
              免責事項
            </h4>
            <p className="text-xs" style={{ color: 'oklch(0.5 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif', lineHeight: '1.8' }}>
              当サイトは放置少女の非公式ファンサイトです。
              掲載情報はゲームのアップデートにより変更される場合があります。
              正確な情報は公式サイトをご確認ください。
            </p>
            <p className="text-xs mt-3" style={{ color: 'oklch(0.5 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
              「放置少女」は株式会社C4Gamesの登録商標です。
            </p>
          </div>
        </div>

        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{
            borderTop: '1px solid oklch(0.72 0.12 75 / 0.15)',
            color: 'oklch(0.45 0.02 80)',
            fontFamily: 'Noto Sans JP, sans-serif',
          }}
        >
          © 2026 まつモン - 放置少女攻略サイト. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
