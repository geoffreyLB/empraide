import React from 'react'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import { mount } from 'enzyme'

import Header from '../Header'

describe('<Header />', () => {
    it('should render several Tab in an AppBar', () => {
        const wrapper = mount(
            <Header
                onChange={() => {}}
                value={0}
            />
        )

        expect(wrapper.find(AppBar)).toHaveLength(1)
        expect(wrapper.find(Tabs)).toHaveLength(1)
        expect(wrapper.find(Tab)).toHaveLength(4)

        expect(wrapper.find(Tab).at(0).text()).toBe('Mensualité')
        expect(wrapper.find(Tab).at(1).text()).toBe('Capital')
        expect(wrapper.find(Tab).at(2).text()).toBe('Mois')
        expect(wrapper.find(Tab).at(3).text()).toBe('Taux')
    })

    it('should pass props to Tabs', () => {
        const handleChange = () => {}

        const wrapper = mount(
            <Header
                onChange={handleChange}
                value={2}
            />
        )

        expect(wrapper.find(Tabs).props()).toMatchObject({
            onChange: handleChange,
            value: 2
        })
    })
})
