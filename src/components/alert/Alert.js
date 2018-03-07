import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from 'material-ui/Dialog'

const Alert = ({ error, onClose, open }) => (
    <Dialog
        open={open}
        onClose={onClose}>
        <DialogTitle>Une erreur est survenue</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Impossible d'obtenir le calcul souhaité. {error}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={onClose}>Ok</Button>
        </DialogActions>
    </Dialog>
)

Alert.propTypes = {
    error: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default Alert
