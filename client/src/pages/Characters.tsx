/*
 * Characters Page - キャラ評価一覧ページ
 * Design: 「煌夜の宮廷」
 * 機能: キャラクター評価一覧、評価フィルター
 */

import { useState } from 'react';
import { Sword, Star, Search } from 'lucide-react';
import { Link } from 'wouter';
import { SAMPLE_GUIDES } from '@/lib/data';

// キャラ評価データ（攻略記事のキャラ評価カテゴリから抽出）
const characterGuides = SAMPLE_GUIDES.filter((g) => g.category === 'キャラ評価');

// 評価ランク
const RANKS = ['S+', 'S', 'A+', 'A', 'B', 'C'] as const;
type Rank = typeof RANKS[number];

interface CharacterData {
  id: string;
  name: string;
  rank: Rank;
  type: string;
  tags: string[];
  guideId?: string;
}

// サンプルキャラクターデータ
const CHARACTERS: CharacterData[] = [
  { id: 'c1', name: '魔・呂布', rank: 'S+', type: '物理', tags: ['アタッカー', 'SSR'], guideId: 'guide-002' },
  { id: 'c2', name: '神孫権', rank: 'A+', type: '物理', tags: ['回避', 'SSR'], guideId: 'guide-003' },
  { id: 'c3', name: 'マーリン嫁', rank: 'S', type: '魔法', tags: ['サポート', 'UR'], guideId: undefined },
  { id: 'c4', name: '黄帝', rank: 'A', type: '物理', tags: ['バッファー', 'SSR'], guideId: undefined },
  { id: 'c5', name: '滝川一益', rank: 'B', type: '物理', tags: ['アタッカー', 'SR'], guideId: undefined },
];

const RANK_COLORS: Record<Rank, { bg: string; text: string; border: string }> = {
  'S+': { bg: 'oklch(0.72 0.12 75 / 0.2)', text: 'oklch(0.72 0.12 75)', border: 'oklch(0.72 0.12 75 / 0.5)' },
  'S':  { bg: 'oklch(0.48 0.18 25 / 0.2)', text: 'oklch(0.72 0.18 25)', border: 'oklch(0.48 0.18 25 / 0.5)' },
  'A+': { bg: 'oklch(0.55 0.15 150 / 0.2)', text: 'oklch(0.65 0.15 150)', border: 'oklch(0.55 0.15 150 / 0.5)' },
  'A':  { bg: 'oklch(0.5 0.12 220 / 0.2)', text: 'oklch(0.65 0.12 220)', border: 'oklch(0.5 0.12 220 / 0.5)' },
  'B':  { bg: 'oklch(0.5 0.08 80 / 0.2)', text: 'oklch(0.65 0.08 80)', border: 'oklch(0.5 0.08 80 / 0.5)' },
  'C':  { bg: 'oklch(0.4 0.02 80 / 0.2)', text: 'oklch(0.55 0.02 80)', border: 'oklch(0.4 0.02 80 / 0.5)' },
};

