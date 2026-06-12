import { useState, useEffect, type DependencyList } from 'react'

/**
 * Re-trigger animasi chart/bar setiap kali deps berubah.
 * @returns boolean — true = animasi aktif
 */
export function useAnimationTrigger(deps: DependencyList = []): boolean {
  const [triggered, setTriggered] = useState<boolean>(true)

  useEffect(() => {
    setTriggered(false)
    const id = setTimeout(() => setTriggered(true), 50)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return triggered
}