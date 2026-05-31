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

    const [openSections, setOpenSections] = useState({
        0: true,  
        1: false, 
        2: false, 
        3: false  
    });

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

    // 汎用コピー関数
    const copyText = (text, type) => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopyFeedback(type);
            setTimeout(() => setCopyFeedback(null), 1500);
        }).catch(err => {
            console.error("Copy failed", err);
        });
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
        const analysisSystemInstruction = `あなたは世界最高峰のキャラクターデザイナー兼身体物理監査官です。与えられた画像をミリ単位で超精密にスキャンし、指定されたすべての項目について分析結果を出力してください...（中略）...【対象フィールドキーリスト】\n${keyListString}`;

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
                const result = JSON.parse(rawText.match(/\{[\s\S]*\}/)?.[0] || rawText);

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
            } finaly {
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

            const promptSystemInstruction = `あなたは最高峰の画像生成エンジニアです。日本語設計データを最高品質の英語プロンプトに変換してください...（中略）...純粋なJSON形式のみで出力せよ：{"positive": "...", "negative": "..."}`;

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
            setIsProcessing(false);
        }
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
                                            <img src={slot.preview} className="w-full h-full object-cover opacity-80" />
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const newSlots = [...memorySlots];
                                                newSlots[i] = null;
                                                setMemorySlots(newSlots);
                                                localStorage.setItem('idol_designer_slots_v195', JSON.stringify(newSlots));
                                                setStatusMessage(`スロット ${i + 1} をクリア`);
                                                setTimeout(() => setStatusMessage(''), 2000);
                                            }} 
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
                            <p className="text-blue-700 font-bold italic">【FICTION】生成内容はすべて架架空の創作物であり、実在の人物とは関係ありません。</p>
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
                        {previews.base ? <img src={previews.base} className="w-full h-full object-cover" /> : <span className="text-[8px] font-bold text-blue-400">BASE MODEL</span>}
                    </div>
                    <div onClick={() => !isAnalyzing && plusInputRef.current?.click()} className="flex-1 aspect-square border-2 border-dashed border-pink-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 relative cursor-pointer">
                        {previews.plus ? <img src={previews.plus} className="w-full h-full object-cover" /> : <span className="text-[8px] font-bold text-pink-400">ADDITIONAL (PLUS)</span>}
                    </div>
                    <input type="file" ref={baseInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'base')} />
                    <input type="file" ref={plusInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'plus')} />
                </section>

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
                            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                                <div className="w-full px-4 py-3 bg-slate-50/60 text-left flex justify-between items-center font-black cursor-pointer" onClick={() => toggleSection(idx)}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-slate-600 uppercase">{idx + 1}. {section.title}</span>
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
                                        {section.fields.map((id) => {
                                            const hasVal = selections[id] && selections[id].trim() !== '';
                                            return (
                                                <div key={id} className={id === 'additionalNotes' || id === 'outfitDetail' || id === 'situation' ? 'col-span-2' : ''}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <label className="text-[7px] font-black text-slate-400 uppercase">{LABEL_MAP[id] || id}</label>
                                                        <div className="flex items-center gap-1.5">
                                                            <button type="button" onClick={() => startFocusEdit(id)} className="text-pink-500 bg-pink-50 p-1 rounded text-[8px] font-bold"><Icon name="zoom" /> ズーム</button>
                                                            {hasVal && (
                                                                <div className="flex gap-1">
                                                                    <button type="button" onClick={() => copySingleField(id)} className="text-[8px] text-slate-400">コピー</button>
                                                                    <button type="button" onClick={() => clearSingleField(id)} className="text-[8px] text-red-400">✕</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <textarea rows="2" className="w-full p-2.5 border rounded-xl bg-slate-50 text-xs font-bold" value={selections[id] || ''} onChange={(e) => setSelections(p=>({...p, [id]: e.target.value}))} />
                                                    <div className="mt-1.5 flex gap-1 overflow-x-auto no-scrollbar py-0.5 whitespace-nowrap">
                                                        {(FIELD_SUGGESTIONS[id] || []).map((sug, sIdx) => (
                                                            <button type="button" key={sIdx} onClick={() => applySuggestion(id, sug.value)} className="text-[8.5px] font-bold px-2.5 py-1 rounded-full border bg-white text-slate-500">{sug.label}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div className="pt-6 border-t border-pink-50 space-y-4 text-center font-black">
                        <div className="flex gap-2 justify-center">
                            <button type="button" onClick={() => applyPreset('cheki')} className="px-4 py-2 rounded-full border text-[10px]">チェキ風</button>
                            <button type="button" onClick={() => applyPreset('camera')} className="px-4 py-2 rounded-full border text-[10px]">スマホ風</button>
                            <button type="button" onClick={() => applyPreset('realistic')} className="px-4 py-2 rounded-full border text-[10px]">実写風</button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {['1:1', '3:4', '9:16', '54:86'].map((r) => (
                                <button key={r} type="button" onClick={() => setSelections(p=>({...p, ratio: r}))} className={`p-3 rounded-2xl border-2 ${selections.ratio === r ? 'bg-pink-50 border-pink-200 text-pink-600' : 'bg-slate-50 text-slate-400'}`}>{r}</button>
                            ))}
                        </div>
                        <button type="button" onClick={generatePrompt} disabled={isProcessing || isAnalyzing} className="w-full py-6 rounded-3xl bg-slate-900 text-white font-black text-sm uppercase italic">
                            {isProcessing ? '生成中...' : 'プロンプトを出力 ⚡'}
                        </button>
                    </div>
                </div>

                <div ref={resultRef} className="pb-40 space-y-4">
                    {englishPrompt && (
                        <div className="space-y-4">
                            <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-pink-400 text-[10px] font-black uppercase">Master Prompt</span>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={copyBothPrompts} className="bg-blue-600 text-white text-[9px] px-3 py-1.5 rounded-xl">BOTH COPY</button>
                                        <button type="button" onClick={() => copyText(englishPrompt, 'pos')} className="bg-slate-700 text-white text-[9px] px-3 py-1.5 rounded-xl">COPY POS</button>
                                    </div>
                                </div>
                                <p className="text-pink-100 font-mono text-[10px] p-2 bg-slate-950 rounded-2xl">{englishPrompt}</p>
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-6 border">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-400 text-[10px]">Negative</span>
                                    <button type="button" onClick={() => copyText(negativePrompt, 'neg')} className="bg-slate-100 text-[9px] px-3 py-1.5 rounded-xl">COPY NEG</button>
                                </div>
                                <p className="text-slate-400 font-mono text-[9px] p-2 bg-slate-50 rounded-2xl">{negativePrompt}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* 大画面フォーカスエディタ */}
            {focusField && (
                <div className="fixed inset-0 bg-slate-950/95 z-[1000] flex flex-col justify-between p-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                        <h2 className="text-white text-base font-black">{LABEL_MAP[focusField]} の詳細編集</h2>
                        <button type="button" onClick={() => setFocusField(null)} className="p-2 bg-slate-800 text-white rounded-full">✕</button>
                    </div>
                    <div className="flex-1 my-4 bg-slate-900 rounded-2xl p-4">
                        <textarea ref={focusTextAreaRef} value={focusTempText} onChange={(e) => setFocusTempText(e.target.value)} className="w-full h-full bg-transparent text-white text-sm focus:outline-none resize-none" />
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setFocusField(null)} className="flex-1 bg-slate-800 text-white py-4 rounded-xl font-bold">キャンセル</button>
                        <button type="button" onClick={saveFocusEdit} className="flex-1 bg-pink-500 text-white py-4 rounded-xl font-black">適用する ✓</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const saveToSlot = (index, memorySlots, selections, previews, setMemorySlots, setStatusMessage) => {
    try {
        const newSlots = [...memorySlots];
        newSlots[index] = {
            data: { ...selections },
            preview: previews.baseStored || previews.plusStored || null
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
        setPreviews(prev => ({ ...prev, base: slot.preview, baseStored: slot.preview }));
    }
    setStatusMessage(`Slot ${index + 1} Loaded`);
    setTimeout(() => setStatusMessage(''), 2000);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);