import { rowDensity } from '@/components/row-density'
import { describe, expect, it } from 'vitest'

describe('rowDensity', () => {
  it('uses dense with Vuetify 3', () => {
    const VRow = { props: { align: String, dense: Boolean } }
    expect(rowDensity(VRow)).toEqual({ dense: true })
  })

  it('uses density with Vuetify 4', () => {
    const VRow = { props: { align: String, dense: Boolean, density: String } }
    expect(rowDensity(VRow)).toEqual({ density: 'compact' })
  })

  it('falls back to dense if VRow is not registered', () => {
    expect(rowDensity('VRow')).toEqual({ dense: true })
  })
})
