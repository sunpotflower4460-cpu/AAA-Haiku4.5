# 残心 / Zanshin

> 書いたあとにも、心がそこに残るメモ帳。  
> A note-taking app where the heart lingers, even after the writing ends.

---

## クイックスタート

### 必要な環境
- Node.js 18+
- npm 10+

### セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド（本番用）
npm run build

# ビルド結果のプレビュー
npm run preview
```

開発サーバーは `http://localhost:5173` で起動します。

---

## MVP機能

| 機能 | 説明 |
|------|------|
| ✅ メモ一覧 | 書いたメモを静かに並べる |
| ✅ メモ作成 | 新しい言葉を置く |
| ✅ メモ編集 | 言葉を直す |
| ✅ メモ削除 | 言葉を手放す |
| ✅ 自動保存 | 静かに、気配なく保存する |
| ✅ 検索 | 過去の言葉を手繰り寄せる |
| ✅ お気に入り | 大切な言葉を残す |
| ✅ ローカル保存 | デバイスの中に安全に保存 |
| ✅ iPhone向けUI | 手のひらに収まる静けさ |
| ✅ 多言語文言設計 | 日本語・英語を意識した言葉づかい |

---

## プロジェクト構成

```
src/
  App.tsx                  # メインアプリケーション
  main.tsx                 # エントリーポイント
  index.css                # グローバルスタイル
  types/
    note.ts                # Note型定義
  lib/
    storage.ts             # localStorage操作
    date.ts                # 日付フォーマット
    i18n.ts                # 多言語文言管理
  components/
    AppShell.tsx           # アプリケーション基本レイアウト
    NotesList.tsx          # メモ一覧画面
    NoteCard.tsx           # メモカードコンポーネント
    NoteEditor.tsx         # メモ編集画面
    SearchBar.tsx          # 検索バー
    EmptyState.tsx         # 空状態表示
```

---

## デザイン思想

「残心」は以下の美学に基づいて設計されています：

- **残心（ざんしん）** - 行動の後に心が残る感覚
- **間（ま）** - 余白の力、沈黙の意味
- **余白** - 思考の余地
- **静けさ** - ノイズのない体験
- **和の美意識** - 控えめで、でも深い

### カラーパレット

| 色名 | 用途 | HEX |
|------|------|-----|
| **和紙色（Washi）** | 背景 | #F7F1E5 |
| **墨色（Sumi）** | テキスト | #1F1B18 |
| **金色（Gold）** | アクセント・お気に入り | #C9A646 |
| **藍色（Indigo）** | セカンダリーアクション | #243B53 |
| **朱色（Vermilion）** | 削除・警告 | #B14A36 |

---

## データ保存

MVPはブラウザの `localStorage` を使用してデータを保存します。

**保存キー**: `zanshin.notes.v1`

**データ構造**:
```typescript
type Note = {
  id: string;              // ユニークID
  title: string;           # メモのタイトル
  body: string;            # メモの本文
  createdAt: string;       # 作成日時（ISO 8601）
  updatedAt: string;       # 更新日時（ISO 8601）
  isFavorite: boolean;     # お気に入りフラグ
  locale?: "ja" | "en";    # ロケール（将来用）
};
```

---

## 開発フェーズ

| フェーズ | 状態 | 説明 |
|----------|------|------|
| **Phase 1** | ✅ 完了 | 設計・コンセプト確立 |
| **Phase 2** | ✅ 完了 | 設計監査 |
| **Phase 3** | ✅ 完了 | MVP実装 |
| **Phase 4** | ✅ 完了 | 最終調整・デバッグ・デプロイ準備 |

詳細は [docs/development-phases.md](docs/development-phases.md) を参照。

---

## Cloudflare Pagesデプロイ

### ビルド確認

MVPはPhase 4で完全にテストされています。ビルドは本番環境で成功しています：

```bash
npm run build
```

**ビルド出力ディレクトリ**: `dist/`

### Cloudflare Pages設定

Cloudflare Pagesに接続する場合、以下の設定を使用してください：

**環境変数**: 不要（MVP段階では環境変数は不要です）

**ビルド設定**:
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js version**: 18 以上

### 手動デプロイ手順

1. **リポジトリを Cloudflare Pages に接続**
   - Cloudflare Dashboard にアクセス
   - Pages → アカウント作成 → このリポジトリを選択
   - ビルド設定を上記に設定

2. **自動デプロイが有効**
   - `main` ブランチへのプッシュで自動ビルド・デプロイ

3. **プレビューデプロイ**
   - プルリクエスト作成時に自動的にプレビューURLが生成

---

## 技術方針

- **Vite** — 高速な開発環境
- **React + TypeScript** — 型安全なコンポーネント設計
- **Tailwind CSS** — 余白と間を制御しやすいユーティリティCSS
- **localStorage** — MVPはローカル保存から
- **PWA対応** — ブラウザからでもiOS的体験を
- **Capacitor（将来）** — ネイティブiOSアプリ化への備え

---

## ドキュメント

| ファイル | 内容 |
|----------|------|
| [docs/concept.md](docs/concept.md) | 「残心」の思想と世界観 |
| [docs/design-system.md](docs/design-system.md) | UI/UXとデザインシステム |
| [docs/mvp-spec.md](docs/mvp-spec.md) | MVP仕様 |
| [docs/development-phases.md](docs/development-phases.md) | 開発フェーズ |
| [docs/final-polish-and-deploy-phase-4.md](docs/final-polish-and-deploy-phase-4.md) | Phase 4 最終調整・デバッグ・デプロイレポート |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | Cloud Agent / Copilot向け作業ルール |

---

## ライセンス

ISC

---

**残心は、機能の多さで勝負しないメモ帳です。**

```
静かに開く
  ↓
言葉を置く
  ↓
静かに保存される
  ↓
読み返せる
  ↓
また戻ってくる
```

この体験を大切にしています。

**Phase 4 で最終調整・デバッグ完了。公開可能な状態です。**