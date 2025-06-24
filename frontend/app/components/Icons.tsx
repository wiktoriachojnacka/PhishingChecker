export function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="icon">
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <path
        d="M16 2L6 6V14C6 21 10 26 16 28C22 26 26 21 26 14V6L16 2Z"
        fill="url(#shieldGradient)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
      />
      <path d="M12 16L14.5 18.5L20 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="icon">
      <defs>
        <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <circle cx="9" cy="9" r="6" stroke="url(#searchGradient)" strokeWidth="2" fill="none" />
      <path d="m19 19-4.35-4.35" stroke="url(#searchGradient)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CompareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="icon">
      <defs>
        <linearGradient id="compareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <rect x="2" y="4" width="6" height="12" rx="1" stroke="url(#compareGradient)" strokeWidth="2" fill="none" />
      <rect x="12" y="4" width="6" height="12" rx="1" stroke="url(#compareGradient)" strokeWidth="2" fill="none" />
      <line x1="4" y1="8" x2="6" y2="8" stroke="url(#compareGradient)" strokeWidth="1.5" />
      <line x1="4" y1="10" x2="6" y2="10" stroke="url(#compareGradient)" strokeWidth="1.5" />
      <line x1="14" y1="8" x2="16" y2="8" stroke="url(#compareGradient)" strokeWidth="1.5" />
      <line x1="14" y1="10" x2="16" y2="10" stroke="url(#compareGradient)" strokeWidth="1.5" />
    </svg>
  )
}

export function TreeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="icon">
      <defs>
        <linearGradient id="treeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <circle cx="10" cy="4" r="2" fill="url(#treeGradient)" />
      <circle cx="6" cy="10" r="1.5" fill="url(#treeGradient)" />
      <circle cx="14" cy="10" r="1.5" fill="url(#treeGradient)" />
      <circle cx="4" cy="16" r="1" fill="url(#treeGradient)" />
      <circle cx="8" cy="16" r="1" fill="url(#treeGradient)" />
      <circle cx="12" cy="16" r="1" fill="url(#treeGradient)" />
      <circle cx="16" cy="16" r="1" fill="url(#treeGradient)" />
      <line x1="10" y1="6" x2="6" y2="8.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <line x1="10" y1="6" x2="14" y2="8.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <line x1="6" y1="11.5" x2="4" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <line x1="6" y1="11.5" x2="8" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <line x1="14" y1="11.5" x2="12" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <line x1="14" y1="11.5" x2="16" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
    </svg>
  )
}

export function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="icon">
      <defs>
        <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L4 12H8L6 18L14 8H10L12 2Z"
        fill="url(#boltGradient)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
      />
    </svg>
  )
}

export function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="icon">
      <defs>
        <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <path d="M10 2L18 16H2L10 2Z" fill="url(#warningGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="10" y1="8" x2="10" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1" fill="white" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="icon">
      <defs>
        <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <circle cx="10" cy="10" r="8" fill="url(#checkGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon">
      <defs>
        <linearGradient id="menuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <line x1="3" y1="6" x2="21" y2="6" stroke="url(#menuGradient)" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="url(#menuGradient)" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" stroke="url(#menuGradient)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="icon">
      <defs>
        <linearGradient id="alertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <circle cx="10" cy="10" r="8" stroke="url(#alertGradient)" strokeWidth="2" fill="none" />
      <line x1="10" y1="6" x2="10" y2="10" stroke="url(#alertGradient)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1" fill="url(#alertGradient)" />
    </svg>
  )
}
