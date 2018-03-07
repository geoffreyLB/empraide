const styles = theme => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        padding: theme.spacing.unit,
        textTransform: 'uppercase'
    },
    content: {
        overflow: 'auto',
        padding: theme.spacing.unit
    }
})

export default styles
