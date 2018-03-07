import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { mount } from 'enzyme'

import Card from '../Card'

describe('<Card />', () => {
    it('should render a Paper with a title and a content', () => {
        const wrapper = mount(<Card title="Proverb" value="Wine is life" />)

        expect(wrapper.find(Paper)).toHaveLength(1)

        expect(wrapper.find(Typography).first().text()).toBe('Proverb')
        expect(wrapper.find(Typography).last().text()).toBe('Wine is life')
    })
})
