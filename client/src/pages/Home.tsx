/*
 * Home Page - トップページ
 * Design: 「煌夜の宮廷」 - 和風ダーク・ゴールド
 * 
 * セクション構成:
 * 1. ヒーローセクション（バナー画像 + タイトル）
 * 2. 最新動画セクション
 * 3. 人気動画セクション
 * 4. 攻略情報セクション
 * 5. YouTubeチャンネル案内
 */

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Youtube, ChevronRight, TrendingUp, Clock, BookOpen, Sword, Star } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import SEOHead from '@/components/SEOHead';
import GuideCard from '@/components/GuideCard';
import { SAMPLE_VIDEOS, SAMPLE_GUIDES, type VideoItem } from '@/lib/data';

// 桜の花びらコンポーネント
function SakuraPetal({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50% 0',
        background: 'oklch(0.72 0.12 75 / 0.4)',
        animation: `sakuraFall ${Math.random() * 5 + 5}s linear infinite`,
        ...style,
      }}
    />
  );
}

export default function Home() {
  const [videos, setVideos] = useState<VideoItem[]>(SAMPLE_VIDEOS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // videos.jsonから動画データを読み込む（GitHub Actionsで更新される）
    fetch('/videos.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.videos && data.videos.length > 0) {
          setVideos(data.videos);
        }
      })
      .catch(() => {
        // フォールバック: サンプルデータを使用
        setVideos(SAMPLE_VIDEOS);
      });

    // フェードインアニメーション
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const latestVideos = videos.slice(0, 3);
  const popularVideos = [...videos].sort((a, b) => parseInt(b.viewCount) - parseInt(a.viewCount)).slice(0, 3);
  const officialGuides = SAMPLE_GUIDES.filter((g) => g.isOfficial).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SEOHead />
      {/* ========== ヒーローセクション ========== */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: 'oklch(0.08 0.025 265)',
        }}
      >
        {/* 背景画像 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663420667682/njxy9ShpxNx4dSZTfXTzoo/hero-banner-MHM9xHKVGrJQyZUgBbMKAz.webp)`,
          }}
        />
        {/* グラデーションオーバーレイ */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, oklch(0.06 0.025 265 / 0.92) 0%, oklch(0.08 0.025 265 / 0.7) 50%, oklch(0.06 0.025 265 / 0.4) 100%)',
          }}
        />
        {/* 底部グラデーション */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, transparent, oklch(0.1 0.025 265))' }}
        />

        {/* 桜の花びら */}
        {[...Array(8)].map((_, i) => (
          <SakuraPetal
            key={i}
            style={{
              left: `${10 + i * 12}%`,
              top: `-20px`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + i * 0.5}s`,
            }}
          />
        ))}

        {/* コンテンツ */}
        <div className={`container relative z-10 pt-20 pb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            {/* サブタイトル */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm mb-4 text-xs font-medium"
              style={{
                background: 'oklch(0.48 0.18 25 / 0.2)',
                border: '1px solid oklch(0.48 0.18 25 / 0.5)',
                color: 'oklch(0.8 0.15 25)',
                fontFamily: 'Noto Sans JP, sans-serif',
              }}
            >
              <Star size={12} fill="currentColor" />
              放置少女 攻略情報サイト
            </div>

            {/* メインタイトル */}
            <h1
              className="text-5xl md:text-6xl font-black mb-4 leading-tight"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                color: 'oklch(0.72 0.12 75)',
                textShadow: '0 0 40px oklch(0.72 0.12 75 / 0.5), 0 2px 8px black',
              }}
            >
              まつモン
            </h1>
            <h2
              className="text-xl md:text-2xl font-bold mb-6"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                color: 'oklch(0.85 0.015 80)',
                textShadow: '0 2px 8px black',
              }}
            >
              放置少女 攻略サイト
            </h2>

            {/* 説明文 */}
            <p
              className="text-base mb-8 max-w-lg"
              style={{
                color: 'oklch(0.75 0.015 80)',
                fontFamily: 'Noto Sans JP, sans-serif',
                lineHeight: '1.9',
                textShadow: '0 1px 4px black',
              }}
            >
              キャラ評価・ダメージ計算・攻略情報を詳しく解説。
              YouTubeチャンネル「まつモン」の最新動画も随時更新中！
            </p>

            {/* CTAボタン */}
            <div className="flex flex-wrap gap-3">
              <Link href="/guides">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.65 0.15 75))',
                    color: 'oklch(0.1 0.025 265)',
                    fontFamily: 'Noto Sans JP, sans-serif',
                    boxShadow: '0 0 20px oklch(0.72 0.12 75 / 0.4)',
                  }}
                >
                  <BookOpen size={16} />
                  攻略情報を見る
                </button>
              </Link>
              <a
                href="https://www.youtube.com/@matsumon_game2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: 'oklch(0.14 0.025 265 / 0.8)',
                  color: 'oklch(0.85 0.015 80)',
                  border: '1px solid oklch(0.72 0.12 75 / 0.4)',
                  fontFamily: 'Noto Sans JP, sans-serif',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Youtube size={16} style={{ color: 'oklch(0.55 0.2 25)' }} />
                YouTubeを見る
              </a>
            </div>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, oklch(0.72 0.12 75 / 0.6), transparent)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'oklch(0.72 0.12 75 / 0.6)' }} />
        </div>
      </section>

      {/* ========== 最新動画セクション ========== */}
      <section
        className="py-16"
        style={{ background: 'oklch(0.1 0.025 265)' }}
      >
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title text-2xl font-bold flex items-center gap-3">
                <Clock size={22} style={{ color: 'oklch(0.72 0.12 75)' }} />
                最新動画
              </h2>
              <p className="text-sm mt-2" style={{ color: 'oklch(0.55 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
                まつモンチャンネルの最新動画
              </p>
            </div>
            <Link href="/videos">
              <button
                className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-[oklch(0.72_0.12_75)]"
                style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
              >
                すべて見る
                <ChevronRight size={16} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 人気動画セクション ========== */}
      <section
        className="py-16"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663420667682/njxy9ShpxNx4dSZTfXTzoo/section-bg-pattern-94BUW4mqtmvEQBSH37XW8M.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'oklch(0.08 0.025 265 / 0.85)' }}
        />
        <div className="container relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title text-2xl font-bold flex items-center gap-3">
                <TrendingUp size={22} style={{ color: 'oklch(0.72 0.12 75)' }} />
                人気動画
              </h2>
              <p className="text-sm mt-2" style={{ color: 'oklch(0.55 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
                再生数の多い人気動画
              </p>
            </div>
            <Link href="/videos">
              <button
                className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-[oklch(0.72_0.12_75)]"
                style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
              >
                すべて見る
                <ChevronRight size={16} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularVideos.map((video, index) => (
              <div key={video.id} className="relative">
                {/* ランキングバッジ */}
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
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 攻略情報セクション ========== */}
      <section
        className="py-16"
        style={{ background: 'oklch(0.1 0.025 265)' }}
      >
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title text-2xl font-bold flex items-center gap-3">
                <Sword size={22} style={{ color: 'oklch(0.72 0.12 75)' }} />
                攻略情報
              </h2>
              <p className="text-sm mt-2" style={{ color: 'oklch(0.55 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
                キャラ評価・ダメージ計算・攻略ガイド
              </p>
            </div>
            <Link href="/guides">
              <button
                className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-[oklch(0.72_0.12_75)]"
                style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}
              >
                すべて見る
                <ChevronRight size={16} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {officialGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== YouTubeチャンネル案内 ========== */}
      <section
        className="py-16 relative overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663420667682/njxy9ShpxNx4dSZTfXTzoo/guide-section-bg-Rbiw7xqRh8ykXSU8pBfA6F.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'oklch(0.06 0.025 265 / 0.88)' }}
        />
        <div className="container relative z-10 text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{ background: 'linear-gradient(135deg, oklch(0.48 0.18 25), oklch(0.55 0.2 25))' }}
          >
            <Youtube size={32} className="text-white" />
          </div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              color: 'oklch(0.72 0.12 75)',
              textShadow: '0 0 20px oklch(0.72 0.12 75 / 0.4)',
            }}
          >
            YouTubeチャンネル「まつモン」
          </h2>
          <p
            className="text-base mb-8 max-w-xl mx-auto"
            style={{
              color: 'oklch(0.75 0.015 80)',
              fontFamily: 'Noto Sans JP, sans-serif',
              lineHeight: '1.9',
            }}
          >
            放置少女のキャラ評価・ダメージ計算動画を毎週投稿中！
            チャンネル登録して最新情報をチェックしよう。
          </p>
          <a
            href="https://www.youtube.com/@matsumon_game2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded font-bold text-base transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, oklch(0.48 0.18 25), oklch(0.55 0.2 25))',
              color: 'white',
              fontFamily: 'Noto Sans JP, sans-serif',
              boxShadow: '0 0 30px oklch(0.48 0.18 25 / 0.5)',
            }}
          >
            <Youtube size={20} />
            チャンネルを見る
          </a>
        </div>
      </section>
    </div>
  );
}
