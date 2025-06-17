// API utility functions for CyberShield Lite

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export interface SecurityAssessment {
  target: string
  type: "email" | "url"
  score: number
  status: "Secure" | "Moderate" | "High Risk"
  threats: string[]
  timestamp: string
  reportId: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Email security assessment
export async function assessEmailSecurity(email: string): Promise<ApiResponse<SecurityAssessment>> {
  try {
    const response = await fetch(`${API_BASE_URL}/assess/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Email assessment error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// URL security assessment
export async function assessUrlSecurity(url: string): Promise<ApiResponse<SecurityAssessment>> {
  try {
    const response = await fetch(`${API_BASE_URL}/assess/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("URL assessment error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Get detailed security report
export async function getDetailedReport(reportId: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/${reportId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Report fetch error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Subscribe to premium plan
export async function subscribeToPremium(planType: "monthly" | "yearly"): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/premium`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planType }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Subscription error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Get user's assessment history
export async function getAssessmentHistory(): Promise<ApiResponse<SecurityAssessment[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("History fetch error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Utility function to validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Utility function to validate URL format
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Rate limiting helper
export class RateLimiter {
  private requests: number[] = []
  private maxRequests: number
  private timeWindow: number

  constructor(maxRequests = 10, timeWindowMs = 60000) {
    this.maxRequests = maxRequests
    this.timeWindow = timeWindowMs
  }

  canMakeRequest(): boolean {
    const now = Date.now()
    this.requests = this.requests.filter((time) => now - time < this.timeWindow)

    if (this.requests.length >= this.maxRequests) {
      return false
    }

    this.requests.push(now)
    return true
  }

  getTimeUntilReset(): number {
    if (this.requests.length === 0) return 0
    const oldestRequest = Math.min(...this.requests)
    return Math.max(0, this.timeWindow - (Date.now() - oldestRequest))
  }
}

// Create a global rate limiter instance
export const globalRateLimiter = new RateLimiter()
