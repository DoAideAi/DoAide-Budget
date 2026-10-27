/**
 * SEO metadata for each route.
 * Used by useSEO hook to set title, description, canonical, OG, and JSON-LD.
 */

const BASE_URL = 'https://budget.doaide.com'
const OG_IMAGE = `${BASE_URL}/og-budget.png`
const OG_IMAGE_WIDTH = '1200'
const OG_IMAGE_HEIGHT = '630'
const SITE_NAME = 'DoAide Budget'

const routeMeta = {
  dashboard: {
    title: 'DoAide Budget — Free Personal Budget & Expense Tracker',
    description:
      'Track income, expenses, set budgets, split bills, and calculate EMIs. Free personal finance tool — no signup required.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'DoAide Budget',
      url: BASE_URL,
      description:
        'Track income, expenses, set budgets, split bills, and calculate EMIs. Free personal finance tool — no signup required.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },

  transactions: {
    title: 'Track Transactions — DoAide Budget',
    description:
      'Log and categorize every income and expense. Filter by month, search by note, and stay on top of your money.',
    path: '/transactions',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Track Transactions',
      url: `${BASE_URL}/transactions`,
      description:
        'Log and categorize every income and expense. Filter by month, search by note, and stay on top of your money.',
      isPartOf: { '@type': 'WebApplication', name: SITE_NAME, url: BASE_URL },
    },
  },

  budget: {
    title: 'Set Monthly Budgets — DoAide Budget',
    description:
      'Create category-wise monthly budgets and track spending against them. Visual progress bars show how close you are to each limit.',
    path: '/budget',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Set Monthly Budgets',
      url: `${BASE_URL}/budget`,
      description:
        'Create category-wise monthly budgets and track spending against them.',
      isPartOf: { '@type': 'WebApplication', name: SITE_NAME, url: BASE_URL },
    },
  },

  analytics: {
    title: 'Spending Analytics & Charts — DoAide Budget',
    description:
      'Visualize your spending patterns with interactive charts. See category breakdowns, monthly trends, and income-vs-expense analysis.',
    path: '/analytics',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Spending Analytics',
      url: `${BASE_URL}/analytics`,
      description:
        'Visualize your spending patterns with interactive charts. Category breakdowns, monthly trends, and income-vs-expense analysis.',
      isPartOf: { '@type': 'WebApplication', name: SITE_NAME, url: BASE_URL },
    },
  },

  'bill-splitter': {
    title: 'Bill Splitter — Split Bills Easily | DoAide Budget',
    description:
      'Split restaurant bills, travel costs, or group expenses among friends. Equal or custom splits with instant per-person totals.',
    path: '/bill-splitter',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Bill Splitter',
      url: `${BASE_URL}/bill-splitter`,
      description:
        'Split restaurant bills, travel costs, or group expenses among friends. Equal or custom splits with instant per-person totals.',
      isPartOf: { '@type': 'WebApplication', name: SITE_NAME, url: BASE_URL },
    },
  },

  'emi-calculator': {
    title: 'EMI Calculator — Calculate Loan EMI Instantly | DoAide Budget',
    description:
      'Calculate monthly EMI for home loans, car loans, and personal loans. Enter principal, rate, and tenure to see your EMI, total interest, and amortization.',
    path: '/emi-calculator',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'EMI Calculator',
      url: `${BASE_URL}/emi-calculator`,
      description:
        'Calculate monthly EMI for home loans, car loans, and personal loans. Enter principal, rate, and tenure to see your EMI and total interest.',
      isPartOf: { '@type': 'WebApplication', name: SITE_NAME, url: BASE_URL },
    },
  },

  'savings-goal': {
    title: 'Savings Goals Tracker — DoAide Budget',
    description:
      'Set savings goals with target amounts and deadlines. Track progress visually and see how much you need to save each month.',
    path: '/savings-goal',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Savings Goals Tracker',
      url: `${BASE_URL}/savings-goal`,
      description:
        'Set savings goals with target amounts and deadlines. Track progress visually and see how much you need to save each month.',
      isPartOf: { '@type': 'WebApplication', name: SITE_NAME, url: BASE_URL },
    },
  },

  'currency-converter': {
    title: 'Currency Converter — Live Exchange Rates | DoAide Budget',
    description:
      'Convert between 150+ world currencies with live exchange rates. Quick, free, and no signup needed.',
    path: '/currency-converter',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Currency Converter',
      url: `${BASE_URL}/currency-converter`,
      description:
        'Convert between 150+ world currencies with live exchange rates. Quick, free, and no signup needed.',
      isPartOf: { '@type': 'WebApplication', name: SITE_NAME, url: BASE_URL },
    },
  },

  export: {
    title: 'Export Budget Data — DoAide Budget',
    description:
      'Export your transactions and budget data as PDF or share a visual summary. Keep records for tax filing or personal archives.',
    path: '/export',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Export Budget Data',
      url: `${BASE_URL}/export`,
      description:
        'Export your transactions and budget data as PDF or share a visual summary.',
      isPartOf: { '@type': 'WebApplication', name: SITE_NAME, url: BASE_URL },
    },
  },
}

export { BASE_URL, OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, SITE_NAME }
export default routeMeta
