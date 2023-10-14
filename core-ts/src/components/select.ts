import { defineComponent, ref, type PropType } from 'vue'

interface SelectOptions<T> {
  initialValue?: T[]
  items: T[]
}

export function useSelect<T>(options: SelectOptions<T>) {
  const { initialValue = [], items } = options

  const selected = ref(new Set())

  const add = (item: T) => {
    if (items.indexOf(item) == -1) {
      return
    }
    selected.value.add(item)
  }
  initialValue.forEach((i) => add(i))

  const has = (item: T) => {
    selected.value.has(item)
  }

  const remove = (item: T) => {
    selected.value.delete(item)
  }

  const clear = () => {
    selected.value.clear()
  }

  const set = (item: T) => {
    clear();
    add(item);
  }

  return {
    selected,
    add,
    set,
    has,
    remove,
    clear
  }
}

export function useSelectComponent<T>() {
  const selectProps = {
    initialValue: {
      type: Array as PropType<Array<T>>,
      default: () => []
    },
    items: {
      type: Array as PropType<Array<T>>,
      default: () => []
    },
  }

  return defineComponent({
    props: selectProps,
    setup(props, ctx) {
      const select = useSelect(props)

      return () => {
        return ctx.slots.default?.(select)
      }
    }
  })
}


