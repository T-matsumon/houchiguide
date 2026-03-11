/*
 * Guides Page - 攻略情報一覧ページ
 * Design: 「煌夜の宮廷」
 * 機能: カテゴリフィルター、記事一覧、検索
 */

import { useState } from 'react';
import { BookOpen, Search, Crown, Filter } from 'lucide-react';
import GuideCard from '@/components/GuideCard';
import { SAMPLE_GUIDES, GUIDE_CATEGORIES, CATEGORY_ICONS, type GuideCategory } from '@/lib/data';

export default function Guides() {
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | 'すべて'>('すべて');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOfficialOnly, setShowOfficialOnly] = useState(false);

  const filteredGuides = SAMPLE_GUIDES.filter((guide) => {
    const matchesCategory = selectedCategory === 'すべて' || guide.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      guide.title.includes(searchQuery) ||
      guide.summary.includes(searchQuery) ||
      guide.tags.some((tag) => tag.includes(searchQuery));
    const matchesOfficial = !showOfficialOnly || guide.isOfficial;
    return matchesCategory && matchesSearch && matchesOfficial;
  });

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
            <BookOpen size={28} style={{ color: 'oklch(0.72 0.12 75)' }} />
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}
            >
              攻略情報
            </h1>
          </div>
          <p style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
            キャラ評価・ダメージ計算・攻略ガイドをまとめています
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* フィルターエリア */}
        <div
          className="p-4 rounded mb-6"
          style={{
            background: 'oklch(0.14 0.025 265)',
            border: '1px solid oklch(0.72 0.12 75 / 0.2)',
          }}
        >
          {/* 検索 */}
          <div className="relative mb-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'oklch(0.55 0.02 80)' }}
            />
            <input
              type="text"
              placeholder="記事を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded text-sm outline-none transition-all duration-200"
              style={{
                background: 'oklch(0.1 0.025 265)',
                border: '1px solid oklch(0.72 0.12 75 / 0.2)',
                color: 'oklch(0.85 0.015 80)',
                fontFamily: 'Noto Sans JP, sans-serif',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'oklch(0.72 0.12 75 / 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'oklch(0.72 0.12 75 / 0.2)';
              }}
            />
          </div>

          {/* カテゴリフィルター */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => setSelectedCategory('すべて')}
              className="px-3 py-1.5 rounded-sm text-xs font-medium transition-all duration-200"
              style={{
                background: selectedCategory === 'すべて' ? 'oklch(0.72 0.12 75)' : 'oklch(0.18 0.025 265)',
                color: selectedCategory === 'すべて' ? 'oklch(0.1 0.025 265)' : 'oklch(0.6 0.02 80)',
                border: `1px solid ${selectedCategory === 'すべて' ? 'oklch(0.72 0.12 75)' : 'oklch(0.72 0.12 75 / 0.2)'}`,
                fontFamily: 'Noto Sans JP, sans-serif',
              }}
            >
              すべて
            </button>
            {GUIDE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1.5 rounded-sm text-xs font-medium transition-all duration-200"
                style={{
                  background: selectedCategory === cat ? 'oklch(0.72 0.12 75)' : 'oklch(0.18 0.025 265)',
                  color: selectedCategory === cat ? 'oklch(0.1 0.025 265)' : 'oklch(0.6 0.02 80)',
                  border: `1px solid ${selectedCategory === cat ? 'oklch(0.72 0.12 75)' : 'oklch(0.72 0.12 75 / 0.2)'}`,
                  fontFamily: 'Noto Sans JP, sans-serif',
                }}
              >
                {CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>

          {/* 公式記事フィルター */}
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <div
              className="w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-200"
              style={{
                background: showOfficialOnly ? 'oklch(0.72 0.12 75)' : 'oklch(0.18 0.025 265)',
                border: `1px solid ${showOfficialOnly ? 'oklch(0.72 0.12 75)' : 'oklch(0.72 0.12 75 / 0.3)'}`,
              }}
              onClick={() => setShowOfficialOnly(!showOfficialOnly)}
            >
              {showOfficialOnly && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="oklch(0.1 0.025 265)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
              onClick={() => setShowOfficialOnly(!showOfficialOnly)}
            >
              <Crown size={12} style={{ color: 'oklch(0.72 0.18 25)' }} />
              公式記事のみ表示
            </span>
          </label>
        </div>

        {/* 記事数 */}
        <div
          className="flex items-center gap-2 mb-4 text-sm"
          style={{ color: 'oklch(0.55 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
        >
          <Filter size={14} />
          {filteredGuides.length}件の記事
        </div>

        {/* 記事グリッド */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <div
            className="py-16 text-center rounded"
            style={{
              background: 'oklch(0.14 0.025 265)',
              border: '1px solid oklch(0.72 0.12 75 / 0.15)',
            }}
          >
            <BookOpen size={40} className="mx-auto mb-3" style={{ color: 'oklch(0.4 0.02 80)' }} />
            <p style={{ color: 'oklch(0.5 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
              該当する記事が見つかりませんでした
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
