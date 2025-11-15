import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/loader";
import {
  BarChart3,
  Globe,
  TrendingUp,
  Clock,
  Smartphone,
  Search,
  ArrowUp,
  ArrowDown,
  Shield,
  Zap,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import instance from "@/config/instance";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  beforeLoad: () => {
    const brandId = localStorage.getItem("brandId");
    if (!brandId) {
      throw redirect({
        to: "/",
      });
    }
  },
});

interface InsightsData {
  search_overview: {
    search_score: number;
    visibility_index: number;
    domain_authority: number;
    page_authority: number;
    spam_score: number;
    indexed_pages: number;
    load_time_ms: number;
    mobile_score: number;
  };
  top_keywords: Array<{
    keyword: string;
    volume: number;
    ranking: number;
  }>;
  geo_distribution: Array<{
    country: string;
    traffic: number;
  }>;
  traffic_sources: {
    organic: number;
    direct: number;
    referral: number;
    social: number;
  };
  seo_history: Array<{
    month: string;
    search_score: number;
    organic_traffic: number;
  }>;
}

// Helper functions for color coding with softer colors
const getScoreColor = (score: number, max: number = 100) => {
  const percentage = (score / max) * 100;
  if (percentage >= 70) return "text-emerald-700";
  if (percentage >= 40) return "text-amber-700";
  return "text-rose-600";
};

const getScoreBgColor = (score: number, max: number = 100) => {
  const percentage = (score / max) * 100;
  if (percentage >= 70) return "bg-emerald-400";
  if (percentage >= 40) return "bg-amber-400";
  return "bg-rose-400";
};

const getSpamScoreColor = (score: number) => {
  if (score <= 3) return "text-emerald-700";
  if (score <= 6) return "text-amber-700";
  return "text-rose-600";
};

const getLoadTimeColor = (ms: number) => {
  if (ms <= 1000) return "text-emerald-700";
  if (ms <= 2000) return "text-amber-700";
  return "text-rose-600";
};

const getRankingBadgeColor = (ranking: number) => {
  if (ranking <= 10) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (ranking <= 50) return "bg-blue-50 text-blue-700 border-blue-200";
  if (ranking <= 100) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-50 text-slate-700 border-slate-200";
};

const getTrafficSourceColor = (source: string) => {
  const colors: Record<string, string> = {
    organic: "bg-emerald-50 border-emerald-200 text-emerald-900",
    direct: "bg-blue-50 border-blue-200 text-blue-900",
    referral: "bg-purple-50 border-purple-200 text-purple-900",
    social: "bg-orange-50 border-orange-200 text-orange-900",
  };
  return colors[source.toLowerCase()] || "bg-slate-50 border-slate-200 text-slate-900";
};

const getTrafficSourceBarColor = (source: string) => {
  const colors: Record<string, string> = {
    organic: "bg-emerald-500",
    direct: "bg-blue-500",
    referral: "bg-purple-500",
    social: "bg-orange-500",
  };
  return colors[source.toLowerCase()] || "bg-slate-500";
};

const getGeoColor = (index: number) => {
  const colors = [
    "bg-blue-400",
    "bg-purple-400",
    "bg-emerald-400",
    "bg-orange-400",
    "bg-indigo-400",
  ];
  return colors[index % colors.length];
};

const getTrend = (current: number, previous: number) => {
  if (current > previous) return { icon: ArrowUp, color: "text-emerald-700", value: current - previous };
  if (current < previous) return { icon: ArrowDown, color: "text-rose-600", value: previous - current };
  return { icon: null, color: "text-slate-600", value: 0 };
};

