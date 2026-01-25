import { useNavigate } from 'react-router-dom';
import useSalesStore from '../store/useSalesStore';
import { calculateGrandTotal, calculatePeopleCount } from '../utils/calculations';
import { formatDate } from '../utils/formatters';

export default function HomePage() {
    const navigate = useNavigate();
    const state = useSalesStore();
    const { inputStatus, setInputStatus } = useSalesStore();
    const dateInfo = formatDate(state.date);

    const total = calculateGrandTotal(state);
    const peopleCount = calculatePeopleCount(state);

    const menuItems = [
        {
            id: 'breakfast',
            path: '/breakfast',
            label: '朝食',
            icon: 'wb_sunny',
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        {
            id: 'lunch',
            path: '/lunch',
            label: 'ランチ・グルナビ',
            icon: 'restaurant',
            color: 'bg-gradient-to-br from-green-500 to-green-600',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600'
        },
        {
            id: 'dinner',
            path: '/dinner',
            label: 'ディナー',
            icon: 'dinner_dining',
            color: 'bg-gradient-to-br from-purple-500 to-purple-600',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600'
        },
        {
            id: 'dinnerDrink',
            path: '/dinner-drink',
            label: 'ディナードリンク',
            icon: 'local_bar',
            color: 'bg-gradient-to-br from-pink-500 to-pink-600',
            iconBg: 'bg-pink-100',
            iconColor: 'text-pink-600'
        },
        {
            id: 'cafe',
            path: '/cafe',
            label: '喫茶・ランチドリンク',
            icon: 'local_cafe',
            color: 'bg-gradient-to-br from-orange-500 to-orange-600',
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600'
        },
        {
            id: 'bento',
            path: '/bento',
            label: '外販・弁当',
            icon: 'takeout_dining',
            color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
            iconBg: 'bg-cyan-100',
            iconColor: 'text-cyan-600'
        },
        {
            id: 'expense',
            path: '/expense',
            label: '売掛欄・連絡・引継ぎ',
            icon: 'description',
            color: 'bg-gradient-to-br from-amber-500 to-amber-600',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600'
        },
        {
            id: 'cashRegister',
            path: '/cash-register',
            label: '釣銭（内訳）',
            icon: 'payments',
            color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
            iconBg: 'bg-indigo-100',
            iconColor: 'text-indigo-600'
        },
    ];

    const getStatusInfo = (status) => {
        switch (status) {
            case 'completed':
                return {
                    icon: 'check_circle',
                    color: 'text-green-600',
                    bgColor: 'bg-green-100',
                    borderColor: 'border-green-500',
                    label: '入力済み',
                };
            case 'skipped':
                return {
                    icon: 'cancel',
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-100',
                    borderColor: 'border-blue-500',
                    label: '不要',
                };
            default:
                return {
                    icon: 'radio_button_unchecked',
                    color: 'text-slate-400',
                    bgColor: 'bg-slate-100',
                    borderColor: 'border-slate-300',
                    label: '未入力',
                };
        }
    };

    const toggleSkip = (id, e) => {
        e.stopPropagation();
        const currentStatus = inputStatus[id];
        if (currentStatus === 'skipped') {
            setInputStatus(id, 'pending');
        } else {
            setInputStatus(id, 'skipped');
        }
    };

    // 全ての項目が完了または不要か確認
    const allCompleted = Object.values(inputStatus).every(
        (status) => status === 'completed' || status === 'skipped'
    );

    const pendingCount = Object.values(inputStatus).filter((s) => s === 'pending').length;
    const completedCount = Object.values(inputStatus).filter((s) => s === 'completed').length;
    const skippedCount = Object.values(inputStatus).filter((s) => s === 'skipped').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-40">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-slate-800">
                                <span className="text-primary">ホテル</span>売上管理
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">Hotel Sales Management System</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-slate-700">{dateInfo.long}</div>
                            <div className="text-sm text-slate-500">{state.weather || '天候未設定'}</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Total Sales */}
                    <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-icons text-4xl">payments</span>
                            <h2 className="text-xl font-bold">本日の総売上</h2>
                        </div>
                        <div className="text-5xl font-black mt-4">¥{total.toLocaleString()}</div>
                    </div>

                    {/* People Count */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-icons text-4xl">people</span>
                            <h2 className="text-xl font-bold">来店者数</h2>
                        </div>
                        <div className="text-5xl font-black mt-4">{peopleCount.toLocaleString()}名</div>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-800">入力進捗状況</h2>
                            <div className="text-sm text-slate-600">
                                {completedCount + skippedCount} / {Object.keys(inputStatus).length} 完了
                            </div>
                        </div>
                        <div className="flex gap-4 mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-slate-600">入力済み ({completedCount})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-slate-600">不要 ({skippedCount})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                                <span className="text-sm text-slate-600">未入力 ({pendingCount})</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                                style={{
                                    width: `${((completedCount + skippedCount) / Object.keys(inputStatus).length) * 100}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 bg-slate-50 border-b border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-800">データ入力</h2>
                        <p className="text-sm text-slate-600 mt-1">各カテゴリを選択して売上データを入力してください</p>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {menuItems.map((item) => {
                            const statusInfo = getStatusInfo(inputStatus[item.id]);
                            return (
                                <div
                                    key={item.path}
                                    className={`relative group rounded-xl shadow-md hover:shadow-xl transition-all border-4 ${statusInfo.borderColor}`}
                                >
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className="w-full text-left"
                                    >
                                        <div className={`${item.color} p-6 text-white rounded-lg`}>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`${item.iconBg} w-16 h-16 rounded-full flex items-center justify-center`}>
                                                    <span className={`material-icons text-4xl ${item.iconColor}`}>{item.icon}</span>
                                                </div>
                                                <div className={`${statusInfo.bgColor} px-3 py-1 rounded-full flex items-center gap-1`}>
                                                    <span className={`material-icons text-lg ${statusInfo.color}`}>{statusInfo.icon}</span>
                                                    <span className={`text-xs font-bold ${statusInfo.color}`}>{statusInfo.label}</span>
                                                </div>
                                            </div>
                                            <div className="text-xl font-bold">{item.label}</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={(e) => toggleSkip(item.id, e)}
                                        className={`absolute bottom-2 right-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${inputStatus[item.id] === 'skipped'
                                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                : 'bg-white/90 text-slate-700 hover:bg-white'
                                            }`}
                                    >
                                        {inputStatus[item.id] === 'skipped' ? '不要解除' : '不要にする'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Confirmation Button */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <button
                        onClick={() => allCompleted && navigate('/confirmation')}
                        disabled={!allCompleted}
                        className={`w-full p-8 transition-all ${allCompleted
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white active:scale-[0.98] cursor-pointer'
                                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-4">
                            <span className="material-icons text-5xl">
                                {allCompleted ? 'check_circle' : 'lock'}
                            </span>
                            <div className="text-left">
                                <div className="text-3xl font-black">
                                    {allCompleted ? '最終確認' : '入力を完了してください'}
                                </div>
                                <div className="text-lg opacity-90 mt-1">
                                    {allCompleted
                                        ? '入力内容を確認して完了'
                                        : `残り ${pendingCount} 項目の入力が必要です`}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </main>
        </div>
    );
}
