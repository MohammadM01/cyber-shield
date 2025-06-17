"use client"

import type React from "react"

import { useState } from "react"
import { Search, Mail, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SearchBar() {
  const [searchType, setSearchType] = useState("email")
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchValue.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Here you would typically handle the search results
      console.log(`Searching ${searchType}: ${searchValue}`)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs value={searchType} onValueChange={setSearchType} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-800 border border-slate-700">
          <TabsTrigger
            value="email"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Mail className="h-4 w-4" />
            <span>Email Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="url"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Globe className="h-4 w-4" />
            <span>URL Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">Email Security Check</h3>
            <p className="text-slate-400">Enter an email address to check for phishing, spam, and security threats</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="email"
                placeholder="Enter email address (e.g., suspicious@example.com)"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchValue.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Scan</span>
                </div>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">URL Safety Analysis</h3>
            <p className="text-slate-400">Check if a website is safe to visit and free from malware</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="url"
                placeholder="Enter URL (e.g., https://example.com)"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchValue.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Scanning...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Check</span>
                </div>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">🔒 Your searches are processed securely and not stored on our servers</p>
      </div>
    </div>
  )
}
