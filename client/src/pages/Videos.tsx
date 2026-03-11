/*
 * Videos Page - 動画一覧ページ
 * Design: 「煌夜の宮廷」
 * 機能: 最新動画・人気動画タブ切り替え、全動画グリッド表示
 */

import { useState, useEffect } from 'react';
import { Youtube, TrendingUp, Clock, RefreshCw } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import { SAMPLE_VIDEOS, type VideoItem } from '@/lib/data';

type TabType = 'latest' | 'popular';

export default function Videos() {
  const [videos, setVideos] = useState<VideoItem[]>(SAMPLE_VIDEOS);
  const [activeTab, setActiveTab] = useState<TabType>('latest');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    fetch('/videos.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.videos && data.videos.length > 0) {
          setVideos(data.videos);
          setLastUpdated(data.updatedAt || '');
        }
      })
      .catch(() => {
        setVideos(SAMPLE_VIDEOS);
      });
  }, []);

  const displayVideos = activeTab === 'latest'
    ? [...videos].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    : [...videos].sort((a, b) => parseInt(b.viewCount) - parseInt(a.viewCount));

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
            <Youtube size={28} style={{ color: 'oklch(0.55 0.2 25)' }} />
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}
            >
              動画一覧
            </h1>
          </div>
          <p style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
            まつモンチャンネルの動画をまとめて確認
          </p>
          {lastUpdated && (
            <div
              className="flex items-center gap-1.5 mt-2 text-xs"
              style={{ color: 'oklch(0.5 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
            >
              <RefreshCw size={11} />
              最終更新: {lastUpdated}
            </div>
          )}
        </div>
      </div>

      {/* タブ */}
      <div
        className="sticky top-16 z-40"
        style={{
          background: 'oklch(0.12 0.025 265 / 0.95)',
          borderBottom: '1px solid oklch(0.72 0.12 75 / 0.2)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="container">
          <div className="flex">
            {[
              { id: 'latest' as TabType, label: '最新動画', icon: Clock },
              { id: 'popular' as TabType, label: '人気動画', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 relative"
                  style={{
                    color: activeTab === tab.id ? 'oklch(0.72 0.12 75)' : 'oklch(0.6 0.02 80)',
                    fontFamily: 'Noto Sans JP, sans-serif',
                    borderBottom: activeTab === tab.id ? '2px solid oklch(0.72 0.12 75)' : '2px solid transparent',
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 動画グリッド */}
      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayVideos.map((video, index) => (
            <div key={video.id} className="relative">
              {activeTab === 'popular' && index < 3 && (
                <div
                  className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: index === 0
                      ? 'linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.65 0.15 75))'
                      : index === 1
                      ? 'linear-gradient(135deg, oklch(0.7 0.02 80), oklch(0.6 0.02 80))'
                      : 'linear-gradient(135deg, oklch(0.55 0.1 50), oklch(0.45 0.1 50))',
                    color: 'oklch(0.1 0.025 265)',
                    fontFamily: 'Cinzel, serif',
                  }}
                >
                  {index + 1}
                </div>
              )}
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        {/* チャンネルリンク */}
        <div
          className="mt-12 p-6 rounded text-center"
          style={{
            background: 'oklch(0.14 0.025 265)',
            border: '1px solid oklch(0.72 0.12 75 / 0.2)',
          }}
        >
          <p
            className="text-sm mb-4"
            style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
          >
            すべての動画はYouTubeチャンネルでご覧いただけます
          </p>
          <a
            href="https://www.youtube.com/@matsumon_game2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, oklch(0.48 0.18 25), oklch(0.55 0.2 25))',
              color: 'white',
              fontFamily: 'Noto Sans JP, sans-serif',
            }}
          >
            <Youtube size={18} />
            YouTubeチャンネルを見る
          </a>
        </div>
      </div>
    </div>
  );
}
