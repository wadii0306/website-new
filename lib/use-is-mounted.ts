"use client"

import { useEffect, useState } from "react"

/** True only after the client has mounted — use to defer animations / DOM measurements. */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
