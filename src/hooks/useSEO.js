import { useEffect } from 'react'
import routeMeta, { BASE_URL, OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, SITE_NAME } from '../routeMeta'

/**
 * Dynamically update <head> meta tags for SEO on each page navigation.
 */
export default function useSEO(pageKey) {
  useEffect(() => {
    const meta = routeMeta[pageKey]
    if (!meta) return

    const canonicalUrl = `${BASE_URL}${meta.path}`

    // Title
    document.title = meta.title

    // Description
    setMeta('name', 'description', meta.description)

    // Canonical
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonicalUrl)

    // Open Graph
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('property', 'og:image:width', OG_IMAGE_WIDTH)
    setMeta('property', 'og:image:height', OG_IMAGE_HEIGHT)

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setMeta('name', 'twitter:image', OG_IMAGE)

    // JSON-LD
    let script = document.querySelector('script[data-seo-jsonld]')
    if (!script) {
      script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.setAttribute('data-seo-jsonld', 'true')
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(meta.jsonLd)
  }, [pageKey])
}

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}
