// 日付フォーマット
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    // 令和年を計算（2019年5月1日が令和元年）
    const reiwaYear = year - 2018;

    return {
        full: `令和 ${reiwaYear}年 ${month}月 ${day}日 (${weekday})`,
        short: `${month}/${day} (${weekday})`,
        year: reiwaYear,
        month,
        day,
        weekday,
    };
};

// 通貨フォーマット
export const formatCurrency = (amount) => {
    return amount.toLocaleString('ja-JP');
};

// 通貨フォーマット（記号付き）
export const formatCurrencyWithSymbol = (amount) => {
    return `¥${formatCurrency(amount)}`;
};
