import Vue from 'vue';
import { expect } from 'chai';
import HelloWorld from '@/components/HelloWorld.vue'
import { mount } from '@vue/test-utils';

// 这样写比较麻烦 可以使用vue带的 import { mount } from '@vue/test-utils';
describe('Hello Worl .vue1', () => { // 测试组件的UI效果 是否和预期一致
  it('传递属性后能否正常显示结果', () => {
    // 原生自己测试vue
    // extend 方法可以根据实例创建一个类
    let Constructor = Vue.extend(HelloWorld); // 通过HelloWorld这个组件 拿到它的基类Constructor
    // 把组件进行挂载
    // vm.$el mocha 测试的时候 集成了 jsdom
    let vm = new Constructor({  // 创建一个vue实例
      propsData: {msg: 'hello'}
    }).$mount();

    vm.$el.querySelector('h1')?.innerHTML

    expect(vm.$el.querySelector('h1')?.innerHTML).to.be.contain('hello')
  })
})

describe('Hello word .vue2', () => {
  it('测试 hello world', () => {
    // 方式 一
    let wrapper = mount(HelloWorld, {
      propsData: {msg: 'hello'}
    })
    // 方式 二 [失败 待研究]
    // let wrapper = mount(HelloWorld)
    // wrapper.setProps({msg: 'hello'})
    expect(wrapper.find('h1').text()).to.be.contain('hello')
  })
})