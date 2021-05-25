import { shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'

describe('Home.vue', () => {
  it('renders props.msg when passed', async  () => {
    const msg = 'message';
    const wrapper = shallowMount(Home, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
    
    const newMessage = "new message";
    await wrapper.setProps({ msg : newMessage});
    expect(wrapper.text()).toMatch(newMessage);
  })
})
