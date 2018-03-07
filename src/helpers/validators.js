import isEmpty from 'validator/lib/isEmpty'
import isFloat from 'validator/lib/isFloat'

export const isRequired = {
    rule: value => !isEmpty(value),
    hint: 'Champ requis'
}

export const isNumber = {
    rule: isFloat,
    hint: 'Nombre invalide'
}

export const isPositive = {
    rule: value => parseFloat(value) > 0,
    hint: 'Doit être positif'
}
