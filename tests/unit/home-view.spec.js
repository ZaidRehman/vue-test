import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home);

    expect(wrapper.exists()).toBe(true);
    const image = wrapper.find('#image-id')
    expect(image.attributes('alt')).toBe('Vue logo');
    expect(image.attributes('src')).toBe('../assets/logo.png');

  })
})
