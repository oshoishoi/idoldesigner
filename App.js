// App.js
const { useState, useEffect, useRef, useMemo } = React;

// config.jsからグローバル定数を安全に受け渡す
const FIELD_KEYS = window.FIELD_KEYS || [];
const LABEL_MAP = window.LABEL_MAP || {};
const FIELD_SUGGESTIONS = window.FIELD_SUGGESTIONS || {};
const INSPI_THEMES = window.INSPI_THEMES || {};
const FACS_PRESETS = window.FACS_PRESETS || [];
const getApiUrl = window.getApiUrl;
const safetySettings = window.safetySettings || [];

const Icon = ({ name, className = "" }) => {
    const svgs = {
        sparkles: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
        refresh: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>,
        undo: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 7V5c0-1.1.9-2 2-2h2"/><path d="M17 3h2c1.1 0 2 .9 2 2v2"/><path d="M21 17v2c0 1.1-.9 2-2 2h-2"/><path d="M7 21H5c-1.1 0-2-.9-2-2v-2"/><path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"/><path d="M12 16v2"/><path d="M12 8V6"/><path d="M8 12H6"/><path d="M18 12h-2"/></svg>,
        target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
        plus: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
        check: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
        save: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
        zap: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
        brain: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/></svg>,
        x: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
        copy: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
        info: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
        chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"/></svg>,
        chevronUp: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="18 15 12 9 6 15"/></svg>,
        zoom: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
        paste: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M12 11h4"/><path d="M14 9v4"/></svg>
    };
    return svgs[name] || null;
};

