"use client"

import { useState } from "react"
import { WarningIcon, CheckIcon, AlertIcon, TreeIcon, BoltIcon } from "./Icons"
import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ModelResult {
  is_phishing: boolean;
  recall: number;
  precision: number;
  f1_score: number;
  accuracy: number;
  features: Record<string, number | boolean>;
}

interface ComparisonResults {
  rf: ModelResult | null;
  xgb: ModelResult | null;
}

export default function CompareModels() {
  const [url, setUrl] = useState("")
  const [results, setResults] = useState<ComparisonResults>({ rf: null, xgb: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    setLoading(true)
    setError("")
    setResults({ rf: null, xgb: null })

    try {
      const response = await fetch("http://localhost:8000/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) {
        throw new Error("Error checking URL")
      }

      const data = await response.json()
      setResults({ rf: data.rf, xgb: data.xgb })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred while comparing")
    } finally {
      setLoading(false)
    }
  }

  const renderModelResult = (modelName: string, result: ModelResult | null, icon: React.ReactNode) => {
    if (!result) return null

    return (
      <div className="model-result">
        <h3 className="model-title">
          {icon}
          {modelName}
        </h3>

        <div className={`result-badge ${result.is_phishing ? "danger" : "success"}`}>
          {result.is_phishing ? <WarningIcon /> : <CheckIcon />}
          {result.is_phishing ? "PHISHING" : "SAFE"}
        </div>

        <div className="metrics">
          <div className="metric">
            <span className="metric-label">Recall:</span>
            <span className="metric-value">{(result.recall * 100).toFixed(1)}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Precision:</span>
            <span className="metric-value">{(result.precision * 100).toFixed(1)}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">F1-score:</span>
            <span className="metric-value">{(result.f1_score * 100).toFixed(1)}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Accuracy:</span>
            <span className="metric-value">{(result.accuracy * 100).toFixed(1)}%</span>
          </div>
        </div>

        {result.features && (
          <div className="features">
            <h4 className="features-title">Analyzed Features:</h4>
            <div className="features-grid">
              {Object.entries(result.features).map(([key, value]) => (
                <div key={key} className="feature-item">
                  <span className="feature-key">{key}:</span>
                  <span className="feature-value">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderComparisonChart = () => {
    if (!results.rf || !results.xgb) return null

    const chartData = [
      {
        name: 'Random Forest',
        recall: results.rf.recall * 100,
        precision: results.rf.precision * 100,
        f1_score: results.rf.f1_score * 100
      },
      {
        name: 'XGBoost',
        recall: results.xgb.recall * 100,
        precision: results.xgb.precision * 100,
        f1_score: results.xgb.f1_score * 100
      }
    ]

    return (
      <div className="chart-container">
        <h4 className="chart-title">Model Performance Comparison</h4>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />

              <YAxis 
                label={{ 
                  value: 'Score (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: '#ffffff' }
                }} 
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Score']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend />
              <Bar 
                dataKey="recall" 
                fill="#667eea"
                name="Recall"
                label={{ 
                  position: 'top',
                  fill: '#ffffff',
                  formatter: (value: number) => `${value.toFixed(1)}%`
                }}
              />
              <Bar 
                dataKey="precision" 
                fill="#764ba2"
                name="Precision"
                label={{ 
                  position: 'top',
                  fill: '#ffffff',
                  formatter: (value: number) => `${value.toFixed(1)}%`
                }}
              />
              <Bar 
                dataKey="f1_score" 
                fill="#86efac"
                name="F1-score"
                label={{ 
                  position: 'top',
                  fill: '#ffffff',
                  formatter: (value: number) => `${value.toFixed(1)}%`
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  return (
    
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Model Comparison</h1>
        <p className="page-subtitle">Compare Random Forest and XGBoost predictions side by side</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label className="label">URL to analyze:</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="input"
              disabled={loading}
            />
          </div>

          <button type="submit" className="button primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Comparing models...
              </>
            ) : (
              "Compare Models"
            )}
          </button>
        </form>

        {error && (
          <div className="alert error">
            <AlertIcon />
            {error}
          </div>
        )}

        {(results.rf || results.xgb) && (
          <div className="comparison-results">
            <h3 className="comparison-title">Comparison Results:</h3>
            <div className="models-grid">
              {renderModelResult("Random Forest", results.rf, <TreeIcon />)}
              {renderModelResult("XGBoost", results.xgb, <BoltIcon />)}
            </div>

            {results.rf && results.xgb && (
              <>
                {renderComparisonChart()}
                <div className="comparison-summary">
                  <h4 className="summary-title">Summary:</h4>
                  <div className="summary-content">
                    {results.rf.is_phishing === results.xgb.is_phishing ? (
                      <div className="agreement">
                        <CheckIcon />
                        Both models agree: URL is {results.rf.is_phishing ? "dangerous" : "safe"}
                      </div>
                    ) : (
                      <div className="disagreement">
                        <AlertIcon />
                        Models disagree - additional verification recommended
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
