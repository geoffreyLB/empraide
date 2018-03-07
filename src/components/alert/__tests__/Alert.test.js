import React from 'react'
import Button from 'material-ui/Button'
import Dialog, { DialogContentText, DialogTitle } from 'material-ui/Dialog'
import { mount } from 'enzyme'

import Alert from '../Alert'

describe('<Alert />', () => {
    it('should render a Dialog with a Button', () => {
        const wrapper = mount(
            <Alert
                error="Manque pas de retour"
                onClose={() => {}}
                open
            />
        )

        expect(wrapper.find(Dialog)).toHaveLength(1)
        expect(wrapper.find(DialogTitle)).toHaveLength(1)
        expect(wrapper.find(DialogContentText)).toHaveLength(1)
        expect(wrapper.find(Button)).toHaveLength(1)

        expect(wrapper.find(DialogTitle).text()).toBe('Une erreur est survenue')
        expect(wrapper.find(Button).text()).toBe('Ok')
    })

    it('should pass props to its children', () => {
        const handleClose = () => {}

        const wrapper = mount(
            <Alert
                error="Un pommard ou un pommerol ?"
                onClose={handleClose}
                open
            />
        )

        expect(wrapper.find(Dialog).props()).toMatchObject({
            onClose: handleClose,
            open: true
        })
        
        expect(wrapper.find(DialogContentText).text()).toBe(
            "Impossible d'obtenir le calcul souhaité. Un pommard ou un pommerol ?"
        )

        expect(wrapper.find(Button).prop('onClick')).toBe(handleClose)
    })
})
