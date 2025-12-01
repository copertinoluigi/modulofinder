'use client'
import Script from 'next/script'
import { useState, useEffect } from 'react'
import CookieBanner from './CookieBanner'

export default function Analytics() {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('cookie_consent') === 'true') {
      setConsentGiven(true)
    }
  }, [])

  return (
    <>
      <CookieBanner onAccept={() => setConsentGiven(true)} />
      {consentGiven && process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}
    </>
  )
}
