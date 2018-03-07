import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'

const Header = props => (
    <AppBar position="static">
        <Tabs {...props} centered>
            <Tab label="Mensualité" />
            <Tab label="Capital" />
            <Tab label="Mois" />
            <Tab label="Taux" />
        </Tabs>
    </AppBar>
)

Header.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
}

export default Header
