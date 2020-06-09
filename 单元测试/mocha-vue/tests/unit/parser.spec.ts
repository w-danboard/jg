import { parser, stringify } from '@/code/parser'
// 写代的时候 mocha + chai(断言库)
import { expect } from 'chai';

// 我要测试的方法

// it表示的就是一个用例
it('我要测试parser  是否靠谱', () => {
  // .to.be.equal 是否相等
  // deep.equal 表示两个对象是否完全相同 (引用空间无所谓)
  // equal 相等于 ===
  // deep.equal 相当于 ==
  expect(parser('name=wl')).to.be.deep.equal({name: 'wl'});
});

it('我要测试stringify是否靠谱', () => {
  expect(stringify({name: 'wl'}).replace(/\s+/g, '')).to.be.equal('name=wl');
})