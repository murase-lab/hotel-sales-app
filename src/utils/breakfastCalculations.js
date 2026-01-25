// 朝食の人数合計を計算
export const calculateBreakfastPeopleCount = (breakfast) => {
    let count = 0;

    // 現金
    count += breakfast.cash.adult1430 || 0;
    count += breakfast.cash.adult1210 || 0;
    count += breakfast.cash.child880 || 0;
    count += breakfast.cash.infant550 || 0;

    // ホテル売掛
    count += breakfast.hotelCredit.adult1430 || 0;
    count += breakfast.hotelCredit.adult1210 || 0;
    count += breakfast.hotelCredit.child880 || 0;
    count += breakfast.hotelCredit.infant550 || 0;
    count += breakfast.hotelCredit.netOld1030 || 0;
    count += breakfast.hotelCredit.agtOld1030 || 0;
    count += breakfast.hotelCredit.net1215 || 0;
    count += breakfast.hotelCredit.agt1215 || 0;

    // クレジットカード
    count += breakfast.creditCard.adult1430 || 0;
    count += breakfast.creditCard.adult1210 || 0;
    count += breakfast.creditCard.child880 || 0;
    count += breakfast.creditCard.infant550 || 0;

    return count;
};
