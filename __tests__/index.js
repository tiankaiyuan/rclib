/**
 * created by tiankaiyuan on 2018/3/26
 */
import React from 'react'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Test from '../shared/components/Test'

Enzyme.configure({ adapter: new Adapter() });
const {mount} = Enzyme;

test('button test',()=>{
    const bt = mount(
        <Test text={'hell'}/>
    )
    expect(bt.props().text).toEqual('hell')
});