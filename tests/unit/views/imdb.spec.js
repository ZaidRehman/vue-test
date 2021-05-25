import { shallowMount } from '@vue/test-utils'
import Imdb from '@/views/Imdb.vue'
import service from "@/services/imdb-service";

describe('Imdb.vue', () => {
  it('renders Imdb', () => {
    const wrapper = shallowMount(Imdb);
    // check element exits
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper.find('.imdb-head input').exists()).toBeTruthy();
    expect(wrapper.find('.imdb-head button').exists()).toBeTruthy();
    expect(wrapper.find('.imdb-head button').text()).toBe('Search');
  })

  it('calls sevice', async () => {
    const spy = jest.spyOn(service, 'getMovies');
    spy.mockImplementation(() => {
      return Promise.resolve({ Search: [] })
    });

    const wrapper = shallowMount(Imdb);
    await wrapper.find('.imdb-head button').trigger('click');

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  })

  it('calls sevice', async () => {
    const spy = jest.spyOn(service, 'getMovies');
    const data = { Search: [{ Poster: "some/poster.jpeg", Title: "some title" }] }
    spy.mockImplementation(() => {
      return Promise.resolve(data)
    });

    const wrapper = shallowMount(Imdb);
    await wrapper.find('.imdb-head button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
    const movies = wrapper.findAll('.movie')
    expect(movies.length).toBe(1)
    
    const firstMovie = movies.at(0);
    expect(firstMovie.find('img').attributes('src')).toBe(data.Search[0].Poster);
    expect(firstMovie.find('span').text()).toBe(data.Search[0].Title);

    spy.mockRestore();
  })

  it('calls sevice', async () => {
    const spy = jest.spyOn(service, 'getMovies');
    spy.mockImplementation(() => {
      return Promise.reject()
    });

    const wrapper = shallowMount(Imdb);
    await wrapper.find('.imdb-head button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
    const errorDiv = wrapper.find('.imdb-error')
    expect(errorDiv.exists()).toBeTruthy();
    expect(errorDiv.text()).toBe('Something went wrong');
    
    spy.mockRestore();

  })
})
