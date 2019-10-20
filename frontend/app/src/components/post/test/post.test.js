import { shallow, mount } from 'enzyme';
import React from 'react';
import MainApp from '../MainApp';
import { BrowserRouter as MemoryRouter, Router, Route, Switch } from 'react-router-dom'
import LoginComponent from '../LoginComponent.jsx'
import WelcomeComponent from '../WelcomeComponent.jsx'
import AccountProfile from '../../profilewall/AccountProfile.jsx'
import LogoutComponent from '../LogoutComponent.jsx'



describe('The main app renders without error', () => {

        it('render the login component on path "/" ', () => {
            const wrapper = mount(
                <MemoryRouter initialEntries={[ '/' ]}>
                    <MainApp/>
                </MemoryRouter>
            );

            expect(wrapper.find(LoginComponent)).toHaveLength(1);
            expect(wrapper.find(WelcomeComponent)).toHaveLength(0);
            expect(wrapper.find(AccountProfile)).toHaveLength(0);
            expect(wrapper.find(LogoutComponent)).toHaveLength(0);
        })

});
