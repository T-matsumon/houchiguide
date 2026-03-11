/*
 * Forum Page - 掲示板ページ
 * Design: 「煌夜の宮廷」
 * 機能: GitHub Discussions連携の掲示板
 * 
 * 【設定方法】
 * 1. GitHubリポジトリでDiscussionsを有効化
 * 2. giscus.app でウィジェットの設定を取得
 * 3. 下記の GISCUS_CONFIG を更新する
 */

import { useEffect, useRef, useState } from 'react';
import { MessageSquare, ExternalLink, Settings, Info } from 'lucide-react';

// ============================================================
// Giscus設定
// GitHub Discussionsと連携するためのgiscusウィジェット設定
// https://giscus.app で設定を取得してください
// ============================================================
const GISCUS_CONFIG = {
  repo: 'YOUR_GITHUB_USERNAME/houchimusume-guide', // ← GitHubリポジトリ名に変更
  repoId: 'YOUR_REPO_ID',                           // ← giscus.appで取得
  category: 'General',
  categoryId: 'YOUR_CATEGORY_ID',                   // ← giscus.appで取得
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top' as const,
  theme: 'dark',
  lang: 'ja',
};

const IS_CONFIGURED = GISCUS_CONFIG.repoId !== 'YOUR_REPO_ID';

export default function Forum() {
  const giscusRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!IS_CONFIGURED || !giscusRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS_CONFIG.repo);
    script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId);
    script.setAttribute('data-category', GISCUS_CONFIG.category);
    script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId);
    script.setAttribute('data-mapping', GISCUS_CONFIG.mapping);
    script.setAttribute('data-reactions-enabled', GISCUS_CONFIG.reactionsEnabled);
    script.setAttribute('data-emit-metadata', GISCUS_CONFIG.emitMetadata);
    script.setAttribute('data-input-position', GISCUS_CONFIG.inputPosition);
    script.setAttribute('data-theme', GISCUS_CONFIG.theme);
    script.setAttribute('data-lang', GISCUS_CONFIG.lang);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    giscusRef.current.appendChild(script);
    setIsLoaded(true);

    return () => {
      if (giscusRef.current) {
        giscusRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="min-h-screen pt-20" style={{ background: 'oklch(0.1 0.025 265)' }}>
      {/* ページヘッダー */}
      <div
        className="py-12 relative overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663420667682/njxy9ShpxNx4dSZTfXTzoo/guide-section-bg-Rbiw7xqRh8ykXSU8pBfA6F.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'oklch(0.06 0.025 265 / 0.88)' }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare size={28} style={{ color: 'oklch(0.72 0.12 75)' }} />
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}
            >
              掲示板
            </h1>
          </div>
          <p style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
            攻略情報の共有・質問・雑談はこちら
          </p>
        </div>
      </div>

      <div className="container py-8">
        {!IS_CONFIGURED ? (
          /* 未設定時の案内 */
          <div>
            <div
              className="p-6 rounded mb-6"
              style={{
                background: 'oklch(0.14 0.025 265)',
                border: '1px solid oklch(0.72 0.12 75 / 0.3)',
                borderLeft: '4px solid oklch(0.72 0.12 75)',
              }}
            >
              <div className="flex items-start gap-3">
                <Settings size={20} style={{ color: 'oklch(0.72 0.12 75)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}
                  >
                    掲示板の設定が必要です
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: 'oklch(0.7 0.015 80)', fontFamily: 'Noto Sans JP, sans-serif', lineHeight: '1.8' }}
                  >
                    掲示板機能はGitHub Discussionsを使用しています。
                    以下の手順で設定してください。
                  </p>
                  <ol
                    className="text-sm space-y-2"
                    style={{ color: 'oklch(0.7 0.015 80)', fontFamily: 'Noto Sans JP, sans-serif', lineHeight: '1.8' }}
                  >
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'oklch(0.72 0.12 75)', fontWeight: 'bold', flexShrink: 0 }}>1.</span>
                      GitHubリポジトリの Settings → Features → Discussions を有効化
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'oklch(0.72 0.12 75)', fontWeight: 'bold', flexShrink: 0 }}>2.</span>
                      <span>
                        <a
                          href="https://giscus.app/ja"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                          style={{ color: 'oklch(0.72 0.12 75)' }}
                        >
                          giscus.app
                        </a>
                        でリポジトリを設定し、repo-id と category-id を取得
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'oklch(0.72 0.12 75)', fontWeight: 'bold', flexShrink: 0 }}>3.</span>
                      <code
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ background: 'oklch(0.18 0.025 265)', color: 'oklch(0.72 0.18 25)' }}
                      >
                        client/src/pages/Forum.tsx
                      </code>
                      の GISCUS_CONFIG を更新
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* プレビュー */}
            <div
              className="p-6 rounded"
              style={{
                background: 'oklch(0.14 0.025 265)',
                border: '1px solid oklch(0.72 0.12 75 / 0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Info size={16} style={{ color: 'oklch(0.72 0.12 75)' }} />
                <h3
                  className="text-sm font-bold"
                  style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}
                >
                  掲示板について
                </h3>
              </div>
              <p
                className="text-sm mb-4"
                style={{ color: 'oklch(0.65 0.015 80)', fontFamily: 'Noto Sans JP, sans-serif', lineHeight: '1.8' }}
              >
                掲示板はGitHub Discussionsを使用しています。
                GitHubアカウントがあれば誰でも投稿・コメントできます。
                攻略情報の共有、質問、雑談などにご利用ください。
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200 hover:opacity-90"
                style={{
                  background: 'oklch(0.72 0.12 75 / 0.15)',
                  color: 'oklch(0.72 0.12 75)',
                  border: '1px solid oklch(0.72 0.12 75 / 0.3)',
                  fontFamily: 'Noto Sans JP, sans-serif',
                }}
              >
                <ExternalLink size={14} />
                GitHubで設定する
              </a>
            </div>
          </div>
        ) : (
          /* giscusウィジェット */
          <div
            className="rounded p-4"
            style={{
              background: 'oklch(0.14 0.025 265)',
              border: '1px solid oklch(0.72 0.12 75 / 0.2)',
            }}
          >
            <div ref={giscusRef} />
          </div>
        )}
      </div>
    </div>
  );
}
