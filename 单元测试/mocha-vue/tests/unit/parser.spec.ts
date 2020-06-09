import { parser, stringify } from '@/code/parser'
// 写代的时候 mocha + chai(断言库)
import { expect } from 'chai';

// 我要测试的方法
// describe包裹层 套件 *** 一般一个文件使用一个 这里学习就都写一个文件里了~ ***

describe('专门测试parser', () => {
  // it表示的就是一个用例
  it('我要测试parser  是否靠谱', () => {
    // .to.be.equal 是否相等
    // deep.equal 表示两个对象是否完全相同 (引用空间无所谓)
    // equal 相等于 ===
    // deep.equal 相当于 ==
    expect(parser('name=wl')).to.be.deep.equal({name: 'wl'});
  });
})

describe('专门测试stringify', () => {
  // 常见的关系 相等 大于/小于 包含/不包含
  it('我要测试stringify是否靠谱', () => {
    expect(stringify({name: 'wl'}).replace(/\s+/g, '')).to.be.equal('name=wl');
  })
})

describe('测试方法', () => {
  it('相等关系', () => {
    expect(1+1).to.be.equal(2);
    expect([1,2,3]).to.be.length(3);
    expect(true).to.be.true;
  })
  it('包含', () => {
    expect('wl').to.be.contain('l');  // 包含
    expect('wl').to.be.match(/l/);    // 匹配
  })
  it('大于 小于', () => {
    expect(5).to.be.greaterThan(3); // 大于
    expect(3).to.be.lessThan(5); // 小于
    expect(3).to.be.not.greaterThan(5); // 不大于
  })
})