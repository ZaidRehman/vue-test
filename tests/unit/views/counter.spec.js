import { shallowMount } from '@vue/test-utils'
import Counter from '@/views/Counter.vue'

describe('Counter.vue', () => {
  it('renders buttons and value', () => {
    const wrapper = shallowMount(Counter);
    // check element exits
    expect(wrapper.find('#increment').exists()).toBeTruthy();
    expect(wrapper.find('#decrement').exists()).toBeTruthy();
    expect(wrapper.find('.value').exists()).toBeTruthy();
    expect(wrapper.find('.value').text()).toBe('0');

    expect(wrapper.vm.count).toBe(0) // avoid testing like this
  })

  it('increment method', async () => {
    const wrapper = shallowMount(Counter);
    await wrapper.find('#increment').trigger('click');
    expect(wrapper.find('.value').text()).toBe('1');
    
    await wrapper.vm.increment() // avoid testing like this
  })

  it('decrement method', async () => {
    const wrapper = shallowMount(Counter);
    await wrapper.find('#decrement').trigger('click');
    expect(wrapper.find('.value').text()).toBe('0');
  })

  it('increment and decrement simultaneously', async () => {
    const wrapper = shallowMount(Counter);

    await wrapper.find('#increment').trigger('click');
    expect(wrapper.find('.value').text()).toBe('1');

    await wrapper.find('#increment').trigger('click');
    expect(wrapper.find('.value').text()).toBe('2');

    await wrapper.find('#decrement').trigger('click');
    expect(wrapper.find('.value').text()).toBe('1');

    await wrapper.find('#decrement').trigger('click');
    expect(wrapper.find('.value').text()).toBe('0');
  })
})
