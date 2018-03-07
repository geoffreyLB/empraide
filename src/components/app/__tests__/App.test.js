import React from 'react'
import Button from 'material-ui/Button'
import { mount } from 'enzyme'

import Alert from '../../alert/Alert'
import App from '../App'
import Content from '../../content/Content'
import Header from '../../header/Header'

describe('<App />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(<App />)
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('should render Header, Content & Alert', () => {
        expect(wrapper.find(Header)).toHaveLength(1)
        expect(wrapper.find(Content)).toHaveLength(1)
        expect(wrapper.find(Alert)).toHaveLength(1)
    })

    it('should pass props to its children', () => {
        wrapper.setState({
            tab: 3,
            open: true,
            error: 'Oups',
            repayment: '455',
            capital: '20000',
            months: '52',
            rate: '8',
            statement: {
                total: '23732',
                interest: '3732'
            }
        })

        expect(wrapper.find(Header).props()).toEqual({
            onChange: wrapper.instance().handleTabs,
            value: 3
        })

        expect(wrapper.find(Content).props()).toEqual({
            tab: 3,
            onChange: wrapper.instance().handleField,
            onSubmit: wrapper.instance().handleCalculation,
            repayment: '455',
            capital: '20000',
            months: '52',
            rate: '8',
            statement: {
                total: '23732',
                interest: '3732'
            }
        })

        expect(wrapper.find(Alert).props()).toEqual({
            onClose: wrapper.instance().handleClose,
            open: true,
            error: 'Oups'
        })
    })

    it('should update capital, months & rate by setting input', () => {
        expect(wrapper.state('repayment')).toBe('')

        wrapper.find('input[name="capital"]').simulate('change', {
            target: { name: 'capital', value: '10000' }
        })

        expect(wrapper.state('capital')).toBe('10000')

        wrapper.find('input[name="months"]').simulate('change', {
            target: { name: 'months', value: '48' }
        })

        expect(wrapper.state('months')).toBe('48')

        wrapper.find('input[name="rate"]').simulate('change', {
            target: { name: 'rate', value: '5' }
        })

        expect(wrapper.state('rate')).toBe('5')
    })

    it('should not calculate because some fields are invalid', () => {
        wrapper.find(Content).find('button').simulate('click')

        expect(wrapper.state('statement')).toBe(null)
    })

    it('should calculate', () => {
        wrapper.setState({
            capital: '12000',
            months: '36',
            rate: '6'
        })

        wrapper.find(Content).find('button').simulate('click')

        expect(wrapper.state()).toMatchObject({
            repayment: '365.06',
            statement: {
                interest: '1142.28',
                total: '13142.28'
            }
        })

        wrapper.setState({
            tab: 1,
            repayment: '300',
            capital: '',
            months: '48',
            rate: '4'
        })

        wrapper.find(Content).find('button').simulate('click')

        expect(wrapper.state()).toMatchObject({
            capital: '13286.65',
            statement: {
                interest: '1113.35',
                total: '14400'
            }
        })

        wrapper.setState({
            tab: 2,
            repayment: '150',
            capital: '5000',
            months: '',
            rate: '8'
        })

        wrapper.find(Content).find('button').simulate('click')

        expect(wrapper.state()).toMatchObject({
            months: '37.8',
            statement: {
                interest: '673.4',
                total: '5673.4'
            }
        })

        wrapper.setState({
            tab: 3,
            repayment: '2150',
            capital: '25000',
            months: '12',
            rate: ''
        })

        wrapper.find(Content).find('button').simulate('click')

        expect(wrapper.state()).toMatchObject({
            rate: '5.86',
            statement: {
                interest: '800',
                total: '25800'
            }
        })
    })

    it('should display an error', () => {
        wrapper.setState({
            tab: 2,
            repayment: '1',
            capital: '12000',
            rate: '6'
        })

        wrapper.find(Content).find('button').simulate('click')

        expect(wrapper.state()).toMatchObject({
            open: true,
            error: 'La mensualité saisie est insuffisante...',
            months: '',
            statement: null
        })
    })

    it('should reset statement and target field after setting a field', () => {
        wrapper.setState({
            repayment: '100',
            statement: {
                interest: '1030',
                total: '30'
            }
        })

        wrapper.find('input[name="capital"]').simulate('change', {
            target: { name: 'capital', value: '1000' }
        })

        expect(wrapper.state()).toMatchObject({
            repayment: '',
            capital: '1000',
            statement: null
        })

        wrapper.setState({
            tab: 1,
            statement: {
                interest: '1030',
                total: '30'
            }
        })

        wrapper.find('input[name="months"]').simulate('change', {
            target: { name: 'months', value: '36' }
        })

        expect(wrapper.state()).toMatchObject({
            capital: '',
            months: '36',
            statement: null
        })

        wrapper.setState({
            tab: 2,
            statement: {
                interest: '1030',
                total: '30'
            }
        })

        wrapper.find('input[name="rate"]').simulate('change', {
            target: { name: 'rate', value: '5' }
        })

        expect(wrapper.state()).toMatchObject({
            months: '',
            rate: '5',
            statement: null
        })

        wrapper.setState({
            tab: 3,
            statement: {
                interest: '1030',
                total: '30'
            }
        })

        wrapper.find('input[name="repayment"]').simulate('change', {
            target: { name: 'repayment', value: '100' }
        })

        expect(wrapper.state()).toMatchObject({
            repayment: '100',
            rate: '',
            statement: null
        })
    })

    it('should change tab', () => {
        wrapper.find(Header).find('button').at(1).simulate('click')

        expect(wrapper.state('tab')).toBe(1)

        wrapper.find(Header).find('button').at(2).simulate('click')

        expect(wrapper.state('tab')).toBe(2)

        wrapper.find(Header).find('button').at(3).simulate('click')

        expect(wrapper.state('tab')).toBe(3)

        wrapper.find(Header).find('button').at(0).simulate('click')

        expect(wrapper.state('tab')).toBe(0)
    })

    it('should set open to false', () => {
        wrapper.setState({ open: true })

        wrapper.find(Alert).prop('onClose')()

        expect(wrapper.state('open')).toBe(false)
    })
})