export default function Characters() {
  const [selectedRank, setSelectedRank] = useState<Rank | 'すべて'>('すべて');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChars = CHARACTERS.filter((c) => {
    const matchesRank = selectedRank === 'すべて' || c.rank === selectedRank;
    const matchesSearch = searchQuery === '' || c.name.includes(searchQuery) || c.tags.some((t) => t.includes(searchQuery));
    return matchesRank && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20" style={{ background: 'oklch(0.1 0.025 265)' }}>
      {/* ページヘッダー */}
      <div
        className="py-12 relative overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663420667682/njxy9ShpxNx4dSZTfXTzoo/section-bg-pattern-94BUW4mqtmvEQBSH37XW8M.webp)`,
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'oklch(0.08 0.025 265 / 0.88)' }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Sword size={28} style={{ color: 'oklch(0.72 0.12 75)' }} />
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}
            >
              キャラ評価
            </h1>
          </div>
          <p style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
            副将のランク評価と攻略記事へのリンク
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* フィルター */}
        <div
          className="p-4 rounded mb-6"
          style={{
            background: 'oklch(0.14 0.025 265)',
            border: '1px solid oklch(0.72 0.12 75 / 0.2)',
          }}
        >
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'oklch(0.55 0.02 80)' }} />
            <input
              type="text"
              placeholder="キャラクター名を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded text-sm outline-none"
              style={{
                background: 'oklch(0.1 0.025 265)',
                border: '1px solid oklch(0.72 0.12 75 / 0.2)',
                color: 'oklch(0.85 0.015 80)',
                fontFamily: 'Noto Sans JP, sans-serif',
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRank('すべて')}
              className="px-3 py-1.5 rounded-sm text-xs font-medium transition-all duration-200"
              style={{
                background: selectedRank === 'すべて' ? 'oklch(0.72 0.12 75)' : 'oklch(0.18 0.025 265)',
                color: selectedRank === 'すべて' ? 'oklch(0.1 0.025 265)' : 'oklch(0.6 0.02 80)',
                border: `1px solid ${selectedRank === 'すべて' ? 'oklch(0.72 0.12 75)' : 'oklch(0.72 0.12 75 / 0.2)'}`,
                fontFamily: 'Cinzel, serif',
              }}
            >
              ALL
            </button>
            {RANKS.map((rank) => {
              const colors = RANK_COLORS[rank];
              return (
                <button
                  key={rank}
                  onClick={() => setSelectedRank(rank)}
                  className="px-3 py-1.5 rounded-sm text-xs font-bold transition-all duration-200"
                  style={{
                    background: selectedRank === rank ? colors.bg : 'oklch(0.18 0.025 265)',
                    color: selectedRank === rank ? colors.text : 'oklch(0.6 0.02 80)',
                    border: `1px solid ${selectedRank === rank ? colors.border : 'oklch(0.72 0.12 75 / 0.2)'}`,
                    fontFamily: 'Cinzel, serif',
                  }}
                >
                  {rank}
                </button>
              );
            })}
          </div>
        </div>

        {/* キャラクターグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredChars.map((char) => {
            const colors = RANK_COLORS[char.rank];
            return (
              <div
                key={char.id}
                className="gold-card rounded p-4"
              >
                {/* ランクバッジ */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-sm font-bold px-2.5 py-1 rounded-sm"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      fontFamily: 'Cinzel, serif',
                    }}
                  >
                    {char.rank}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-sm"
                    style={{
                      background: 'oklch(0.18 0.025 265)',
                      color: 'oklch(0.55 0.02 80)',
                      fontFamily: 'Noto Sans JP, sans-serif',
                    }}
                  >
                    {char.type}
                  </span>
                </div>

                {/* キャラ名 */}
                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.9 0.015 80)' }}
                >
                  {char.name}
                </h3>

                {/* タグ */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {char.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded-sm"
                      style={{
                        background: 'oklch(0.18 0.025 265)',
                        color: 'oklch(0.55 0.02 80)',
                        fontFamily: 'Noto Sans JP, sans-serif',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 評価リンク */}
                {char.guideId ? (
                  <Link href={`/guides/${char.guideId}`}>
                    <button
                      className="w-full py-1.5 rounded-sm text-xs font-medium transition-all duration-200 hover:opacity-90"
                      style={{
                        background: 'oklch(0.72 0.12 75 / 0.15)',
                        color: 'oklch(0.72 0.12 75)',
                        border: '1px solid oklch(0.72 0.12 75 / 0.3)',
                        fontFamily: 'Noto Sans JP, sans-serif',
                      }}
                    >
                      詳細評価を見る →
                    </button>
                  </Link>
                ) : (
                  <div
                    className="w-full py-1.5 rounded-sm text-xs text-center"
                    style={{
                      background: 'oklch(0.18 0.025 265)',
                      color: 'oklch(0.45 0.02 80)',
                      fontFamily: 'Noto Sans JP, sans-serif',
                    }}
                  >
                    記事準備中
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 評価基準 */}
        <div
          className="mt-10 p-6 rounded"
          style={{
            background: 'oklch(0.14 0.025 265)',
            border: '1px solid oklch(0.72 0.12 75 / 0.2)',
          }}
        >
          <h3
            className="text-base font-bold mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}
          >
            <Star size={16} />
            評価基準
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {RANKS.map((rank) => {
              const colors = RANK_COLORS[rank];
              const descriptions: Record<Rank, string> = {
                'S+': '最強クラス。必ず育成推奨',
                'S': '非常に強力。優先育成',
                'A+': '強力。育成価値あり',
                'A': '良性能。余裕があれば育成',
                'B': '平均的。状況次第',
                'C': '弱め。他を優先',
              };
              return (
                <div key={rank} className="flex items-start gap-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-sm shrink-0"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      fontFamily: 'Cinzel, serif',
                    }}
                  >
                    {rank}
                  </span>
                  <span className="text-xs" style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
                    {descriptions[rank]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
