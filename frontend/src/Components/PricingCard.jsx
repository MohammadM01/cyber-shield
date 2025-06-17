"use client"

import { Check, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import PropTypes from 'prop-types'

export default function PricingCard({ tier, price, period, features, buttonText, popular = false }) {
  return (
    <Card
      className={`relative bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 ${
        popular ? "ring-2 ring-blue-500 scale-105" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-600 text-white border-blue-500 px-3 py-1">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-white mb-2">{tier}</CardTitle>
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-slate-400">{period}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className={`w-full py-3 font-semibold transition-all duration-300 ${
            popular
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25"
              : "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
          }`}
        >
          {buttonText}
        </Button>

        {tier === "Free" && <p className="text-xs text-slate-500 text-center">No credit card required</p>}

        {tier === "Premium" && (
          <p className="text-xs text-slate-500 text-center">Cancel anytime • 30-day money-back guarantee</p>
        )}
      </CardContent>
    </Card>
  )
}

PricingCard.propTypes = {
  tier: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonText: PropTypes.string.isRequired,
  popular: PropTypes.bool
}
