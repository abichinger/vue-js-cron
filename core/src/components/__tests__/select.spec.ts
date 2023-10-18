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
      items: items,
      multiple: true
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

  it('useSelect select items', async () => {
    const items = new Array(10).fill(0).map((_, i) => {
      return {
        value: i,
        text: `Item-${i}`
      }
    })

    const withTick = async (fn : () => void) => {
      fn()
      await nextTick()
    }

    const { select, setItems, selected } = useSelect<any, number>({items, multiple: true})

    let counter = 0;
    const expected = [
      [0],
      [],
      [1,2]
    ]
    watch(selected, (value) => {
      expect((value as number[]).sort()).toEqual(expected[counter].sort());
      counter++;
    })

    await withTick(() => select(items[0]))
    await withTick(() => select(items[0]))
    await withTick(() => select({value: 100, text: 'Item-100'})) // ignored
    await withTick(() => setItems([items[1], items[2]]))
    await withTick(() => setItems([items[1], items[2]])) // ignored
  })
})
