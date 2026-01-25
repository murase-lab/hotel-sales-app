// 合計金額計算ユーティリティ

export const calculateBreakfastTotal = (breakfast) => {
    const prices = {
        adult1430: 1430,
        adult1210: 1210,
        child880: 880,
        infant550: 550,
        netOld1030: 1030,
        agtOld1030: 1030,
        net1215: 1215,
        agt1215: 1215,
    };

    let total = 0;

    // 現金
    Object.keys(breakfast.cash).forEach((key) => {
        if (prices[key]) {
            total += breakfast.cash[key] * prices[key];
        }
    });

    // ホテル売掛
    Object.keys(breakfast.hotelCredit).forEach((key) => {
        if (prices[key]) {
            total += breakfast.hotelCredit[key] * prices[key];
        }
    });

    // クレジットカード
    Object.keys(breakfast.creditCard).forEach((key) => {
        if (prices[key]) {
            total += breakfast.creditCard[key] * prices[key];
        }
    });

    return total;
};

export const calculateLunchTotal = (lunch) => {
    const prices = {
        adult1430: 1430,
        child880: 880,
        infant550: 550,
        price1230: 1230,
        price100: 100,
        price930: 930,
    };

    let total = 0;

    // 固定項目（現金、PayPay、クレジット）
    ['cash', 'paypay', 'creditCard'].forEach((category) => {
        if (lunch[category] && typeof lunch[category] === 'object' && !Array.isArray(lunch[category])) {
            Object.keys(lunch[category]).forEach((key) => {
                if (prices[key]) {
                    total += (lunch[category][key] || 0) * prices[key];
                }
            });
        }
    });

    // 動的項目（ホテル売掛、宴会売掛）
    ['hotelCredit', 'banquetCredit'].forEach((category) => {
        if (Array.isArray(lunch[category])) {
            lunch[category].forEach((item) => {
                total += (item.price || 0) * (item.count || 0);
            });
        }
    });

    return total;
};

export const calculateGurunaviTotal = (gurunavi) => {
    const prices = {
        adult1430: 1430,
        child880: 880,
        infant550: 550,
        price1230: 1230,
        price100: 100,
        price930: 930,
        price1100: 1100,
        price550: 550,
    };

    let total = 0;

    // 固定項目（現金、PayPay、クレジット、売掛）
    ['cash', 'paypay', 'creditCard', 'credit'].forEach((category) => {
        if (gurunavi[category] && typeof gurunavi[category] === 'object' && !Array.isArray(gurunavi[category])) {
            Object.keys(gurunavi[category]).forEach((key) => {
                if (prices[key]) {
                    total += (gurunavi[category][key] || 0) * prices[key];
                }
            });
        }
    });

    // 動的項目（ホテル売掛、宴会売掛）
    ['hotelCredit', 'banquetCredit'].forEach((category) => {
        if (Array.isArray(gurunavi[category])) {
            gurunavi[category].forEach((item) => {
                total += (item.price || 0) * (item.count || 0);
            });
        }
    });

    return total;
};

