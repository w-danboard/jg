import {expect } from 'chai';
// shallowMount 如果有子组件 用它不会将子组件渲染出来
import { mount, shallowMount } from '@vue/test-utils';

import Parent from '@/components/Parent.vue';
import Child from '@/components/Child.vue';

describe('测试Child子组件', () => {
  it ('点击事件', () => {
    let wrapper = mount(Child);
  }) 
})