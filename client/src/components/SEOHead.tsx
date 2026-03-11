/*
 * SEOHead Component
 * ページごとのメタタグ・OGP設定
 * 
 * 使用例:
 * <SEOHead
 *   title="魔・呂布 評価 - まつモン放置少女攻略"
 *   description="魔・呂布のダメージ計算とキャラ評価を詳しく解説"
 *   keywords={['魔・呂布', '放置少女', 'キャラ評価']}
 * />
 */

import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
}

const SITE_NAME = 'まつモン - 放置少女攻略サイト';
const DEFAULT_DESCRIPTION = '放置少女の攻略情報・キャラ評価・ダメージ計算をまとめた攻略サイト。まつモンのYouTubeチャンネルの最新動画・人気動画も掲載。';
const DEFAULT_KEYWORDS = ['放置少女', '攻略', 'キャラ評価', 'ダメージ計算', 'まつモン'];
const DEFAULT_OG_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663420667682/njxy9ShpxNx4dSZTfXTzoo/hero-banner-MHM9xHKVGrJQyZUgBbMKAz.webp';

export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonicalUrl,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  useEffect(() => {
    // タイトル
    document.title = fullTitle;

    // メタタグを更新するヘルパー
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', [...keywords, ...DEFAULT_KEYWORDS].join(', '));

    // OGP
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:site_name', SITE_NAME, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // 構造化データ（JSON-LD）
    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) existingJsonLd.remove();

    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': ogType === 'article' ? 'Article' : 'WebSite',
      name: fullTitle,
      description,
      url: canonicalUrl || window.location.href,
      image: ogImage,
      publisher: {
        '@type': 'Person',
        name: 'まつモン',
        url: 'https://www.youtube.com/@matsumon_game2',
      },
    });
    document.head.appendChild(jsonLd);

    return () => {
      const ld = document.querySelector('script[type="application/ld+json"]');
      if (ld) ld.remove();
    };
  }, [fullTitle, description, keywords, ogImage, ogType, canonicalUrl]);

  return null;
}
