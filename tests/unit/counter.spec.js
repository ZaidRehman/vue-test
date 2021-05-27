import { shallowMount } from '@vue/test-utils'
import Counter from '@/views/Counter.vue'

describe('Counter.vue', () => {
  it('renders counter vue', () => {
    const wrapper = shallowMount(Counter);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Counter');
    expect(wrapper.find('#increment').text()).toBe('+');
    expect(wrapper.find('#decrement').exists()).toBe(false);
    expect(wrapper.find('.value').text()).toBe("0");
  })
  it('uses icrement button', async () => {
    const wrapper = shallowMount(Counter);
    
    for(let i = 0; i < 5; i++) {
      expect(wrapper.find('#increment').exists()).toBe(true);
      await wrapper.find('#increment').trigger('click');
      expect(wrapper.find('.value').text()).toBe((i + 1).toString());
    }
    expect(wrapper.find('#increment').exists()).toBe(false);
  })
  it('uses decrement button', async () => {
    const wrapper = shallowMount(Counter);
    
    await wrapper.find('#increment').trigger('click');
    await wrapper.find('#increment').trigger('click');
  
    await wrapper.find('#decrement').trigger('click');
    expect(wrapper.find('.value').text()).toBe("1");
  })
})
