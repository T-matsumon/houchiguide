# デプロイ・セットアップ手順書

## 1. GitHubリポジトリの作成

```bash
# ローカルでの初期化
git init
git add .
git commit -m "initial commit"

# GitHubにリポジトリを作成してプッシュ
git remote add origin https://github.com/YOUR_USERNAME/houchimusume-guide.git
git branch -M main
git push -u origin main
```

---

## 2. GitHub Pages の設定

1. GitHubリポジトリの **Settings** → **Pages** を開く
2. **Source** を `GitHub Actions` に変更
3. 保存すると、次回プッシュ時に自動デプロイが開始される

サイトURL: `https://YOUR_USERNAME.github.io/houchimusume-guide/`

---

## 3. YouTube動画自動更新の設定

### 3-1. YouTube Data API v3 のAPIキーを取得

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成（または既存を使用）
3. **APIとサービス** → **ライブラリ** → `YouTube Data API v3` を有効化
4. **認証情報** → **APIキーを作成**
5. APIキーをコピー（無料枠: 1日10,000ユニット）

### 3-2. チャンネルIDを取得

1. [commentpicker.com/youtube-channel-id.php](https://commentpicker.com/youtube-channel-id.php) にアクセス
2. `https://www.youtube.com/@matsumon_game2` を入力
3. `UC` で始まるチャンネルIDをコピー

### 3-3. GitHub Secrets に登録

1. GitHubリポジトリの **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** で以下を追加:
   - `YOUTUBE_API_KEY`: 取得したAPIキー
   - `YOUTUBE_CHANNEL_ID`: 取得したチャンネルID

### 3-4. 動作確認

- **Actions** タブ → `YouTube動画自動更新` → **Run workflow** で手動実行
- 成功すると `client/public/videos.json` が更新される
- 以降、毎日午前6時（JST）に自動実行

---

## 4. 掲示板（GitHub Discussions）の設定

1. GitHubリポジトリの **Settings** → **Features** → **Discussions** を有効化
2. [giscus.app/ja](https://giscus.app/ja) にアクセスしてリポジトリを設定
3. 表示された `data-repo-id` と `data-category-id` をコピー
4. `client/src/pages/Forum.tsx` の `GISCUS_CONFIG` を更新:
   ```typescript
   const GISCUS_CONFIG = {
     repo: 'YOUR_USERNAME/houchimusume-guide',
     repoId: 'R_XXXXXXXXXX',       // ← giscus.appで取得
     category: 'General',
     categoryId: 'DIC_XXXXXXXXXX', // ← giscus.appで取得
     ...
   };
   ```

---

## 5. 攻略記事の追加方法

`client/src/lib/data.ts` の `SAMPLE_GUIDES` 配列に追加するだけ。
詳細は `GUIDE_HOWTO.md` を参照。

---

## 6. サイトマップ・robots.txtの更新

`client/public/sitemap.xml` と `client/public/robots.txt` の
`YOUR_DOMAIN` を実際のURLに置き換えてください。

例: `https://YOUR_USERNAME.github.io/houchimusume-guide`

---

## 7. vite.config.ts の base 設定（GitHub Pages用）

GitHub Pages のサブパスにデプロイする場合は `vite.config.ts` に設定が必要です:

```typescript
export default defineConfig({
  base: '/houchimusume-guide/', // リポジトリ名
  ...
})
```
