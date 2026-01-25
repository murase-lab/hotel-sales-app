export default function CounterInput({ label, price, value, onChange, id }) {
    const handleIncrement = () => {
        onChange(value + 1);
    };

    const handleDecrement = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    };

    return (
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm">
            <div>
                <div className="text-2xl font-bold">{label}</div>
                {price && (
                    <div className="text-slate-500 font-medium text-lg">
                        単価: ¥{price.toLocaleString()}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleDecrement}
                    className="touch-target flex items-center justify-center bg-slate-100 rounded-full active:scale-95 transition-transform"
                    aria-label={`${label}を減らす`}
                >
                    <span className="material-icons text-4xl">remove</span>
                </button>
                <input
                    id={id}
                    type="number"
                    value={value}
                    readOnly
                    className="w-20 text-center text-3xl font-bold bg-transparent border-none focus:ring-0"
                    aria-label={`${label}の数`}
                />
                <button
                    onClick={handleIncrement}
                    className="touch-target flex items-center justify-center bg-primary text-white rounded-full active:scale-95 transition-transform"
                    aria-label={`${label}を増やす`}
                >
                    <span className="material-icons text-4xl">add</span>
                </button>
            </div>
        </div>
    );
}
