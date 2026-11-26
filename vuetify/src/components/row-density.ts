import type { Component } from 'vue'

/**
 * Props for the density of `VRow`.
 * Vuetify 4 deprecates `dense` in favour of `density`, which `VRow` of Vuetify 3 doesn't have.
 */
export function rowDensity(row: Component | string): { density: 'compact' } | { dense: true } {
  return typeof row === 'object' && 'density' in (row.props ?? {})
    ? { density: 'compact' }
    : { dense: true }
}
