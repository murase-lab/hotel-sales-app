import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CategoryTab from '../components/CategoryTab';
import PriceCountInput from '../components/PriceCountInput';
import CounterInput from '../components/CounterInput';
import useSalesStore from '../store/useSalesStore';
import { calculateDinnerTotal } from '../utils/calculations';
import { formatDate } from '../utils/formatters';

export default function DinnerPage() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('cash');
    const { dinner, updateDinnerItem, updateDinnerHotelCredit, date } = useSalesStore();
    const dateInfo = formatDate(date);

    const categories = [
        { id: 'cash', label: '現金', color: 'blue', count: 8 },
        { id: 'banquetCredit', label: '宴会売掛', color: 'amber', count: 2 },
        { id: 'hotelCredit', label: 'ホテル売掛', color: 'green', count: 0 },
        { id: 'creditCard', label: 'クレジット', color: 'purple', count: 8 },
    ];

    const handleUpdateItem = (id, field, value) => {
        updateDinnerItem(activeCategory, id, field, value);
    };

    const handleUpdateHotelCredit = (field, value) => {
        updateDinnerHotelCredit(field, value);
    };

    // 各カテゴリの小計を計算
    const calculateCategoryTotal = (category) => {
        let total = 0;

        if (category === 'hotelCredit') {
            // ホテル売掛の固定項目
            total += (dinner.hotelCredit.murakami2000 || 0) * 2000;
            total += (dinner.hotelCredit.murakami1000 || 0) * 1000;
        } else if (Array.isArray(dinner[category])) {
            dinner[category].forEach((item) => {
                total += (item.price || 0) * (item.count || 0);
            });
        }

        return total;
    };

    const total = calculateDinnerTotal(dinner);
    const categoryTotal = calculateCategoryTotal(activeCategory);

    return (
        <div className="min-h-screen bg-background-light pb-32">
            <Header
                title="『ディナー』入力"
                rightContent={
                    <span className="text-base font-medium text-slate-600">{dateInfo.short}</span>
                }
            />

            <main className="max-w-3xl mx-auto p-4 space-y-6">
                {/* Category Tabs */}
                <CategoryTab
                    categories={categories}
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                />

                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <span className="font-bold text-xl">
                            {categories.find((c) => c.id === activeCategory)?.label}売上 入力
                        </span>
                    </div>

                    {/* ホテル売掛（固定項目） */}
                    {activeCategory === 'hotelCredit' && (
                        <div className="divide-y divide-slate-100 p-2">
                            <CounterInput
                                label="村上 2,000円"
                                price={2000}
                                value={dinner.hotelCredit.murakami2000 || 0}
                                onChange={(value) => handleUpdateHotelCredit('murakami2000', value)}
                                id="dinner-hotelCredit-murakami2000"
                            />
                            <CounterInput
                                label="村上 1,000円"
                                price={1000}
                                value={dinner.hotelCredit.murakami1000 || 0}
                                onChange={(value) => handleUpdateHotelCredit('murakami1000', value)}
                                id="dinner-hotelCredit-murakami1000"
                            />
                        </div>
                    )}

                    {/* 現金/宴会売掛/クレジット（動的項目） */}
                    {activeCategory !== 'hotelCredit' && (
                        <div className="p-4 space-y-3">
                            {dinner[activeCategory]?.map((item, index) => (
                                <div key={item.id}>
                                    <div className="text-sm font-bold text-slate-600 mb-2">項目 {index + 1}</div>
                                    <PriceCountInput
                                        price={item.price}
                                        count={item.count}
                                        onPriceChange={(value) => handleUpdateItem(item.id, 'price', value)}
                                        onCountChange={(value) => handleUpdateItem(item.id, 'count', value)}
                                        categoryColor={categories.find((c) => c.id === activeCategory)?.color}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 小計表示 */}
                    <div className="p-4 bg-slate-50 border-t-2 border-slate-200">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">
                                {categories.find((c) => c.id === activeCategory)?.label}小計
                            </span>
                            <span className="text-2xl font-black text-primary">
                                ¥{categoryTotal.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="max-w-3xl mx-auto space-y-3">
                    <div className="flex justify-between items-center text-xl">
                        <span className="font-bold text-slate-700">合計</span>
                        <span className="text-3xl font-black text-primary">¥{total.toLocaleString()}</span>
                    </div>
                    <button
                        onClick={() => {
                            useSalesStore.getState().setInputStatus('dinner', 'completed');
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
