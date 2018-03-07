export const getRepayment = (capital, months, rate) =>
    capital * (rate / 1200) / (1 - (1 + rate / 1200) ** -months)

export const getCapital = (repayment, months, rate) =>
    (repayment - repayment * (1 + rate / 1200) ** -months) / (rate / 1200)

export const getMonths = (repayment, capital, rate) => {
    if (repayment <= capital * rate / 1200)
        throw new Error('La mensualité saisie est insuffisante...')

    return Math.log(repayment / (repayment - capital * rate / 1200)) / Math.log(1 + rate / 1200)
}

export const getRate = (repayment, capital, months) => {
    let gotCapital,
        rate = 0.01,
        direction = 1,
        step = 10,
        counter = 0

    do {
        if (counter++ > 10000)
            throw new Error("Le nombre maximum d'itérations a été dépassé !")

        gotCapital = getCapital(repayment, months, rate)

        if (direction * gotCapital < direction * capital) {
            direction = -direction
            step = step / 2
        }

        rate += direction * step
    } while (Math.abs(gotCapital - capital) > 0.001)

    return rate
}

export const getTotalAmount = (repayment, months) =>
    repayment * months

export const getInterestAmount = (repayment, capital, months) =>
    repayment * months - capital
