"use client"

import { useState } from "react"
import CheckUrl from "./components/CheckUrl"
import CompareModels from "./components/CompareModels"
import AboutRandomForest from "./components/AboutRandomForest"
import AboutXGBoost from "./components/AboutXGBoost"
import { ShieldIcon, SearchIcon, CompareIcon, TreeIcon, BoltIcon, MenuIcon } from "./components/Icons"
import "./globals.css"

export default function App() {
  const [activeTab, setActiveTab] = useState("check")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tabs = [
    { id: "check", label: "Check URL", icon: <SearchIcon /> },
    { id: "compare", label: "Compare Models", icon: <CompareIcon /> },
    { id: "rf", label: "About Random Forest", icon: <TreeIcon /> },
    { id: "xgb", label: "About XGBoost", icon: <BoltIcon /> },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "check":
        return <CheckUrl />
      case "compare":
        return <CompareModels />
      case "rf":
        return <AboutRandomForest />
      case "xgb":
        return <AboutXGBoost />
      default:
        return <CheckUrl />
    }
  }

  return (
    <div className="app">
      //{/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <MenuIcon />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <ShieldIcon />
            <div className="logo-text">
              <h1>Phishing Detector</h1>
              <p>AI-Powered Security</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`sidebar-nav-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab.id)
                setSidebarOpen(false)
              }}
            >
              <span className="sidebar-nav-icon">{tab.icon}</span>
              <span className="sidebar-nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="footer-decoration"></div>
          <p className="footer-text">
            Created by
            <br />
            Wiktoria Chojnacka
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-container">
        <div className="content-wrapper">{renderContent()}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  )
}