export const calculateDinnerTotal = (dinner) => {
    let total = 0;

    // 現金（配列）
    if (Array.isArray(dinner.cash)) {
        dinner.cash.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    // 宴会売掛（配列）
    if (Array.isArray(dinner.banquetCredit)) {
        dinner.banquetCredit.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    // ホテル売掛（固定項目）
    if (dinner.hotelCredit && typeof dinner.hotelCredit === 'object') {
        total += (dinner.hotelCredit.murakami2000 || 0) * 2000;
        total += (dinner.hotelCredit.murakami1000 || 0) * 1000;
    }

    // クレジット（配列）
    if (Array.isArray(dinner.creditCard)) {
        dinner.creditCard.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    return total;
};

export const calculateDinnerDrinkTotal = (dinnerDrink) => {
    let total = 0;

    // 現金（配列）
    if (Array.isArray(dinnerDrink.cash)) {
        dinnerDrink.cash.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    // ホテル売掛（配列）
    if (Array.isArray(dinnerDrink.hotelCredit)) {
        dinnerDrink.hotelCredit.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    // クレジット（配列）
    if (Array.isArray(dinnerDrink.creditCard)) {
        dinnerDrink.creditCard.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    return total;
};

export const calculateCafeTotal = (cafe) => {
    let total = 0;

    // 現金（配列）
    if (Array.isArray(cafe.cash)) {
        cafe.cash.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    // クレジット（配列）
    if (Array.isArray(cafe.creditCard)) {
        cafe.creditCard.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    return total;
};

export const calculateBentoTotal = (bento) => {
    let total = 0;

    // 現金（配列）
    if (Array.isArray(bento.cash)) {
        bento.cash.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    // PayPay（配列）
    if (Array.isArray(bento.paypay)) {
        bento.paypay.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    // クレジット（配列）
    if (Array.isArray(bento.creditCard)) {
        bento.creditCard.forEach((item) => {
            total += (item.price || 0) * (item.count || 0);
        });
    }

    return total;
};

export const calculateExpensesTotal = (expenses) => {
    return expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
};

export const calculateCashRegisterTotal = (cashRegister) => {
    const denominations = {
        '10000': 10000,
        '5000': 5000,
        '1000': 1000,
        '500': 500,
        '100': 100,
        '50': 50,
        '10': 10,
        '5': 5,
        '1': 1,
    };

    return Object.keys(cashRegister).reduce((total, denom) => {
        return total + (cashRegister[denom] * denominations[denom]);
    }, 0);
};

export const calculateGrandTotal = (state) => {
    return (
        calculateBreakfastTotal(state.breakfast) +
        calculateLunchTotal(state.lunch) +
        calculateGurunaviTotal(state.gurunavi) +
        calculateDinnerTotal(state.dinner) +
        calculateDinnerDrinkTotal(state.dinnerDrink) +
        calculateCafeTotal(state.cafe) +
        calculateBentoTotal(state.bento)
    );
};

// ホテル売掛の集計
export const calculateHotelCreditBreakdown = (state) => {
    // 朝食のみ（朝食のホテル売掛）
    const breakfastHotelCredit = Object.values(state.breakfast.hotelCredit || {}).reduce(
        (sum, val) => {
            if (typeof val === 'number') {
                // 単価を計算
                const prices = {
                    adult1430: 1430,
                    adult1210: 1210,
                    child880: 880,
                    infant550: 550,
                    netOld1030: 1030,
                    agtOld1030: 1030,
                    net1215: 1215,
                    agt1215: 1215,
                };
                return sum;
            }
            return sum;
        },
        0
    );

    // 朝食ホテル売掛の正確な計算
    let breakfastTotal = 0;
    const breakfastPrices = {
        adult1430: 1430,
        adult1210: 1210,
        child880: 880,
        infant550: 550,
        netOld1030: 1030,
        agtOld1030: 1030,
        net1215: 1215,
        agt1215: 1215,
    };
    Object.keys(state.breakfast.hotelCredit || {}).forEach((key) => {
        if (breakfastPrices[key]) {
            breakfastTotal += (state.breakfast.hotelCredit[key] || 0) * breakfastPrices[key];
        }
    });

    // 村上のみ（ディナーの村上2,000円+村上1,000円）
    const murakamiTotal =
        (state.dinner.hotelCredit?.murakami2000 || 0) * 2000 +
        (state.dinner.hotelCredit?.murakami1000 || 0) * 1000;

    // 宴会（ランチとディナーの宴会売掛）
    let banquetTotal = 0;

    // ランチの宴会売掛
    if (Array.isArray(state.lunch.banquetCredit)) {
        state.lunch.banquetCredit.forEach((item) => {
            banquetTotal += (item.price || 0) * (item.count || 0);
        });
    }

    // グルナビの宴会売掛
    if (Array.isArray(state.gurunavi.banquetCredit)) {
        state.gurunavi.banquetCredit.forEach((item) => {
            banquetTotal += (item.price || 0) * (item.count || 0);
        });
    }

    // ディナーの宴会売掛
    if (Array.isArray(state.dinner.banquetCredit)) {
        state.dinner.banquetCredit.forEach((item) => {
            banquetTotal += (item.price || 0) * (item.count || 0);
        });
    }

    return {
        breakfast: breakfastTotal,
        murakami: murakamiTotal,
        banquet: banquetTotal,
        total: breakfastTotal + murakamiTotal + banquetTotal,
    };
};

// 各支払い方法の合計
export const calculatePaymentMethodTotals = (state) => {
    let cash = 0;
    let paypay = 0;
    let creditCard = 0;
    let hotelCredit = 0;
    let banquetCredit = 0;

    // 朝食
    const breakfastPrices = {
        adult1430: 1430,
        adult1210: 1210,
        child880: 880,
        infant550: 550,
    };

    // 朝食現金
    Object.keys(state.breakfast.cash || {}).forEach((key) => {
        if (breakfastPrices[key]) {
            cash += (state.breakfast.cash[key] || 0) * breakfastPrices[key];
        }
    });

    // 朝食クレジット
    Object.keys(state.breakfast.creditCard || {}).forEach((key) => {
        if (breakfastPrices[key]) {
            creditCard += (state.breakfast.creditCard[key] || 0) * breakfastPrices[key];
        }
    });

    // ランチ・グルナビ
    const lunchPrices = {
        adult1430: 1430,
        child880: 880,
        infant550: 550,
        price1230: 1230,
        price100: 100,
        price930: 930,
        price1100: 1100,
        price550: 550,
    };

    ['lunch', 'gurunavi'].forEach((section) => {
        // 現金
        Object.keys(state[section].cash || {}).forEach((key) => {
            if (lunchPrices[key]) {
                cash += (state[section].cash[key] || 0) * lunchPrices[key];
            }
        });

        // PayPay
        Object.keys(state[section].paypay || {}).forEach((key) => {
            if (lunchPrices[key]) {
                paypay += (state[section].paypay[key] || 0) * lunchPrices[key];
            }
        });

        // クレジット
        Object.keys(state[section].creditCard || {}).forEach((key) => {
            if (lunchPrices[key]) {
                creditCard += (state[section].creditCard[key] || 0) * lunchPrices[key];
            }
        });

        // ホテル売掛
        if (Array.isArray(state[section].hotelCredit)) {
            state[section].hotelCredit.forEach((item) => {
                hotelCredit += (item.price || 0) * (item.count || 0);
            });
        }

        // 宴会売掛
        if (Array.isArray(state[section].banquetCredit)) {
            state[section].banquetCredit.forEach((item) => {
                banquetCredit += (item.price || 0) * (item.count || 0);
            });
        }
    });

    // グルナビ売掛
    Object.keys(state.gurunavi.credit || {}).forEach((key) => {
        if (lunchPrices[key]) {
            creditCard += (state.gurunavi.credit[key] || 0) * lunchPrices[key];
        }
    });

    // ディナー
    if (Array.isArray(state.dinner.cash)) {
        state.dinner.cash.forEach((item) => {
            cash += (item.price || 0) * (item.count || 0);
        });
    }

    if (Array.isArray(state.dinner.creditCard)) {
        state.dinner.creditCard.forEach((item) => {
            creditCard += (item.price || 0) * (item.count || 0);
        });
    }

    if (Array.isArray(state.dinner.banquetCredit)) {
        state.dinner.banquetCredit.forEach((item) => {
            banquetCredit += (item.price || 0) * (item.count || 0);
        });
    }

    // ディナードリンク
    ['cash', 'creditCard', 'hotelCredit'].forEach((category) => {
        if (Array.isArray(state.dinnerDrink[category])) {
            state.dinnerDrink[category].forEach((item) => {
                const amount = (item.price || 0) * (item.count || 0);
                if (category === 'cash') cash += amount;
                else if (category === 'creditCard') creditCard += amount;
                else if (category === 'hotelCredit') hotelCredit += amount;
            });
        }
    });

    // 喫茶
    if (Array.isArray(state.cafe.cash)) {
        state.cafe.cash.forEach((item) => {
            cash += (item.price || 0) * (item.count || 0);
        });
    }
    if (Array.isArray(state.cafe.creditCard)) {
        state.cafe.creditCard.forEach((item) => {
            creditCard += (item.price || 0) * (item.count || 0);
        });
    }

    // 外販・弁当
    ['cash', 'paypay', 'creditCard'].forEach((category) => {
        if (Array.isArray(state.bento[category])) {
            state.bento[category].forEach((item) => {
                const amount = (item.price || 0) * (item.count || 0);
                if (category === 'cash') cash += amount;
                else if (category === 'paypay') paypay += amount;
                else if (category === 'creditCard') creditCard += amount;
            });
        }
    });

    // 朝食ホテル売掛を追加
    const breakfastHotelPrices = {
        adult1430: 1430,
        adult1210: 1210,
        child880: 880,
        infant550: 550,
        netOld1030: 1030,
        agtOld1030: 1030,
        net1215: 1215,
        agt1215: 1215,
    };
    Object.keys(state.breakfast.hotelCredit || {}).forEach((key) => {
        if (breakfastHotelPrices[key]) {
            hotelCredit += (state.breakfast.hotelCredit[key] || 0) * breakfastHotelPrices[key];
        }
    });

    // ディナーのホテル売掛（村上）
    hotelCredit += (state.dinner.hotelCredit?.murakami2000 || 0) * 2000;
    hotelCredit += (state.dinner.hotelCredit?.murakami1000 || 0) * 1000;

    return {
        cash,
        paypay,
        creditCard,
        hotelCredit,
        banquetCredit,
        total: cash + paypay + creditCard + hotelCredit + banquetCredit,
    };
};

export const calculatePeopleCount = (data) => {
    let count = 0;

    // 朝食
    Object.values(data.breakfast.cash).forEach((val) => (count += val || 0));
    Object.values(data.breakfast.hotelCredit).forEach((val) => (count += val || 0));
    Object.values(data.breakfast.creditCard).forEach((val) => (count += val || 0));

    // ランチ（固定項目+動的項目）
    ['cash', 'paypay', 'creditCard'].forEach((category) => {
        if (data.lunch[category] && typeof data.lunch[category] === 'object' && !Array.isArray(data.lunch[category])) {
            Object.values(data.lunch[category]).forEach((val) => (count += val || 0));
        }
    });
    ['hotelCredit', 'banquetCredit'].forEach((category) => {
        if (Array.isArray(data.lunch[category])) {
            data.lunch[category].forEach((item) => {
                count += item.count || 0;
            });
        }
    });

    // グルナビ（全て固定項目）
    ['cash', 'paypay', 'creditCard', 'credit'].forEach((category) => {
        if (data.gurunavi[category] && typeof data.gurunavi[category] === 'object' && !Array.isArray(data.gurunavi[category])) {
            Object.values(data.gurunavi[category]).forEach((val) => (count += val || 0));
        }
    });

    // ディナー
    count += data.dinner.cash.adult || 0;
    count += data.dinner.cash.child || 0;
    count += data.dinner.cash.infant || 0;
    count += data.dinner.hotelCredit.adult || 0;
    count += data.dinner.hotelCredit.child || 0;
    count += data.dinner.hotelCredit.infant || 0;
    count += data.dinner.creditCard.adult || 0;
    count += data.dinner.creditCard.child || 0;
    count += data.dinner.creditCard.infant || 0;

    return count;
};
