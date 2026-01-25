import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useSalesStore from '../store/useSalesStore';
import { calculateCashRegisterTotal } from '../utils/calculations';
import { formatDate } from '../utils/formatters';

export default function CashRegisterPage() {
    const navigate = useNavigate();
    const { cashRegister, setCashRegister, date } = useSalesStore();
    const dateInfo = formatDate(date);

    const TARGET_AMOUNT = 50000; // 目標金額

    const denominations = [
        { value: '10000', label: '10,000円', amount: 10000 },
        { value: '5000', label: '5,000円', amount: 5000 },
        { value: '1000', label: '1,000円', amount: 1000 },
        { value: '500', label: '500円', amount: 500 },
        { value: '100', label: '100円', amount: 100 },
        { value: '50', label: '50円', amount: 50 },
        { value: '10', label: '10円', amount: 10 },
        { value: '5', label: '5円', amount: 5 },
        { value: '1', label: '1円', amount: 1 },
    ];

    const handleChange = (denomination, value) => {
        setCashRegister(denomination, Math.max(0, parseInt(value) || 0));
    };

    const total = calculateCashRegisterTotal(cashRegister);
    const difference = total - TARGET_AMOUNT;
    const isExact = difference === 0;
    const isOver = difference > 0;
    const isUnder = difference < 0;

    return (
        <div className="min-h-screen bg-background-light pb-32">
            <Header
                title="釣銭（内訳）「50,000円」"
                rightContent={
                    <span className="text-base font-medium text-slate-600">{dateInfo.short}</span>
                }
            />

            <main className="max-w-3xl mx-auto p-4 space-y-6">
                {/* 説明 */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <span className="material-icons text-blue-600 text-3xl">info</span>
                        <div>
                            <div className="font-bold text-blue-900 text-lg mb-1">釣銭の確認</div>
                            <div className="text-blue-800 text-sm">
                                レジ内の紙幣・硬貨の枚数を入力してください。<br />
                                合計がちょうど<span className="font-bold">50,000円</span>になるように調整します。
                            </div>
                        </div>
                    </div>
                </div>

                {/* 入力セクション */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <span className="font-bold text-xl">枚数入力</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {denominations.map((denom) => (
                            <div key={denom.value} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-24 font-bold text-lg text-slate-700">{denom.label}</div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleChange(denom.value, (cashRegister[denom.value] || 0) - 1)}
                                            className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg active:scale-95 transition-transform hover:bg-slate-200"
                                        >
                                            <span className="material-icons">remove</span>
                                        </button>
                                        <input
                                            type="number"
                                            value={cashRegister[denom.value] || 0}
                                            onChange={(e) => handleChange(denom.value, e.target.value)}
                                            className="w-20 text-center text-2xl font-bold border-2 border-slate-200 rounded-lg px-2 py-1 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            min="0"
                                        />
                                        <button
                                            onClick={() => handleChange(denom.value, (cashRegister[denom.value] || 0) + 1)}
                                            className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-lg active:scale-95 transition-transform hover:bg-blue-700"
                                        >
                                            <span className="material-icons">add</span>
                                        </button>
                                    </div>
                                    <div className="text-slate-500 text-sm ml-2">枚</div>
                                </div>
                                <div className="text-right font-bold text-lg text-slate-700 min-w-[120px]">
                                    ¥{((cashRegister[denom.value] || 0) * denom.amount).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 合計表示 */}
                    <div className={`p-6 border-t-4 ${isExact ? 'bg-green-50 border-green-500' : isOver ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'}`}>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xl font-bold text-slate-700">現在の合計</span>
                            <span className={`text-4xl font-black ${isExact ? 'text-green-600' : isOver ? 'text-red-600' : 'text-amber-600'}`}>
                                ¥{total.toLocaleString()}
                            </span>
                        </div>

                        {/* 目標金額との差額 */}
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-slate-600">目標金額</span>
                            <span className="text-2xl font-bold text-slate-600">¥{TARGET_AMOUNT.toLocaleString()}</span>
                        </div>

                        <div className="mt-4 pt-4 border-t-2 border-slate-200">
                            {isExact && (
                                <div className="flex items-center gap-2 text-green-700 font-bold text-lg">
                                    <span className="material-icons text-3xl">check_circle</span>
                                    <span>ぴったり50,000円です！</span>
                                </div>
                            )}
                            {isOver && (
                                <div>
                                    <div className="flex items-center gap-2 text-red-700 font-bold text-lg mb-2">
                                        <span className="material-icons text-3xl">error</span>
                                        <span>50,000円を超えています</span>
                                    </div>
                                    <div className="text-red-600 text-xl font-bold">
                                        超過額: ¥{Math.abs(difference).toLocaleString()}
                                    </div>
                                </div>
                            )}
                            {isUnder && (
                                <div>
                                    <div className="flex items-center gap-2 text-amber-700 font-bold text-lg mb-2">
                                        <span className="material-icons text-3xl">warning</span>
                                        <span>50,000円に足りません</span>
                                    </div>
                                    <div className="text-amber-600 text-xl font-bold">
                                        不足額: ¥{Math.abs(difference).toLocaleString()}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => {
                            useSalesStore.getState().setInputStatus('cashRegister', 'completed');
                            navigate('/');
                        }}
                        disabled={!isExact}
                        className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transition-all ${isExact
                            ? 'bg-primary hover:bg-blue-700 text-white active:scale-95'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        {isExact ? '完了' : '50,000円ぴったりにしてください'}
                    </button>
                </div>
            </footer>
        </div>
    );
}
