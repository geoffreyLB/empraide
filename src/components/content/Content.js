import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import { ValidationIn } from 'react-easy-validation'
import { withStyles } from 'material-ui/styles'

import Card from '../card/Card'
import styles from './styles'
import { isNumber, isPositive, isRequired } from '../../helpers/validators'

const Content = ({
    classes,
    onChange,
    onSubmit,
    tab,
    repayment,
    capital,
    months,
    rate,
    statement
}) => (
    <div className={classes.container}>
        <Grid container spacing={24}>
            <Grid item xs={6}>
                <ValidationIn
                    groups={['form', 'repayment']}
                    validators={tab !== 0 ? [
                        isRequired,
                        isNumber,
                        isPositive
                    ] : []}>
                    <TextField
                        disabled={tab === 0}
                        fullWidth
                        label="Mensualité"
                        name="repayment"
                        onChange={onChange}
                        value={repayment}
                    />
                </ValidationIn>
            </Grid>
            <Grid item xs={6}>
                <ValidationIn
                    groups={['form', 'capital']}
                    validators={tab !== 1 ? [
                        isRequired,
                        isNumber,
                        isPositive
                    ] : []}>
                    <TextField
                        disabled={tab === 1}
                        fullWidth
                        label="Capital"
                        name="capital"
                        onChange={onChange}
                        value={capital}
                    />
                </ValidationIn>
            </Grid>
            <Grid item xs={6}>
                <ValidationIn
                    groups={['form', 'months']}
                    validators={tab !== 2 ? [
                        isRequired,
                        isNumber,
                        isPositive
                    ] : []}>
                    <TextField
                        disabled={tab === 2}
                        fullWidth
                        label="Mois"
                        name="months"
                        onChange={onChange}
                        value={months}
                    />
                </ValidationIn>
            </Grid>
            <Grid item xs={6}>
                <ValidationIn
                    groups={['form', 'rate']}
                    validators={tab !== 3 ? [
                        isRequired,
                        isNumber,
                        isPositive
                    ] : []}>
                    <TextField
                        disabled={tab === 3}
                        fullWidth
                        label="Taux"
                        name="rate"
                        onChange={onChange}
                        value={rate}
                    />
                </ValidationIn>
            </Grid>
            <Grid item xs={12}>
                <Button
                    className={classes.button}
                    color="primary"
                    onClick={onSubmit}
                    variant="raised">
                    Calculer
                </Button>
            </Grid>
            {statement && [
                <Grid key={0} item xs={6}>
                     <Card
                        title="Total des intérêts"
                        value={statement.interest}
                    />
                </Grid>,
                <Grid key={1} item xs={6}>
                    <Card
                        title="Total versé"
                        value={statement.total}
                    />
                </Grid>
            ]}
        </Grid>
    </div>
)

Content.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    tab: PropTypes.number.isRequired,
    repayment: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    months: PropTypes.string.isRequired,
    rate: PropTypes.string.isRequired,
    statement: PropTypes.shape({
        interest: PropTypes.string.isRequired,
        total: PropTypes.string.isRequired
    })
}

export default withStyles(styles)(Content)
