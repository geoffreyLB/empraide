import {
    getCapital,
    getInterestAmount,
    getMonths,
    getRate,
    getRepayment,
    getTotalAmount
} from '../formulas'

describe('formulas', () => {
    describe('getRepayment(capital, months, monthlyRate)', () => {
        it('should return a good result', () => {
            expect(getRepayment(15000, 60, 4)).toBe(276.24783082898847)
        })
    })

    describe('getCapital(repayment, months, monthlyRate)', () => {
        it('should return a good result', () => {
            expect(getCapital(276, 60, 4)).toBe(14986.543016740901)
        })
    })

    describe('getMonths(repayment, capital, monthlyRate)', () => {
        it('should return a good result', () => {
            expect(getMonths(276, 15000, 4)).toBe(60.05963744071964)
        })

        it('should throw an error', () => {
            expect(() => {
                getMonths(15, 35000, 8)
            }).toThrow('La mensualité saisie est insuffisante...')
        })
    })

    describe('getRate(repayment, capital, months)', () => {
        it('should return a good result', () => {
            expect(getRate(276, 15000, 60)).toBe(3.9633782005310056)
        })

        it('should throw an error', () => {
            expect(() => {
                getRate(6894940624, 1000, 12)
            }).toThrow("Le nombre maximum d'itérations a été dépassé !")
        })
    })

    describe('getTotalAmount(repayment, months)', () => {
        it('should return a good result', () => {
            expect(getTotalAmount(276, 60)).toBe(16560)
        })
    })

    describe('getInterestAmount(repayment, capital, months)', () => {
        it('should return a good result', () => {
            expect(getInterestAmount(276, 15000, 60)).toBe(1560)
        })
    })
})
