import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import styles from './styles'

const Card = ({ classes, title, value }) => (
    <Paper>
        <Typography
            align="center"
            className={classes.header}>
            {title}
        </Typography>
        <Typography
            align="center"
            className={classes.content}
            component="p"
            type="subheading">
            {value}
        </Typography>
    </Paper>
)

Card.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default withStyles(styles)(Card)
