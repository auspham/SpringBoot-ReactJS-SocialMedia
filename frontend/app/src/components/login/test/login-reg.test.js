import { shallow } from 'enzyme';
import React from 'react';
import { Login } from '../login.jsx';
import { Register } from '../register.jsx';

describe('Login/Register Component', () => {
    const login = shallow(<Login/>);
    const register = shallow(<Register/>);

    it('It should render Login Form without errors', () => {
        expect(login.exists()).toBe(true);
    })

    it('It should render Register Form without errors', () => {
        expect(register.exists()).toBe(true);
    })
});
