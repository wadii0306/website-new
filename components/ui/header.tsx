'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Menu, X, ArrowRight } from 'lucide-react'
import React from 'react'

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

type NavTheme = 'dark' | 'light'

function getNavProbeY(): number {
  const header = document.querySelector('header')
  if (header) {
    const bottom = header.getBoundingClientRect().bottom
    return Math.min(Math.max(bottom + 1, 1), window.innerHeight - 1)
  }
  return 72
}

function getThemeAtProbe(): NavTheme {
  const x = Math.round(window.innerWidth / 2)
  const y = getNavProbeY()

  // Prefer the actual pixel under the navbar (handles nested light/dark blocks inside About, etc.)
  const stack = document.elementsFromPoint(x, y)
  for (const node of stack) {
    const el = node as HTMLElement
    if (el.closest('header, nav')) continue

    const themed = el.closest('[data-nav-theme]') as HTMLElement | null
    if (themed) {
      return themed.dataset.navTheme === 'light' ? 'light' : 'dark'
    }
  }

  // Fallback: smallest themed region that contains the probe (most specific ancestor)
  let bestArea = Infinity
  let bestTheme: NavTheme = 'dark'
  document.querySelectorAll<HTMLElement>('[data-nav-theme]').forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top <= y && rect.bottom > y) {
      const area = rect.width * rect.height
      if (area < bestArea) {
        bestArea = area
        bestTheme = el.dataset.navTheme === 'light' ? 'light' : 'dark'
      }
    }
  })

  return bestTheme
}

function getHeaderOffset(): number {
  const header = document.querySelector('header')
  return Math.round(header?.getBoundingClientRect().height ?? 68)
}

export const HeroHeader = () => {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [atHeroTop, setAtHeroTop] = React.useState(true)
  const [navTheme, setNavTheme] = React.useState<NavTheme>('dark')
  const [activeHash, setActiveHash] = React.useState('')
  const clickLockRef = React.useRef(false)
  const pendingHashRef = React.useRef<string | null>(null)

  const isLight = navTheme === 'light'
  const isTransparent = !scrolled && atHeroTop && !isLight && !open

  const releaseClickLock = React.useCallback(() => {
    clickLockRef.current = false
    pendingHashRef.current = null
  }, [])

  const applyNavTarget = React.useCallback(
    (href: string, scroll = false) => {
      if (!href.startsWith('#')) return
      setActiveHash(href)
      pendingHashRef.current = href
      clickLockRef.current = true

      if (scroll) {
        const el = document.querySelector(href)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      window.setTimeout(releaseClickLock, 1400)
    },
    [releaseClickLock]
  )

  React.useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.href.replace('#', ''))).filter(
      Boolean
    ) as HTMLElement[]

    if (!sections.length) return

    const headerOffset = getHeaderOffset()
    const firstSection = sections[0]

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLockRef.current && pendingHashRef.current) {
          setActiveHash(pendingHashRef.current)
          return
        }

        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio > 0.08)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveHash(`#${visible[0].target.id}`)
          return
        }

        if (firstSection.getBoundingClientRect().top > headerOffset + 24) {
          setActiveHash('')
        }
      },
      {
        rootMargin: `-${headerOffset + 20}px 0px -50% 0px`,
        threshold: [0, 0.08, 0.2, 0.4, 0.6],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 12)
      setAtHeroTop(window.scrollY < 64)
      setNavTheme(getThemeAtProbe())
    }

    const onNavigate = (e: Event) => {
      const href = (e as CustomEvent<{ href: string }>).detail?.href
      if (href) applyNavTarget(href, true)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    window.addEventListener('wadii:navigate', onNavigate)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('wadii:navigate', onNavigate)
    }
  }, [applyNavTarget])

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      setOpen(false)
      applyNavTarget(href, true)
    }
  }

  const navSurface = isTransparent
    ? 'bg-transparent border-transparent shadow-none'
    : isLight
      ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200/90 shadow-[0_4px_24px_rgba(17,26,45,0.06)]'
      : 'bg-[#111A2D]/90 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/15'

  const linkBase = isLight
    ? 'text-gray-600 hover:text-[#111A2D] hover:bg-gray-100/80'
    : 'text-white/75 hover:text-white hover:bg-white/10'

  const linkActive = isLight
    ? 'text-white bg-[#111A2D] shadow-sm'
    : 'text-white bg-white/12'

  const menuBtn = isLight
    ? 'text-[#111A2D] hover:bg-gray-100'
    : 'text-white hover:bg-white/10'

  const mobilePanel = isLight
    ? 'border-gray-200 bg-white/98'
    : 'border-white/10 bg-[#111A2D]/98'

  const mobileLink = isLight
    ? 'text-gray-700 hover:bg-gray-50 hover:text-[#111A2D]'
    : 'text-white/85 hover:bg-white/5 hover:text-white'

  const mobileLinkActive = isLight
    ? 'bg-gray-100 text-[#111A2D]'
    : 'bg-white/10 text-white'

  return (
    <header className="relative z-50">
      <nav
        className={[
          'fixed top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          navSurface,
        ].join(' ')}
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center h-[68px]">
            <Link
              href="/"
              aria-label="Wadii home"
              className="justify-self-start flex items-center transition-opacity hover:opacity-90"
            >
              <Logo variant={isLight ? 'light' : 'dark'} className="h-10 w-auto" />
            </Link>

            <ul className="justify-self-center flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeHash === item.href
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => handleNav(e, item.href)}
                      className={[
                        'px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-300',
                        isActive ? linkActive : linkBase,
                      ].join(' ')}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="justify-self-end">
              <a
                href="#contact"
                onClick={(e) => handleNav(e, '#contact')}
                className="inline-flex items-center gap-2 rounded-lg bg-[#E62E2D] hover:bg-[#c92827] px-5 py-2.5 text-[14px] font-semibold text-white shadow-md shadow-red-900/20 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex lg:hidden items-center justify-between h-16">
            <Link href="/" aria-label="Wadii home" className="flex items-center">
              <Logo variant={isLight ? 'light' : 'dark'} className="h-9 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={['flex h-10 w-10 items-center justify-center rounded-lg transition-colors', menuBtn].join(' ')}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={[
            'lg:hidden overflow-hidden border-t backdrop-blur-xl transition-all duration-300 ease-in-out',
            mobilePanel,
            open ? 'max-h-[85dvh] opacity-100' : 'max-h-0 opacity-0 border-t-transparent',
          ].join(' ')}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeHash === item.href
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className={[
                    'block rounded-lg px-4 py-3 text-[15px] font-medium transition-colors',
                    isActive ? mobileLinkActive : mobileLink,
                  ].join(' ')}
                >
                  {item.label}
                </a>
              )
            })}
            <div className="pt-3">
              <a
                href="#contact"
                onClick={(e) => handleNav(e, '#contact')}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#E62E2D] py-3 text-[15px] font-semibold text-white"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
