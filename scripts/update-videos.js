/**
 * YouTube動画自動更新スクリプト
 * 
 * 【使用方法】
 * GitHub Actionsで毎日自動実行されます。
 * 手動実行: node scripts/update-videos.js
 * 
 * 【必要な環境変数】
 * YOUTUBE_API_KEY: YouTube Data API v3のAPIキー
 * YOUTUBE_CHANNEL_ID: チャンネルID（@ハンドルではなくUCで始まるID）
 * 
 * 【チャンネルIDの取得方法】
 * 1. https://www.youtube.com/@matsumon_game2 にアクセス
 * 2. ページのソースを確認 or https://www.youtube.com/channel/[ID] 形式のURLを確認
 * 3. または https://commentpicker.com/youtube-channel-id.php で取得
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCxxxxxxxxxxxxxxxxxxxxxxxx'; // ← 実際のチャンネルIDに変更

if (!API_KEY) {
  console.error('エラー: YOUTUBE_API_KEY 環境変数が設定されていません');
  process.exit(1);
}

/**
 * YouTube API リクエスト
 */
function fetchYouTubeAPI(endpoint) {
  return new Promise((resolve, reject) => {
    const url = `https://www.googleapis.com/youtube/v3/${endpoint}&key=${API_KEY}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`JSONパースエラー: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * 動画時間をフォーマット (PT4M30S → 4:30)
 */
function formatDuration(isoDuration) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * 日付フォーマット (ISO → YYYY-MM-DD)
 */
function formatDate(isoDate) {
  return isoDate.split('T')[0];
}

async function main() {
  console.log('YouTube動画データの更新を開始します...');

  try {
    // チャンネルの動画一覧を取得（最新50件）
    const searchData = await fetchYouTubeAPI(
      `search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=50`
    );

    if (!searchData.items || searchData.items.length === 0) {
      console.log('動画が見つかりませんでした');
      return;
    }

    const videoIds = searchData.items.map((item) => item.id.videoId).join(',');

    // 動画の詳細情報を取得（再生数・時間）
    const videosData = await fetchYouTubeAPI(
      `videos?part=snippet,statistics,contentDetails&id=${videoIds}`
    );

    const videos = videosData.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.maxres?.url ||
                 item.snippet.thumbnails.high?.url ||
                 item.snippet.thumbnails.medium?.url,
      publishedAt: formatDate(item.snippet.publishedAt),
      viewCount: item.statistics.viewCount || '0',
      duration: formatDuration(item.contentDetails.duration),
      url: `https://www.youtube.com/watch?v=${item.id}`,
      description: item.snippet.description?.substring(0, 200) || '',
    }));

    // 最新動画と人気動画を分けて保存
    const latestVideos = [...videos].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
    const popularVideos = [...videos].sort(
      (a, b) => parseInt(b.viewCount) - parseInt(a.viewCount)
    );

    const output = {
      updatedAt: new Date().toISOString().split('T')[0],
      channelId: CHANNEL_ID,
      totalCount: videos.length,
      videos: latestVideos,
      popularVideos: popularVideos.slice(0, 10),
    };

    // public/videos.json に保存
    const outputPath = path.join(__dirname, '..', 'client', 'public', 'videos.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

    console.log(`✅ 更新完了: ${videos.length}件の動画データを保存しました`);
    console.log(`   保存先: ${outputPath}`);
    console.log(`   更新日時: ${output.updatedAt}`);

  } catch (error) {
    console.error('エラーが発生しました:', error.message);
    process.exit(1);
  }
}

main();
