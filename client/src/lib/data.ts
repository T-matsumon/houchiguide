/*
 * データ定義ファイル
 * YouTube動画データと攻略記事データの型定義・サンプルデータ
 * 
 * 【更新方法】
 * - videos.json: GitHub Actionsで毎日自動更新（YouTube API連携）
 * - guides: このファイルに直接追加するか、guides/フォルダにMarkdownを追加
 */

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
  url: string;
  description?: string;
}

export interface GuideArticle {
  id: string;
  title: string;
  category: GuideCategory;
  tags: string[];
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  isOfficial: boolean; // 管理者（まつモン）の記事かどうか
}

export type GuideCategory =
  | 'キャラ評価'
  | 'ダメージ計算'
  | '初心者ガイド'
  | 'イベント攻略'
  | '育成・強化'
  | 'その他';

export const GUIDE_CATEGORIES: GuideCategory[] = [
  'キャラ評価',
  'ダメージ計算',
  '初心者ガイド',
  'イベント攻略',
  '育成・強化',
  'その他',
];

// ============================================================
// サンプル動画データ（GitHub Actionsで自動更新されるデータの形式）
// 実際の運用では /public/videos.json から読み込む
// ============================================================
export const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: 'Iy6KlhMuFhA',
    title: '魔・呂布 ダメージ＆キャラ評価！（放置少女）',
    thumbnail: 'https://img.youtube.com/vi/Iy6KlhMuFhA/hqdefault.jpg',
    publishedAt: '2026-03-07',
    viewCount: '511',
    duration: '2:35',
    url: 'https://www.youtube.com/watch?v=Iy6KlhMuFhA',
    description: '魔・呂布のダメージ計算とキャラ評価を解説します。',
  },
  {
    id: 'Ry8WQKM9gEI',
    title: '放置少女 滝川一益 ダメージ計算付き解説',
    thumbnail: 'https://img.youtube.com/vi/Ry8WQKM9gEI/hqdefault.jpg',
    publishedAt: '2026-03-06',
    viewCount: '66',
    duration: '5:05',
    url: 'https://www.youtube.com/watch?v=Ry8WQKM9gEI',
    description: '滝川一益のダメージ計算を詳しく解説します。',
  },
  {
    id: 'xBmW6UPpFyQ',
    title: '放置少女 神孫権 ダメージ計算付き解説',
    thumbnail: 'https://img.youtube.com/vi/xBmW6UPpFyQ/hqdefault.jpg',
    publishedAt: '2026-02-27',
    viewCount: '109',
    duration: '4:43',
    url: 'https://www.youtube.com/watch?v=xBmW6UPpFyQ',
    description: '神孫権のダメージ計算を詳しく解説します。',
  },
  {
    id: 'Ky_A9MWPYPY',
    title: '放置少女 - マーリン嫁 ダメージ計算付き解説',
    thumbnail: 'https://img.youtube.com/vi/Ky_A9MWPYPY/hqdefault.jpg',
    publishedAt: '2026-02-25',
    viewCount: '41',
    duration: '5:33',
    url: 'https://www.youtube.com/watch?v=Ky_A9MWPYPY',
    description: 'マーリン嫁のダメージ計算を詳しく解説します。',
  },
  {
    id: 'vFSqMjnHoRg',
    title: '放置少女 - 黄帝 ダメージ計算付き',
    thumbnail: 'https://img.youtube.com/vi/vFSqMjnHoRg/hqdefault.jpg',
    publishedAt: '2026-02-24',
    viewCount: '46',
    duration: '4:05',
    url: 'https://www.youtube.com/watch?v=vFSqMjnHoRg',
    description: '黄帝のダメージ計算を解説します。',
  },
  {
    id: 'SHORTS_halfzo',
    title: '放置少女 絵札 半蔵×安倍晴明×東君',
    thumbnail: 'https://img.youtube.com/vi/SHORTS_halfzo/hqdefault.jpg',
    publishedAt: '2026-03-09',
    viewCount: '129',
    duration: '0:59',
    url: 'https://www.youtube.com/@matsumon_game2',
    description: '絵札ガチャの結果を紹介します。',
  },
];

// ============================================================
// サンプル攻略記事データ
// 実際の運用ではこのファイルに記事を追加していく
// ============================================================
export const SAMPLE_GUIDES: GuideArticle[] = [
  {
    id: 'guide-001',
    title: '【初心者向け】放置少女の始め方と序盤攻略',
    category: '初心者ガイド',
    tags: ['初心者', '序盤', 'おすすめ'],
    summary: '放置少女を始めたばかりの方向けに、序盤の進め方と重要なポイントを解説します。',
    content: `## 放置少女とは

放置少女は、美少女キャラクターを育成するRPGです。放置しているだけでもキャラクターが成長し、ストーリーを進めることができます。

## 序盤の進め方

### 1. メインクエストを進める
まずはメインクエストを進めて、ゲームの基本システムを理解しましょう。

### 2. 副将（キャラクター）を育成する
副将は戦力の中心です。最初に入手した副将を優先的に育成しましょう。

### 3. デイリーミッションをこなす
毎日のデイリーミッションをこなすことで、効率よくリソースを集められます。

## おすすめの副将

序盤は無課金でも入手できる副将を中心に育てましょう。
`,
    author: 'まつモン',
    publishedAt: '2026-03-01',
    updatedAt: '2026-03-01',
    isOfficial: true,
  },
  {
    id: 'guide-002',
    title: '魔・呂布 完全評価 - ダメージ計算と育成優先度',
    category: 'キャラ評価',
    tags: ['魔・呂布', 'キャラ評価', 'ダメージ計算', 'SSR'],
    summary: '魔・呂布の性能を詳しく解説。ダメージ計算式と育成優先度を徹底分析。',
    content: `## 魔・呂布の基本情報

魔・呂布は高火力の物理アタッカーです。

## スキル解説

### 通常攻撃
基本的な物理攻撃を行います。

### 必殺技
複数の敵に大ダメージを与えます。

## ダメージ計算

ダメージ = 攻撃力 × スキル倍率 × (1 - 防御補正)

## 育成優先度

★★★★★ - 非常に強力なキャラクターです。優先して育成することをおすすめします。
`,
    author: 'まつモン',
    publishedAt: '2026-03-07',
    updatedAt: '2026-03-07',
    isOfficial: true,
  },
  {
    id: 'guide-003',
    title: '神孫権の評価と使い方',
    category: 'キャラ評価',
    tags: ['神孫権', 'キャラ評価', 'SSR'],
    summary: '神孫権の性能評価と効果的な使い方を解説します。',
    content: `## 神孫権の基本情報

神孫権は回避型のアタッカーです。

## 強みと弱み

### 強み
- 高い回避率
- 安定したダメージ出力

### 弱み
- 防御力が低い
- 単体攻撃が中心

## おすすめの編成

回避バフを持つ副将と組み合わせることで真価を発揮します。
`,
    author: 'まつモン',
    publishedAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isOfficial: true,
  },
];

// カテゴリアイコンマッピング
export const CATEGORY_ICONS: Record<GuideCategory, string> = {
  'キャラ評価': '⚔️',
  'ダメージ計算': '🔢',
  '初心者ガイド': '📖',
  'イベント攻略': '🎉',
  '育成・強化': '⬆️',
  'その他': '📌',
};
