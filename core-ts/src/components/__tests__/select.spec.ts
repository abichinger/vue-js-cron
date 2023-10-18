import { describe, expect, it } from 'vitest'
import { nextTick, watch } from 'vue'
import { useSelect } from '../select'

describe('select', () => {
  it('useSelect updates', async () => {
    const items = [
      {
        value: 0,
        text: 'zero'
      },
      {
        value: 1,
        text: 'one'
      }
    ]

    const s = useSelect({
      items: items
    })

    let counter = 0
    const zero = items[0]
    const one = items[1]

    watch(s.updated, () => {
      counter++
    })

    s.add(zero)
    await nextTick()

    s.add(one)
    await nextTick()

    expect(s.has(one)).toEqual(true)

    s.remove(one)
    await nextTick()

    expect(s.has(one)).toEqual(false)
    expect(counter).toEqual(3)
  })
})
