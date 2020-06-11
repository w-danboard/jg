import { expect } from 'chai';
import sinon from 'sinon';
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

// mocha + chai + sinon (帮我们mock方法)
// 在测试里 最讨厌 异步 接口 模拟函数
describe('测试子组件接受一个函数 点击按钮时调用这个函数', () => {
  it('点击按钮触发函数', async () => {
    let callback = sinon.spy(); // 间谍函数 可以把它派给别人 它被调了 它自己知道
    let wrapper = shallowMount(Child, {
      propsData: {fn: callback}
    });
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick()
    expect(callback.callCount).to.be.equal(1);
    expect(callback.getCall(0).args[0]).to.be.equal('测试啊'); // 判断第一次调用的参数是什么
  })
})