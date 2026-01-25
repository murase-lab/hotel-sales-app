import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useSalesStore from '../store/useSalesStore';
import { formatDate } from '../utils/formatters';

export default function ExpensePage() {
    const navigate = useNavigate();
    const { notes, setNotes, date } = useSalesStore();
    const dateInfo = formatDate(date);

    const handleCreditNotesChange = (value) => {
        setNotes('creditNotes', value);
    };

    const handleHandoverNotesChange = (value) => {
        setNotes('handoverNotes', value);
    };

    return (
        <div className="min-h-screen bg-background-light pb-32">
            <Header
                title="『売掛欄・連絡・引継ぎ』入力"
                rightContent={
                    <span className="text-base font-medium text-slate-600">{dateInfo.short}</span>
                }
            />

            <main className="max-w-3xl mx-auto p-4 space-y-6">
                {/* 説明 */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <span className="material-icons text-blue-600 text-3xl">description</span>
                        <div>
                            <div className="font-bold text-blue-900 text-lg mb-1">記録事項の入力</div>
                            <div className="text-blue-800 text-sm">
                                売掛情報や引継ぎ事項を記録してください。
                            </div>
                        </div>
                    </div>
                </div>

                {/* 売掛欄（一般・村上検査食） */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <span className="material-icons text-primary text-3xl">receipt_long</span>
                        <div>
                            <h2 className="text-xl font-bold">売掛欄（一般・村上検査食）</h2>
                            <p className="text-sm text-slate-600">売掛欄、人数、売上金額等を記載</p>
                        </div>
                    </div>
                    <div className="p-4">
                        <textarea
                            value={notes.creditNotes || ''}
                            onChange={(e) => handleCreditNotesChange(e.target.value)}
                            className="w-full h-48 p-4 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                            placeholder="例：&#10;一般売掛&#10;・〇〇会社 10名 ¥14,300&#10;・△△団体 5名 ¥7,150&#10;&#10;村上検査食&#10;・検査食 2名 ¥2,000"
                        />
                        <div className="mt-2 text-sm text-slate-500">
                            <span className="font-bold">記載例：</span>会社名・団体名、人数、売上金額など
                        </div>
                    </div>
                </div>

                {/* 連絡・引継ぎ事項 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <span className="material-icons text-green-600 text-3xl">chat</span>
                        <div>
                            <h2 className="text-xl font-bold">連絡・引継ぎ事項</h2>
                            <p className="text-sm text-slate-600">ポイントカード、ぎふっこカード、ホットペーパー等を記載</p>
                        </div>
                    </div>
                    <div className="p-4">
                        <textarea
                            value={notes.handoverNotes || ''}
                            onChange={(e) => handleHandoverNotesChange(e.target.value)}
                            className="w-full h-48 p-4 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                            placeholder="例：&#10;・ポイントカード利用 3件&#10;・ぎふっこカード 2件&#10;・ホットペーパークーポン 1件&#10;・翌日のイベント準備について&#10;・在庫確認が必要な商品"
                        />
                        <div className="mt-2 text-sm text-slate-500">
                            <span className="font-bold">記載例：</span>カード利用、クーポン、翌日の準備事項、在庫確認など
                        </div>
                    </div>
                </div>

                {/* 注意事項 */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <span className="material-icons text-amber-600 text-3xl">lightbulb</span>
                        <div>
                            <div className="font-bold text-amber-900 text-base mb-1">記載のポイント</div>
                            <ul className="text-amber-800 text-sm space-y-1 list-disc list-inside">
                                <li>売掛は会社名・団体名と金額を明確に記載してください</li>
                                <li>カード利用は種類と件数を記録してください</li>
                                <li>翌日の担当者への引継ぎ事項も忘れずに記載してください</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => {
                            useSalesStore.getState().setInputStatus('expense', 'completed');
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
