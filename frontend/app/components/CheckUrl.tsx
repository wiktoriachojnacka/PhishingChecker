"use client"

import { useState } from "react"
import { WarningIcon, CheckIcon, AlertIcon } from "./Icons"
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

export default function CheckUrl() {
  const [url, setUrl] = useState("")
  const [model, setModel] = useState("rf")
  const [result, setResult] = useState<ModelResult | null>(null)
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
    setResult(null)

    try {
      const endpoint = model === "rf" ? "predict" : "predict/xgb"
      const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) {
        throw new Error("Error checking URL")
      }

      const data = await response.json()
      setResult(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred while checking")
    } finally {
      setLoading(false)
    }
  }

  const renderFeatureChart = () => {
    if (!result?.features) return null

    // Convert features to chart data format
    const chartData = Object.entries(result.features)
      .map(([key, value]) => ({
        name: key,
        value: Number(value),
      }))
      .sort((a, b) => b.value - a.value) // Sort by value descending
      .slice(0, 10) // Take top 10 features

    return (
      <div className="chart-container">
        <h4 className="chart-title">Top 10 Most Significant Features</h4>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 1]} />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip 
                formatter={(value: number) => [`${value}`, 'Value']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="#667eea"
                name="Feature Value"
                label={{ position: 'right', fill: '#ffffff' }}
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
        <h1 className="page-title">URL Security Check</h1>
        <p className="page-subtitle">Analyze URLs for potential phishing threats using AI models</p>
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

          <div className="input-group">
            <label className="label">Select model:</label>
            <select value={model} onChange={(e) => setModel(e.target.value)} className="select" disabled={loading}>
              <option value="rf">Random Forest</option>
              <option value="xgb">XGBoost</option>
            </select>
          </div>

          <button type="submit" className="button primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              "Check URL"
            )}
          </button>
        </form>

        {error && (
          <div className="alert error">
            <AlertIcon />
            {error}
          </div>
        )}

        {result && (
          <div className="result-card">
            <h3 className="result-title">Analysis Result:</h3>
            <div className={`result-badge ${result.is_phishing ? "danger" : "success"}`}>
              {result.is_phishing ? <WarningIcon /> : <CheckIcon />}
              {result.is_phishing ? "PHISHING DETECTED!" : "URL IS SAFE"}
            </div>

            <div className="metrics-table">
              <h4 className="metrics-title">Model Performance Metrics</h4>
              <table className="metrics-table-content">
                <tbody>
                  <tr>
                    <td>Recall</td>
                    <td>{(result.recall * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>Precision</td>
                    <td>{(result.precision * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>F1-score</td>
                    <td>{(result.f1_score * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>Accuracy</td>
                    <td>{(result.accuracy * 100).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>

              <div className="metrics-legend">
                <h5>What do these metrics mean?</h5>
                <ul>
                  <li><strong>Recall:</strong> How well the model detects phishing websites (higher is better)</li>
                  <li><strong>Precision:</strong> How accurate the model's phishing predictions are (higher is better)</li>
                  <li><strong>F1-score:</strong> Balance between recall and precision (higher is better)</li>
                  <li><strong>Accuracy:</strong> Overall correctness of the model's predictions (higher is better)</li>
                </ul>
              </div>
            </div>

            {renderFeatureChart()}

            {result.features && (
              <div className="features">
                <h4 className="features-title">All Analyzed Features:</h4>
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
        )}
      </div>
    </div>
  )
}
