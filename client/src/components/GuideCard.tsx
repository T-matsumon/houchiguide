/*
 * GuideCard Component
 * Design: 「煌夜の宮廷」 - 金縁カード + 管理者バッジ
 */

import { Link } from 'wouter';
import { Crown, Calendar, Tag } from 'lucide-react';
import type { GuideArticle } from '@/lib/data';
import { CATEGORY_ICONS } from '@/lib/data';

interface GuideCardProps {
  guide: GuideArticle;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.id}`}>
      <div className="gold-card rounded p-4 h-full cursor-pointer">
        {/* カテゴリ + 管理者バッジ */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs px-2 py-1 rounded-sm font-medium"
            style={{
              background: 'oklch(0.72 0.12 75 / 0.15)',
              color: 'oklch(0.72 0.12 75)',
              fontFamily: 'Noto Sans JP, sans-serif',
              border: '1px solid oklch(0.72 0.12 75 / 0.3)',
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
              公式
            </span>
          )}
        </div>

        {/* タイトル */}
        <h3
          className="font-bold mb-2 line-clamp-2 text-sm"
          style={{
            fontFamily: 'Noto Serif JP, serif',
            color: 'oklch(0.9 0.015 80)',
            lineHeight: '1.6',
          }}
        >
          {guide.title}
        </h3>

        {/* 概要 */}
        <p
          className="text-xs mb-3 line-clamp-2"
          style={{
            color: 'oklch(0.6 0.02 80)',
            fontFamily: 'Noto Sans JP, sans-serif',
            lineHeight: '1.7',
          }}
        >
          {guide.summary}
        </p>

        {/* タグ */}
        <div className="flex flex-wrap gap-1 mb-3">
          {guide.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-1.5 py-0.5 rounded-sm"
              style={{
                background: 'oklch(0.18 0.025 265)',
                color: 'oklch(0.55 0.02 80)',
                fontFamily: 'Noto Sans JP, sans-serif',
              }}
            >
              <Tag size={8} className="inline mr-0.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* 日付 */}
        <div
          className="flex items-center gap-1 text-xs"
          style={{ color: 'oklch(0.5 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
        >
          <Calendar size={11} />
          {guide.publishedAt}
        </div>
      </div>
    </Link>
  );
}
