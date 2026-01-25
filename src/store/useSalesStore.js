import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSalesStore = create(
    persist(
        (set, get) => ({
            // 基本情報
            date: new Date().toISOString().split('T')[0],
            weather: '',

            // 入力状態管理（未入力/入力済み/不要）
            inputStatus: {
                breakfast: 'pending',      // pending, completed, skipped
                lunch: 'pending',
                dinner: 'pending',
                dinnerDrink: 'pending',
                cafe: 'pending',
                bento: 'pending',
                expense: 'pending',
                cashRegister: 'pending',
            },

            // 釣銭（内訳）「50,000円」
            cashRegister: {
                '10000': 0,
                '5000': 0,
                '1000': 0,
                '500': 0,
                '100': 0,
                '50': 0,
                '10': 0,
                '5': 0,
                '1': 0,
            },

            // 朝食売上
            breakfast: {
                cash: { adult1430: 0, adult1210: 0, child880: 0, infant550: 0 },
                hotelCredit: {
                    adult1430: 0,
                    adult1210: 0,
                    child880: 0,
                    infant550: 0,
                    netOld1030: 0,
                    agtOld1030: 0,
                    net1215: 0,
                    agt1215: 0,
                },
                creditCard: { adult1430: 0, adult1210: 0, child880: 0, infant550: 0 },
            },

            // ランチ売上（新仕様）
            lunch: {
                cash: {
                    adult1430: 0,
                    child880: 0,
                    infant550: 0,
                    price1230: 0,  // 1,230円
                    price100: 0,   // 100円
                },
                paypay: {
                    adult1430: 0,
                    child880: 0,
                    infant550: 0,
                    price930: 0,   // 930円
                },
                creditCard: {
                    adult1430: 0,
                    child880: 0,
                    infant550: 0,
                    price930: 0,   // 930円
                },
                hotelCredit: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                ],
                banquetCredit: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                ],
            },

            // グルナビ売上（新仕様）
            gurunavi: {
                cash: {
                    adult1430: 0,
                    child880: 0,
                    infant550: 0,
                    price1230: 0,
                    price100: 0,
                },
                paypay: {
                    adult1430: 0,
                    child880: 0,
                    infant550: 0,
                    price930: 0,
                },
                creditCard: {
                    adult1430: 0,
                    child880: 0,
                    infant550: 0,
                    price930: 0,
                },
                credit: { price1100: 0, price550: 0 },
                hotelCredit: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                ],
                banquetCredit: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                ],
            },

            // ディナー売上（新仕様）
            dinner: {
                cash: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                    { id: 5, price: 0, count: 0 },
                    { id: 6, price: 0, count: 0 },
                    { id: 7, price: 0, count: 0 },
                    { id: 8, price: 0, count: 0 },
                ],
                banquetCredit: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                ],
                hotelCredit: {
                    murakami2000: 0,  // 村上 2,000円（人数のみ）
                    murakami1000: 0,  // 村上 1,000円（人数のみ）
                },
                creditCard: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                    { id: 5, price: 0, count: 0 },
                    { id: 6, price: 0, count: 0 },
                    { id: 7, price: 0, count: 0 },
                    { id: 8, price: 0, count: 0 },
                ],
            },

            // ディナードリンク（新仕様）
            dinnerDrink: {
                cash: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                    { id: 5, price: 0, count: 0 },
                    { id: 6, price: 0, count: 0 },
                    { id: 7, price: 0, count: 0 },
                    { id: 8, price: 0, count: 0 },
                ],
                hotelCredit: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                ],
                creditCard: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                    { id: 5, price: 0, count: 0 },
                    { id: 6, price: 0, count: 0 },
                    { id: 7, price: 0, count: 0 },
                    { id: 8, price: 0, count: 0 },
                ],
            },

            // 喫茶・ランチドリンク（新仕様）
            cafe: {
                cash: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                    { id: 5, price: 0, count: 0 },
                ],
                creditCard: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                    { id: 5, price: 0, count: 0 },
                ],
            },

            // 外販・弁当（新仕様）
            bento: {
                cash: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                ],
                paypay: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                ],
                creditCard: [
                    { id: 1, price: 0, count: 0 },
                    { id: 2, price: 0, count: 0 },
                    { id: 3, price: 0, count: 0 },
                    { id: 4, price: 0, count: 0 },
                ],
            },

            // 売掛欄・連絡・引継ぎ（旧：経費・備考）
            notes: {
                creditNotes: '',  // 売掛欄（一般・村上検査食）
                handoverNotes: '', // 連絡・引継ぎ事項
            },

            // レジ過不足
            registerDiscrepancy: 0,

            // ============================================
            // Actions
            // ============================================

            setDate: (date) => set({ date }),
            setWeather: (weather) => set({ weather }),

            // 釣銭（内訳）
            setCashRegister: (denomination, count) =>
                set((state) => ({
                    cashRegister: { ...state.cashRegister, [denomination]: count },
                })),

            // 朝食
            updateBreakfast: (category, field, value) =>
                set((state) => ({
                    breakfast: {
                        ...state.breakfast,
                        [category]: { ...state.breakfast[category], [field]: value },
                    },
                })),

            // ランチ固定項目
            updateLunch: (category, field, value) =>
                set((state) => ({
                    lunch: {
                        ...state.lunch,
                        [category]: { ...state.lunch[category], [field]: value },
                    },
                })),

            // ランチ動的項目（ホテル売掛/宴会売掛）
            updateLunchItem: (category, id, field, value) =>
                set((state) => ({
                    lunch: {
                        ...state.lunch,
                        [category]: state.lunch[category].map((item) =>
                            item.id === id ? { ...item, [field]: value } : item
                        ),
                    },
                })),

            // グルナビ固定項目
            updateGurunavi: (category, field, value) =>
                set((state) => ({
                    gurunavi: {
                        ...state.gurunavi,
                        [category]: { ...state.gurunavi[category], [field]: value },
                    },
                })),

            // グルナビ動的項目（ホテル売掛/宴会売掛）
            updateGurunaviItem: (category, id, field, value) =>
                set((state) => ({
                    gurunavi: {
                        ...state.gurunavi,
                        [category]: state.gurunavi[category].map((item) =>
                            item.id === id ? { ...item, [field]: value } : item
                        ),
                    },
                })),

            // ディナー現金/宴会売掛/クレジット（動的項目）
            updateDinnerItem: (category, id, field, value) =>
                set((state) => ({
                    dinner: {
                        ...state.dinner,
                        [category]: state.dinner[category].map((item) =>
                            item.id === id ? { ...item, [field]: value } : item
                        ),
                    },
                })),

            // ディナーホテル売掛（固定項目）
            updateDinnerHotelCredit: (field, value) =>
                set((state) => ({
                    dinner: {
                        ...state.dinner,
                        hotelCredit: { ...state.dinner.hotelCredit, [field]: value },
                    },
                })),

            // ディナードリンク動的項目
            updateDinnerDrinkItem: (category, id, field, value) =>
                set((state) => ({
                    dinnerDrink: {
                        ...state.dinnerDrink,
                        [category]: state.dinnerDrink[category].map((item) =>
                            item.id === id ? { ...item, [field]: value } : item
                        ),
                    },
                })),

            // 喫茶動的項目
            updateCafeItem: (category, id, field, value) =>
                set((state) => ({
                    cafe: {
                        ...state.cafe,
                        [category]: state.cafe[category].map((item) =>
                            item.id === id ? { ...item, [field]: value } : item
                        ),
                    },
                })),

            // 外販・弁当動的項目
            updateBentoItem: (category, id, field, value) =>
                set((state) => ({
                    bento: {
                        ...state.bento,
                        [category]: state.bento[category].map((item) =>
                            item.id === id ? { ...item, [field]: value } : item
                        ),
                    },
                })),

            // 売掛欄・連絡・引継ぎ
            setNotes: (field, value) =>
                set((state) => ({
                    notes: { ...state.notes, [field]: value },
                })),

            setRegisterDiscrepancy: (value) => set({ registerDiscrepancy: value }),

            // 入力状態管理
            setInputStatus: (page, status) =>
                set((state) => ({
                    inputStatus: { ...state.inputStatus, [page]: status },
                })),

            // Reset all data
            resetData: () =>
                set({
                    date: new Date().toISOString().split('T')[0],
                    weather: '',
                    cashRegister: {
                        '10000': 0,
                        '5000': 0,
                        '1000': 0,
                        '500': 0,
                        '100': 0,
                        '50': 0,
                        '10': 0,
                        '5': 0,
                        '1': 0,
                    },
                    breakfast: {
                        cash: { adult1430: 0, adult1210: 0, child880: 0, infant550: 0 },
                        hotelCredit: {
                            adult1430: 0,
                            adult1210: 0,
                            child880: 0,
                            infant550: 0,
                            netOld1030: 0,
                            agtOld1030: 0,
                            net1215: 0,
                            agt1215: 0,
                        },
                        creditCard: { adult1430: 0, adult1210: 0, child880: 0, infant550: 0 },
                    },
                    lunch: {
                        cash: { adult1430: 0, child880: 0, infant550: 0, price1230: 0, price100: 0 },
                        paypay: { adult1430: 0, child880: 0, infant550: 0, price930: 0 },
                        creditCard: { adult1430: 0, child880: 0, infant550: 0, price930: 0 },
                        hotelCredit: [
                            { id: 1, price: 0, count: 0 },
                            { id: 2, price: 0, count: 0 },
                        ],
                        banquetCredit: [
                            { id: 1, price: 0, count: 0 },
                            { id: 2, price: 0, count: 0 },
                        ],
                    },
                    gurunavi: {
                        cash: { adult1430: 0, child880: 0, infant550: 0, price1230: 0, price100: 0 },
                        paypay: { adult1430: 0, child880: 0, infant550: 0, price930: 0 },
                        creditCard: { adult1430: 0, child880: 0, infant550: 0, price930: 0 },
                        credit: { price1100: 0, price550: 0 },
                        hotelCredit: [
                            { id: 1, price: 0, count: 0 },
                            { id: 2, price: 0, count: 0 },
                        ],
                        banquetCredit: [
                            { id: 1, price: 0, count: 0 },
                            { id: 2, price: 0, count: 0 },
                        ],
                    },
                    dinner: {
                        cash: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                        banquetCredit: [
                            { id: 1, price: 0, count: 0 },
                            { id: 2, price: 0, count: 0 },
                        ],
                        hotelCredit: { murakami2000: 0, murakami1000: 0 },
                        creditCard: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                    },
                    dinnerDrink: {
                        cash: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                        hotelCredit: Array.from({ length: 4 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                        creditCard: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                    },
                    cafe: {
                        cash: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                        creditCard: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                    },
                    bento: {
                        cash: Array.from({ length: 4 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                        paypay: Array.from({ length: 4 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                        creditCard: Array.from({ length: 4 }, (_, i) => ({ id: i + 1, price: 0, count: 0 })),
                    },
                    notes: {
                        creditNotes: '',
                        handoverNotes: '',
                    },
                    registerDiscrepancy: 0,
                }),
        }),
        {
            name: 'sales-storage',
            version: 2, // バージョンアップして古いデータをクリア
        }
    )
);

export default useSalesStore;
