import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CategoryTab from '../components/CategoryTab';
import CounterInput from '../components/CounterInput';
import PriceCountInput from '../components/PriceCountInput';
import useSalesStore from '../store/useSalesStore';
import { calculateLunchTotal, calculateGurunaviTotal } from '../utils/calculations';
import { formatDate } from '../utils/formatters';

export default function LunchPage() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('cash');
    const [activeSection, setActiveSection] = useState('lunch'); // 'lunch' or 'gurunavi'
    const {
        lunch,
        gurunavi,
        updateLunch,
        updateGurunavi,
        updateLunchItem,
        updateGurunaviItem,
        date
    } = useSalesStore();
    const dateInfo = formatDate(date);

    // ランチのカテゴリ
    const lunchCategories = [
        { id: 'cash', label: '現金' },
        { id: 'paypay', label: 'PayPay' },
        { id: 'creditCard', label: 'クレジット' },
        { id: 'hotelCredit', label: 'ホテル売掛' },
        { id: 'banquetCredit', label: '宴会売掛' },
    ];

    // グルナビのカテゴリ
    const gurunaviCategories = [
        { id: 'cash', label: '現金' },
        { id: 'paypay', label: 'PayPay' },
        { id: 'creditCard', label: 'クレジット' },
        { id: 'credit', label: '売掛' },
        { id: 'hotelCredit', label: 'ホテル売掛' },
        { id: 'banquetCredit', label: '宴会売掛' },
    ];

    // 現金の固定項目（ランチ・グルナビ共通）
    const cashItems = [
        { field: 'adult1430', label: '(大人)1,430円', price: 1430 },
        { field: 'child880', label: '(小学生)880円', price: 880 },
        { field: 'infant550', label: '(幼児)550円', price: 550 },
        { field: 'price1230', label: '1,230円', price: 1230 },
        { field: 'price100', label: '100円', price: 100 },
    ];

    // PayPayの固定項目
    const paypayItems = [
        { field: 'adult1430', label: '(大人)1,430円', price: 1430 },
        { field: 'child880', label: '(小学生)880円', price: 880 },
        { field: 'infant550', label: '(幼児)550円', price: 550 },
        { field: 'price930', label: '930円', price: 930 },
    ];

    // クレジットの固定項目
    const creditCardItems = [
        { field: 'adult1430', label: '(大人)1,430円', price: 1430 },
        { field: 'child880', label: '(小学生)880円', price: 880 },
        { field: 'infant550', label: '(幼児)550円', price: 550 },
        { field: 'price930', label: '930円', price: 930 },
    ];

    // グルナビ売掛の固定項目
    const gurunaviCreditItems = [
        { field: 'price1100', label: '1,100円', price: 1100 },
        { field: 'price550', label: '550円', price: 550 },
    ];

    const handleUpdateLunch = (category, field, value) => {
        updateLunch(category, field, value);
    };

    const handleUpdateGurunavi = (category, field, value) => {
        updateGurunavi(category, field, value);
    };

    const handleUpdateLunchItem = (category, id, field, value) => {
        updateLunchItem(category, id, field, value);
    };

    const handleUpdateGurunaviItem = (category, id, field, value) => {
        updateGurunaviItem(category, id, field, value);
    };

    // 各カテゴリの小計を計算（ランチ）
    const calculateLunchCategoryTotal = (category) => {
        const prices = {
            adult1430: 1430,
            child880: 880,
            infant550: 550,
            price1230: 1230,
            price100: 100,
            price930: 930,
        };

        let total = 0;

        if (['cash', 'paypay', 'creditCard'].includes(category)) {
            // 固定項目
            if (lunch[category]) {
                Object.keys(lunch[category]).forEach((key) => {
                    if (prices[key]) {
                        total += (lunch[category][key] || 0) * prices[key];
                    }
                });
            }
        } else if (['hotelCredit', 'banquetCredit'].includes(category)) {
            // 動的項目
            if (Array.isArray(lunch[category])) {
                lunch[category].forEach((item) => {
                    total += (item.price || 0) * (item.count || 0);
                });
            }
        }

        return total;
    };

    // 各カテゴリの小計を計算（グルナビ）
    const calculateGurunaviCategoryTotal = (category) => {
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

        if (['cash', 'paypay', 'creditCard', 'credit'].includes(category)) {
            // 固定項目
            if (gurunavi[category]) {
                Object.keys(gurunavi[category]).forEach((key) => {
                    if (prices[key]) {
                        total += (gurunavi[category][key] || 0) * prices[key];
                    }
                });
            }
        } else if (['hotelCredit', 'banquetCredit'].includes(category)) {
            // 動的項目
            if (Array.isArray(gurunavi[category])) {
                gurunavi[category].forEach((item) => {
                    total += (item.price || 0) * (item.count || 0);
                });
            }
        }

        return total;
    };

    const lunchTotal = calculateLunchTotal(lunch);
    const gurunaviTotal = calculateGurunaviTotal(gurunavi);
    const grandTotal = lunchTotal + gurunaviTotal;

    const categoryTotal = activeSection === 'lunch'
        ? calculateLunchCategoryTotal(activeCategory)
        : calculateGurunaviCategoryTotal(activeCategory);

    const currentCategories = activeSection === 'lunch' ? lunchCategories : gurunaviCategories;
    const currentData = activeSection === 'lunch' ? lunch : gurunavi;

    return (
        <div className="min-h-screen bg-background-light pb-40">
            <Header
                title="『ランチ・グルナビ』入力"
                rightContent={
                    <span className="text-base font-medium text-slate-600">{dateInfo.short}</span>
                }
            />

            <main className="max-w-3xl mx-auto p-4 space-y-6">
                {/* セクション切り替え（ランチ/グルナビ） */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveSection('lunch')}
                        className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${activeSection === 'lunch'
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-white text-slate-600 border-2 border-slate-200'
                            }`}
                    >
                        <span className="material-icons align-middle mr-2">restaurant</span>
                        ランチ
                    </button>
                    <button
                        onClick={() => setActiveSection('gurunavi')}
                        className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${activeSection === 'gurunavi'
                            ? 'bg-amber-500 text-white shadow-lg'
                            : 'bg-white text-slate-600 border-2 border-slate-200'
                            }`}
                    >
                        <span className="material-icons align-middle mr-2">restaurant_menu</span>
                        グルナビ
                    </button>
                </div>

                {/* カテゴリタブ */}
                <CategoryTab
                    categories={currentCategories}
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                />

                {/* 入力セクション */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <span className="font-bold text-xl">
                            {currentCategories.find((c) => c.id === activeCategory)?.label}売上 入力
                        </span>
                    </div>

                    {/* 現金（固定項目） */}
                    {activeCategory === 'cash' && (
                        <div className="divide-y divide-slate-100 p-2">
                            {cashItems.map((item) => (
                                <CounterInput
                                    key={item.field}
                                    label={item.label}
                                    price={item.price}
                                    value={currentData.cash?.[item.field] || 0}
                                    onChange={(value) =>
                                        activeSection === 'lunch'
                                            ? handleUpdateLunch('cash', item.field, value)
                                            : handleUpdateGurunavi('cash', item.field, value)
                                    }
                                    id={`${activeSection}-cash-${item.field}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* PayPay（固定項目） */}
                    {activeCategory === 'paypay' && (
                        <div className="divide-y divide-slate-100 p-2">
                            {paypayItems.map((item) => (
                                <CounterInput
                                    key={item.field}
                                    label={item.label}
                                    price={item.price}
                                    value={currentData.paypay?.[item.field] || 0}
                                    onChange={(value) =>
                                        activeSection === 'lunch'
                                            ? handleUpdateLunch('paypay', item.field, value)
                                            : handleUpdateGurunavi('paypay', item.field, value)
                                    }
                                    id={`${activeSection}-paypay-${item.field}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* クレジット（固定項目） */}
                    {activeCategory === 'creditCard' && (
                        <div className="divide-y divide-slate-100 p-2">
                            {creditCardItems.map((item) => (
                                <CounterInput
                                    key={item.field}
                                    label={item.label}
                                    price={item.price}
                                    value={currentData.creditCard?.[item.field] || 0}
                                    onChange={(value) =>
                                        activeSection === 'lunch'
                                            ? handleUpdateLunch('creditCard', item.field, value)
                                            : handleUpdateGurunavi('creditCard', item.field, value)
                                    }
                                    id={`${activeSection}-creditCard-${item.field}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* グルナビ売掛（固定項目） */}
                    {activeCategory === 'credit' && activeSection === 'gurunavi' && (
                        <div className="divide-y divide-slate-100 p-2">
                            {gurunaviCreditItems.map((item) => (
                                <CounterInput
                                    key={item.field}
                                    label={item.label}
                                    price={item.price}
                                    value={gurunavi.credit?.[item.field] || 0}
                                    onChange={(value) => handleUpdateGurunavi('credit', item.field, value)}
                                    id={`gurunavi-credit-${item.field}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* ホテル売掛・宴会売掛（動的項目） */}
                    {['hotelCredit', 'banquetCredit'].includes(activeCategory) && (
                        <div className="p-4 space-y-3">
                            {currentData[activeCategory]?.map((item, index) => (
                                <div key={item.id}>
                                    <div className="text-sm font-bold text-slate-600 mb-2">項目 {index + 1}</div>
                                    <PriceCountInput
                                        price={item.price}
                                        count={item.count}
                                        onPriceChange={(value) =>
                                            activeSection === 'lunch'
                                                ? handleUpdateLunchItem(activeCategory, item.id, 'price', value)
                                                : handleUpdateGurunaviItem(activeCategory, item.id, 'price', value)
                                        }
                                        onCountChange={(value) =>
                                            activeSection === 'lunch'
                                                ? handleUpdateLunchItem(activeCategory, item.id, 'count', value)
                                                : handleUpdateGurunaviItem(activeCategory, item.id, 'count', value)
                                        }
                                        categoryColor="blue"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 小計表示 */}
                    <div className="p-4 bg-slate-50 border-t-2 border-slate-200">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">
                                {currentCategories.find((c) => c.id === activeCategory)?.label}小計
                            </span>
                            <span className="text-2xl font-black text-primary">
                                ¥{categoryTotal.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 p-4 pb-6 shadow-2xl">
                <div className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                            <div className="text-sm text-slate-500 font-bold">ランチ</div>
                            <div className="text-xl font-bold text-green-600">¥{lunchTotal.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-slate-500 font-bold">グルナビ</div>
                            <div className="text-xl font-bold text-amber-600">¥{gurunaviTotal.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-slate-500 font-bold">合計</div>
                            <div className="text-2xl font-black text-primary">¥{grandTotal.toLocaleString()}</div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            useSalesStore.getState().setInputStatus('lunch', 'completed');
                            navigate('/');
                        }}
                        className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-xl shadow-lg active:scale-95 transition-all"
                    >
                        完了
                    </button>
                </div>
            </footer>
        </div>
    );
}