function Dashboard() {
  const brandId = localStorage.getItem("brandId");
  const navigate = useNavigate();

  const { data: insights, isLoading, error } = useQuery<InsightsData>({
    queryKey: ["insights", brandId],
    queryFn: async () => {
      const response = await instance.get(`/brand/${brandId}/insight`);
      return response.data;
    },
    enabled: !!brandId,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error || !insights) {
    return (
      <div className="p-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Failed to load insights. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const maxTraffic = Math.max(...insights.geo_distribution.map((g) => g.traffic));
  const maxVolume = Math.max(...insights.top_keywords.map((k) => k.volume));

  const brandName = localStorage.getItem("brandName") || "Your Brand";
  const brandWebsite = localStorage.getItem("brandWebsite") || "";

  return (
    <div className="p-3 pb-40 space-y-3 min-h-screen">
      <div className="pb-1 flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/" })}
            className="mb-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Website Insights</h1>
          <p className="text-slate-600 text-sm mt-1">
            Comprehensive analytics and performance metrics
          </p>
        </div>
      </div>

      {/* Brand Info Card */}
      <Card className="border shadow-sm">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-slate-600 mb-1">Brand Name</p>
              <p className="text-lg font-semibold text-slate-900">{brandName}</p>
            </div>
            {brandWebsite && (
              <div className="flex-1">
                <p className="text-xs text-slate-600 mb-1">Website</p>
                <a
                  href={brandWebsite.startsWith("http") ? brandWebsite : `https://${brandWebsite}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                >
                  {brandWebsite}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Overview */}
      <Card className="border shadow-sm">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 py-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="p-1.5 bg-slate-600 rounded-lg text-white">
              <Search className="h-4 w-4" />
            </div>
            Search Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 pb-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {/* Search Score */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-700">Search Score</p>
                <Zap className="h-3 w-3 text-slate-500" />
              </div>
              <p className={cn("text-xl font-bold", getScoreColor(insights.search_overview.search_score))}>
                {insights.search_overview.search_score}
              </p>
              <div className="mt-1.5 w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={cn("h-1.5 rounded-full", getScoreBgColor(insights.search_overview.search_score))}
                  style={{ width: `${insights.search_overview.search_score}%` }}
                />
              </div>
            </div>

            {/* Visibility Index */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-700">Visibility Index</p>
                <TrendingUp className="h-3 w-3 text-slate-500" />
              </div>
              <p className={cn("text-xl font-bold", getScoreColor(insights.search_overview.visibility_index))}>
                {insights.search_overview.visibility_index}
              </p>
              <div className="mt-1.5 w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={cn("h-1.5 rounded-full", getScoreBgColor(insights.search_overview.visibility_index))}
                  style={{ width: `${insights.search_overview.visibility_index}%` }}
                />
              </div>
            </div>

            {/* Domain Authority */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-700">Domain Authority</p>
                <Shield className="h-3 w-3 text-slate-500" />
              </div>
              <p className={cn("text-xl font-bold", getScoreColor(insights.search_overview.domain_authority))}>
                {insights.search_overview.domain_authority}
              </p>
              <div className="mt-1.5 w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={cn("h-1.5 rounded-full", getScoreBgColor(insights.search_overview.domain_authority))}
                  style={{ width: `${insights.search_overview.domain_authority}%` }}
                />
              </div>
            </div>

            {/* Page Authority */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-700">Page Authority</p>
                <BarChart3 className="h-3 w-3 text-slate-500" />
              </div>
              <p className={cn("text-xl font-bold", getScoreColor(insights.search_overview.page_authority))}>
                {insights.search_overview.page_authority}
              </p>
              <div className="mt-1.5 w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={cn("h-1.5 rounded-full", getScoreBgColor(insights.search_overview.page_authority))}
                  style={{ width: `${insights.search_overview.page_authority}%` }}
                />
              </div>
            </div>

            {/* Spam Score */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-700">Spam Score</p>
                <Shield className="h-3 w-3 text-slate-500" />
              </div>
              <p className={cn("text-xl font-bold", getSpamScoreColor(insights.search_overview.spam_score))}>
                {insights.search_overview.spam_score}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                {insights.search_overview.spam_score <= 3 ? "Excellent" : insights.search_overview.spam_score <= 6 ? "Good" : "Needs Attention"}
              </p>
            </div>

            {/* Indexed Pages */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-700">Indexed Pages</p>
                <Search className="h-3 w-3 text-slate-500" />
              </div>
              <p className="text-xl font-bold text-slate-800">
                {insights.search_overview.indexed_pages.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">Pages indexed</p>
            </div>

            {/* Load Time */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-700 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Load Time
                </p>
              </div>
              <p className={cn("text-xl font-bold", getLoadTimeColor(insights.search_overview.load_time_ms))}>
                {insights.search_overview.load_time_ms}ms
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                {insights.search_overview.load_time_ms <= 1000 ? "Fast" : insights.search_overview.load_time_ms <= 2000 ? "Moderate" : "Slow"}
              </p>
            </div>

            {/* Mobile Score */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-700 flex items-center gap-1">
                  <Smartphone className="h-3 w-3" />
                  Mobile Score
                </p>
              </div>
              <p className={cn("text-xl font-bold", getScoreColor(insights.search_overview.mobile_score))}>
                {insights.search_overview.mobile_score}
              </p>
              <div className="mt-1.5 w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={cn("h-1.5 rounded-full", getScoreBgColor(insights.search_overview.mobile_score))}
                  style={{ width: `${insights.search_overview.mobile_score}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Top Keywords */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 py-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 bg-slate-600 rounded-lg text-white">
                <TrendingUp className="h-4 w-4" />
              </div>
              Top Keywords
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 pb-3">
            <div className="space-y-2">
              {insights.top_keywords.map((keyword, index) => {
                const volumePercentage = (keyword.volume / maxVolume) * 100;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-900 truncate">{keyword.keyword}</p>
                        <span className={cn("px-1.5 py-0.5 rounded-full text-xs font-semibold border", getRankingBadgeColor(keyword.ranking))}>
                          #{keyword.ranking}
                        </span>
                      </div>
                    </div>
                    <div className="text-right min-w-[80px] shrink-0 ml-2">
                      <p className="font-bold text-base text-emerald-700">
                        {keyword.volume.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-600">Volume</p>
                      <div className="mt-1 w-full bg-slate-100 rounded-full h-1">
                        <div
                          className="bg-emerald-500 h-1 rounded-full"
                          style={{ width: `${volumePercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 py-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 bg-slate-600 rounded-lg text-white">
                <BarChart3 className="h-4 w-4" />
              </div>
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 pb-3">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(insights.traffic_sources).map(([source, percentage]) => (
                <div
                  key={source}
                  className={cn("p-3 rounded-lg border-2", getTrafficSourceColor(source))}
                >
                  <p className="text-xs font-medium mb-1 uppercase tracking-wide text-slate-600">
                    {source}
                  </p>
                  <p className="text-2xl font-bold mb-1.5 text-slate-900">{percentage}%</p>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className={cn("h-1.5 rounded-full", getTrafficSourceBarColor(source))}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Geo Distribution */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 py-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 bg-slate-600 rounded-lg text-white">
                <Globe className="h-4 w-4" />
              </div>
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 pb-3">
            <div className="space-y-2">
              {insights.geo_distribution.map((geo, index) => {
                const trafficPercentage = (geo.traffic / maxTraffic) * 100;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", getGeoColor(index))} />
                      <p className="font-semibold text-sm text-slate-900 truncate">{geo.country}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-24 bg-slate-100 rounded-full h-2">
                        <div
                          className={cn("h-2 rounded-full", getGeoColor(index))}
                          style={{ width: `${trafficPercentage}%` }}
                        />
                      </div>
                      <p className="font-semibold text-sm text-slate-700 min-w-[70px] text-right">
                        {geo.traffic.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* SEO History */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 py-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 bg-slate-600 rounded-lg text-white">
                <TrendingUp className="h-4 w-4" />
              </div>
              SEO History
            </CardTitle>
            <CardDescription className="text-xs">Monthly performance trends</CardDescription>
          </CardHeader>
          <CardContent className="pt-3 pb-3">
            <div className="space-y-2">
              {insights.seo_history.map((history, index) => {
                const previousHistory = insights.seo_history[index + 1];
                const scoreTrend = previousHistory
                  ? getTrend(history.search_score, previousHistory.search_score)
                  : null;
                const trafficTrend = previousHistory
                  ? getTrend(history.organic_traffic, previousHistory.organic_traffic)
                  : null;
                return (
                  <div
                    key={index}
                    className="p-2.5 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm text-slate-900">{history.month}</p>
                          {scoreTrend && scoreTrend.icon && (
                            <div className={cn("flex items-center gap-0.5", scoreTrend.color)}>
                              <scoreTrend.icon className="h-3 w-3" />
                              <span className="text-xs font-semibold">{scoreTrend.value}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-xs text-slate-600">Score</p>
                            <p className={cn("text-lg font-bold", getScoreColor(history.search_score))}>
                              {history.search_score}
                            </p>
                          </div>
                          <div className="w-16 bg-slate-100 rounded-full h-1.5">
                            <div
                              className={cn("h-1.5 rounded-full", getScoreBgColor(history.search_score))}
                              style={{ width: `${history.search_score}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-right min-w-[100px] shrink-0">
                        <div className="flex items-center justify-end gap-1 mb-0.5">
                          {trafficTrend && trafficTrend.icon && (
                            <div className={cn("flex items-center gap-0.5", trafficTrend.color)}>
                              <trafficTrend.icon className="h-3 w-3" />
                              <span className="text-xs font-semibold">
                                {trafficTrend.value.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="font-bold text-lg text-slate-800">
                          {history.organic_traffic.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-600">Traffic</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
