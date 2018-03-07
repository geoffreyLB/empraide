import React, { Component } from 'react'
import round from 'lodash.round'
import { validate } from 'react-easy-validation'

import Alert from '../alert/Alert'
import Content from '../content/Content'
import Header from '../header/Header'
import {
    getCapital,
    getInterestAmount,
    getMonths,
    getRate,
    getRepayment,
    getTotalAmount
} from '../../helpers/formulas'

class App extends Component {
    state = {
        tab: 0,
        open: false,
        error: '',
        repayment: '',
        capital: '',
        months: '',
        rate: '',
        statement: null
    }

    clearValues = refresh => {
        let field = 'repayment'

        switch (this.state.tab) {
            case 1:
                field = 'capital'
                break
            case 2:
                field = 'months'
                break
            case 3:
                field = 'rate'
        }

        this.setState({ [field]: '', statement: null }, () => {
            refresh && validate(field)
        })
    }

    handleField = ({ target: { name, value } }) => {
        this.setState({ [name]: value }, this.clearValues)
    }

    handleCalculation = () => {
        if (validate('form'))
            this.setState(prevState => {
                const nextState = {}

                let repayment = parseFloat(prevState.repayment),
                    capital = parseFloat(prevState.capital),
                    months = parseFloat(prevState.months),
                    rate = parseFloat(prevState.rate)

                try {
                    switch (prevState.tab) {
                        case 0:
                            repayment = getRepayment(capital, months, rate)
                            nextState.repayment = round(repayment, 2).toString()
                            break
                        case 1:
                            capital = getCapital(repayment, months, rate)
                            nextState.capital = round(capital, 2).toString()
                            break
                        case 2:
                            months = getMonths(repayment, capital, rate)
                            nextState.months = round(months, 1).toString()
                            break
                        default:
                            rate = getRate(repayment, capital, months)
                            nextState.rate = round(rate, 2).toString()
                    }
                } catch ({ message }) {
                    return {
                        open: true,
                        error: message
                    }
                }

                nextState.statement = {
                    total: round(getTotalAmount(repayment, months), 2).toString(),
                    interest: round(getInterestAmount(repayment, capital, months), 2).toString()
                }

                return nextState
            })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleTabs = (event, tab) => {
        this.setState({ tab }, () => {
            this.clearValues(true)
        })
    }

    render() {
        const { tab, open, error, ...others } = this.state

        return [
            <Header
                key={0}
                onChange={this.handleTabs}
                value={tab}
            />,
            <Content
                {...others}
                key={1}
                onChange={this.handleField}
                onSubmit={this.handleCalculation}
                tab={tab}
            />,
            <Alert
                key={2}
                onClose={this.handleClose}
                open={open}
                error={error}
            />
        ]
    }
}

export default App
