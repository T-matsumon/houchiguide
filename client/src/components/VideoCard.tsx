/*
 * VideoCard Component
 * Design: 「煌夜の宮廷」 - 金縁カード + ホバーグロー効果
 * 
 * サムネイル: YouTube img.youtube.com からの読み込みを試みる
 * フォールバック: ゲーム風プレースホルダー表示
 */

import { useState } from 'react';
import { Play, Eye, Clock, Youtube } from 'lucide-react';
import type { VideoItem } from '@/lib/data';

interface VideoCardProps {
  video: VideoItem;
  size?: 'normal' | 'large';
}

export default function VideoCard({ video, size = 'normal' }: VideoCardProps) {
  const [imgError, setImgError] = useState(false);

  const videoUrl = video.url.startsWith('https://www.youtube.com/watch')
    ? video.url
    : `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block video-card group"
    >
      {/* サムネイル */}
      <div className={`relative overflow-hidden aspect-video`}>
        {!imgError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          /* フォールバック: ゲーム風プレースホルダー */
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, oklch(0.12 0.03 265), oklch(0.16 0.04 265))',
              border: '1px solid oklch(0.72 0.12 75 / 0.2)',
            }}
          >
            <Youtube size={28} style={{ color: 'oklch(0.55 0.2 25)' }} />
            <span
              className="text-xs text-center px-2 line-clamp-2"
              style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
            >
              {video.title}
            </span>
          </div>
        )}

        {/* ホバーオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* 再生ボタン */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'oklch(0.48 0.18 25 / 0.9)', backdropFilter: 'blur(4px)' }}
          >
            <Play size={24} className="text-white ml-1" fill="white" />
          </div>
        </div>

        {/* 動画時間 */}
        <div
          className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-xs font-medium"
          style={{
            background: 'oklch(0.08 0.02 265 / 0.9)',
            color: 'oklch(0.93 0.015 80)',
            fontFamily: 'Cinzel, serif',
          }}
        >
          {video.duration}
        </div>
      </div>

      {/* 情報 */}
      <div className="p-3">
        <h3
          className={`font-semibold mb-2 line-clamp-2 group-hover:text-[oklch(0.72_0.12_75)] transition-colors duration-200 ${
            size === 'large' ? 'text-base' : 'text-sm'
          }`}
          style={{
            fontFamily: 'Noto Sans JP, sans-serif',
            color: 'oklch(0.9 0.015 80)',
            lineHeight: '1.5',
          }}
        >
          {video.title}
        </h3>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'oklch(0.55 0.02 80)' }}>
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {parseInt(video.viewCount).toLocaleString()}回視聴
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {video.publishedAt}
          </span>
        </div>
      </div>
    </a>
  );
}
