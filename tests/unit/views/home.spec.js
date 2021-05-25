import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renders image', () => {
    const wrapper = shallowMount(Home)

    // check element exits
    expect(wrapper.find('img').exists()).toBeTruthy();

    // check image source
    expect(wrapper.find('img').attributes('src')).toBe('../assets/logo.png');

    // check image alt value
    expect(wrapper.find('img').attributes('alt')).toBe('Vue logo');
  })
})
