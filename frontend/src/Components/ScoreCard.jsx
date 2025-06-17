"use client"

import { Shield, AlertTriangle, CheckCircle, XCircle, Mail, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ScoreCardProps {
  type: "email" | "url"
  target: string
  score: number
  status: "Secure" | "Moderate" | "High Risk"
  threats: string[]
}

export default function ScoreCard({ type, target, score, status, threats }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Secure":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "Moderate":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "High Risk":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      default:
        return "bg-slate-600/20 text-slate-400 border-slate-600/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Secure":
        return <CheckCircle className="h-4 w-4" />
      case "Moderate":
        return <AlertTriangle className="h-4 w-4" />
      case "High Risk":
        return <XCircle className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {type === "email" ? (
              <Mail className="h-5 w-5 text-blue-400" />
            ) : (
              <Globe className="h-5 w-5 text-blue-400" />
            )}
            <CardTitle className="text-white text-sm font-medium">
              {type === "email" ? "Email Security" : "URL Analysis"}
            </CardTitle>
          </div>
          <Badge className={`${getStatusColor(status)} border`}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(status)}
              <span className="text-xs">{status}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Target */}
        <div>
          <p className="text-xs text-slate-400 mb-1">Target</p>
          <p className="text-sm text-white font-mono bg-slate-900/50 p-2 rounded border border-slate-700 truncate">
            {target}
          </p>
        </div>

        {/* Security Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-400">Security Score</p>
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}/100</span>
          </div>
          <div className="relative">
            <Progress value={score} className="h-2 bg-slate-700" />
            <div
              className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getProgressColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Threat Analysis */}
        <div>
          <p className="text-xs text-slate-400 mb-2">Analysis Results</p>
          <div className="space-y-1">
            {threats.map((threat, index) => (
              <div key={index} className="flex items-start space-x-2 text-xs">
                <div
                  className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    status === "Secure" ? "bg-green-400" : status === "Moderate" ? "bg-yellow-400" : "bg-red-400"
                  }`}
                />
                <span className="text-slate-300 leading-relaxed">{threat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button className="w-full text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30 rounded-md py-2 transition-colors">
            View Detailed Report
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
