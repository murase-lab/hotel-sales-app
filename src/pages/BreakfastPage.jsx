import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CategoryTab from '../components/CategoryTab';
import CounterInput from '../components/CounterInput';
import useSalesStore from '../store/useSalesStore';
import { calculateBreakfastTotal } from '../utils/calculations';
import { calculateBreakfastPeopleCount } from '../utils/breakfastCalculations';
import { formatDate } from '../utils/formatters';

export default function BreakfastPage() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('cash');
    const { breakfast, updateBreakfast, date } = useSalesStore();
    const dateInfo = formatDate(date);

    const categories = [
        { id: 'cash', label: '現金' },
        { id: 'hotelCredit', label: 'ホテル売掛' },
        { id: 'creditCard', label: 'クレジット' },
    ];

    const breakfastItems = [
        { field: 'adult1430', label: '一般', price: 1430 },
        { field: 'adult1210', label: '一般(旧)', price: 1210 },
        { field: 'child880', label: '小学生', price: 880 },
        { field: 'infant550', label: '幼児', price: 550 },
    ];

    // ホテル売掛専用の追加項目
    const hotelCreditExtraItems = [
        { field: 'netOld1030', label: 'NET (旧)', price: 1030 },
        { field: 'agtOld1030', label: 'AGT (旧)', price: 1030 },
        { field: 'net1215', label: 'NET', price: 1215 },
        { field: 'agt1215', label: 'AGT', price: 1215 },
    ];

    const handleUpdate = (field, value) => {
        updateBreakfast(activeCategory, field, value);
    };

    // 各カテゴリの小計を計算
    const calculateCategoryTotal = (category) => {
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
        Object.keys(breakfast[category]).forEach((key) => {
            if (prices[key]) {
                total += (breakfast[category][key] || 0) * prices[key];
            }
        });
        return total;
    };

    const total = calculateBreakfastTotal(breakfast);
    const peopleCount = calculateBreakfastPeopleCount(breakfast);
    const categoryTotal = calculateCategoryTotal(activeCategory);

    return (
        <div className="min-h-screen bg-background-light">
            <Header
                title="『朝食』売上入力"
                rightContent={
                    <span className="text-base font-medium text-slate-600">{dateInfo.short}</span>
                }
            />

            <main className="max-w-3xl mx-auto p-4 space-y-6 pb-32">
                {/* Category Tabs */}
                <CategoryTab
                    categories={categories}
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                />

                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <span className="font-bold text-xl">
                            {categories.find((c) => c.id === activeCategory)?.label}売上 入力
                        </span>
                        <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-bold">
                            必須項目
                        </span>
                    </div>
                    <div className="divide-y divide-slate-100 p-2">
                        {breakfastItems.map((item) => (
                            <CounterInput
                                key={item.field}
                                label={item.label}
                                price={item.price}
                                value={breakfast[activeCategory][item.field]}
                                onChange={(value) => handleUpdate(item.field, value)}
                                id={`breakfast-${activeCategory}-${item.field}`}
                            />
                        ))}
                        {activeCategory === 'hotelCredit' && hotelCreditExtraItems.map((item) => (
                            <CounterInput
                                key={item.field}
                                label={item.label}
                                price={item.price}
                                value={breakfast.hotelCredit[item.field] || 0}
                                onChange={(value) => handleUpdate(item.field, value)}
                                id={`breakfast-hotelCredit-${item.field}`}
                            />
                        ))}
                    </div>
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

                {/* Notes */}
                <div className="space-y-2">
                    <label className="block font-bold text-slate-600 ml-1 text-lg">連絡・引継ぎ事項</label>
                    <textarea
                        className="w-full rounded-2xl border-slate-200 bg-white focus:ring-primary focus:border-primary p-4 text-xl"
                        placeholder="特記事項があれば入力してください..."
                        rows="3"
                    ></textarea>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex gap-6">
                        <div className="flex flex-col">
                            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">合計人数</div>
                            <div className="text-3xl font-black text-primary">{peopleCount} 名</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">合計金額</div>
                            <div className="text-3xl font-black text-primary">¥ {total.toLocaleString()}</div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            useSalesStore.getState().setInputStatus('breakfast', 'completed');
                            navigate('/');
                        }}
                        className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg active:scale-95 transition-all"
                    >
                        完了
                    </button>
                </div>
            </footer>
        </div>
    );
}
