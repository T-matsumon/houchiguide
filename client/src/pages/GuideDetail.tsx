/*
 * GuideDetail Page - 攻略記事詳細ページ
 * Design: 「煌夜の宮廷」
 * 機能: Markdown記事表示、関連記事
 */

import { useParams, Link } from 'wouter';
import { ArrowLeft, Crown, Calendar, Tag, BookOpen } from 'lucide-react';
import { Streamdown } from 'streamdown';
import { SAMPLE_GUIDES, CATEGORY_ICONS } from '@/lib/data';
import GuideCard from '@/components/GuideCard';

export default function GuideDetail() {
  const { id } = useParams<{ id: string }>();
  const guide = SAMPLE_GUIDES.find((g) => g.id === id);

  if (!guide) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: 'oklch(0.1 0.025 265)' }}>
        <div className="text-center">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'oklch(0.4 0.02 80)' }} />
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}>
            記事が見つかりません
          </h2>
          <Link href="/guides">
            <button
              className="mt-4 px-4 py-2 rounded text-sm"
              style={{
                background: 'oklch(0.72 0.12 75)',
                color: 'oklch(0.1 0.025 265)',
                fontFamily: 'Noto Sans JP, sans-serif',
              }}
            >
              攻略情報一覧へ戻る
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedGuides = SAMPLE_GUIDES
    .filter((g) => g.id !== guide.id && g.category === guide.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-20" style={{ background: 'oklch(0.1 0.025 265)' }}>
      <div className="container py-8">
        {/* パンくずリスト */}
        <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'oklch(0.55 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
          <Link href="/">
            <span className="hover:text-[oklch(0.72_0.12_75)] transition-colors cursor-pointer">トップ</span>
          </Link>
          <span>/</span>
          <Link href="/guides">
            <span className="hover:text-[oklch(0.72_0.12_75)] transition-colors cursor-pointer">攻略情報</span>
          </Link>
          <span>/</span>
          <span style={{ color: 'oklch(0.72 0.12 75)' }} className="line-clamp-1">{guide.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            <article
              className="rounded p-6 md:p-8"
              style={{
                background: 'oklch(0.14 0.025 265)',
                border: '1px solid oklch(0.72 0.12 75 / 0.2)',
                borderTop: '3px solid oklch(0.72 0.12 75 / 0.6)',
              }}
            >
              {/* カテゴリ + 公式バッジ */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs px-2 py-1 rounded-sm font-medium"
                  style={{
                    background: 'oklch(0.72 0.12 75 / 0.15)',
                    color: 'oklch(0.72 0.12 75)',
                    border: '1px solid oklch(0.72 0.12 75 / 0.3)',
                    fontFamily: 'Noto Sans JP, sans-serif',
                  }}
                >
                  {CATEGORY_ICONS[guide.category]} {guide.category}
                </span>
                {guide.isOfficial && (
                  <span
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-sm font-medium"
                    style={{
                      background: 'oklch(0.48 0.18 25 / 0.2)',
                      color: 'oklch(0.72 0.18 25)',
                      border: '1px solid oklch(0.48 0.18 25 / 0.4)',
                      fontFamily: 'Noto Sans JP, sans-serif',
                    }}
                  >
                    <Crown size={10} />
                    公式記事
                  </span>
                )}
              </div>

              {/* タイトル */}
              <h1
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  color: 'oklch(0.9 0.015 80)',
                  lineHeight: '1.5',
                }}
              >
                {guide.title}
              </h1>

              {/* メタ情報 */}
              <div
                className="flex flex-wrap items-center gap-4 pb-4 mb-6 text-xs"
                style={{
                  borderBottom: '1px solid oklch(0.72 0.12 75 / 0.15)',
                  color: 'oklch(0.55 0.02 80)',
                  fontFamily: 'Noto Sans JP, sans-serif',
                }}
              >
                <span className="flex items-center gap-1">
                  <Crown size={11} />
                  {guide.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {guide.publishedAt}
                </span>
                {guide.updatedAt !== guide.publishedAt && (
                  <span className="flex items-center gap-1">
                    更新: {guide.updatedAt}
                  </span>
                )}
              </div>

              {/* タグ */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-sm"
                    style={{
                      background: 'oklch(0.18 0.025 265)',
                      color: 'oklch(0.6 0.02 80)',
                      border: '1px solid oklch(0.72 0.12 75 / 0.15)',
                      fontFamily: 'Noto Sans JP, sans-serif',
                    }}
                  >
                    <Tag size={9} className="inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* 本文 */}
              <div
                className="prose prose-invert max-w-none"
                style={{
                  fontFamily: 'Noto Sans JP, sans-serif',
                  color: 'oklch(0.8 0.015 80)',
                  lineHeight: '1.9',
                }}
              >
                <style>{`
                  .guide-content h2 {
                    font-family: 'Noto Serif JP', serif;
                    color: oklch(0.72 0.12 75);
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 0.75rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid oklch(0.72 0.12 75 / 0.3);
                  }
                  .guide-content h3 {
                    font-family: 'Noto Serif JP', serif;
                    color: oklch(0.85 0.015 80);
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                  }
                  .guide-content p {
                    margin-bottom: 1rem;
                  }
                  .guide-content ul, .guide-content ol {
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                  }
                  .guide-content li {
                    margin-bottom: 0.25rem;
                  }
                  .guide-content strong {
                    color: oklch(0.72 0.12 75);
                  }
                  .guide-content code {
                    background: oklch(0.18 0.025 265);
                    padding: 0.1rem 0.4rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                    color: oklch(0.72 0.18 25);
                  }
                `}</style>
                <div className="guide-content">
                  <Streamdown>{guide.content}</Streamdown>
                </div>
              </div>
            </article>

            {/* 戻るボタン */}
            <Link href="/guides">
              <button
                className="flex items-center gap-2 mt-6 px-4 py-2 rounded text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: 'oklch(0.14 0.025 265)',
                  color: 'oklch(0.72 0.12 75)',
                  border: '1px solid oklch(0.72 0.12 75 / 0.3)',
                  fontFamily: 'Noto Sans JP, sans-serif',
                }}
              >
                <ArrowLeft size={16} />
                攻略情報一覧へ戻る
              </button>
            </Link>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            {relatedGuides.length > 0 && (
              <div>
                <h3
                  className="text-sm font-bold mb-3"
                  style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}
                >
                  関連記事
                </h3>
                <div className="flex flex-col gap-3">
                  {relatedGuides.map((g) => (
                    <GuideCard key={g.id} guide={g} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
