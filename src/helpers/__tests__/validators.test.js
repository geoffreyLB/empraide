import { isNumber, isPositive, isRequired } from '../validators'

describe('validators', () => {
    describe('isRequired', () => {
        it('should get a hint', () => {
            expect(isRequired.hint).toBe('Champ requis')
        })

        it('should not validate', () => {
            expect(isRequired.rule('')).toBe(false)
        })

        it('should validate', () => {
            expect(isRequired.rule('10')).toBe(true)
            expect(isRequired.rule(' ')).toBe(true)
        })
    })

    describe('isNumber', () => {
        it('should get a hint', () => {
            expect(isNumber.hint).toBe('Nombre invalide')
        })

        it('should not validate', () => {
            expect(isNumber.rule('a,4')).toBe(false)
            expect(isNumber.rule('3,4')).toBe(false)
            expect(isNumber.rule('3 4')).toBe(false)
            expect(isNumber.rule('3.4 ')).toBe(false)
        })

        it('should validate', () => {
            expect(isNumber.rule('2')).toBe(true)
            expect(isNumber.rule('-2')).toBe(true)
            expect(isNumber.rule('2.3')).toBe(true)
            expect(isNumber.rule('.3')).toBe(true)
            expect(isNumber.rule('2e3')).toBe(true)
        })
    })

    describe('isPositive', () => {
        it('should get a hint', () => {
            expect(isPositive.hint).toBe('Doit être positif')
        })

        it('should not validate', () => {
            expect(isPositive.rule('-1')).toBe(false)
            expect(isPositive.rule('0')).toBe(false)
        })

        it('should validate', () => {
            expect(isPositive.rule('1')).toBe(true)
        })
    })
})
