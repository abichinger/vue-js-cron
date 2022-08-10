import { mount } from '@vue/test-utils'
import 'regenerator-runtime/runtime'
import VueCron from '../src/core.vue'

test('test VueCron', async () => {
  // render the component
  let slotProps = null

  const wrapper = mount(VueCron, {
    props: {
      value: '*/15 12 * * *'
    },
    slots: {
      default: function (p) {
        slotProps = p
      }
    }
  })

  await wrapper.vm.$nextTick()

  expect(slotProps.fields[4].attrs.value).toEqual([0, 15, 30, 45])
  expect(slotProps.fields[3].attrs.value).toEqual([12])
  expect(slotProps.fields[2].attrs.value).toEqual([])
  expect(slotProps.fields[1].attrs.value).toEqual([])
  expect(slotProps.fields[0].attrs.value).toEqual([])

  slotProps.fields[4].events.input([1, 2, 3, 4, 5])

  await wrapper.vm.$nextTick()

  expect(wrapper.emitted()).toHaveProperty('update:value')
  expect(wrapper.emitted('update:value')[0]).toEqual(['1-5 12 * * *'])
})
