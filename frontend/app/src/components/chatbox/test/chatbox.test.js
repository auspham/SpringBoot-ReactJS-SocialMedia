import { shallow } from 'enzyme';
import React from 'react';
import ChatBoxBasic from '../ChatBoxBasic';
import ChatBoxSide from '../ChatBoxSide';
import ChatModule from '../ChatModule';

var fakeReceiver = [
    {
        object: '1'
    },
    {
        object: '2'
    },
    {
        object: '3'
    }
];


const setUp = (props={}) => {
    const component = shallow(<ChatModule {...props} />);
    return component;
};

describe('Login/Register Component', () => {
    const component = shallow(<ChatBoxBasic/>);
    const component1 = shallow(<ChatBoxSide/>);

    it('It should render ChatBoxBasic without errors', () => {
        console.log(component.debug());
        expect(component.exists()).toBe(true);
    })

    it('It should render Side Chatbox without errors', () => {
        console.log(component1.debug());
        expect(component1.exists()).toBe(true);
    })

});
