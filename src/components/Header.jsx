import { useNavigate } from 'react-router-dom';

export default function Header({ title, showBack = true, rightContent }) {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 text-primary active:scale-95 transition-transform"
                    >
                        <span className="material-icons text-3xl">arrow_back_ios</span>
                    </button>
                )}
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            </div>
            {rightContent && <div className="flex items-center gap-2">{rightContent}</div>}
        </header>
    );
}
