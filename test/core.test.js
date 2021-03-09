import { shallowMount } from '@vue/test-utils'
import VueCron from '../src/core.vue'

test('test VueCron', () => {
    // render the component
    let onInput = jest.fn()
    let props = null
    
    let wrapper = shallowMount(VueCron, {
        propsData: {
            value: '*/15 12 * * *'
        },
        scopedSlots: {
            default: function(p){
                props = p                
            }
        },
        listeners:{
            input: function(value){
                onInput()
                expect(value).toEqual('1-5 12 * * *')
            }
        }
    })

    expect(props.minuteAttrs.value).toEqual([0,15,30,45])
    expect(props.hourAttrs.value).toEqual([12])
    expect(props.dayAttrs.value).toEqual([])
    expect(props.monthAttrs.value).toEqual([])
    expect(props.dayOfWeekAttrs.value).toEqual([])
    
    props.minuteEvents.input([1,2,3,4,5])

    wrapper.vm.$nextTick(() => {
        expect(onInput).toHaveBeenCalled()
    })    

})