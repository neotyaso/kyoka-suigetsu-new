# 鏡花水月城 — Kyoka Suigetsu Castle

> 鏡に映る花、水に浮かぶ月——触れそうで触れられない美しさをテーマにした、水墨画で描く城の観光案内サイト。
> 
> <img width="1902" height="908" alt="sirokansei" src="https://github.com/user-attachments/assets/53e0f823-665a-4619-bd88-0dc43c1fddc4" />



ライブデモ：[kyoka-suigetsu-new.vercel.app](https://kyoka-suigetsu-new.vercel.app)

---

## 鏡花水月城とは

鏡花水月城は、水墨画の世界観をモチーフにした架空の城を舞台にした観光案内Webアプリケーションです。  
現実と幻想の境界に浮かぶ静謐な城を、AIとともに探索できます。

---

## 開発背景

私の中には常にフロントエンドは画面が美しく、ユーザーがサイトを訪れていて心を動かすクオリティのものを作りたい気持ちがあります。本作では、和風の伝統的な美意識とモダンなデジタルデザインの融合に挑戦し、ディテール（配色、タイポグラフィ、Draggableなコンポーネント、なめらかなアニメーション）に徹底的にこだわって自分の脳内イメージを具現化しました。

プログラミングを始めて間もない頃、React と Laravel を用いてフルスタックアプリの制作に挑戦しました。しかし、当時は知識不足により本番環境へのデプロイを達成できず、ローカル環境のままでデプロイできなかった過去があります。
今回は何が何でも本番環境で世界の誰しもが触れる状態（デプロイ）まで持っていくという意識のもと、技術スタックを Next.js 16 へと変え、一からプロダクトを作り直しました。

単なるリメイクに留まらず、現代のWebアプリケーションとして高く評価されるための付加価値を追加しました。
- 認証では **NextAuth.js**を使用し、私のgithubアカウントのみでログインできるようにしました。
- 来訪者を退屈させない工夫として **Groq (Llama-3.3) を搭載した超高速AIチャット**を作成しました。
これらを実装することで、単なる案内サイトを超えた、機能的で、より便利で、実用性の高いものへと変えました。

---

## 主な機能

- **城郭情報ページ** — 天守閣・竹林・庭園など見どころを季節ごとに紹介
- **AIチャット案内** — 城主キャラクターがLLMを通じて来訪者の質問に古風な口調で応答（Groq / Llama 3.3）
- **お問い合わせフォーム** — 送信内容をPostgreSQLに保存
- **お知らせ機能** — 管理画面から投稿・編集・削除が可能
- **管理者画面** — GitHub OAuthによる認証付き管理ページ
- **レスポンシブデザイン** — モバイル・PC両対応
<img width="1920" height="906" alt="スクリーンショット 2026-06-09 223257" src="https://github.com/user-attachments/assets/c62ba148-dca5-44bc-8796-5837d18fcd30" />管理者画面

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フロントエンド | Next.js 16 (App Router), React 19, TypeScript |
| スタイリング | Tailwind CSS v4, Framer Motion |
| 認証 | NextAuth.js v4 (GitHub OAuth) |
| ORM | Prisma v5 |
| データベース | PostgreSQL (Supabase) |
| AI | Groq API (Llama 3.3 70B) |
| デプロイ | Vercel |

---

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/neotyaso/kyoka-suigetsu-new.git
cd kyoka-suigetsu-new
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env`ファイルを作成し、以下を設定してください。

```env
DATABASE_URL="postgresql://..."

NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"

GROQ_API_KEY="your-groq-api-key"
```

### 4. データベースのセットアップ

```bash
npx prisma db push
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアクセスできます。

---

## ディレクトリ構成

```
kyoka-suigetsu-new/
├── app/
│   ├── api/               # API Routes (お知らせ・お問い合わせ・AI・認証)
│   ├── admin/             # 管理者画面
│   ├── contact/           # お問い合わせページ
│   └── ...                # 各種ページ
├── components/            # 共通コンポーネント
│   └── CastleChat.tsx     # AIチャットウィジェット
├── prisma/
│   └── schema.prisma      # DBスキーマ
└── public/                # 静的アセット
```

---

## 環境変数一覧

| 変数名 | 説明 |
|---|---|
| `DATABASE_URL` | PostgreSQL接続文字列（Supabase等） |
| `NEXTAUTH_SECRET` | NextAuth.js用シークレット |
| `NEXTAUTH_URL` | アプリのURL |
| `GITHUB_ID` | GitHub OAuth クライアントID |
| `GITHUB_SECRET` | GitHub OAuth クライアントシークレット |
| `GROQ_API_KEY` | Groq API キー |

---

## 工夫した点・苦労した点

- **水墨画の世界観** — 黒と白でサイトを表現するために墨色・和紙テクスチャ・毛筆フォントを用いたUI設計など世界観を統一することを意識しました。
- **AIチャット設計** — システムプロンプトで城主キャラクターを定義し、「〜でございます」調の古風な応答を実現。現代のサイトのイメージを付け足しました。
- **Vercel × Supabase構成** — サーバーレス環境でのPrisma接続をpgbouncerオプションで最適化しました。
- **ドラッグ可能なチャットウィジェット** — react-draggableを用いてチャットウィンドウをドラッグ移動できる実装を行いましたが、使う場面がないのでお飾り程度です。
  
**【課題】** ローカル環境（Mac）では正常にビルドできるものの、Vercelデプロイ時に動的ルート（`app/api/admin/news/[id]/route.ts`）の型エラーがしつこく発生し、ビルドが失敗し続ける問題に直面。
**【原因】** Macのファイルシステムは大文字・小文字を区別しないのに対し、GitHubやVercel（Linux）は厳密に区別するため、過去に変更したフォルダ（例: `[ID]` と `[id]`）がGitHubの裏側で重複して残ってしまっていた。
**【解決】** `git rm -r --cached .` を実行し、Gitのケースセンシティブなキャッシュを完全にクリーンアップしてから再コミットすることで、フォルダ構成の一本化に成功しました。

**【課題】** デプロイ時、Vercelの依存関係キャッシュの仕組みにより `PrismaClientInitializationError` が発生。
**【解決】** `package.json` のビルドスクリプトを `"build": "prisma generate && next build"` へとカスタマイズ。ビルドの直前に毎回確実に最新のスキーマから型定義を自動生成するパイプラインを構築し、エラーを突破しました。

**【課題】** 当初はAIチャット用に Python (FastAPI + `uv`) で別サーバーを構築していたが、機能に対してインフラの冗長性と管理コスト（2種類のサーバー運用）が課題となった。
**【解決】** Python側のコードを読み、Next.jsのAPI Routesで完全に代替可能と判断しました。そのため、TypeScriptへのロジック移植を行い、Vercelによって一つで完結できました。運用の手間とコストを大幅に削減できたのが良い点だと思います。

---

## 最後まで読んでいただきありがとうございました。
