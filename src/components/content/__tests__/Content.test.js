import React from 'react'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import { mount } from 'enzyme'
import { ValidationIn } from 'react-easy-validation'

import Card from '../../card/Card'
import Content from '../Content'
import { isNumber, isPositive, isRequired } from '../../../helpers/validators'

describe('<Content />', () => {
    let wrapper

    afterEach(() => {
        wrapper.unmount()
    })

    it('should render several Grid, ValidationIn, TextField & Card as well as a Button', () => {
        wrapper = mount(
            <Content
                onChange={() => {}}
                onSubmit={() => {}}
                tab={-1}
                repayment="230"
                capital="10000"
                months="48"
                rate="5"
                statement={{
                    total: "11054",
                    interest: "1054"
                }}
            />
        )

        expect(wrapper.find(Grid)).toHaveLength(8)
        expect(wrapper.find(TextField)).toHaveLength(4)
        expect(wrapper.find(ValidationIn)).toHaveLength(4)
        expect(wrapper.find(Button)).toHaveLength(1)
        expect(wrapper.find(Card)).toHaveLength(2)
    })

    it('should not render any Card because statement is null', () => {
        wrapper = mount(
            <Content
                onChange={() => {}}
                onSubmit={() => {}}
                tab={-1}
                repayment="420"
                capital="5000"
                months="12"
                rate="3"
                statement={null}
            />
        )

        expect(wrapper.find(Card)).toHaveLength(0)
    })

    it('should pass props to its children', () => {
        const handleChange = () => {}
        const handleSubmit = () => {}

        wrapper = mount(
            <Content
                onChange={handleChange}
                onSubmit={handleSubmit}
                tab={-1}
                repayment="450"
                capital="25000"
                months="60"
                rate="3"
                statement={{
                    total: '26953',
                    interest: '1953'
                }}
            />
        )

        expect(wrapper.find(TextField).at(0).props()).toMatchObject({
            disabled: false,
            label: 'Mensualité',
            name: 'repayment',
            onChange: handleChange,
            value: '450'
        })

        expect(wrapper.find(TextField).at(1).props()).toMatchObject({
            disabled: false,
            label: 'Capital',
            name: 'capital',
            onChange: handleChange,
            value: '25000'
        })

        expect(wrapper.find(TextField).at(2).props()).toMatchObject({
            disabled: false,
            label: 'Mois',
            name: 'months',
            onChange: handleChange,
            value: '60'
        })

        expect(wrapper.find(TextField).at(3).props()).toMatchObject({
            disabled: false,
            label: 'Taux',
            name: 'rate',
            onChange: handleChange,
            value: '3'
        })

        expect(wrapper.find(Button).props()).toMatchObject({
            children: 'Calculer',
            onClick: handleSubmit
        })

        expect(wrapper.find(Card).first().props()).toMatchObject({
            title: 'Total des intérêts',
            value: '1953'
        })

        expect(wrapper.find(Card).last().props()).toMatchObject({
            title: 'Total versé',
            value: '26953'
        })
    })

    it('should check all validators', () => {
        wrapper = mount(
            <Content
                onChange={() => {}}
                onSubmit={() => {}}
                tab={-1}
                repayment="340"
                capital="15000"
                months="48"
                rate="4"
                statement={null}
            />
        )

        expect(wrapper.find(ValidationIn).at(0).props()).toMatchObject({
            groups: ['form', 'repayment'],
            validators: [isRequired, isNumber, isPositive]
        })

        expect(wrapper.find(ValidationIn).at(1).props()).toMatchObject({
            groups: ['form', 'capital'],
            validators: [isRequired, isNumber, isPositive]
        })

        expect(wrapper.find(ValidationIn).at(2).props()).toMatchObject({
            groups: ['form', 'months'],
            validators: [isRequired, isNumber, isPositive]
        })

        expect(wrapper.find(ValidationIn).at(3).props()).toMatchObject({
            groups: ['form', 'rate'],
            validators: [isRequired, isNumber, isPositive]
        })
    })

    it('should disable fields depending on tab', () => {
        wrapper = mount(
            <Content
                onChange={() => {}}
                onSubmit={() => {}}
                tab={0}
                repayment="230"
                capital="8000"
                months="36"
                rate="2"
                statement={null}
            />
        )

        expect(wrapper.find(TextField).at(0).prop('disabled')).toBe(true)
        expect(wrapper.find(ValidationIn).at(0).prop('validators')).toEqual([])

        wrapper.setProps({ tab: 1 })

        expect(wrapper.find(TextField).at(1).prop('disabled')).toBe(true)
        expect(wrapper.find(ValidationIn).at(1).prop('validators')).toEqual([])

        wrapper.setProps({ tab: 2 })

        expect(wrapper.find(TextField).at(2).prop('disabled')).toBe(true)
        expect(wrapper.find(ValidationIn).at(2).prop('validators')).toEqual([])

        wrapper.setProps({ tab: 3 })

        expect(wrapper.find(TextField).at(3).prop('disabled')).toBe(true)
        expect(wrapper.find(ValidationIn).at(3).prop('validators')).toEqual([])
    })
})
