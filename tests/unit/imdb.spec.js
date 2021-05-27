import { shallowMount } from "@vue/test-utils";
import Imdb from '@/views/Imdb.vue'
import service from '@/services/imdb-service'

describe('Imdb', () => {
  it('renders Imbd', () => {
    const wrapper = shallowMount(Imdb);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('input').attributes('type')).toBe('text');
    expect(wrapper.find('.search').text()).toBe('Search');
  })
  it('success API call', async () => {
    const spy = jest.spyOn(service, 'getMovies');
    spy.mockImplementation(() => {
      return Promise.resolve({
        Search: []
      })
    })

    const wrapper = shallowMount(Imdb);

    await wrapper.find('.search').trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);

    await wrapper.find('.search').trigger('click');
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  })
  it('data with success API call', async () => {
    // mock data
    const movies = [
      { imdbID: '1234', Title: 'some title', Poster: 'some/poster.jpeg' },
      { imdbID: '12345', Title: 'some title2', Poster: 'some/poster2.jpeg' },
      { imdbID: '123456', Title: 'some title3', Poster: 'some/poster3.jpeg' },
    ];

    // mocking 
    const spy = jest.spyOn(service, 'getMovies');
    spy.mockImplementation(() => {
      return Promise.resolve({
        Search: movies
      });
    });

    const wrapper = shallowMount(Imdb);
    await wrapper.find('.search').trigger('click');
    await wrapper.vm.$nextTick();

    const movieWrappers = wrapper.findAll('.movie');
    expect(movieWrappers.length).toBe(movies.length);

    movies.forEach((movie, index) => {
      const movieWrapper = movieWrappers.at(index);
      // expect(movieWrapper.attributes('key')).toBe(movies[0].imdbID);
      expect(movieWrapper.find('img').attributes('src')).toBe(movie.Poster);
      expect(movieWrapper.find('span').text()).toBe(movie.Title);
    })
    spy.mockRestore();
  })
  it('error in API call', async () => {
    // mocking 
    const spy = jest.spyOn(service, 'getMovies');
    spy.mockImplementation(() => {
      return Promise.reject();
    });

    const wrapper = shallowMount(Imdb);
    await wrapper.find('.search').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.imdb-error').exists()).toBe(true);
    expect(wrapper.find('.imdb-error').text()).toBe('Something went wrong');
    spy.mockRestore();
  })
  it('serach input', () => {
    const inputText = "thor";
    const wrapper = shallowMount(Imdb);
    const inputWrapper = wrapper.find('input');
    inputWrapper.setValue(inputText);
    expect(inputWrapper.element.value).toBe(inputText);
    expect(wrapper.vm.$data.search).toBe(inputText)
  })
  it('mock depending on search', async () => {
    // mock data
    const inputText = "abc";
    const movies = [
      { imdbID: '1234', Title: 'some title', Poster: 'some/poster.jpeg' },
      { imdbID: '12345', Title: 'some title2', Poster: 'some/poster2.jpeg' },
      { imdbID: '123456', Title: 'some title3', Poster: 'some/poster3.jpeg' },
    ];

    // mocking 
    const spy = jest.spyOn(service, 'getMovies');
    spy.mockImplementation((search) => {
      return Promise.resolve({
        Search: search == inputText ? movies : []
      });
    });
    
    const wrapper = shallowMount(Imdb);
    const inputWrapper = wrapper.find('input');
    const buttonWrapper = wrapper.find('.search');

    await buttonWrapper.trigger('click');
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.movie').exists()).toBe(false);

    await inputWrapper.setValue(inputText);
    await buttonWrapper.trigger('click');
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(wrapper.findAll('.movie').length).toBe(movies.length);

    spy.mockRestore();
  })
});