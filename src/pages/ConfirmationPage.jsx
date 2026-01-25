import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useSalesStore from '../store/useSalesStore';
import {
    calculateBreakfastTotal,
    calculateLunchTotal,
    calculateGurunaviTotal,
    calculateDinnerTotal,
    calculateDinnerDrinkTotal,
    calculateCafeTotal,
    calculateBentoTotal,
    calculateGrandTotal,
    calculateHotelCreditBreakdown,
    calculatePaymentMethodTotals,
    calculatePeopleCount,
} from '../utils/calculations';
import { formatDate } from '../utils/formatters';

export default function ConfirmationPage() {
    const navigate = useNavigate();
    const state = useSalesStore();
    const dateInfo = formatDate(state.date);

    // 月累計（手動入力）- 将来的にはGoogleスプレッドシートから自動取得
    const [monthlyTotal, setMonthlyTotal] = useState(0);
    const [monthlyPeopleCount, setMonthlyPeopleCount] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);

    // 各セクションの売上
    const breakfastTotal = calculateBreakfastTotal(state.breakfast);
    const lunchTotal = calculateLunchTotal(state.lunch);
    const gurunaviTotal = calculateGurunaviTotal(state.gurunavi);
    const dinnerTotal = calculateDinnerTotal(state.dinner);
    const dinnerDrinkTotal = calculateDinnerDrinkTotal(state.dinnerDrink);
    const cafeTotal = calculateCafeTotal(state.cafe);
    const bentoTotal = calculateBentoTotal(state.bento);

    // ホテル売掛の内訳
    const hotelCreditBreakdown = calculateHotelCreditBreakdown(state);

    // 支払い方法別の合計
    const paymentTotals = calculatePaymentMethodTotals(state);

    // 総合計
    const grandTotal = calculateGrandTotal(state);

    // 来店者数（日計）
    const dailyPeopleCount = calculatePeopleCount(state);

    const salesItems = [
        { label: '朝食', amount: breakfastTotal, color: 'text-blue-600' },
        { label: 'ランチ', amount: lunchTotal, color: 'text-green-600' },
        { label: 'グルナビ', amount: gurunaviTotal, color: 'text-amber-600' },
        { label: 'ディナー', amount: dinnerTotal, color: 'text-purple-600' },
        { label: 'ディナードリンク', amount: dinnerDrinkTotal, color: 'text-pink-600' },
        { label: '喫茶・ランチドリンク', amount: cafeTotal, color: 'text-orange-600' },
        { label: '外販・弁当', amount: bentoTotal, color: 'text-cyan-600' },
    ];

    const handlePrint = () => {
        window.print();
    };

    const handleSendToSpreadsheet = async () => {
        setIsSending(true);

        // TODO: Googleスプレッドシートへの送信処理を実装
        // 現在はダミーの処理
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setSendSuccess(true);
            setTimeout(() => setSendSuccess(false), 3000);
        } catch (error) {
            console.error('送信エラー:', error);
            alert('送信に失敗しました。もう一度お試しください。');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light pb-32">
            <Header
                title="最終確認"
                rightContent={
                    <span className="text-base font-medium text-slate-600">{dateInfo.long}</span>
                }
            />

            <main className="max-w-4xl mx-auto p-4 space-y-6">
                {/* アクションボタン（印刷非表示） */}
                <div className="print:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={handlePrint}
                        className="bg-slate-700 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-icons text-2xl">print</span>
                        <span>印刷する</span>
                    </button>
                    <button
                        onClick={handleSendToSpreadsheet}
                        disabled={isSending || sendSuccess}
                        className={`py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${sendSuccess
                                ? 'bg-green-500 text-white'
                                : isSending
                                    ? 'bg-slate-400 text-white cursor-wait'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                    >
                        <span className="material-icons text-2xl">
                            {sendSuccess ? 'check_circle' : isSending ? 'sync' : 'cloud_upload'}
                        </span>
                        <span>
                            {sendSuccess
                                ? '送信完了！'
                                : isSending
                                    ? '送信中...'
                                    : 'スプレッドシートに送信'}
                        </span>
                    </button>
                </div>

                {/* 日付と総売上 */}
                <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-lg p-6 text-white print:bg-none print:border-4 print:border-primary print:text-slate-800">
                    <div className="text-center">
                        <div className="text-xl font-bold mb-2">{dateInfo.long}</div>
                        <div className="text-sm opacity-90 mb-4 print:opacity-100 print:text-slate-600">本日の総売上</div>
                        <div className="text-6xl font-black print:text-primary">¥{grandTotal.toLocaleString()}</div>
                    </div>
                </div>

                {/* 各セクションの売上 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:break-inside-avoid">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <h2 className="text-xl font-bold">売上内訳</h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {salesItems.map((item) => (
                            <div key={item.label} className="p-4 flex justify-between items-center">
                                <span className={`font-bold text-lg ${item.color} print:text-slate-700`}>{item.label}</span>
                                <span className="text-2xl font-bold text-slate-700">
                                    ¥{item.amount.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ホテル売掛/計 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:break-inside-avoid">
                    <div className="p-4 bg-green-50 border-b-2 border-green-200">
                        <h2 className="text-xl font-bold text-green-800 print:text-slate-800">ホテル売掛/計</h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <div className="p-4 flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">朝食のみ</span>
                            <span className="text-2xl font-bold text-green-600 print:text-slate-700">
                                ¥{hotelCreditBreakdown.breakfast.toLocaleString()}
                            </span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">村上のみ</span>
                            <span className="text-2xl font-bold text-green-600 print:text-slate-700">
                                ¥{hotelCreditBreakdown.murakami.toLocaleString()}
                            </span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">宴会</span>
                            <span className="text-2xl font-bold text-green-600 print:text-slate-700">
                                ¥{hotelCreditBreakdown.banquet.toLocaleString()}
                            </span>
                        </div>
                        <div className="p-4 bg-green-100 flex justify-between items-center print:bg-slate-100">
                            <span className="font-black text-xl text-green-900 print:text-slate-900">ホテル売掛 合計</span>
                            <span className="text-3xl font-black text-green-700 print:text-slate-900">
                                ¥{hotelCreditBreakdown.total.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 支払い方法別の合計 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:break-inside-avoid">
                    <div className="p-4 bg-blue-50 border-b-2 border-blue-200">
                        <h2 className="text-xl font-bold text-blue-800 print:text-slate-800">支払い方法別 合計</h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <div className="p-4 flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">現金/計</span>
                            <span className="text-2xl font-bold text-blue-600 print:text-slate-700">
                                ¥{paymentTotals.cash.toLocaleString()}
                            </span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">PayPay/計</span>
                            <span className="text-2xl font-bold text-blue-600 print:text-slate-700">
                                ¥{paymentTotals.paypay.toLocaleString()}
                            </span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">クレジット/計</span>
                            <span className="text-2xl font-bold text-blue-600 print:text-slate-700">
                                ¥{paymentTotals.creditCard.toLocaleString()}
                            </span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">ホテル売掛/計</span>
                            <span className="text-2xl font-bold text-blue-600 print:text-slate-700">
                                ¥{paymentTotals.hotelCredit.toLocaleString()}
                            </span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">宴会売掛/計</span>
                            <span className="text-2xl font-bold text-blue-600 print:text-slate-700">
                                ¥{paymentTotals.banquetCredit.toLocaleString()}
                            </span>
                        </div>
                        <div className="p-4 bg-blue-100 flex justify-between items-center print:bg-slate-100">
                            <span className="font-black text-xl text-blue-900 print:text-slate-900">総合計</span>
                            <span className="text-3xl font-black text-blue-700 print:text-slate-900">
                                ¥{paymentTotals.total.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* レストラン来店者数 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:break-inside-avoid">
                    <div className="p-4 bg-purple-50 border-b-2 border-purple-200">
                        <h2 className="text-xl font-bold text-purple-800 print:text-slate-800">レストランの来店者</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">日計</span>
                            <span className="text-3xl font-bold text-purple-600 print:text-slate-700">
                                {dailyPeopleCount.toLocaleString()}名
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t-2 border-slate-200">
                            <span className="font-bold text-lg text-slate-700">月計</span>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    value={monthlyPeopleCount || ''}
                                    onChange={(e) => setMonthlyPeopleCount(Number(e.target.value) || 0)}
                                    className="w-32 text-right text-2xl font-bold border-2 border-slate-300 rounded-lg px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none print:border-0 print:bg-transparent"
                                    placeholder="0"
                                />
                                <span className="text-2xl font-bold text-purple-600 print:text-slate-700">名</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 月累計の売上 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:break-inside-avoid">
                    <div className="p-4 bg-amber-50 border-b-2 border-amber-200">
                        <h2 className="text-xl font-bold text-amber-800 print:text-slate-800">月累計の売上</h2>
                        <p className="text-sm text-amber-700 mt-1 print:hidden">※将来的にGoogleスプレッドシートから自動取得</p>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-700">今月の累計売上</span>
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-bold text-slate-500">¥</span>
                                <input
                                    type="number"
                                    value={monthlyTotal || ''}
                                    onChange={(e) => setMonthlyTotal(Number(e.target.value) || 0)}
                                    className="w-48 text-right text-3xl font-bold border-2 border-slate-300 rounded-lg px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none print:border-0 print:bg-transparent"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer（印刷時非表示） */}
            <footer className="print:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-xl shadow-lg active:scale-95 transition-all"
                    >
                        ホームに戻る
                    </button>
                </div>
            </footer>

            {/* 印刷用スタイル */}
            <style jsx>{`
        @media print {
          @page {
            margin: 1cm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
        </div>
    );
}
