/*
 * App.tsx - ルーティング設定
 * Design: 「煌夜の宮廷」 - ダークテーマ固定
 * 
 * ページ構成:
 * / - トップページ（ヒーロー + 最新/人気動画 + 攻略情報）
 * /videos - 動画一覧
 * /guides - 攻略情報一覧
 * /guides/:id - 攻略記事詳細
 * /characters - キャラ評価一覧
 * /forum - 掲示板（GitHub Discussions）
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Characters from "./pages/Characters";
import Forum from "./pages/Forum";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/videos" component={Videos} />
      <Route path="/guides" component={Guides} />
      <Route path="/guides/:id" component={GuideDetail} />
      <Route path="/characters" component={Characters} />
      <Route path="/forum" component={Forum} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen flex flex-col" style={{ background: 'oklch(0.1 0.025 265)' }}>
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
