import {expect } from 'chai';
// shallowMount 如果有子组件 用它不会将子组件渲染出来
import { mount, shallowMount } from '@vue/test-utils';

import Parent from '@/components/Parent.vue';
import Child from '@/components/Child.vue';

describe('当前子组件触发事件时 可以通知父组件', () => {
  it('$emit show', () => {
    let wrapper = shallowMount(Parent);
    // wrapper.setData({isShow: true});
    expect(wrapper.find('#content').exists()).to.be.false;
    wrapper.findComponent(Child).vm.$emit('show');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#content').exists()).to.be.true;
    })
  })
})