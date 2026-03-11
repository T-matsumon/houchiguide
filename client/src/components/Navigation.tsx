/*
 * Navigation Component
 * Design: 「煌夜の宮廷」 - 深藍背景 + 金縁ボーダー + Noto Serif JP
 * 特徴: スクロールで半透明化、金色のアンダーライン遷移
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Youtube, Sword, BookOpen, MessageSquare, Home } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'トップ', icon: Home },
  { href: '/videos', label: '動画一覧', icon: Youtube },
  { href: '/guides', label: '攻略情報', icon: BookOpen },
  { href: '/characters', label: 'キャラ評価', icon: Sword },
  { href: '/forum', label: '掲示板', icon: MessageSquare },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[oklch(0.1_0.025_265/0.95)] backdrop-blur-md shadow-lg shadow-black/50'
          : 'bg-gradient-to-b from-[oklch(0.08_0.025_265/0.9)] to-transparent'
      }`}
      style={{ borderBottom: isScrolled ? '1px solid oklch(0.72 0.12 75 / 0.2)' : 'none' }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, oklch(0.48 0.18 25), oklch(0.72 0.12 75))' }}>
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'Cinzel, serif' }}>M</span>
              </div>
              <div>
                <div className="text-sm font-bold leading-tight" style={{ fontFamily: 'Noto Serif JP, serif', color: 'oklch(0.72 0.12 75)' }}>
                  まつモン
                </div>
                <div className="text-xs leading-tight" style={{ color: 'oklch(0.6 0.02 80)', fontFamily: 'Noto Sans JP, sans-serif' }}>
                  放置少女攻略
                </div>
              </div>
            </div>
          </Link>

          {/* デスクトップナビ */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`nav-link text-sm font-medium py-1 ${location === item.href ? 'active' : ''}`}
                  style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  {item.label}
                </span>
              </Link>
            ))}
            <a
              href="https://www.youtube.com/@matsumon_game2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, oklch(0.48 0.18 25), oklch(0.55 0.2 25))',
                color: 'white',
                fontFamily: 'Noto Sans JP, sans-serif',
              }}
            >
              <Youtube size={14} />
              YouTube
            </a>
          </div>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2 rounded"
            style={{ color: 'oklch(0.72 0.12 75)' }}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'oklch(0.1 0.025 265 / 0.98)',
            borderTop: '1px solid oklch(0.72 0.12 75 / 0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="container py-4 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${
                      location === item.href ? 'bg-[oklch(0.72_0.12_75/0.15)]' : ''
                    }`}
                    style={{
                      color: location === item.href ? 'oklch(0.72 0.12 75)' : 'oklch(0.85 0.015 80)',
                    }}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Icon size={18} />
                    <span style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{item.label}</span>
                  </div>
                </Link>
              );
            })}
            <a
              href="https://www.youtube.com/@matsumon_game2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded mt-2"
              style={{
                background: 'linear-gradient(135deg, oklch(0.48 0.18 25), oklch(0.55 0.2 25))',
                color: 'white',
                fontFamily: 'Noto Sans JP, sans-serif',
              }}
              onClick={() => setIsMobileOpen(false)}
            >
              <Youtube size={18} />
              YouTubeチャンネルを見る
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
