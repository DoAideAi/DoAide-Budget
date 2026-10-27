#!/usr/bin/env node
/**
 * prerender-routes.mjs
 *
 * After `vite build`, copies dist/index.html into sub-directories for each
 * route defined in routeMeta.js, rewriting <title>, <meta>, <link rel=canonical>,
 * og:*, twitter:*, and the JSON-LD block so crawlers get unique per-page SEO
 * without needing JavaScript.
 *
 * Usage:  node scripts/prerender-routes.mjs
 * Run after:  npm run build
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const SHELL = readFileSync(join(DIST, 'index.html'), 'utf-8')

// Inline route meta to avoid importing JSX-adjacent module in Node
const BASE_URL = 'https://budget.doaide.com'
const OG_IMAGE = `${BASE_URL}/og-budget.png`

const routes = {
  '/': {
    title: 'DoAide Budget — Free Personal Budget & Expense Tracker',
    description: 'Track income, expenses, set budgets, split bills, and calculate EMIs. Free personal finance tool — no signup required.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'DoAide Budget',
      url: BASE_URL,
      description: 'Track income, expenses, set budgets, split bills, and calculate EMIs. Free personal finance tool — no signup required.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },
  '/transactions': {
    title: 'Track Transactions — DoAide Budget',
    description: 'Log and categorize every income and expense. Filter by month, search by note, and stay on top of your money.',
  },
  '/budget': {
    title: 'Set Monthly Budgets — DoAide Budget',
    description: 'Create category-wise monthly budgets and track spending against them. Visual progress bars show how close you are to each limit.',
  },
  '/analytics': {
    title: 'Spending Analytics & Charts — DoAide Budget',
    description: 'Visualize your spending patterns with interactive charts. See category breakdowns, monthly trends, and income-vs-expense analysis.',
  },
  '/bill-splitter': {
    title: 'Bill Splitter — Split Bills Easily | DoAide Budget',
    description: 'Split restaurant bills, travel costs, or group expenses among friends. Equal or custom splits with instant per-person totals.',
  },
  '/emi-calculator': {
    title: 'EMI Calculator — Calculate Loan EMI Instantly | DoAide Budget',
    description: 'Calculate monthly EMI for home loans, car loans, and personal loans. Enter principal, rate, and tenure to see your EMI, total interest, and amortization.',
  },
  '/savings-goal': {
    title: 'Savings Goals Tracker — DoAide Budget',
    description: 'Set savings goals with target amounts and deadlines. Track progress visually and see how much you need to save each month.',
  },
  '/currency-converter': {
    title: 'Currency Converter — Live Exchange Rates | DoAide Budget',
    description: 'Convert between 150+ world currencies with live exchange rates. Quick, free, and no signup needed.',
  },
  '/export': {
    title: 'Export Budget Data — DoAide Budget',
    description: 'Export your transactions and budget data as PDF or share a visual summary. Keep records for tax filing or personal archives.',
  },
}

function buildJsonLd(route, path) {
  if (route.jsonLd) return route.jsonLd
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title.split(' — ')[0].split(' | ')[0],
    url: `${BASE_URL}${path}`,
    description: route.description,
    isPartOf: { '@type': 'WebApplication', name: 'DoAide Budget', url: BASE_URL },
  }
}

let count = 0
for (const [path, route] of Object.entries(routes)) {
  const canonical = `${BASE_URL}${path === '/' ? '/' : path}`
  const jsonLd = buildJsonLd(route, path)

  let html = SHELL
    // Title
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    // Meta description
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${route.description}"`
    )
    // Canonical
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${canonical}"`
    )
    // OG tags
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${route.title}"`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${route.description}"`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${canonical}"`
    )
    // Twitter tags
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${route.title}"`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${route.description}"`
    )
    // JSON-LD
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n    ${JSON.stringify(jsonLd, null, 2).replace(/\n/g, '\n    ')}\n    </script>`
    )

  // Add an h1 inside <body> for crawlers (hidden, overridden by React)
  const pageName = route.title.split(' — ')[0].split(' | ')[0]
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><h1>${pageName}</h1></div>`
  )

  if (path === '/') {
    writeFileSync(join(DIST, 'index.html'), html)
  } else {
    const dir = join(DIST, path.slice(1))
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
  }
  count++
}

// Route each prerendered URL to its own index.html, with the SPA fallback
// last. `serve -s` would put its own catch-all first and shadow these, so the
// web unit runs plain `serve dist`. serve-handler re-applies the remaining
// rewrites to a rewritten path, so the fallback only matches dot-free paths.
const serveConfig = {
  rewrites: [
    ...Object.keys(routes)
      .filter((path) => path !== '/')
      .map((path) => ({ source: path, destination: `${path}/index.html` })),
    { source: '/:path([^.]+)', destination: '/index.html' },
  ],
  headers: [
    { source: '/assets/**', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
  ],
}
writeFileSync(join(DIST, 'serve.json'), JSON.stringify(serveConfig, null, 2) + '\n')

console.log(`Prerendered ${count} routes into dist/`)
