export default function CategoryTab({ categories, activeCategory, onChange }) {
    return (
        <div className="flex p-1 bg-slate-200 rounded-xl gap-1">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onChange(category.id)}
                    className={`flex-1 py-4 px-2 rounded-lg font-bold text-lg transition-all ${activeCategory === category.id
                            ? 'bg-white shadow-sm text-primary'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}
