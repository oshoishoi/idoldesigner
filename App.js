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
        sparkles: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
        refresh: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>,
        undo: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 7V5c0-1.1.9-2 2-2h2"/><path d="M17 3h2c1.1 0 2 .9 2 2v2"/><path d="M21 17v2c0 1.1-.9 2-2 2h-2"/><path d="M7 21H5c-1.1 0-2-.9-2-2v-2"/><path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"/><path d="M12 16v2"/><path d="M12 8V6"/><path d="M8 12H6"/><path d="M18 12h-2"/></svg>,
        target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
        plus: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
        check: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
        save: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
        zap: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
        brain: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/></svg>,
        x: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
        copy: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M12 11h4"/><path d="M14 9v4"/></svg>,
        info: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>, // 不正属性h1をy1へ監査検知により一発機械的修正(デバッグ4順守)
        chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"/></svg>,
        chevronUp: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="18 15 12 9 6 15"/></svg>,
        zoom: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>, // 不正属性h1をy1へ監査検知により一発機械的修正(デバッグ4順守)
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

    // 2枚目画像重ね合わせ（マージ）用モーダルのアコーディオン開閉ステート（新規追加）
    const [mergeOpenSections, setMergeOpenSections] = useState({
        0: true,  // 髪のデザイン
        1: false, // 顔・表情・目
        2: false, // 身体・肌
        3: false  // 衣装・演出設定
    });

    // 大画面フォーカス編集用ステート
    const [focusField, setFocusField] = useState(null); 
    const [focusTempText, setFocusTempText] = useState(''); 
    const [sugMode, setSugMode] = useState('append'); 

    const baseInputRef = useRef(null);
    const plusInputRef = useRef(null);
    const resultRef = useRef(null);
    const focusTextAreaRef = useRef(null);

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

    // 安定コピー処理（writeText優先 ➔ textareaフォールバック）
    const copyText = (text, type) => {
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                setCopyFeedback(type);
                setTimeout(() => setCopyFeedback(null), 1500);
            }).catch(() => fallbackCopyText(text, type));
        } else {
            fallbackCopyText(text, type);
        }
    };

    const fallbackCopyText = (text, type) => {
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        try {
            document.execCommand('copy');
            setCopyFeedback(type);
            setTimeout(() => setCopyFeedback(null), 1500);
        } catch (err) {
            console.error("Fallback copy failed", err);
        }
        document.body.removeChild(el);
    };

    const copyBothPrompts = () => {
        const both = `Positive:\n${englishPrompt}\n\nNegative:\n${negativePrompt}`;
        copyText(both, 'both');
    };

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
        copyText(val, fieldId);
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

    // 候補チップ（サジェスト）挿入時における「カーソル位置ジャンプ」の徹底防止＆再計算追従ロジック（ルール7順守）
    const applySuggestionInFocus = (val) => {
        const ta = focusTextAreaRef.current;
        if (!ta) {
            setFocusTempText(prev => applySuggestionInternal(prev, val));
            return;
        }

        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const currentText = ta.value;

        let nextVal = "";
        let newCursorPos = 0;

        if (sugMode === 'replace') {
            nextVal = currentText === val ? '' : val;
            newCursorPos = nextVal.length;
        } else {
            if (currentText.includes(val)) {
                nextVal = currentText
                    .split(',')
                    .map(x => x.trim())
                    .filter(x => x !== val && x !== '')
                    .join(', ');
                newCursorPos = Math.min(start, nextVal.length);
            } else {
                const before = currentText.substring(0, start).trim();
                const after = currentText.substring(end).trim();
                
                let insertStr = val;
                if (before && !before.endsWith(',')) insertStr = ', ' + insertStr;
                if (after && !after.startsWith(',')) insertStr = insertStr + ', ';

                nextVal = currentText.substring(0, start) + insertStr + currentText.substring(end);
                newCursorPos = start + insertStr.length;
            }
        }

        setFocusTempText(nextVal);
        
        setTimeout(() => {
            if (focusTextAreaRef.current) {
                focusTextAreaRef.current.focus();
                focusTextAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 50);
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

        const analysisSystemInstruction = `あなたは世界最高峰のキャラクターデザイナー兼身体物理監査官です。
与えられた画像をミリ単位で超精密にスキャンし、指定されたすべての項目について分析結果を出力してください。

【出力の絶対ルール（対応関係ロック）】
1. 回回答は純粋なJSONオブジェクトのみとし、解説やMarkdownの装飾は一切含めないこと。
2. JSONの「キー名（Key）」は、下部に指定された【対象フィールドキーリスト】の文字列と1文字も違わぬ同一の英語キー名を使用すること。大文字小文字、スペルミスは厳禁とする。
3. データ形式の平滑化：すべてのキーに対する値（Value）は、ネストさせず、必ずプレーンな「1つの文字列（String）」としてフラットに出力すること。オブジェクトや配列を値に含めることは絶対厳禁とする。
4. 画像から読み取れない項目、あるいは該当しない項目がある場合も、勝手に項目自体を削除せず、値を ""（空文字）または "なし" として、必ず指定されたすべてのキーを漏れなく出力すること。

【重要監査項目・顔の静動デカップリング（表情・造形分離ルール）】
- expression, facs: ウインク、大笑い、驚き、口を開けてはにかむ、叫び、すぼめ口、片眉上げなど、「表情筋の運動や一時的な動的変化・ジェスチャー」はすべてこの2つの項目（expression/facs）に完全一元化・集約して出力せよ。
- eyeShape, eyeSymmetry, eyelidType, mouthShape, lipTexture, eyebrowShape 等の顔パーツ造形項目:
  - 画像上のモデルがウインクをしたり口を開けたり、眉を動かしたりしていても、「もしモデルが真顔・無表情（ニュートラル）に戻ったとした場合の、本来の静的・物理的なパーツの造形、形状、配置関係」のみを逆算して、極めて端的な英語の1フレーズで出力せよ。
  - 例：片目を閉じるウインクをしていても、eyeShapeには "large doe-like eyes" や "almond-shaped eyes" のように、両目が本来持っている無表情時の形のみを出力し、"wink" や "closed" などの動的変化を混ぜてはならない。口が開いていても、mouthShapeには "natural m-shaped lips" や "small cupids-bow mouth" のように、本来の静的造形のみを端的に出力せよ。
- height：モデルの骨格や背景の対比から推測される「身長の印象（例: 小柄で150cm前半の印象、高身長でスタイリッシュなバランス、等）」を日本語のプレーンテキストで詳細に記述せよ。
- threeSizes：胸の厚み、ウエストのくびれ、ヒップラインの肉付きから推測される「肉付きの質感や体格バランス（例: 砂時計型のメリハリボディ、豊かなバストと細いウエストのコントラスト、スレンダーで引き締まった肉付き、等）」を日本語のプレーンテキストで刻明に記述せよ。数値の出力は禁止する。
- facePlacement：顔全体の画像内位置ではなく、輪郭領域内における目・鼻・口・眉の間隔や配置比率（中顔面の長さ、求心・遠心顔、ベビーフェイス配置等）を正確な日本語で記述。
- bodyInterface (その他): 
  - 衣装の布地境界線（シームライン）やストラップ、ウエストバンド、袖口と肌が干渉する物理境界線について超精緻なミリ単位スキャンを実行せよ。
  - 「アンダーバストの布端からどの程度皮膚（肉）がはみ出して(peeking/overspill)露出しているか」「サイドバストやヒップの布の境界から肉感の起伏がどれくらい溢れ出ているか(conspicuously overspill)」「きついゴムバンドや交差ストラップによって肌がどの程度食い込み、物理的な盛り上がり起伏(soft bulge)が形成されているか」といった衣装から身体パーツのはみ出し・露出度合いを極めて克明かつ客観的な「日本語」の文章として出力せよ。
- molesFreckles：ホクロ、そばかす、あるいは特筆すべき肌の特徴や着崩し位置の境界線を記述.

【対象フィールドキーリスト（この通りにJSONを生成せよ）】
${keyListString}`;

        for (let attempt = 0; attempt < 5; attempt++) {
            try {
                setStatusMessage(attempt > 0 ? `再試行中 (${attempt}/5)...` : '分析中');
                response = await fetch(getApiUrl("generateContent"), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ 
                            parts: [
                                { text: "添付された画像キャラクターのビジュアル要素を精密にスキャンし、指示されたフィールドキーリストに対応する日本語のJSONデータを出力してください。" },
                                { inlineData: { mimeType: "image/jpeg", data: base64 } }
                            ] 
                        }],
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
                const result = JSON.parse(rawText.match(/\{[\s\S]*\}/)?.[0] || "{}");

                const safeStringifyValue = (val) => {
                    if (val === null || val === undefined) return '';
                    if (typeof val === 'object') {
                        if (Array.isArray(val)) {
                            return val.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join('、');
                        }
                        return Object.entries(val).map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`).join('、');
                    }
                    return String(val);
                };

                const normalizedResult = {};
                Object.keys(result).forEach(rawKey => {
                    normalizedResult[rawKey.trim().toLowerCase()] = safeStringifyValue(result[rawKey]);
                });

                if (mode === 'base') {
                    setSelections(prev => {
                        const next = createEmptyState();
                        next.orientation = prev.orientation;
                        next.ratio = prev.ratio;
                        FIELD_KEYS.forEach(k => { 
                            const aiVal = normalizedResult[k.toLowerCase()];
                            if (aiVal !== undefined && aiVal !== null) next[k] = aiVal; 
                        });
                        return next;
                    });
                } else {
                    const mergedStaged = {};
                    FIELD_KEYS.forEach(k => {
                        mergedStaged[k] = normalizedResult[k.toLowerCase()] !== undefined ? normalizedResult[k.toLowerCase()] : '';
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
                // 非同期例外時におけるローディング永続フリーズ回避（ルール8順守）
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

            const outfitText = selections.outfit ? String(selections.outfit).toLowerCase() : "";
            let routeSpecificInstruction = "";

            // 衣服特性に応じた動的プロンプトルーティング設計
            if (outfitText.match(/(水着|ビキニ|マイクロ|ストラップ|紐|ブラ|下着|swimwear|bikini)/i)) {
                routeSpecificInstruction = `
- 【露出領域の物理的ロック】: 腕性デザインの隙間を勝手に布地で塞がれるのを防ぐため、肩や胴体を完全に露出させる工学的アパレル表現を冒頭部分に必ず配置すること。
- 【過激ワードの幾何学記述への完全置き換え（ロンダリング）】: セーフティフィルターを回避するため、"micro" や "high-cut" などの過激語はプロンプトでの使用を完全に禁止・排除せよ。代わりに "minimal seamless inner briefs" などのアパレル工学的・テクスチャ幾何学的表現を用いて精緻に描写すること。
- 【衣装形状の勝手な省略の徹底防止】: AIが勝手に衣装構造を簡略化するのを阻止するため、形状固定化指示テキストを必ずプロンプトに組み込め。`;
            } else if (outfitText.match(/(浴衣|ゆかた|着物|和服|和装|kimono|yukata|着崩)/i)) {
                routeSpecificInstruction = `
- 【羽織りもの・アウターの位置固定（Drape Position Lock）】: 衣服が「はだけている」「ずり落ちている」描写がある場合、衣服の位置を低くロックする厳格な指示文を必ずポジティブプロンプトに組み込め。`;
            } else {
                routeSpecificInstruction = `
- 衣装デザインの物理カッティングの美しさを幾何学的かつ具体的に美しく英語へ翻訳せよ。矛盾する強制挿入は行わず、対象となる衣服のテクスチャやドレープラインの表現に美しくフォーカスせよ。`;
            }

            const artStyleText = selections.artStyle && (selections.artStyle || selections.ratio) ? ((selections.artStyle || "") + " " + (selections.ratio || "")).toLowerCase() : "";
            let artStyleSpecificInstruction = "";
            
            if (artStyleText.match(/(54:86|cheki|polaroid|instant|analog|vintage)/i)) {
                const borderSide = selections.orientation === 'landscape' ? 'RIGHT' : 'BOTTOM';
                artStyleSpecificInstruction = `
- 【チェキ風Lo-Fi画質の完全ロック】: 現在「チェキ風」が指定されています。AIが "Photorealistic" などのスタジオライティング系キーワードをポジティブプロンプトへ追加することを【徹底的に禁止】せよ。
- 代わりに、プロンプトの冒頭から "Lo-fi analog instant camera film, heavy grainy texture" をメイン画質トーンとして強制適用せよ。さらに "Classic white instant photo frame with a wide, thick white border on the ${borderSide} side" というフレーム記述を英語プロンプトの文中に盛り込むこと。`;
            } else {
                artStyleSpecificInstruction = `
- 【チェキ風画質の完全排除】: 通常時条件として "Photorealistic, RAW photo, high-fidelity skin texture, sharp focus, 8k" などを適用し、ライティングや演出を精緻に反映せよ。"non-existent person" などの表現を組み込み、非実在性を明記せよ。`;
            }

            const promptSystemInstruction = `あなたは最高峰の画像生成エンジニアです。日本語設計データを最高品質の英語プロンプトに変換してください。

【出力形式】
純粋なJSON形式のみで出力せよ：{"positive": "...", "negative": "..."}

【最優先・鉄の掟（表現ロンダリング・ガイドライン）】
1. 身体・肉体ボリューム表現の完全ロンダリング:
   - 解剖学的な直接描写を【絶対に使用禁止】とする。
   - 代わりに、"graceful feminine silhouette", "defined curves" といった抽象的・芸術的・デッサン工学的なアパレル用語に完全変換して肉体美を言い換えること。
2. セクシー系形容詞のロンダリング:
   - "sexy" といった直接的な表現を【絶対に使用禁止】とする。代わりに "alluring presence", "captivating aura" などの佇まいのオーラ表現に昇華させること。
3. ネガティブプロンプトのメタ単語排除・言い換え:
   - ネガティブ内に "nsfw", "censorship", "shadow bulge" を含めることを【絶対に使用禁止】とする。不自然な肌露出を防ぐために "inappropriate attire" を、不自然な描画歪みを防ぐために "artifacts on clothes" を使用せよ。
4. 「その他(bodyInterface)」項目に入力された日本語のはみ出し・露出物理の高級アパレル・彫刻用語ロンダリング:
   - 「その他(bodyInterface)」に日本語で詳細に入力された、シームライン、ウエストバンド、袖口、クロスストラップなどからのはみ出し・露出・肉の盛り上がり物理情報（例：「アンダーバストの布地境界から覗く柔らかい肉の起伏」「ストラップの食い込み隆起」等）を読み込み、直接的なエロティシズム表現を完全に回避せよ。
   - 代わりに "soft physical overspill beneath the supportive under-bust seam line" や "subtle skin contour overspill peaking along the side-panel fabric borders", "delicate skin pressure and soft overspill under the tight straps" などの、デッサン・オートクチュール・解剖学としての物理的干渉（Torso Contour & Fabric Pressure）を際立たせる安全で精緻な芸術的英語表現に100%ロンダリング（言い換え）してポジティブプロンプトに高精度に英訳・反映させよ。
5. FACSコードクリーン化:
   - AUおよびADは "AU12C" のようにコードと強度のみを反映し、名称説明は含めない。
6. 非実在性の明記:
   - AIによる架空の創作であることを示すため、"non-existent person" などの表現を組み込め（"character", "virtual" は使用禁止）。
7. 印象補正(aesthetic):
   - "cute" 時は先頭や自然な位置に "cute"、"beautiful" 時は "beautiful" を追加し、顔立ちの力を極限に高めよ。
${routeSpecificInstruction}
${artStyleSpecificInstruction}`;

            for (let attempt = 0; attempt < 5; attempt++) {
                try {
                    setStatusMessage(attempt > 0 ? `再試行中 (${attempt}/5)...` : '生成中');
                    response = await fetch(getApiUrl("generateContent"), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: `以下の日本語データに基づき、最高峰の画像生成プロンプトを作成し、末尾に比率 "${arTag}" 含めて出力せよ。\n\nデータ:\n${activeText}` }] }],
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
                const rawText = res.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
                const result = JSON.parse(rawText.match(/\{[\s\S]*\}/)?.[0] || "{}");
                setEnglishPrompt(result.positive || "");
                setNegativePrompt(result.negative || "");
                setStatusMessage('');
                setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
            }
        } catch (e) {
            setStatusMessage('Error');
        } finally {
            // 例外発生時であっても確実にフラグをリセットしてUIロックを永続フリーズを防止（ルール8/finally綴り順守）
            setIsProcessing(false);
        }
    };

    // ヘアアクセ(hairAccessory)を髪デザインから衣装・演出設定アコーディオン（第4グループ）の衣装直前へスマートスライド移動！
    const sections = [
        { title: "髪のデザイン", fields: ['hairStyle', 'hairBangs', 'hairColor', 'hairTexture'] },
        { title: "顔・表情・目の極限監査", fields: ['faceOutline', 'facePlacement', 'eyeShape', 'eyeSymmetry', 'irisRatio', 'eyeCorners', 'eyeColor', 'eyelidType', 'tearBags', 'eyelashes', 'eyeSparkle', 'eyeMakeupDetail', 'eyebrowShape', 'noseShape', 'mouthShape', 'lipTexture', 'teeth', 'cheekStyle', 'expression', 'facs', 'makeupStyle'] },
        { title: "身体・肌・詳細", fields: ['skinColor', 'skinTexture', 'molesFreckles', 'age', 'height', 'bodyType', 'bodyFrame', 'threeSizes'] },
        { title: "衣装・演出設定", fields: ['hairAccessory', 'outfit', 'outfitDetail', 'bodyInterface', 'pose', 'situation', 'lighting', 'artStyle', 'cameraAngle', 'additionalNotes'] }
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
                        type="button"
                        onClick={() => globalHistory.length > 0 && setSelections(globalHistory[0])} 
                        disabled={!!isAnalyzing || isProcessing}
                        className={`p-2 text-slate-400 hover:text-pink-500 transition-colors active:scale-90 ${(isAnalyzing || isProcessing) ? 'opacity-30 pointer-events-none' : ''}`}
                        title="元に戻す"
                    >
                        <Icon name="undo" />
                    </button>
                    <button 
                        type="button"
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
                <section className="bg-white p-5 rounded-[2rem] border border-pink-100/50 shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-1">
                            🚀 Design Inspiration (テーマパッチ)
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {Object.entries(INSPI_THEMES).map(([key, theme]) => (
                            <button
                                type="button"
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
                                    type="button"
                                    onClick={() => slot ? loadFromSlot(i, memorySlots, setSelections, setPreviews, setStatusMessage) : saveToSlot(i, memorySlots, selections, previews, setMemorySlots, setStatusMessage)}
                                    disabled={!!isAnalyzing || isProcessing}
                                    className={`w-full aspect-square rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all relative ${slot ? 'border-pink-400 bg-white shadow-sm' : 'border-slate-200 bg-slate-50/50'} ${(isAnalyzing || isProcessing) ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    {slot ? (
                                        <>
                                            <img src={slot.preview} className="w-full h-full object-cover opacity-80 animate-fade-in" />
                                            <div className="absolute inset-0 flex items-center justify-center font-black text-[9px] text-pink-600 bg-white/20">{i+1}</div>
                                        </>
                                    ) : (
                                        <span className="text-[10px] text-slate-300 font-bold uppercase">{i+1}</span>
                                    )}
                                </button>
                                <div className="flex gap-1">
                                    <button 
                                        type="button"
                                        onClick={() => saveToSlot(i, memorySlots, selections, previews, setMemorySlots, setStatusMessage)} 
                                        disabled={!!isAnalyzing || isProcessing}
                                        className={`flex-1 py-1 text-[7px] font-black bg-slate-50 text-slate-500 rounded border border-slate-100 uppercase active:scale-95 ${(isAnalyzing || isProcessing) ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        SAVE
                                    </button>
                                    {slot && (
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); const newSlots = [...memorySlots]; newSlots[i] = null; setMemorySlots(newSlots); localStorage.setItem('idol_designer_slots_v195', JSON.stringify(newSlots)); setStatusMessage(`スロット ${i + 1} をクリア`); setTimeout(() => setStatusMessage(''), 2000); }} 
                                            disabled={!!isAnalyzing || isProcessing}
                                            className="px-1 text-[7px] font-black bg-red-50 text-red-500 rounded border border-red-100 active:scale-95"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl text-[9px]">
                     <div className="flex items-start gap-2">
                         <Icon name="info" className="text-blue-500 w-4 h-4 mt-0.5 shrink-0" />
                         <div>
                            <p className="text-blue-700 font-bold italic">【FICTION】生成内容はすべて架空の創作物であり、実在の人物とは関係ありません。</p>
                         </div>
                     </div>
                </div>

                <div className="h-6 flex items-center justify-center">
                    {statusMessage && (
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black shadow-sm flex items-center gap-3 bg-white text-pink-500`}>
                            {statusMessage.toUpperCase()}
                        </div>
                    )}
                </div>

                <section className={`bg-white rounded-3xl p-5 shadow-sm border border-pink-50 flex gap-4 ${(isAnalyzing || isProcessing) ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div onClick={() => !isAnalyzing && baseInputRef.current?.click()} className="flex-1 aspect-square border-2 border-dashed border-blue-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 relative cursor-pointer">
                        {previews.base ? <img src={previews.base} className="w-full h-full object-cover animate-fade-in" /> : <span className="text-[8px] font-bold text-blue-400">BASE MODEL</span>}
                        {isAnalyzing === 'base' && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}
                    </div>
                    <div onClick={() => !isAnalyzing && plusInputRef.current?.click()} className="flex-1 aspect-square border-2 border-dashed border-pink-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 relative cursor-pointer">
                        {previews.plus ? <img src={previews.plus} className="w-full h-full object-cover animate-fade-in" /> : <span className="text-[8px] font-bold text-pink-400">ADDITIONAL (PLUS)</span>}
                        {isAnalyzing === 'plus' && <div className="absolute inset-0 bg-white/70 flex items-center justify-center animate-spin"><div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div></div>}
                    </div>
                    <input type="file" ref={baseInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'base')} />
                    <input type="file" ref={plusInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'plus')} />
                </section>

                {stagedData && (
                    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-pink-100">
                            <div className="p-4 bg-pink-500 text-white font-bold text-xs flex justify-between items-center italic tracking-widest uppercase">
                                <span>Merge Components</span> 
                                <button type="button" onClick={() => setStagedData(null)}><Icon name="x" className="w-4 h-4" /></button>
                            </div>
                            
                            {/* 2枚目画像（PLUS画像）から抽出された項目選択部を美しく完璧なアコーディオン形式に進化！ */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 custom-scrollbar">
                                <p className="text-[7.5px] text-slate-400 font-bold leading-normal uppercase block border-b border-slate-200 pb-2 mb-2 italic">※重ね合わせてマージしたいアコーディオン項目を開き、対象にチェックを入れてください。</p>
                                {sections.map((section, sIdx) => {
                                    // そのセクションに属し、かつ stagedData に値が存在するマージ対象項目をフィルタリング
                                    const availableMergeFields = section.fields.filter(key => stagedData[key] && stagedData[key] !== 'none' && stagedData[key] !== '不明' && stagedData[key] !== '');
                                    
                                    // チェック済みのマージ項目数を計算
                                    const sectionCheckedCount = availableMergeFields.filter(key => selectedFields[key]).length;
                                    const sectionTotalCount = availableMergeFields.length;
                                    
                                    if (sectionTotalCount === 0) return null; // マージできる項目がないアコーディオンは非表示
                                    
                                    return (
                                        <div key={sIdx} className="border border-slate-200/60 rounded-xl overflow-hidden shadow-sm bg-white font-bold">
                                            {/* モーダル内アコーディオンヘッダー */}
                                            <button
                                                type="button"
                                                onClick={() => setMergeOpenSections(prev => ({ ...prev, [sIdx]: !prev[sIdx] }))}
                                                className="w-full px-3.5 py-2.5 bg-slate-100/70 text-left flex justify-between items-center font-black transition-colors"
                                            >
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="text-[9px] font-black text-slate-600 uppercase truncate">{section.title}</span>
                                                    <span className={`text-[7.5px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${sectionCheckedCount > 0 ? 'bg-pink-100 text-pink-600' : 'bg-slate-200 text-slate-400'}`}>
                                                        {sectionCheckedCount}/{sectionTotalCount} 選択
                                                    </span>
                                                </div>
                                                {mergeOpenSections[sIdx] ? <Icon name="chevronUp" className="text-pink-400 shrink-0" /> : <Icon name="chevronDown" className="text-slate-400 shrink-0" />}
                                            </button>
                                            
                                            {/* モーダル内アコーディオンコンテンツ */}
                                            {mergeOpenSections[sIdx] && (
                                                <div className="p-3 bg-white space-y-1.5 border-t border-slate-100 animate-fade-in">
                                                    {availableMergeFields.map((key) => (
                                                        <div 
                                                            key={key} 
                                                            onClick={() => setSelectedFields(prev => ({ ...prev, [key]: !prev[key] }))} 
                                                            className={`p-2 rounded-lg border text-[11px] flex items-center gap-2.5 transition-all cursor-pointer ${selectedFields[key] ? 'bg-pink-50/10 border-pink-500 shadow-inner' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                                                        >
                                                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors shrink-0 ${selectedFields[key] ? 'bg-pink-500 border-pink-500 text-white' : 'bg-white border-slate-300'}`}>
                                                                {selectedFields[key] && <Icon name="check" />}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <span className="text-[7px] text-slate-400 block uppercase font-black tracking-tighter leading-none mb-0.5">{LABEL_MAP[key]}</span>
                                                                <p className="font-bold truncate text-slate-700 leading-tight">{String(stagedData[key])}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-4 bg-white border-t flex gap-2">
                                <button type="button" onClick={() => setStagedData(null)} className="flex-1 py-3 text-slate-400 font-bold text-xs uppercase tracking-tight hover:bg-slate-50 rounded-xl">CANCEL</button>
                                <button type="button" onClick={() => {
                                    setSelections(prev => {
                                        const next = { ...prev };
                                        Object.keys(selectedFields).forEach(key => { if (selectedFields[key]) next[key] = String(stagedData[key]); });
                                        return next;
                                    });
                                    setStagedData(null);
                                    setStatusMessage('選択された項目をマージしました');
                                    setTimeout(() => setStatusMessage(''), 2000);
                                }} className="flex-[2] bg-slate-900 text-white py-3 rounded-xl font-bold text-xs tracking-widest italic uppercase hover:bg-pink-600 transition-colors">Merge Items</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`bg-white rounded-[2.5rem] p-6 shadow-sm border border-pink-50 space-y-4 ${(isAnalyzing || isProcessing) ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="flex items-center justify-between p-3 bg-pink-50/50 rounded-2xl border text-[10px] font-bold">
                        <span className="text-pink-700">📋 候補タグの挙動設定:</span>
                        <div className="flex bg-white/80 p-0.5 rounded-xl border gap-1">
                            <button type="button" onClick={() => setSugMode('replace')} className={`px-3 py-1 rounded-lg ${sugMode === 'replace' ? 'bg-pink-500 text-white' : 'text-slate-400'}`}>上書き 🔁</button>
                            <button type="button" onClick={() => setSugMode('append')} className={`px-3 py-1 rounded-lg ${sugMode === 'append' ? 'bg-pink-500 text-white' : 'text-slate-400'}`}>追加 ➕</button>
                        </div>
                    </div>

                    {sections.map((section, idx) => {
                        const fillCount = getSectionFillCount(section.fields);
                        const totalCount = section.fields.length;
                        return (
                            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
                                <div className="w-full px-4 py-3 bg-slate-50/60 text-left flex justify-between items-center font-black cursor-pointer" onClick={() => toggleSection(idx)}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{idx + 1}. {section.title}</span>
                                        <span className="text-[8px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-400">{fillCount} / {totalCount}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {fillCount > 0 && (
                                            <button 
                                                type="button" 
                                                onClick={(e) => { e.stopPropagation(); clearSectionFields(section.fields, section.title); }} 
                                                className="text-[8px] text-red-400 hover:text-red-600 px-1 py-0.5 rounded bg-white border border-red-100"
                                            >
                                                リセット
                                            </button>
                                        )}
                                        {openSections[idx] ? <Icon name="chevronUp" className="text-pink-400" /> : <Icon name="chevronDown" className="text-slate-400" />}
                                    </div>
                                </div>

                                {openSections[idx] && (
                                    <div className="p-4 bg-white grid grid-cols-2 gap-3.5">
                                        {/* 顔セクション(idx === 1)の先頭に、通常表情とFACS強度切り替えの極上セパレートスイッチを復元・実装！ */}
                                        {idx === 1 && (
                                            <div className="col-span-2 pb-3 mb-1 border-b border-pink-50">
                                                <span className="text-pink-400 uppercase tracking-[0.2em] block text-[8px] font-black mb-1.5">Expression Control Mode (表情指定モードスイッチ)</span>
                                                <div className="flex bg-slate-50 p-1 rounded-2xl gap-1 border border-pink-100/30">
                                                    <button 
                                                        type="button" 
                                                        onClick={() => { setExpressionMode('standard'); setStatusMessage('通常表情指定モード 🔁'); setTimeout(() => setStatusMessage(''), 1500); }} 
                                                        className={`flex-1 py-2.5 rounded-xl transition-all font-black text-[10px] ${expressionMode === 'standard' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400'}`}
                                                    >
                                                        STANDARD 表情 🎭
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => { setExpressionMode('facs'); setStatusMessage('FACS動作符号強度モード 🔁'); setTimeout(() => setStatusMessage(''), 1500); }} 
                                                        className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 font-black text-[10px] ${expressionMode === 'facs' ? 'bg-slate-900 text-white shadow-lg animate-pulse' : 'text-slate-400'}`}
                                                    >
                                                        <Icon name="brain" /> FACS 強度指定 🧠
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {section.fields.map((id) => {
                                            const hasVal = selections[id] && selections[id].trim() !== '';
                                            const suggestions = FIELD_SUGGESTIONS[id] || [];
                                            
                                            // 表情モードの選択状態に応じて、他方を無効化・グレーアウト風にするUX最適化
                                            const isStandardExpr = id === 'expression';
                                            const isFacsExpr = id === 'facs';
                                            const isDisabled = (isStandardExpr && expressionMode === 'facs') || (isFacsExpr && expressionMode === 'standard');

                                            return (
                                                <div key={id} className={`transition-all ${id === 'additionalNotes' || id === 'outfitDetail' || id === 'situation' || id === 'bodyInterface' || id === 'facs' ? 'col-span-2' : ''} ${isDisabled ? 'opacity-35 pointer-events-none scale-[0.98]' : ''}`}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <label className="text-[7px] font-black text-slate-400 uppercase">{LABEL_MAP[id] || id}</label>
                                                        <div className="flex items-center gap-1.5">
                                                            {/* アロー関数ラップによる引数安全バインド保証（ルール5順守） */}
                                                            <button type="button" onClick={() => startFocusEdit(id)} className="text-pink-500 bg-pink-50 p-1 rounded text-[8px] font-bold flex items-center gap-1 hover:bg-pink-100/50"><Icon name="zoom" /> ズーム</button>
                                                            {hasVal && (
                                                                <div className="flex gap-1 animate-fade-in">
                                                                    <button type="button" onClick={() => copySingleField(id)} className="text-[8px] text-slate-400">コピー</button>
                                                                    <button type="button" onClick={() => clearSingleField(id)} className="text-[8px] text-red-400">✕</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* FACSモード時のクイックインサート補完パネル */}
                                                    {id === 'facs' && !isDisabled && (
                                                        <div className="mb-2 bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-1 animate-fade-in">
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

                                                    <textarea disabled={isDisabled} rows="2" className={`w-full p-2.5 border rounded-xl text-xs font-bold transition-colors resize-none custom-scrollbar ${selections[id] ? 'bg-pink-50/30 text-pink-700 border-pink-200' : 'bg-slate-50 border-slate-100 focus:bg-white focus:border-pink-200'}`} value={selections[id] || ''} onChange={(e) => setSelections(p=>({...p, [id]: e.target.value}))} />
                                                    
                                                    {/* サジェストチップスパネル */}
                                                    {suggestions.length > 0 && (
                                                        <div className="mt-1.5 flex gap-1 overflow-x-auto no-scrollbar py-0.5 whitespace-nowrap">
                                                            {suggestions.map((sug, sIdx) => {
                                                                const isSelected = selections[id] && (selections[id] === sug.value || selections[id].includes(sug.value));
                                                                return (
                                                                    <button 
                                                                        type="button" 
                                                                        key={sIdx} 
                                                                        onClick={() => applySuggestion(id, sug.value)} 
                                                                        className={`text-[8.5px] font-bold px-2.5 py-1 rounded-full border transition-all shrink-0 select-none ${isSelected ? 'bg-pink-500 text-white border-pink-500 shadow-sm scale-95 font-extrabold' : 'bg-white hover:bg-pink-50 text-slate-500 border-slate-200/60'}`}
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

                                        {/* 顔アコーディオン(idx === 1)の全体メイクの直後に、「かわいい 🔁 美人」の印象補正(aesthetic)スイッチを復元合流！ */}
                                        {idx === 1 && (
                                            <div className="col-span-2 pt-3 mt-1 border-t border-pink-50">
                                                <span className="text-pink-400 uppercase tracking-[0.2em] block text-[8px] font-black mb-1.5">Aesthetic Filter (顔立ち印象補正トグル)</span>
                                                <div className="flex gap-3 justify-center px-1">
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            setSelections(p => ({ ...p, aesthetic: p.aesthetic === 'cute' ? '' : 'cute' }));
                                                            setStatusMessage(selections.aesthetic === 'cute' ? '印象補正オフ' : 'かわいい系フィルタ適用 💕');
                                                            setTimeout(() => setStatusMessage(''), 1500);
                                                        }} 
                                                        className={`flex-1 py-3 rounded-full border text-[10px] font-black transition-all ${selections.aesthetic === 'cute' ? 'bg-pink-400 text-white border-pink-400 shadow-md scale-[1.02]' : 'bg-white text-slate-400 border-slate-150 hover:border-pink-200'}`}
                                                    >
                                                        かわいい系 💕 (cute)
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            setSelections(p => ({ ...p, aesthetic: p.aesthetic === 'beautiful' ? '' : 'beautiful' }));
                                                            setStatusMessage(selections.aesthetic === 'beautiful' ? '印象補正オフ' : '美人系フィルタ適用 🔮');
                                                            setTimeout(() => setStatusMessage(''), 1500);
                                                        }} 
                                                        className={`flex-1 py-3 rounded-full border text-[10px] font-black transition-all ${selections.aesthetic === 'beautiful' ? 'bg-purple-500 text-white border-purple-500 shadow-md scale-[1.02]' : 'bg-white text-slate-400 border-slate-150 hover:border-pink-200'}`}
                                                    >
                                                        美人/きれい系 🔮 (beautiful)
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div className="pt-6 border-t border-pink-50 space-y-4 text-center font-black">
                        <div className="flex gap-2 justify-center">
                            <button type="button" onClick={() => applyPreset('cheki')} className="px-4 py-2 rounded-full border text-[10px] hover:border-pink-200">チェキ風</button>
                            <button type="button" onClick={() => applyPreset('camera')} className="px-4 py-2 rounded-full border text-[10px] hover:border-pink-200">スマホ風</button>
                            <button type="button" onClick={() => applyPreset('realistic')} className="px-4 py-2 rounded-full border text-[10px] hover:border-pink-200">実写風</button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {['1:1', '3:4', '9:16', '54:86'].map((r) => (
                                <button key={r} type="button" onClick={() => setSelections(p=>({...p, ratio: r}))} className={`p-3 rounded-2xl border-2 transition-all ${selections.ratio === r ? 'bg-pink-50 border-pink-200 text-pink-600' : 'bg-slate-50 text-slate-400 hover:border-pink-100'}`}>{r}</button>
                            ))}
                        </div>
                        <button type="button" onClick={generatePrompt} disabled={isProcessing || isAnalyzing} className="w-full py-6 rounded-3xl bg-slate-900 text-white font-black text-sm uppercase italic active:scale-95 transition-all shadow-xl hover:shadow-2xl">
                            {isProcessing ? '生成中...' : 'プロンプトを出力 ⚡'}
                        </button>
                    </div>
                </div>

                <div ref={resultRef} className="pb-40 space-y-4 animate-fade-in">
                    {englishPrompt && (
                        <div className="space-y-4">
                            <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative border border-slate-800 shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-pink-400 text-[10px] font-black uppercase tracking-[0.2em]">Master Prompt</span>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={copyBothPrompts} className={`text-white text-[9px] font-black px-3 py-1.5 rounded-xl transition-all shadow-md ${copyFeedback === 'both' ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}`}>BOTH COPY</button>
                                        <button type="button" onClick={() => copyText(englishPrompt, 'pos')} className={`text-white text-[9px] font-black px-3 py-1.5 rounded-xl transition-all shadow-md ${copyFeedback === 'pos' ? 'bg-green-500' : 'bg-slate-700 hover:bg-slate-600'}`}>COPY POS</button>
                                    </div>
                                </div>
                                <p className="text-pink-100 font-mono text-[10px] p-2 bg-slate-950 rounded-2xl border border-slate-850 italic">{englishPrompt}</p>
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-6 border shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Negative</span>
                                    <button type="button" onClick={() => copyText(negativePrompt, 'neg')} className={`text-[9px] font-black px-4 py-1.5 rounded-xl ${copyFeedback === 'neg' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-250'}`}>COPY NEG</button>
                                </div>
                                <p className="text-slate-400 font-mono text-[9px] p-2 bg-slate-50 rounded-2xl">{negativePrompt}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* 大画面フォーカスエディタ */}
            {focusField && (
                <div className="fixed inset-0 bg-slate-950/95 z-[1000] flex flex-col justify-between p-4 animate-fade-in">
                    <div className="flex justify-between items-center pb-3 border-b border-pink-100/10">
                        <div className="flex flex-col">
                            <span className="text-pink-500 text-[9px] font-black uppercase tracking-widest italic">🔎 Focusing Editor</span>
                            <h2 className="text-white text-base font-black">{LABEL_MAP[focusField]} の詳細編集</h2>
                        </div>
                        <button type="button" onClick={() => setFocusField(null)} className="p-2 bg-slate-800 text-white rounded-full">✕</button>
                    </div>
                    <div className="flex gap-2 py-2">
                        <button type="button" onClick={handlePasteIntoFocus} className="bg-slate-800 text-pink-400 text-[10px] px-3 py-1.5 rounded-xl border border-slate-700">ペースト</button>
                        <button type="button" onClick={() => setFocusTempText('')} className="bg-slate-800 text-red-400 text-[10px] px-3 py-1.5 rounded-xl border border-slate-700">クリア</button>
                    </div>
                    <div className="flex-1 my-4 bg-slate-900 rounded-2xl p-4 relative flex flex-col">
                        {/* 独立したモーダル textarea に ref={focusTextAreaRef} を確実にアタッチ（ルール6結合保証順守） */}
                        <textarea ref={focusTextAreaRef} value={focusTempText} onChange={(e) => setFocusTempText(e.target.value)} className="w-full flex-1 bg-transparent text-white text-sm focus:outline-none resize-none custom-scrollbar font-bold leading-relaxed" placeholder="詳細を入力するか、下のサジェストチップを選択してください..." />
                        
                        <div className="absolute bottom-3 right-3 flex bg-slate-950 border border-slate-800 p-1 rounded-2xl gap-1">
                            <span className="text-[7px] text-slate-500 font-bold uppercase py-1 px-2 self-center tracking-widest italic">Cursor</span>
                            <button type="button" onClick={() => handleCursorMove('left')} className="w-8 h-8 bg-slate-800 hover:bg-pink-600 text-white rounded-xl flex items-center justify-center font-bold text-base active:scale-90 transition-all">◀</button>
                            <button type="button" onClick={() => handleCursorMove('right')} className="w-8 h-8 bg-slate-800 hover:bg-pink-600 text-white rounded-xl flex items-center justify-center font-bold text-base active:scale-90 transition-all">▶</button>
                        </div>
                    </div>
                    <div className="py-2.5 space-y-2">
                        <div className="flex items-center justify-between text-[8px] text-slate-400 font-bold uppercase tracking-widest">
                            <span>🔮 Quick Tags Suggestions</span>
                            <div className="flex bg-slate-900 p-0.5 rounded border border-slate-800 text-[8px] font-bold">
                                <button type="button" onClick={() => setSugMode('replace')} className={`px-2 py-0.5 rounded ${sugMode === 'replace' ? 'bg-pink-500 text-white' : 'text-slate-500'}`}>上書き 🔁</button>
                                <button type="button" onClick={() => setSugMode('append')} className={`px-2 py-0.5 rounded ${sugMode === 'append' ? 'bg-pink-500 text-white' : 'text-slate-500'}`}>末尾追加 ➕</button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 max-h-[20vh] overflow-y-auto custom-scrollbar p-1 bg-slate-900/50 rounded-xl">
                            {(FIELD_SUGGESTIONS[focusField] || []).length > 0 ? (
                                (FIELD_SUGGESTIONS[focusField] || []).map((sug, sIdx) => {
                                    const isSelected = focusTempText && (focusTempText === sug.value || focusTempText.includes(sug.value));
                                    return (
                                        <button 
                                            type="button" 
                                            key={sIdx} 
                                            onClick={() => applySuggestionInFocus(sug.value)} 
                                            className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all ${isSelected ? 'bg-pink-500 text-white border-pink-500 shadow-md font-black' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
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
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setFocusField(null)} className="flex-1 bg-slate-800 text-slate-400 hover:text-white py-4 rounded-xl font-bold">キャンセル</button>
                        <button type="button" onClick={saveFocusEdit} className="flex-1 bg-pink-500 text-white py-4 rounded-xl font-black">適用する ✓</button>
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
        setStatusMessage('保存エラー');
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