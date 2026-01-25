export default function PriceCountInput({ label, price, count, onPriceChange, onCountChange, categoryColor = 'blue' }) {
    const total = (price || 0) * (count || 0);

    const colorClasses = {
        blue: 'bg-blue-500 text-white',
        green: 'bg-green-500 text-white',
        amber: 'bg-amber-500 text-white',
        purple: 'bg-purple-500 text-white',
    };

    return (
        <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="grid grid-cols-3 gap-3 mb-3">
                {/* 単価入力 */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">単価</label>
                    <input
                        type="number"
                        value={price || ''}
                        onChange={(e) => onPriceChange(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-xl font-bold border-2 border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="0"
                        min="0"
                    />
                </div>

                {/* 人数入力 */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">人数</label>
                    <input
                        type="number"
                        value={count || ''}
                        onChange={(e) => onCountChange(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-xl font-bold border-2 border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="0"
                        min="0"
                    />
                </div>

                {/* 金額（自動計算） */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">金額</label>
                    <div className={`w-full px-3 py-2 text-xl font-bold rounded-lg ${colorClasses[categoryColor]} flex items-center justify-center`}>
                        ¥{total.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* 計算式の表示（小さく） */}
            <div className="text-xs text-slate-400 text-center">
                {price ? `¥${price.toLocaleString()}` : '¥0'} × {count || 0}名 = ¥{total.toLocaleString()}
            </div>
        </div>
    );
}
