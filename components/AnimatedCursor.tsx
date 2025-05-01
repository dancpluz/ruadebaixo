'use client'
import { useEffect } from 'react'
import { convertAniBinaryToCSS } from 'ani-cursor'

export default function AnimatedCursor({
  selector,
  aniPath
}: {
  selector: string
  aniPath: string
}) {
  useEffect(() => {
    const applyCursor = async () => {
      try {
        const response = await fetch(aniPath)
        const data = new Uint8Array(await response.arrayBuffer())

        const style = document.createElement('style')
        style.innerHTML = `
          ${convertAniBinaryToCSS(selector, data)}
          ${selector} * {
            cursor: inherit !important;
          }
        `;

        document.head.appendChild(style)
      } catch (error) {
        console.error('Error loading cursor:', error)
      }
    }

    applyCursor()

    return () => {
      const styles = document.head.querySelectorAll('style')
      styles.forEach(style => {
        if (style.innerHTML.includes(selector)) {
          document.head.removeChild(style)
        }
      })
    }
  }, [selector, aniPath])

  return null
}