function App() {
    const createEmptyState = () => {
        const obj = { orientation: 'portrait', ratio: '9:16', aesthetic: '' };
        FIELD_KEYS.forEach(k => obj[k] = '');
        return obj;
    };

    const [selections, setSelections] = useState(createEmptyState);
    const [globalHistory, setGlobalHistory] = useState([]);
    const [stagedData, setStagedData] = useState(null);
    const [selectedFields, setSelectedFields] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(null); 
    const [expressionMode, setExpressionMode] = useState('facs'); 
    const [englishPrompt, setEnglishPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [copyFeedback, setCopyFeedback] = useState(null); 
    const [statusMessage, setStatusMessage] = useState('');
    const [previews, setPreviews] = useState({ base: null, plus: null, baseStored: null, plusStored: null });
    const [memorySlots, setMemorySlots] = useState(Array(10).fill(null));

    // アコーディオン開閉トグルの状態
    const [openSections, setOpenSections] = useState({
        0: true,  // 髪のデザイン
        1: false, // 顔・表情・目の極限監査
        2: false, // 身体・肌・詳細
        3: false  // 衣装・演出設定
    });

    // 大画面フォーカス編集用ステート
    const [focusField, setFocusField] = useState(null); // 'hairStyle' などのフィールドID
    const [focusTempText, setFocusTempText] = useState(''); // 編集中のテキスト
    const [sugMode, setSugMode] = useState('append'); // 'replace' (上書き) または 'append' (末尾に追加)

    const baseInputRef = useRef(null);
    const plusInputRef = useRef(null);
    const resultRef = useRef(null);
    const focusTextAreaRef = useRef(null);

    // ローカルストレージからメモリスロットを復元
    useEffect(() => {
        try {
            const saved = localStorage.getItem('idol_designer_slots_v195');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    const extendedSlots = Array(10).fill(null);
                    parsed.forEach((item, idx) => {
                        if (idx < 10) extendedSlots[idx] = item;
                    });
                    setMemorySlots(extendedSlots);
                }
            }
        } catch (e) { console.error("Restore failed:", e); }
    }, []);

    const toggleSection = (idx) => {
        setOpenSections(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    const getSectionFillCount = (fields) => {
        let count = 0;
        fields.forEach(f => {
            if (selections[f] && selections[f].trim() !== '') {
                count++;
            }
        });
        return count;
    };

    const applyInspiTheme = (themeKey) => {
        const theme = INSPI_THEMES[themeKey];
        if (!theme) return;

        setGlobalHistory(prev => [selections, ...prev].slice(0, 3));
        setSelections(prev => {
            const next = { ...prev };
            Object.entries(theme.data).forEach(([key, val]) => {
                if (FIELD_KEYS.includes(key)) {
                    next[key] = val;
                }
            });
            return next;
        });
        setOpenSections({ 0: true, 1: true, 2: false, 3: true });
        setStatusMessage(`「${theme.name}」テーマをロードしました！`);
        setTimeout(() => setStatusMessage(''), 2500);
    };

    const clearSingleField = (fieldId) => {
        setSelections(prev => ({ ...prev, [fieldId]: '' }));
        if (focusField === fieldId) {
            setFocusTempText('');
        }
    };

    const copySingleField = (fieldId) => {
        const val = selections[fieldId];
        if (!val || val.trim() === '') return;
        const el = document.createElement("textarea");
        el.value = val;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopyFeedback(fieldId);
        setTimeout(() => setCopyFeedback(null), 1500);
    };

    const applySuggestionInternal = (currentVal, targetVal) => {
        if (sugMode === 'replace') {
            return currentVal === targetVal ? '' : targetVal;
        } else {
            if (!currentVal || currentVal.trim() === '') {
                return targetVal;
            }
            if (currentVal.includes(targetVal)) {
                const cleaned = currentVal
                    .split(',')
                    .map(x => x.trim())
                    .filter(x => x !== targetVal && x !== '')
                    .join(', ');
                return cleaned;
            }
            return `${currentVal.trim().replace(/,$/, '')}, ${targetVal}`;
        }
    };

    const applySuggestion = (fieldId, val) => {
        setSelections(prev => {
            const currentVal = prev[fieldId] || '';
            const nextVal = applySuggestionInternal(currentVal, val);
            return { ...prev, [fieldId]: nextVal };
        });
    };

    const applySuggestionInFocus = (val) => {
        const nextVal = applySuggestionInternal(focusTempText, val);
        setFocusTempText(nextVal);
        setTimeout(() => focusTextAreaRef.current?.focus(), 50);
    };

    const startFocusEdit = (fieldId) => {
        setFocusField(fieldId);
        setFocusTempText(selections[fieldId] || '');
        setTimeout(() => focusTextAreaRef.current?.focus(), 150);
    };

    const saveFocusEdit = () => {
        if (!focusField) return;
        setSelections(prev => ({ ...prev, [focusField]: focusTempText }));
        setFocusField(null);
        setStatusMessage(`${LABEL_MAP[focusField]}を更新しました ✨`);
        setTimeout(() => setStatusMessage(''), 1500);
    };

    const handleCursorMove = (direction) => {
        const ta = focusTextAreaRef.current;
        if (!ta) return;
        let start = ta.selectionStart;
        if (direction === 'left' && start > 0) {
            ta.setSelectionRange(start - 1, start - 1);
        } else if (direction === 'right' && start < ta.value.length) {
            ta.setSelectionRange(start + 1, start + 1);
        }
        ta.focus();
    };

    const handlePasteIntoFocus = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                setFocusTempText(prev => {
                    if (!prev || prev.trim() === '') return text;
                    return prev + " " + text;
                });
                setStatusMessage('ペーストしました');
                setTimeout(() => setStatusMessage(''), 1500);
            }
        } catch (err) {
            setStatusMessage('手動ペーストしてください');
            setTimeout(() => setStatusMessage(''), 2500);
        }
    };

    const clearSectionFields = (fields, sectionTitle) => {
        if (window.confirm(`「${sectionTitle}」のすべての項目をリセットしますか？`)) {
            setSelections(prev => {
                const next = { ...prev };
                fields.forEach(f => {
                    next[f] = '';
                });
                return next;
            });
        }
    };

    const applyPreset = (type) => {
        setGlobalHistory(prev => [selections, ...prev].slice(0, 3));
        setSelections(prev => {
            const next = { ...prev };
            if (type === 'cheki') {
                next.ratio = '54:86';
                next.artStyle = 'Lo-fi analog instant camera film, highly grainy texture, vintage Polaroid aesthetic, soft details, slight motion blur, NO high-fidelity, NO DSLR, NO studio lighting, NO 8k render';
                next.lighting = 'Harsh camera-mounted flash, direct hard flash lighting, heavy contrast shadows behind model';
                next.situation = 'Casual indoor snapshot, late night house party vibe, raw moment capture';
                
                if (prev.orientation === 'landscape') {
                    next.additionalNotes = 'Classic white instant photo frame with a wide, thick white border on the RIGHT side, landscape Polaroid film frame design';
                } else {
                    next.additionalNotes = 'Classic white instant photo frame with a wide, thick white border on the BOTTOM side, traditional Instax portrait film frame design';
                }
            } else if (type === 'camera') {
                next.ratio = '9:16';
                next.artStyle = 'SNS風、スマホ撮影スナップ、ビューティーフィルター';
                next.lighting = '自然光、柔らかい順光';
                next.situation = '自撮り、日常スナップ';
                next.additionalNotes = '';
            } else if (type === 'realistic') {
                next.ratio = '9:16';
                next.artStyle = 'Hyper-realistic DSLR raw photograph, high fidelity, fine skin texture';
                next.lighting = 'Cinematic studio key light, volumetric rim lighting';
                next.situation = 'Professional studio fashion shoot';
                next.additionalNotes = '8k, sharp focus, photo masterclass';
            }
            return next;
        });
    };

    const handleOrientationChange = (orientation) => {
        setSelections(prev => {
            const next = { ...prev, orientation };
            if (prev.ratio === '54:86' || (prev.artStyle && prev.artStyle.includes('instant camera'))) {
                if (orientation === 'landscape') {
                    next.additionalNotes = 'Classic white instant photo frame with a wide, thick white border on the RIGHT side, landscape Polaroid film frame design';
                } else {
                    next.additionalNotes = 'Classic white instant photo frame with a wide, thick white border on the BOTTOM side, traditional Instax portrait film frame design';
                }
            }
            return next;
        });
    };

    const safeProcessImage = async (file) => {
        return new Promise((resolve) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const MAX = 384; 
                let w = img.width, h = img.height;
                if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } }
                else { if (h > MAX) { w *= MAX / h; h = MAX; } }
                canvas.width = w; canvas.height = h;
                ctx.drawImage(img, 0, 0, w, h);
                const b64 = canvas.toDataURL('image/jpeg', 0.6).split(',')[1];
                
                canvas.width = 80; canvas.height = (img.height / img.width) * 80;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const b64Preview = canvas.toDataURL('image/jpeg', 0.4);
                
                URL.revokeObjectURL(url);
                resolve({ b64, pUrl: URL.createObjectURL(file), b64Preview });
            };
            img.src = url;
        });
    };

    const handleUpload = async (e, mode) => {
        const file = e.target.files?.[0];
        if (!file || isAnalyzing) return;
        setIsAnalyzing(mode);
        setStatusMessage('分析中');
        try {
            const { b64, pUrl, b64Preview } = await safeProcessImage(file);
            setPreviews(prev => ({ 
                ...prev, 
                [mode]: pUrl, 
                [`${mode}Stored`]: b64Preview 
            }));
            await runAnalysis(b64, mode);
        } catch (err) {
            setStatusMessage('Error');
            setIsAnalyzing(null);
        } finally { if(e.target) e.target.value = ''; }
    };

    const runAnalysis = async (base64, mode) => {
        let delay = 1000;
        let response;
        let success = false;
        
        const keyListString = FIELD_KEYS.join(', ');

        const analysisSystemInstruction = `あなたは世界最高峰 of キャラクターデザイナー兼身体物理監査官です。
与えられた画像をミリ単位で超精密にスキャンし、指定されたすべての項目について分析結果を出力してください。

【出力の絶対ルール（対応関係ロック）】
1. 回回答は純粋なJSONオブジェクトのみとし、解説やMarkdown of 装飾（\`\`\`json等）は一切含めないこと。
2. JSONの「キー名（Key）」は、下部に指定された【対象フィールドキーリスト】の文字列と1文字も違わぬ同一の英語キー名を使用すること。大文字小文字、スペルミスは厳禁とする。
3. データ形式の平滑化：すべてのキーに対する値（Value）は、ネストさせず、必ずプレーンな「1つの文字列（String）」としてフラットに出力すること。オブジェクト「{}」や配列「[]」を値に含めることは絶対厳禁とする。
4. 画像から読み取れない項目、あるいは該当しない項目がある場合も、勝手に項目自体を削除せず、値を ""（空文字）または "なし" として、必ず指定された44個すべてのキーを漏れなく出力すること。

【重要監査項目】
- height：モデルの骨格や背景の対比から推測される「身長の印象（例: 小柄で150cm前半の印象、高身長でスタイリッシュなバランス、等）」を日本語のプレーンテキストで詳細に記述せよ。
- threeSizes：胸の厚み、ウエストのくびれ、ヒップラインの肉付きから推測される「肉付きの質感や体格バランス（例: 砂時計型のメリハリボディ、豊かなバストと細いウエストのコントラスト、スレンダーで引き締まった肉付き、等）」を日本語のプレーンテキストで刻明に記述せよ。数値の出力は禁止する。
- facePlacement：顔全体の画像内位置ではなく、輪郭領域内における目・鼻・口・眉の間隔や配置比率（中顔面の長さ、求心・遠心顔、ベビーフェイス配置等）を正確な日本語で記述。
- bodyInterface：衣装の端やストラップと肌の接点を精密監査し、食い込み、盛り上がり、あるいは衣装と肌のすき間（緩み）を詳細に言語化。
- molesFreckles：ホクロ、そばかす、あるいは特筆すべき肌の特徴や着崩し位置の境界線を記述.
- facs：表情をAction Unit（AU）およびAction Descriptor（AD）のコードと強度（例: AU12C, AD19, AU51B）の組み合わせで精密判定。

【対象フィールドキーリスト（この通りにJSONを生成せよ）】
${keyListString}`;

        for (let attempt = 0; attempt < 5; attempt++) {
            try {
                setStatusMessage(attempt > 0 ? `再試行中 (${attempt}/5)...` : '分析中');
                response = await fetch(getApiUrl("generateContent"), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ inlineData: { mimeType: "image/jpeg", data: base64 } }] }],
                        systemInstruction: { parts: [{ text: analysisSystemInstruction }] },
                        safetySettings,
                        generationConfig: { responseMimeType: "application/json" }
                    }),
                });

                if (response.status === 429) {
                    if (attempt === 4) throw new Error("WAIT_LIMIT");
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                    continue;
                }

                if (!response.ok) throw new Error("HTTP " + response.status);
                success = true;
                break;
            } catch (err) {
                if (attempt === 4) {
                    setStatusMessage(err.message === "WAIT_LIMIT" ? '制限中: 1分待ってください' : '解析失敗');
                    setTimeout(() => setIsAnalyzing(null), 1000);
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            }
        }

        if (success) {
            try {
                const res = await response.json();
                const rawText = res.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
                const result = JSON.parse(rawText.match(/\{[\s\S]*\}/)?.[0] || rawText);

                const safeStringifyValue = (val) => {
                    if (val === null || val === undefined) return '';
                    if (typeof val === 'object') {
                        if (Array.isArray(val)) {
                            return val.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join('、');
                        }
                        return Object.entries(val)
                            .map(([key, value]) => {
                                const parsedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
                                if (/^[a-zA-Z0-9_\-]+$/.test(key)) return parsedValue;
                                return `${key}: ${parsedValue}`;
                            })
                            .join('、');
                    }
                    return String(val);
                };

                const normalizedResult = {};
                Object.keys(result).forEach(rawKey => {
                    const cleanKey = rawKey.trim().toLowerCase();
                    normalizedResult[cleanKey] = safeStringifyValue(result[rawKey]);
                });

                if (mode === 'base') {
                    setSelections(prev => {
                        const next = createEmptyState();
                        next.orientation = prev.orientation;
                        next.ratio = prev.ratio;
                        FIELD_KEYS.forEach(k => { 
                            const targetKey = k.toLowerCase();
                            const aiVal = normalizedResult[targetKey];
                            if (aiVal !== undefined && aiVal !== null) {
                                next[k] = aiVal; 
                            }
                        });
                        return next;
                    });
                } else {
                    const mergedStaged = {};
                    FIELD_KEYS.forEach(k => {
                        const targetKey = k.toLowerCase();
                        mergedStaged[k] = normalizedResult[targetKey] !== undefined ? normalizedResult[targetKey] : '';
                    });
                    setStagedData(mergedStaged);
                    setSelectedFields(FIELD_KEYS.reduce((a, k) => {
                        a[k] = mergedStaged[k] !== 'none' && mergedStaged[k] !== '不明' && mergedStaged[k] !== '';
                        return a;
                    }, {}));
                }
                setStatusMessage('');
            } catch (e) {
                setStatusMessage('解析失敗');
            } finally {
                setTimeout(() => setIsAnalyzing(null), 1000);
            }
        }
    };

    const generatePrompt = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setStatusMessage('生成中');
        
        let delay = 1000;
        let response;
        let success = false;

        try {
            const arTag = selections.ratio === '1:1' ? "--ar 1:1" : (selections.orientation === 'portrait' ? `--ar ${selections.ratio.split(':')[0]}:${selections.ratio.split(':')[1]}` : `--ar ${selections.ratio.split(':')[1]}:${selections.ratio.split(':')[0]}`);
            const activeData = { ...selections };
            if (expressionMode === 'facs') activeData.expression = ""; else activeData.facs = "";

            const activeText = Object.entries(activeData)
                .filter(([k, v]) => v && v !== '' && !['orientation', 'ratio'].includes(k))
                .map(([k, v]) => `${LABEL_MAP[k] || k}: ${v}`).join('\n');

            const outfitText = ((selections.outfit || "") + " " + (selections.outfitDetail || "")).toLowerCase();
            let routeSpecificInstruction = "";

            if (outfitText.match(/(水着|ビキニ|マイクロ|ストラップ|紐|紐ショーツ|tバック|チューブトップ|ビスチェ|ブラ|下着|ナイロン|swimwear|bikini|strappy|thong)/i)) {
                routeSpecificInstruction = "\n- 【露出領域の物理的ロック】: 腕の隙間を勝手に布地で塞がれるのを防ぐため、「leaving the shoulders completely bare and the midriff fully exposed」（完全に露出した肩と、遮るもののないお腹）という上下セパレート構造を確定させる物理指示フレーズを、衣服記述の冒頭部分に必ず配置。また、「a wide and continuous expanse of bare skin is completely visible on her flat stomach between the top and bottom pieces」を盛り込め。\n- 【過激ワードの幾何学記述への置き換え】: 安全フィルターの誤動作による部屋着へのすり替え（安全補正）を完全にシャットアウトするため、「microscopic」のような直接的な過激ワードの使用は禁止し、「ultra-narrow sliding triangles slums」や「low-cut seamless micro-panel bottom fastened by 1mm contrast strings」といった幾何学・寸法的表現で極小カッティングを精密描写せよ。\n- 【衣装形状の勝手な省略・変更の徹底防止】: 画像生成AIが衣装の物理構造を勝手に簡略化したり省略したりして普通のスポーツブラや普通のショートパンツ等に変えてしまうのを完全に阻止するため、プロンプト内（positive部分）に「strictly, flawlessly and precisely adhere to the described geometric cuts, sheer lace net corset structure, microscopic front panel size, side-tie strings layout, and delicate strappy cutlines without any omission, alteration, or simplification」や「highly detailed and fixed clothing structure, no modification or simplification to the straps and scalloped cuts」といった厳格な形状固定化指示テキストを必ずプロンプトに組み込め。\n- コルセット状の透けネットレース（unlined transparent sheer net-lace bodice covering the upper midriff）、カップフチの波打つ形状（sweetheart neckline with scalloped cups）、両腰の高い位置で結ぶ極細のサイド紐（contrast thin side-tie strings fastened on high hips）、極小のフロント布面積（microscopic low-rise lace front panel）などの、元の衣服デザインの「物理形状」を1ミリも省略せず、英語で極めて克明かつ具体的に描写すること。\n- 綿・リブニット・麻素材の部屋着化を完全に防ぐため、「sleek high-gloss wet-look spandex-nylon material」などの高光沢の化学繊維素材記述を優先させ、普通の部屋着（lounge, loungewear, ribbed cotton）は一切禁止、およびネガティブプロンプトで完全に排除（camisole, pajamas, loungewear, loose cotton fabric を記載）せよ。";
            } else if (outfitText.match(/(浴衣|ゆかた|着物|和服|和装|haori|羽織|ローブ|ガウン|シャツ|着崩|kimono|yukata|robe|draped off|slid down)/i)) {
                routeSpecificInstruction = "\n- 【羽織りもの・アウターの位置固定（Drape Position Lock）】: 浴衣、着物、シャツ、カーディガンなどの羽織りものが「はだけている」「ずり落ちている（draped off/slid down）」描写がある場合、画像生成AIが勝手に衣服の位置を持ち上げて肩にかけ直したり状態を隠したりするのを物理的に完全阻止。プロンプト内に「the outer garment (yukata, kimono, or shirt) is strictly and flawlessly locked in its low-draped position, slithered completely down off her shoulders and resting low around her lower hips, buttocks, or elbows, leaving her entire upper body, torso, chest, shoulders, and back completely bare-skinned, exposed, and unobstructed, with absolutely no vertical shifting, rising, or simplification of the draping layout」という厳格な位置固定ロック指示文を必ずポジティブプロンプトに組み込め。\n- 無理なストラップ食い込み記述（spaghetti shoulder straps, multi-strap halter-neck 等）は衣装と矛盾して不自然になるため自動的に抑制し、和服本来の素材、帯、染め模様（large polka dots, traditional floral motifs など）の美しさと質感描写にフォーカスさせよ。";
            } else {
                routeSpecificInstruction = "\n- 衣装デザイン of 物理カッティング（例: plunging V-neckline, side slit, asymmetric drape, high-low hemline）の美しさを幾何学的かつ具体的に美しく英語へ英訳。\n- 衣装と矛盾する「1mm spaghetti straps」や「high-cut side-tie strings」といった食い込み記述の強制挿入は行わず、対象となる衣服のテクスチャ（silk, satin, chiffon, denim 等）やドレープラインの表現に美しくフォーカスせよ。";
            }

            const artStyleText = selections.artStyle && (selections.artStyle || selections.ratio) ? ((selections.artStyle || "") + " " + (selections.ratio || "")).toLowerCase() : "";
            let artStyleSpecificInstruction = "";
            
            if (artStyleText.match(/(54:86|cheki|polaroid|instant|analog|vintage|tokicamera|polaroide|cheki)/i)) {
                const borderSide = selections.orientation === 'landscape' ? 'RIGHT' : 'BOTTOM';
                artStyleSpecificInstruction = `\n- 【チェキ風Lo-Fi画質の完全ロック】: 現在「チェキ風（instant camera film）」が指定されています。AIが「Photorealistic」「RAW photo」「high-fidelity」「studio lighting」「DSLR」「high resolution」「high-quality skin gradation」などの高画質化・スタジオライティング系キーワードをポジティブプロンプトへ追加することを【徹底的に禁止（絶対厳禁）】せよ。\n- 代わりに、プロンプトの冒頭から「Lo-fi analog instant camera film, highly grainy texture, vintage Polaroid aesthetic, soft details, slight motion blur, harsh camera-mounted direct flash, heavy contrast shadows immediately behind the model」をメイン画質トーンとして強制適用せよ。\n- また、チェキの伝統的な余白レイアウトを再現するため、「Classic white instant photo frame with a wide, thick white border on the ${borderSide} side nudge」というフレーム記述を英語プロンプトの文中に正確に盛り込むこと。`;
            } else {
                artStyleSpecificInstruction = "\n- 【チェキ風画質の完全排除】: プロンプトの冒頭に「Photorealistic, RAW photo, high-fidelity skin texture, sharp focus, 8k, detailed skin pores」を適用し、ライティングや演出（studio lighting, volumetric rim light, soft natural window light 等）を美しく精緻に反映せよ。非実在性を明記せよ（non-existent person などの表現）。";
            }

            const promptSystemInstruction = `あなたは最高峰の画像生成エンジニアです。日本語設計データを最高品質 of 英語プロンプトに変換してください。

【出力形式】
純粋なJSON形式のみで出力せよ：{"positive": "...", "negative": "..."}

【最優先・鉄の掟】
1. 物理描写の強調: 衣装の端、ベルト、ストラップによる肌の食い込み(squish), 盛り上がり(bulge), すき間(visible gaps between clothing and skin)は肉体美を強調するこだわりとして詳細に含めよ。具体的なcm数値などのスリーサイズは含めず、メリハリよシルエットにフォーカスせよ。
2. 衣服特性に応じた動的プロンプトルーティング設計:${routeSpecificInstruction}
3. 画風特性に応じた動的プロンプトルーティング設計:${artStyleSpecificInstruction}
4. セーフティ置換：元の衣服が「ランジェリー」等を含む場合は、必ず安全な表現（delicate strappy set, form-fitting strappy top 等）に置き換えよ。
5. FACSコードクリーン化: AUおよびADは「AU12C」「AD19」のようにコードと強度のみを反映し、名称説明は含めない。
6. 目元：対称性、黒目比率、目頭・目尻の造形、アイラインの筆致を精密に反映。
7. 禁則：プロンプト内での「CG」というワード使用は絶対禁止。
8. 顔のパーツ配置バランス（facePlacement）の厳格英訳再現:
   - 日本語の輪郭内パーツ比率分析を、AIが最高精度で理解できる幾何学的表現に変換。「centered face」等のフレーミング描写は禁止。
   - 例: "compact mid-face", "facial features beautifully concentrated on the lower half of the face for a youthful, cute baby-face ratio", "perfect symmetrical eyes with exactly one-eye-width distance between them" などの表現を用いよ。
9. 非実在性の明記: AIによる架空の創作であることを示すため、"non-existent person" などの表現を自然に組み込め。ただし「character」「virtual」「imaginary woman」「imaginary person shadow bulge」は絶対に使用禁止。
10. 追記(additionalNotes)の精緻な反映:
   - 「additionalNotes」に地域、スタジオのロケーション、文化的背景（例: 和風・畳、原宿ストリートなど）が設定されている場合は、それらを考慮して背景やシーンに確固たる説得力を持たせるようポジティブプロンプトへ美しく精緻に反映せよ。
11. 印象補正(aesthetic): 
   - "cute"時は先頭や自然な位置に "cute"、"beautiful"時は "beautiful" を追加し、顔立ちの力を極限に高めよ。`;

            for (let attempt = 0; attempt < 5; attempt++) {
                try {
                    setStatusMessage(attempt > 0 ? `再試行中 (${attempt}/5)...` : '生成中');
                    response = await fetch(getApiUrl("generateContent"), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: `以下の日本語データに基づき、最高峰の画像生成プロンプトを作成し、末尾に比率 "${arTag}" を含めて出力せよ。\n\nデータ:\n${activeText}` }] }],
                            systemInstruction: { parts: [{ text: promptSystemInstruction }] },
                            safetySettings,
                            generationConfig: { responseMimeType: "application/json" }
                        }),
                    });

                    if (response.status === 429) {
                        if (attempt === 4) throw new Error("WAIT_LIMIT");
                        await new Promise(resolve => setTimeout(resolve, delay * 2));
                        delay *= 2;
                        continue;
                    }

                    if (!response.ok) throw new Error("HTTP " + response.status);
                    success = true;
                    break;
                } catch (err) {
                    if (attempt === 4) {
                        setStatusMessage(err.message === "WAIT_LIMIT" ? '制限中: 1分待ってください' : 'Error');
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, delay * 2));
                    delay *= 2;
                }
            }

            if (success) {
                const res = await response.json();
                const result = JSON.parse(res.candidates?.[0]?.content?.parts?.[0]?.text.match(/\{[\s\S]*\}/)?.[0] || "{}");
                setEnglishPrompt(result.positive || "");
                setNegativePrompt(result.negative || "");
                setStatusMessage('');
                setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
            }
        } catch (e) {
            setStatusMessage('Error');
        } finally {
            setIsProcessing(false);
        }
    };

    const copyText = (text, type) => {
        const el = document.createElement("textarea");
        el.value = text; document.body.appendChild(el);
        el.select(); document.execCommand('copy');
        document.body.removeChild(el);
        setCopyFeedback(type);
        setTimeout(() => setCopyFeedback(null), 2000);
    };

    const copyBothPrompts = () => {
        const combinedText = `【Positive Prompt】\n${englishPrompt}\n\n【Negative Prompt】\n${negativePrompt}`;
        copyText(combinedText, 'both');
    };

    const sections = [
        { title: "髪のデザイン", fields: ['hairStyle', 'hairBangs', 'hairColor', 'hairAccessory', 'hairTexture'] },
        { title: "顔・表情・目の極限監査", fields: ['faceOutline', 'facePlacement', 'eyeShape', 'eyeSymmetry', 'irisRatio', 'eyeCorners', 'eyeColor', 'eyelidType', 'tearBags', 'eyelashes', 'eyeSparkle', 'eyeMakeupDetail', 'eyebrowShape', 'noseShape', 'mouthShape', 'lipTexture', 'teeth', 'cheekStyle', 'expression', 'facs', 'makeupStyle'] },
        { title: "身体・肌・詳細", fields: ['skinColor', 'skinTexture', 'bodyInterface', 'molesFreckles', 'age', 'height', 'bodyType', 'bodyFrame', 'threeSizes'] },
        { title: "衣装・演出設定", fields: ['outfit', 'outfitDetail', 'pose', 'situation', 'lighting', 'artStyle', 'cameraAngle', 'additionalNotes'] }
    ];

    return (
        <div className="min-h-[100dvh] bg-[#FFF8FA] text-slate-800 font-sans pb-40 overflow-x-hidden text-[12px] antialiased">
            <header className="bg-white/90 border-b border-pink-100 p-4 sticky top-0 z-50 backdrop-blur-md flex justify-between items-center shadow-sm">
                <div className="flex flex-col">
                    <h1 className="font-bold text-base text-pink-600 italic flex items-center gap-2 tracking-tight">
                        <Icon name="sparkles" className="animate-pulse text-pink-500" /> IDOL Designer PRO
                    </h1>
                    <span className="text-[8px] font-black text-slate-300 ml-7 tracking-widest uppercase">Version 1.9.5 Production Model</span>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => globalHistory.length > 0 && setSelections(globalHistory[0])} 
                        disabled={!!isAnalyzing || isProcessing}
                        className={`p-2 text-slate-400 hover:text-pink-500 transition-colors active:scale-90 ${(isAnalyzing || isProcessing) ? 'opacity-30 pointer-events-none' : ''}`}
                        title="元に戻す"
                    >
                        <Icon name="undo" />
                    </button>
                    <button 
                        onClick={() => {
                            if (window.confirm('すべての入力パラメータをクリアしますか？')) {
                                setSelections(createEmptyState());
                                setPreviews({ base: null, plus: null, baseStored: null, plusStored: null });
                                setEnglishPrompt('');
                                setNegativePrompt('');
                                setStatusMessage('初期化しました');
                                setTimeout(() => setStatusMessage(''), 2000);
                            }
                        }} 
                        disabled={!!isAnalyzing || isProcessing}
                        className={`p-2 text-slate-400 hover:text-red-500 transition-colors ${(isAnalyzing || isProcessing) ? 'opacity-30 pointer-events-none' : ''}`}
                        title="リセット"
                    >
                        <Icon name="refresh" />
                    </button>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-4 mt-4 space-y-6">

                {/* テーマ・インスピレーション・ガチャ */}
                <section className="bg-white p-5 rounded-[2rem] border border-pink-100/50 shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-1">
                            🚀 Design Inspiration (テーマパッチ)
                        </span>
                        <span className="text-[7px] text-pink-400 font-bold uppercase tracking-tighter">パラメータ自動セット</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {Object.entries(INSPI_THEMES).map(([key, theme]) => (
                            <button
                                key={key}
                                onClick={() => applyInspiTheme(key)}
                                className="bg-pink-50 hover:bg-pink-500 hover:text-white text-pink-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-pink-100/30 transition-all flex items-center gap-1 active:scale-95"
                            >
                                {theme.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="space-y-2 bg-white p-4 rounded-3xl border border-pink-100/50 shadow-sm">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block ml-2 italic">Memory Slots (ローカル不揮発保存)</span>
                    <div className="grid grid-cols-5 gap-2">
                        {memorySlots.map((slot, i) => (
                            <div key={i} className="space-y-1">
                                <button 
                                    onClick={() => slot ? loadFromSlot(i, memorySlots, setSelections, setPreviews, setStatusMessage) : saveToSlot(i, memorySlots, selections, previews, setMemorySlots, setStatusMessage)}
                                    disabled={!!isAnalyzing || isProcessing}
                                    className={`w-full aspect-square rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all relative ${slot ? 'border-pink-400 bg-white shadow-sm' : 'border-slate-200 bg-slate-50/50'} ${(isAnalyzing || isProcessing) ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    {slot ? (
                                        <>
                                            <img src={slot.preview} className="w-full h-full object-cover opacity-80" />
                                            <div className="absolute inset-0 flex items-center justify-center font-black text-[9px] text-pink-600 bg-white/20">{i+1}</div>
                                        </>
                                    ) : (
                                        <span className="text-[10px] text-slate-300 font-bold uppercase">{i+1}</span>
                                    )}
                                </button>
                                <div className="flex gap-1">
                                    <button 
                                        onClick={() => saveToSlot(i, memorySlots, selections, previews, setMemorySlots, setStatusMessage)} 
                                        disabled={!!isAnalyzing || isProcessing}
                                        className={`flex-1 py-1 text-[7px] font-black bg-slate-50 text-slate-500 rounded border border-slate-100 uppercase active:scale-95 ${(isAnalyzing || isProcessing) ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        SAVE
                                    </button>
                                    {slot && (
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const newSlots = [...memorySlots];
                                                newSlots[i] = null;
                                                setMemorySlots(newSlots);
                                                localStorage.setItem('idol_designer_slots_v175', JSON.stringify(newSlots));
                                                setStatusMessage(`スロット ${i + 1} をクリア`);
                                                setTimeout(() => setStatusMessage(''), 2000);
                                            }} 
                                            disabled={!!isAnalyzing || isProcessing}
                                            className="px-1 text-[7px] font-black bg-red-50 text-red-500 rounded border border-red-100 active:scale-95"
                                            title="スロット削除"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl space-y-1.5 shadow-sm text-[9px]">
                     <div className="flex items-start gap-2">
                         <Icon name="info" className="text-blue-500 w-4 h-4 mt-0.5 shrink-0" />
                         <div className="space-y-1">
                            <p className="text-blue-700 font-bold leading-relaxed italic">【FICTION】生成内容はすべて架空の創作物であり、実在の人物とは一切関係ありません。</p>
                            <p className="text-blue-600 font-bold leading-relaxed opacity-80">※読み込ませた画像は要素の抽出のみに使用され、外部サーバーに保存されません。</p>
                         </div>
                     </div>
                </div>

                <div className="h-6 flex items-center justify-center">
                    {statusMessage && (
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black shadow-sm flex items-center gap-3 ${statusMessage.includes('制限中') || statusMessage.startsWith('Error') || statusMessage.startsWith('解析失敗') || statusMessage.includes('再試行中') ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-white text-pink-500'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full animate-ping ${statusMessage.includes('制限中') || statusMessage.startsWith('Error') || statusMessage.startsWith('解析失敗') || statusMessage.includes('再試行中') ? 'bg-red-400' : 'bg-pink-400'}`}></div>
                            {statusMessage.toUpperCase()}
                        </div>
                    )}
                </div>

                <section className={`bg-white rounded-3xl p-5 shadow-sm border border-pink-50 flex gap-4 ${(isAnalyzing || isProcessing) ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div 
                        onClick={() => !isAnalyzing && baseInputRef.current?.click()} 
                        className={`flex-1 aspect-square border-2 border-dashed border-blue-100 hover:border-blue-400 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 relative active:scale-95 transition-all overflow-hidden shadow-inner cursor-pointer`}
                    >
                        {previews.base ? <img src={previews.base} className="w-full h-full object-cover animate-fade-in" alt="base" /> : (
                            <div className="text-center">
                                <Icon name="target" className="text-blue-200 mx-auto mb-1" />
                                <span className="text-[8px] font-bold text-blue-400 block">BASE MODEL</span>
                            </div>
                        )}
                        {isAnalyzing === 'base' && <div className="absolute inset-0 bg-white/70 flex items-center justify-center animate-spin"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div></div>}
                    </div>
                    <div 
                        onClick={() => !isAnalyzing && plusInputRef.current?.click()} 
                        className={`flex-1 aspect-square border-2 border-dashed border-pink-100 hover:border-pink-400 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 relative active:scale-95 transition-all overflow-hidden shadow-inner cursor-pointer`}
                    >
                        {previews.plus ? <img src={previews.plus} className="w-full h-full object-cover animate-fade-in" alt="plus" /> : (
                            <div className="text-center">
                                <Icon name="plus" className="text-pink-200 mx-auto mb-1" />
                                <span className="text-[8px] font-bold text-pink-400 block">ADDITIONAL (PLUS)</span>
                            </div>
                        )}
                        {isAnalyzing === 'plus' && <div className="absolute inset-0 bg-white/70 flex items-center justify-center animate-spin"><div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full"></div></div>}
                    </div>
                    <input type="file" ref={baseInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'base')} disabled={!!isAnalyzing || isProcessing} />
                    <input type="file" ref={plusInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'plus')} disabled={!!isAnalyzing || isProcessing} />
                </section>

                {stagedData && (
                    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                            <div className="p-4 bg-pink-500 text-white font-bold text-xs flex justify-between items-center italic tracking-widest uppercase">Merge Components <button onClick={() => setStagedData(null)}><Icon name="x" className="w-4 h-4" /></button></div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50 custom-scrollbar">
                                {Object.entries(stagedData).map(([key, val]) => (!val || !LABEL_MAP[key] || val === 'none') ? null : (
                                    <div key={key} onClick={() => setSelectedFields(prev => ({ ...prev, [key]: !prev[key] }))} className={`p-3 rounded-xl border text-xs flex items-center gap-3 transition-all ${selectedFields[key] ? 'bg-white border-pink-500 shadow-sm' : 'bg-white opacity-40'}`}>
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedFields[key] ? 'bg-pink-500 border-pink-500 text-white' : 'bg-white border-slate-200'}`}>{selectedFields[key] && <Icon name="check" />}</div>
                                        <div className="min-w-0 flex-1"><span className="text-[7px] text-slate-400 block uppercase font-black tracking-tighter">{LABEL_MAP[key]}</span><p className="font-bold truncate">{String(val)}</p></div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-white border-t flex gap-2"><button onClick={() => setStagedData(null)} className="flex-1 py-3 text-slate-400 font-bold text-xs uppercase tracking-tight">CANCEL</button><button onClick={() => {
                                setSelections(prev => {
                                    const next = { ...prev };
                                    Object.keys(selectedFields).forEach(key => { if (selectedFields[key]) next[key] = String(stagedData[key]); });
                                    return next;
                                });
                                setStagedData(null);
                            }} className="flex-[2] bg-slate-900 text-white py-3 rounded-xl font-bold text-xs tracking-widest italic uppercase">Merge Items</button></div>
                        </div>
                    </div>
                )}

                {/* 44点パラメータ編集アコーディオンエリア */}
                <div className={`bg-white rounded-[2.5rem] p-6 shadow-sm border border-pink-50 space-y-4 ${(isAnalyzing || isProcessing) ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="flex justify-between items-center pb-2 border-b border-pink-50">
                        <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Icon name="brain" className="w-3.5 h-3.5" /> 44点 物理・形状パラメータ
                        </span>
                        <button 
                            onClick={() => {
                                const allOpen = Object.values(openSections).every(v => v);
                                setOpenSections({ 0: !allOpen, 1: !allOpen, 2: !allOpen, 3: !allOpen });
                            }}
                            className="text-[9px] font-bold text-slate-400 hover:text-pink-500 transition-colors"
                        >
                            {Object.values(openSections).every(v => v) ? 'すべて閉じる' : 'すべて開く'}
                        </button>
                    </div>

                    {/* クイックタップモード設定 */}
                    <div className="flex items-center justify-between p-3 bg-pink-50/50 rounded-2xl border border-pink-100/30 text-[10px] font-bold">
                        <span className="text-pink-700 flex items-center gap-1">📋 候補タグの挙動設定:</span>
                        <div className="flex bg-white/80 p-0.5 rounded-xl border border-pink-100 gap-1 shadow-sm">
                            <button 
                                type="button" 
                                onClick={() => setSugMode('replace')} 
                                className={`px-3 py-1 rounded-lg transition-all ${sugMode === 'replace' ? 'bg-pink-500 text-white shadow-sm' : 'text-slate-400'}`}
                            >
                                上書き 🔁
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setSugMode('append')} 
                                className={`px-3 py-1 rounded-lg transition-all ${sugMode === 'append' ? 'bg-pink-500 text-white shadow-sm' : 'text-slate-400'}`}
                            >
                                末尾に追加 ➕
                            </button>
                        </div>
                    </div>

                    {sections.map((section, idx) => {
                        const fillCount = getSectionFillCount(section.fields);
                        const totalCount = section.fields.length;
                        return (
                            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
                                <button
                                    type="button"
                                    onClick={() => toggleSection(idx)}
                                    className="w-full px-4 py-3 bg-slate-50/60 hover:bg-pink-50/40 text-left flex justify-between items-center transition-colors border-b border-slate-100 font-black"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{idx + 1}. {section.title}</span>
                                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${fillCount > 0 ? 'bg-pink-100 text-pink-600 animate-pulse' : 'bg-slate-200 text-slate-400'}`}>
                                            {fillCount} / {totalCount} 設定
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {fillCount > 0 && (
                                            <span 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    clearSectionFields(section.fields, section.title);
                                                }}
                                                className="text-[8px] font-bold text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded-md transition-colors"
                                                title="このセクションをリセット"
                                            >
                                                リセット
                                            </span>
                                        )}
                                        {openSections[idx] ? <Icon name="chevronUp" className="text-pink-400" /> : <Icon name="chevronDown" className="text-slate-400" />}
                                    </div>
                                </button>

                                {openSections[idx] && (
                                    <div className="p-4 bg-white grid grid-cols-2 gap-3.5">
                                        {section.fields.map((id) => {
                                            const hasVal = selections[id] && selections[id].trim() !== '';
                                            const suggestions = FIELD_SUGGESTIONS[id] || [];
                                            return (
                                                <div key={id} className={id === 'additionalNotes' || id === 'outfitDetail' || id === 'situation' || id === 'facePlacement' || id === 'bodyInterface' || id === 'facs' ? 'col-span-2' : ''}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <label className="text-[7px] font-black text-slate-400 uppercase ml-1 block">{LABEL_MAP[id] || id}</label>
                                                        
                                                        <div className="flex items-center gap-1.5">
                                                            {/* 🔎 大画面編集起動ボタン */}
                                                            <button
                                                                type="button"
                                                                onClick={() => startFocusEdit(id)}
                                                                className="text-pink-500 hover:text-pink-700 bg-pink-50 p-1 rounded transition-colors flex items-center gap-1 text-[8px] font-bold"
                                                                title="大画面エディタで編集する"
                                                            >
                                                                <Icon name="zoom" /> ズーム編集
                                                            </button>

                                                            {hasVal && (
                                                                <div className="flex items-center gap-1 animate-fade-in">
                                                                    <button
                                                                        onClick={() => copySingleField(id)}
                                                                        className={`text-[8px] px-1.5 py-0.5 rounded hover:bg-pink-100/50 transition-colors ${copyFeedback === id ? 'text-green-500 font-bold' : 'text-slate-400'}`}
                                                                        title="コピー"
                                                                    >
                                                                        {copyFeedback === id ? 'OK' : 'コピー'}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => clearSingleField(id)}
                                                                        className="text-[8px] text-red-300 hover:text-red-500 px-1.5 py-0.5 rounded hover:bg-red-50 transition-colors"
                                                                        title="クリア"
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* FACSモードのときのお助けパッチパネル */}
                                                    {id === 'facs' && (
                                                        <div className="mb-2 bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-1">
                                                            <span className="text-[7px] text-slate-400 font-bold uppercase block">FACSクイックインサート:</span>
                                                            <div className="flex flex-wrap gap-1">
                                                                {FACS_PRESETS.map((preset, pIdx) => (
                                                                    <button
                                                                        key={pIdx}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const nextVal = applySuggestionInternal(selections.facs || '', preset.code);
                                                                            setSelections(prev => ({ ...prev, facs: nextVal }));
                                                                            setStatusMessage(`FACS: ${preset.label} を適用`);
                                                                            setTimeout(() => setStatusMessage(''), 1500);
                                                                        }}
                                                                        className="bg-white hover:bg-slate-900 hover:text-white border border-slate-200 text-[8px] font-bold px-1.5 py-0.5 rounded transition-all active:scale-95 text-slate-600"
                                                                        title={preset.desc}
                                                                    >
                                                                        {preset.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* 複数行テキストエリア */}
                                                    <textarea 
                                                        rows="2"
                                                        placeholder="未設定（手入力 or 以下から選択）"
                                                        className={`w-full p-2.5 border rounded-xl text-xs font-bold transition-all resize-none custom-scrollbar ${selections[id] ? 'bg-pink-50/30 text-pink-700 border-pink-200 focus:border-pink-500' : 'bg-slate-50 border-slate-100 focus:bg-white focus:border-pink-300'}`} 
                                                        value={selections[id] || ''} 
                                                        onChange={(e) => setSelections(p=>({...p, [id]: e.target.value}))} 
                                                    />

                                                    {/* 候補ワード・チップスパネル */}
                                                    {suggestions && suggestions.length > 0 && (
                                                        <div className="mt-1.5 flex gap-1 overflow-x-auto no-scrollbar py-0.5 px-0.5 whitespace-nowrap scroll-smooth">
                                                            {suggestions.map((sug, sIdx) => {
                                                                const isSelected = selections[id] && (selections[id] === sug.value || selections[id].includes(sug.value));
                                                                return (
                                                                    <button
                                                                        type="button"
                                                                        key={sIdx}
                                                                        onClick={() => applySuggestion(id, sug.value)}
                                                                        className={`text-[8.5px] font-bold px-2.5 py-1 rounded-full border transition-all shrink-0 select-none ${
                                                                            isSelected 
                                                                                ? 'bg-pink-500 text-white border-pink-500 shadow-sm scale-95 font-extrabold' 
                                                                                : 'bg-white hover:bg-pink-50 text-slate-500 border-slate-200/60'
                                                                        }`}
                                                                        title={sug.value}
                                                                    >
                                                                        {sug.label}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div className="pt-6 border-t border-pink-50 space-y-8 text-center font-black">
                        <div className="space-y-3 px-4">
                            <span className="text-pink-400 uppercase tracking-[0.2em] block text-[9px]">Style Presets</span>
                            <div className="flex gap-2 overflow-x-auto pb-1 justify-start md:justify-center no-scrollbar px-1">
                                <button onClick={() => applyPreset('cheki')} className={`shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border text-[10px] transition-all ${selections.ratio === '54:86' ? 'bg-pink-500 text-white border-pink-500 shadow-md animate-pulse' : 'bg-white text-slate-400 border-slate-100 hover:border-pink-200'}`}>チェキ風</button>
                                <button onClick={() => applyPreset('camera')} className={`shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border text-[10px] transition-all ${(selections.artStyle || '').includes('Smartphone') || (selections.artStyle || '').includes('SNS') || (selections.artStyle || '').includes('スマホ') ? 'bg-blue-500 text-white border-blue-500 shadow-md' : 'bg-white text-slate-400 border-slate-100 hover:border-pink-200'}`}>スマホ風</button>
                                <button onClick={() => applyPreset('realistic')} className={`shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border text-[10px] transition-all ${(selections.artStyle || '').includes('Realistic') || (selections.artStyle || '').includes('DSLR') || (selections.artStyle || '').includes('実写') ? 'bg-slate-800 text-white border-slate-800 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-pink-200'}`}>実写風</button>
                            </div>
                        </div>

                        <div className="space-y-3 px-4">
                            <span className="text-pink-400 uppercase tracking-[0.2em] block text-[9px]">Aesthetic Filter (顔の印象補正)</span>
                            <div className="flex gap-3 justify-center px-1">
                                <button 
                                    onClick={() => setSelections(p => ({ ...p, aesthetic: p.aesthetic === 'cute' ? '' : 'cute' }))} 
                                    className={`flex-1 py-3 rounded-full border text-[10px] font-black transition-all ${selections.aesthetic === 'cute' ? 'bg-pink-400 text-white border-pink-400 shadow-md scale-[1.02]' : 'bg-white text-slate-400 border-slate-100 hover:border-pink-200'}`}
                                >
                                    かわいい (cute)
                                </button>
                                <button 
                                    onClick={() => setSelections(p => ({ ...p, aesthetic: p.aesthetic === 'beautiful' ? '' : 'beautiful' }))} 
                                    className={`flex-1 py-3 rounded-full border text-[10px] font-black transition-all ${selections.aesthetic === 'beautiful' ? 'bg-purple-500 text-white border-purple-500 shadow-md scale-[1.02]' : 'bg-white text-slate-400 border-slate-100 hover:border-pink-200'}`}
                                >
                                    キレイ (beautiful)
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 px-4 text-[10px]">
                            <span className="text-pink-400 uppercase tracking-[0.2em] block text-[9px]">Expression Mode</span>
                            <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
                                <button onClick={() => setExpressionMode('standard')} className={`flex-1 py-3 rounded-xl transition-all ${expressionMode === 'standard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>STANDARD</button>
                                <button onClick={() => setExpressionMode('facs')} className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${expressionMode === 'facs' ? 'bg-slate-900 text-white shadow-lg animate-pulse' : 'text-slate-400'}`}><Icon name="brain" /> FACS MODE</button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4 font-bold">
                                {[{ label: 'Portrait', value: 'portrait' }, { label: 'Landscape', value: 'landscape' }].map((o) => (
                                    <button key={o.value} onClick={() => handleOrientationChange(o.value)} className={`p-3 rounded-2xl border-2 text-[10px] font-black transition-all ${selections.orientation === o.value ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-sm' : 'border-slate-50 bg-slate-50 text-slate-300 hover:border-pink-200'}`}>{o.label.toUpperCase()}</button>
                                ))}
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {['1:1', '3:4', '9:16', '54:86'].map((r) => (
                                    <button key={r} onClick={() => setSelections(p=>({...p, ratio: r}))} className={`p-3 rounded-2xl border-2 text-[10px] font-black transition-all ${selections.ratio === r ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-sm' : 'border-slate-50 bg-slate-50 text-slate-300 hover:border-pink-200'}`}>{r === '54:86' ? 'CHEKI' : r}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-pink-50">
                        <button 
                            onClick={generatePrompt} 
                            disabled={isProcessing || isAnalyzing} 
                            className={`w-full py-6 rounded-3xl font-black text-sm shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 italic tracking-widest uppercase ${isProcessing ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-slate-900 text-white hover:bg-pink-600'}`}
                        >
                            {isProcessing ? 'クールダウン中...' : <><Icon name="zap" className="animate-bounce" /> プロンプトを出力</>}
                        </button>
                        <p className="text-[7px] text-slate-400 text-center font-bold px-8 leading-relaxed opacity-60 uppercase tracking-tighter italic">
                            AI Character Production. Result is not a real individual.
                        </p>
                    </div>
                </div>

                <div ref={resultRef} className="pb-40 space-y-6 px-1">
                    {englishPrompt && (
                        <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-4">
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse"></div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-pink-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-1.5">
                                        <Icon name="sparkles" /> Master Prompt
                                    </span>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={copyBothPrompts} 
                                            className={`text-white text-[9px] font-black px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-1 ${copyFeedback === 'both' ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                                        >
                                            <Icon name="copy" /> {copyFeedback === 'both' ? 'BOTH COPIED!' : 'COPY BOTH'}
                                        </button>
                                        <button 
                                            onClick={() => copyText(englishPrompt, 'pos')} 
                                            className={`text-white text-[9px] font-black px-3 py-2 rounded-xl transition-all shadow-md ${copyFeedback === 'pos' ? 'bg-green-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                                        >
                                            {copyFeedback === 'pos' ? 'COPIED!' : 'COPY_POS'}
                                        </button>
                                    </div>
                                </div>
                                <p className="text-pink-100/90 font-mono text-[10px] leading-relaxed italic select-all p-2 bg-slate-950/50 rounded-2xl border border-slate-800">{englishPrompt}</p>
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">Negative</span>
                                    <button 
                                        onClick={() => copyText(negativePrompt, 'neg')} 
                                        className={`text-slate-400 text-[9px] font-black px-4 py-2 rounded-xl ${copyFeedback === 'neg' ? 'bg-green-500 text-white' : 'bg-slate-50 hover:bg-slate-100'}`}
                                    >
                                        {copyFeedback === 'neg' ? 'DONE' : 'COPY'}
                                    </button>
                                </div>
                                <p className="text-slate-400 font-mono text-[9px] leading-relaxed italic select-all p-2 bg-slate-50/50 rounded-2xl border border-slate-100">{negativePrompt}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* =======================================================
                3. 【大画面フォーカスエディタ (Focus Editor Modal)】
                ======================================================= */}
            {focusField && (
                <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[1000] flex flex-col justify-between p-4 animate-fade-in">
                    <div className="flex justify-between items-center pb-3 border-b border-pink-100/10">
                        <div className="flex flex-col">
                            <span className="text-pink-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 italic">
                                <Icon name="zoom" /> Focusing Field Editor
                            </span>
                            <h2 className="text-white text-base font-black tracking-tight">{LABEL_MAP[focusField]} のこだわり詳細編集</h2>
                        </div>
                        <button 
                            onClick={() => setFocusField(null)} 
                            className="p-2.5 bg-slate-800 hover:bg-red-500/80 hover:text-white text-slate-400 rounded-full transition-all"
                        >
                            <Icon name="x" className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex gap-2 py-2 text-[10px] font-bold text-slate-300 items-center justify-between">
                        <div className="flex gap-2">
                            <button 
                                type="button" 
                                onClick={handlePasteIntoFocus} 
                                className="bg-slate-800 hover:bg-slate-700 text-pink-400 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1 transition-colors active:scale-95"
                            >
                                <Icon name="paste" /> ペースト
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    copyText(focusTempText, 'tempFocus');
                                    setStatusMessage('一時保存中のテキストをコピーしました');
                                    setTimeout(() => setStatusMessage(''), 1500);
                                }} 
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1 transition-colors active:scale-95"
                            >
                                <Icon name="copy" /> コピー
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setFocusTempText('')} 
                                className="bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/40 px-3 py-1.5 rounded-xl transition-colors active:scale-95"
                            >
                                クリア
                            </button>
                        </div>
                        <div className="text-slate-400 text-[8px] tracking-tight bg-slate-900 px-2 py-1 rounded border border-slate-800">
                            {focusTempText.length} 文字
                        </div>
                    </div>

                    <div className="flex-1 w-full bg-slate-900/50 rounded-[1.5rem] border border-pink-100/10 p-4 relative flex flex-col my-2">
                        <textarea
                            ref={focusTextAreaRef}
                            value={focusTempText}
                            onChange={(e) => setFocusTempText(e.target.value)}
                            placeholder="プロンプトに反映させたい具体的なこだわり条件を入力してください（サジェストチップのタップでも追記可能です）..."
                            className="w-full flex-1 bg-transparent text-pink-50 font-bold text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar"
                        />

                        <div className="absolute bottom-3 right-3 flex bg-slate-950 border border-slate-800/80 p-1 rounded-2xl gap-1 shadow-2xl opacity-90 backdrop-blur-md">
                            <span className="text-[7px] text-slate-500 font-bold uppercase py-1 px-2 self-center tracking-widest italic">Cursor</span>
                            <button 
                                type="button" 
                                onClick={() => handleCursorMove('left')}
                                className="w-8 h-8 bg-slate-800 hover:bg-pink-600 text-white rounded-xl flex items-center justify-center font-bold text-base active:scale-90 transition-all"
                            >
                                ◀
                            </button>
                            <button 
                                type="button" 
                                onClick={() => handleCursorMove('right')}
                                className="w-8 h-8 bg-slate-800 hover:bg-pink-600 text-white rounded-xl flex items-center justify-center font-bold text-base active:scale-90 transition-all"
                            >
                                ▶
                            </button>
                        </div>
                    </div>

                    <div className="py-2.5 space-y-2 border-t border-pink-100/10">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-[8px] font-black uppercase tracking-widest italic flex items-center gap-1.5">
                                🔮 Quick Tags Suggestions
                            </span>
                            <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[8px] font-bold">
                                <button 
                                    type="button" 
                                    onClick={() => setSugMode('replace')} 
                                    className={`px-2 py-0.5 rounded ${sugMode === 'replace' ? 'bg-pink-500 text-white' : 'text-slate-500'}`}
                                >
                                    上書き 🔁
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setSugMode('append')} 
                                    className={`px-2 py-0.5 rounded ${sugMode === 'append' ? 'bg-pink-500 text-white' : 'text-slate-500'}`}
                                >
                                    末尾追加 ➕
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 max-h-[22vh] overflow-y-auto p-1 custom-scrollbar">
                            {(FIELD_SUGGESTIONS[focusField] || []).length > 0 ? (
                                (FIELD_SUGGESTIONS[focusField] || []).map((sug, sIdx) => {
                                    const isSelected = focusTempText && (focusTempText === sug.value || focusTempText.includes(sug.value));
                                    return (
                                        <button
                                            type="button"
                                            key={sIdx}
                                            onClick={() => applySuggestionInFocus(sug.value)}
                                            className={`text-[10px] font-bold px-3 py-2 rounded-full border transition-all select-none ${
                                                isSelected 
                                                    ? 'bg-pink-500 text-white border-pink-500 font-black shadow-md' 
                                                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                                            }`}
                                        >
                                            {sug.label}
                                        </button>
                                    );
                                })
                            ) : (
                                <span className="text-[10px] text-slate-500 italic px-2 font-bold">この項目にはプリセット候補がありません。直接入力して美しく詳細を肉付けしてください。</span>
                            )}
                        </div>
                    </div>

                    <div className="pt-3 border-t border-pink-100/10 flex gap-2">
                        <button 
                            type="button" 
                            onClick={() => setFocusField(null)} 
                            className="flex-1 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white py-4 rounded-2xl font-bold text-xs transition-all uppercase tracking-widest active:scale-95"
                        >
                            キャンセル
                        </button>
                        <button 
                            type="button" 
                            onClick={saveFocusEdit} 
                            className="flex-[2.5] bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl font-black text-xs transition-all uppercase tracking-[0.2em] italic active:scale-95 shadow-lg shadow-pink-500/10"
                        >
                            編集を完了して適用する ✓
                        </button>
                    </div>
                </div>
            )}

            {copyFeedback && !FIELD_KEYS.includes(copyFeedback) && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl text-[10px] font-black z-[110] border border-slate-700 animate-in fade-in slide-in-from-bottom-4 tracking-widest uppercase">
                    Copied
                </div>
            )}
        </div>
    );
}

const saveToSlot = (index, memorySlots, selections, previews, setMemorySlots, setStatusMessage) => {
    try {
        const newSlots = [...memorySlots];
        const existingPreview = memorySlots[index]?.preview || null;
        newSlots[index] = {
            data: { ...selections },
            preview: previews.baseStored || previews.plusStored || existingPreview
        };
        setMemorySlots(newSlots);
        localStorage.setItem('idol_designer_slots_v195', JSON.stringify(newSlots));
        setStatusMessage(`Slot ${index + 1} Saved`);
        setTimeout(() => setStatusMessage(''), 2000);
    } catch(e) {
        setStatusMessage('容量制限エラー');
        setTimeout(() => setStatusMessage(''), 2000);
    }
};

const loadFromSlot = (index, memorySlots, setSelections, setPreviews, setStatusMessage) => {
    const slot = memorySlots[index];
    if (!slot) return;
    setSelections(slot.data);
    
    if (slot.preview) {
        setPreviews(prev => ({
            ...prev,
            base: slot.preview,
            baseStored: slot.preview
        }));
    }
    setStatusMessage(`Slot ${index + 1} Loaded`);
    setTimeout(() => setStatusMessage(''), 2000);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);