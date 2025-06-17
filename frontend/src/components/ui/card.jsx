import React from 'react'

const Card = ({ className, ...props }) => {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 ${className}`}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }) => {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}

const CardTitle = ({ className, ...props }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
  )
}

const CardContent = ({ className, ...props }) => {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}

export { Card, CardHeader, CardTitle, CardContent } 