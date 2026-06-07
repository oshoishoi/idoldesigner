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
        copy: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M12 11h4"/><path d="M14 9v4"/></svg>,
        info: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
        chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"/></svg>,
        chevronUp: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="18 15 12 9 6 15"/></svg>,
        zoom: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
        paste: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M12 11h4"/><path d="M14 9v4"/></svg>
    };
    return svgs[name] || null;
};

function App() {
    const sections = [
        { title: "髪のデザイン", fields: ['hairStyle', 'hairBangs', 'hairColor', 'hairTexture'] },
        { title: "顔・表情・目の極限監査", fields: ['faceOutline', 'facePlacement', 'eyeShape', 'eyeSymmetry', 'irisRatio', 'eyeCorners', 'eyeColor', 'eyelidType', 'tearBags', 'eyelashes', 'eyeSparkle', 'eyeMakeupDetail', 'eyebrowShape', 'noseShape', 'mouthShape', 'lipTexture', 'teeth', 'cheekStyle', 'expression', 'facs', 'makeupStyle', 'aesthetic'] },
        { title: "身体・肌・詳細", fields: ['skinColor', 'skinTexture', 'molesFreckles', 'age', 'height', 'bodyType', 'bodyFrame', 'threeSizes'] },
        { title: "衣装・演出設定", fields: ['hairAccessory', 'outfit', 'outfitDetail', 'bodyInterface', 'pose', 'situation', 'lighting', 'artStyle', 'cameraAngle', 'additionalNotes'] }
    ];

    const createEmptyState = () => {
        const obj = { orientation: 'portrait', ratio: '3:4', aesthetic: '' };
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

    const [openSections, setOpenSections] = useState({ 0: true, 1: false, 2: false, 3: false });
    const [mergeOpenSections, setMergeOpenSections] = useState({ 0: true, 1: true, 2: true, 3: true });

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

    const copyText = (text, type) => {
        if (!text) return;
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        try {
            document.execCommand('copy');
            setCopyFeedback(type);
            setTimeout(() => setCopyFeedback(null), 1500);
        } catch (err) {}
        document.body.removeChild(el);
    };

    const copyBothPrompts = () => {
        const both = `Positive:\n${englishPrompt}\n\nNegative:\n${negativePrompt}`;
        copyText(both, 'both');
    };

    const toggleSection = (idx) => {
        setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const getSectionFillCount = (fields) => {
        let count = 0;
        fields.forEach(f => { if (selections[f] && selections[f].trim() !== '') count++; });
        return count;
    };

    const applyInspiTheme = (themeKey) => {
        const theme = INSPI_THEMES[themeKey];
        if (!theme) return;

        setGlobalHistory(prev => [selections, ...prev].slice(0, 3));
        setSelections(prev => {
            const next = { ...prev };
            Object.entries(theme.data).forEach(([key, val]) => {
                if (FIELD_KEYS.includes(key)) next[key] = val;
            });
            return next;
        });
        setOpenSections({ 0: true, 1: true, 2: false, 3: true });
        setStatusMessage(`「${theme.name}」テーマをロードしました！`);
        setTimeout(() => setStatusMessage(''), 2500);
    };

    const clearSingleField = (fieldId) => {
        setSelections(prev => ({ ...prev, [fieldId]: '' }));
        if (focusField === fieldId) setFocusTempText('');
    };

    const applySuggestionInternal = (currentVal, targetVal) => {
        if (sugMode === 'replace') {
            return currentVal === targetVal ? '' : targetVal;
        } else {
            if (!currentVal || currentVal.trim() === '') return targetVal;
            if (currentVal.includes(targetVal)) {
                return currentVal.split(',').map(x => x.trim()).filter(x => x !== targetVal && x !== '').join(', ');
            }
            return `${currentVal.trim().replace(/,$/, '')}, ${targetVal}`;
        }
    };

    const applySuggestion = (fieldId, val) => {
        setSelections(prev => ({ ...prev, [fieldId]: applySuggestionInternal(prev[fieldId] || '', val) }));
    };

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
                nextVal = currentText.split(',').map(x => x.trim()).filter(x => x !== val && x !== '').join(', ');
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
        if (direction === 'left' && start > 0) ta.setSelectionRange(start - 1, start - 1);
        else if (direction === 'right' && start < ta.value.length) ta.setSelectionRange(start + 1, start + 1);
        ta.focus();
    };

    const handlePasteIntoFocus = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                setFocusTempText(prev => (!prev || prev.trim() === '' ? text : prev + " " + text));
                setStatusMessage('ペーストしました');
                setTimeout(() => setStatusMessage(''), 1500);
            }
        } catch (err) {}
    };

    const clearSectionFields = (fields, sectionTitle) => {
        if (window.confirm(`「${sectionTitle}」のすべての項目をリセットしますか？`)) {
            setSelections(prev => {
                const next = { ...prev };
                fields.forEach(f => next[f] = '');
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
        setStatusMessage('分析中...');
        try {
            const { b64, pUrl, b64Preview } = await safeProcessImage(file);
            setPreviews(prev => ({ ...prev, [mode]: pUrl, [`${mode}Stored`]: b64Preview }));
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

        const analysisSystemInstruction = `最高峰の監査官として画像を精密スキャンし指定JSONを出力せよ。
【絶対ルール】
1. 純粋なJSONのみ。解説・装飾厳禁。
2. キー名は【対象リスト】と完全一致。
3. 値はネストせずフラットな1つの文字列。
4. 不明項目も空文字で出力。
5. 【重要】値は全て【日本語】で記述。英語は禁止。
【監査項目】
- expression/facs: 動的変化(ウインク等)はここに集約。
- 顔パーツ造形: 無表情時を逆算し端的に。
- height/threeSizes/facePlacement: 数値は避け日本語テキストで。特にバストの重力感(自然なドレープと豊満さ)を詳細に。
- skinTexture / bodyType: 肉質の差(引き締まっているが柔らかい、マシュマロのようにふくよか等)を詳細に。
- bodyInterface: 物理境界を克明な日本語で。特に「極細の紐や水着の縁が、腰回りやヒップの肌にどのように沈み込み（食い込み）、張力と極上の柔らかさのコントラストを生み出しているか」を精密に言語化せよ。
- pose: 下半身の接地状態・自重のかかり方を明記。正座・膝立ち等は明確に区別せよ。
- molesFreckles: 特徴を日本語で。
【対象リスト】
${keyListString}`;

        try {
            const FALLBACK_MODELS = ['gemini-3.5-flash', 'gemini-3.0-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'];
            let attempt = 0;

            while (attempt < 5 && !success) {
                for (let i = 0; i < FALLBACK_MODELS.length; i++) {
                    const currentModel = FALLBACK_MODELS[i];
                    const shortName = currentModel.replace('gemini-', '');
                    
                    try {
                        setStatusMessage((attempt > 0 || i > 0) ? `[${shortName}] 試行中...` : '分析中...');
                        response = await fetch(getApiUrl("generateContent", currentModel), {
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

                        if (response.ok) {
                            success = true;
                            break;
                        } else if (response.status === 404 || response.status === 429 || response.status === 503) {
                            continue;
                        } else {
                            throw new Error("HTTP " + response.status);
                        }
                    } catch (err) {
                        continue;
                    }
                }

                if (success) break;

                attempt++;
                if (attempt < 5) {
                    setStatusMessage('全モデル混雑中。待機して再試行...');
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                }
            }

            if (!success) {
                setStatusMessage('制限中: 1分待ってください');
                return;
            }

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
            setTimeout(() => setIsAnalyzing(null), 1000);
        }
    };

    const generatePrompt = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setStatusMessage('生成中...');
        
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

            if (outfitText.match(/(水着|ビキニ|マイクロ|ストラップ|紐|ブラ|下着|swimwear|bikini)/i)) {
                routeSpecificInstruction = `
- 【極小指定】"micro", "tiny"等は禁止。"minimalist triangular cut", "narrow fabric panels", "ultra-fine string construction" 等幾何学的用語へ変換。
- 【面積増大防止】"top", "shorts"単体禁止。露出構造明記。ネガティブに"full coverage, sports bra, tank top, roomwear, boxers, camisole"追加。`;
            } else {
                routeSpecificInstruction = `- 衣装カッティングを幾何学的に英訳。`;
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

            const promptSystemInstruction = `最高品質の英語プロンプトをJSONで出力せよ：{"positive": "...", "negative": "..."}
【表現最適化ガイドライン】
1. 肉体直接描写(体型,ボリューム)の言い換え: "bust volume", "cleavage", "huge breasts", "erotic flesh", "fat"等は【絶対に使用禁止】とする。代わりに "graceful feminine silhouette", "generously full upper contours" 等の高級アパレル用語・デッサン用語へロンダリングせよ。胸の重力感や豊満さは "plush upper volume with a natural, elegant heavy drape gracefully supported by the fabric" と表現せよ。
2. セクシー形容詞("sexy"等)禁止 ➔ "captivating aura"等へ。
3. 過激素材("micro","wet-look"等)禁止 ➔ "minimal","matte finish"等へ。
4. 極小表現禁止 ➔ "minimalist triangular cut"等へ。ネガティブに"full coverage, sports bra, large cups"等追加。
5. メタ単語("nsfw","censorship")禁止 ➔ "inappropriate attire"等へ。
6. 影表現("shadow bulge")禁止 ➔ "artifacts on clothes"等へ。
7. 直接的脱衣表現禁止 ➔ "off-shoulder clothing layout"等レイアウト用語へ。
8. 下着名称("bra","panties"等)禁止 ➔ "two-piece ensemble", "minimalist lace-trimmed top"等へ。
9. ルーズ化防止: "top","shorts"単体禁止 ➔ 露出構造明記。ネガティブに"roomwear, camisole"追加。
10. 丈延長防止: "tank top"禁止 ➔ "underwire bralette"等へ。ネガティブに"bustier, corset"追加。
11. 姿勢・ポーズの崩壊防止: 座り・膝立ち等の場合、ネガティブに"chair, stool, bench, standing, unnatural leg anatomy, floating"を追加し床での姿勢を安定させよ。
12. 【極細紐と肌の張力コントラスト（マシュマロ物理）】: 極細の紐や水着の食い込みは "delicate thread-like side ties creating a soft, yielding indentation against the exceptionally plush waistline" 等の「紐の張力(tension)」と「肌の沈み込み(yielding contour)」の対比を用いて、極上の柔らかさと重力感を視覚化せよ。また、「引き締まり」と「柔らかさ」の同居は "toned yet exceptionally soft body contour", "delicate balance of a slender frame and plush curves" 等の芸術的表現を用いよ。
13. FACSは"AU12C"のみ反映。非実在性("non-existent person")明記。
14. aesthetic("cute"/"beautiful")を自然に追加。
${routeSpecificInstruction}
${artStyleSpecificInstruction}`;

            const FALLBACK_MODELS = ['gemini-3.5-flash', 'gemini-3.0-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'];
            let attempt = 0;

            while (attempt < 5 && !success) {
                for (let i = 0; i < FALLBACK_MODELS.length; i++) {
                    const currentModel = FALLBACK_MODELS[i];
                    const shortName = currentModel.replace('gemini-', '');
                    
                    try {
                        setStatusMessage((attempt > 0 || i > 0) ? `[${shortName}] 試行中...` : '生成中...');
                        response = await fetch(getApiUrl("generateContent", currentModel), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                contents: [{ parts: [{ text: `以下の日本語データに基づきプロンプトを作成し、末尾に比率 "${arTag}" を含めて出力せよ。\n\nデータ:\n${activeText}` }] }],
                                systemInstruction: { parts: [{ text: promptSystemInstruction }] },
                                safetySettings,
                                generationConfig: { responseMimeType: "application/json" }
                            }),
                        });

                        if (response.ok) {
                            success = true;
                            break;
                        } else if (response.status === 404 || response.status === 429 || response.status === 503) {
                            continue;
                        } else {
                            throw new Error("HTTP " + response.status);
                        }
                    } catch (err) {
                        continue;
                    }
                }

                if (success) break;

                attempt++;
                if (attempt < 5) {
                    setStatusMessage('全モデル混雑中。待機して再試行...');
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                }
            }

            if (!success) {
                setStatusMessage('制限中: 1分待ってください');
                return;
            }

            const res = await response.json();
            const rawText = res.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
            const result = JSON.parse(rawText.match(/\{[\s\S]*\}/)?.[0] || "{}");
            setEnglishPrompt(result.positive || "");
            setNegativePrompt(result.negative || "");
            setStatusMessage('');
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
        } catch (e) {
            setStatusMessage('Error');
        } finally {
            setIsProcessing(false);
        }
    };

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
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block ml-2 italic">Memory Slots (ローカル保存スロット)</span>
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
                                        保存
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

                <div className="h-6 flex items-center justify-center">
                    {statusMessage && (
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black shadow-sm flex items-center gap-3 bg-white text-pink-500`}>
                            {statusMessage.toUpperCase()}
                        </div>
                    )}
                </div>

                <section className={`bg-white rounded-3xl p-5 shadow-sm border border-pink-50 flex gap-4 ${(isAnalyzing || isProcessing) ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div onClick={() => !isAnalyzing && baseInputRef.current?.click()} className="flex-1 aspect-square border-2 border-dashed border-blue-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 relative cursor-pointer">
                        {previews.base ? <img src={previews.base} className="w-full h-full object-cover animate-fade-in" /> : <span className="text-[8px] font-bold text-blue-400">ベース画像</span>}
                        {isAnalyzing === 'base' && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}
                    </div>
                    <div onClick={() => !isAnalyzing && plusInputRef.current?.click()} className="flex-1 aspect-square border-2 border-dashed border-pink-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 relative cursor-pointer">
                        {previews.plus ? <img src={previews.plus} className="w-full h-full object-cover animate-fade-in" /> : <span className="text-[8px] font-bold text-pink-400">プラス画像</span>}
                        {isAnalyzing === 'plus' && <div className="absolute inset-0 bg-white/70 flex items-center justify-center animate-spin"><div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div></div>}
                    </div>
                    <input type="file" ref={baseInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'base')} />
                    <input type="file" ref={plusInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'plus')} />
                </section>

                {/* PLUS画像マージモーダル */}
                {stagedData && (
                    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
                        <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                            <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs flex justify-between items-center italic tracking-widest uppercase">
                                マージ選択
                                <button type="button" onClick={() => setStagedData(null)} className="p-1 hover:bg-white/20 rounded-full transition-colors"><Icon name="x" className="w-4 h-4" /></button>
                            </div>
                            <div className="bg-pink-50 text-[9px] text-pink-600 font-bold p-2 text-center border-b border-pink-100">
                                抽出されたパラメータをグループごとに選択してマージできます
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50 custom-scrollbar">
                                {sections.map((section, idx) => {
                                    const validFields = section.fields.filter(f => stagedData[f] && stagedData[f] !== 'none' && stagedData[f] !== '不明');
                                    if (validFields.length === 0) return null;

                                    const allChecked = validFields.every(f => selectedFields[f]);

                                    return (
                                        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                                            <div className="px-3 py-2 bg-slate-100/50 border-b border-slate-100 flex justify-between items-center">
                                                <button 
                                                    type="button" 
                                                    className="flex items-center gap-2 font-black text-[10px] text-slate-700 flex-1 text-left"
                                                    onClick={() => setMergeOpenSections(prev => ({...prev, [idx]: !prev[idx]}))}
                                                >
                                                    {mergeOpenSections[idx] ? <Icon name="chevronUp" className="w-3 h-3 text-pink-500" /> : <Icon name="chevronDown" className="w-3 h-3 text-slate-400" />}
                                                    {section.title}
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedFields(prev => {
                                                            const next = {...prev};
                                                            const targetState = !allChecked;
                                                            validFields.forEach(f => next[f] = targetState);
                                                            return next;
                                                        });
                                                    }}
                                                    className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-all active:scale-95 ${allChecked ? 'bg-pink-50 text-pink-600 border-pink-200' : 'bg-white text-slate-500 border-slate-200'}`}
                                                >
                                                    {allChecked ? '全解除' : '一括チェック'}
                                                </button>
                                            </div>
                                            {mergeOpenSections[idx] && (
                                                <div className="p-2 space-y-1.5">
                                                    {validFields.map(key => {
                                                        const val = stagedData[key];
                                                        return (
                                                            <div key={key} onClick={() => setSelectedFields(prev => ({ ...prev, [key]: !prev[key] }))} className={`p-2.5 rounded-xl border text-xs flex items-center gap-3 transition-all cursor-pointer active:scale-[0.98] ${selectedFields[key] ? 'bg-pink-50/50 border-pink-400 shadow-sm' : 'bg-white border-slate-100 opacity-60 hover:opacity-100'}`}>
                                                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${selectedFields[key] ? 'bg-pink-500 border-pink-500 text-white' : 'bg-white border-slate-300'}`}>
                                                                    {selectedFields[key] && <Icon name="check" className="w-3 h-3" />}
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <span className="text-[7px] text-slate-400 block uppercase font-black tracking-tighter">{LABEL_MAP[key]}</span>
                                                                    <p className="font-bold truncate text-slate-800 text-[10px]">{String(val)}</p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-4 bg-white border-t flex gap-2">
                                <button type="button" onClick={() => setStagedData(null)} className="flex-1 py-3 text-slate-400 font-bold text-xs uppercase tracking-tight active:scale-95 transition-transform bg-slate-100 rounded-xl hover:bg-slate-200">キャンセル</button>
                                <button type="button" onClick={() => {
                                    setSelections(prev => {
                                        const next = { ...prev };
                                        Object.keys(selectedFields).forEach(key => { if (selectedFields[key]) next[key] = String(stagedData[key]); });
                                        return next;
                                    });
                                    setStagedData(null);
                                }} className="flex-[2] bg-slate-900 text-white py-3 rounded-xl font-bold text-xs tracking-widest italic uppercase shadow-lg shadow-slate-900/20 active:scale-95 transition-transform hover:bg-pink-600">マージ実行</button>
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
                                        <span className="text-[10px] font-black text-slate-600 uppercase">{idx + 1}. {section.title}</span>
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
                                        {idx === 1 && (
                                            <div className="col-span-2 mb-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                                <div className="flex gap-1 text-[10px] font-bold">
                                                    <button type="button" onClick={() => setExpressionMode('standard')} className={`flex-1 py-2 rounded-xl transition-all ${expressionMode === 'standard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>STANDARD 表情 🎭</button>
                                                    <button type="button" onClick={() => setExpressionMode('facs')} className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${expressionMode === 'facs' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400'}`}><Icon name="brain" className="w-3 h-3"/> FACS 強度指定 🧠</button>
                                                </div>
                                            </div>
                                        )}

                                        {section.fields.map((id) => {
                                            const hasVal = selections[id] && selections[id].trim() !== '';
                                            const suggestions = FIELD_SUGGESTIONS[id] || [];
                                            
                                            const isFACSMode = expressionMode === 'facs';
                                            let disabledOpacity = '';
                                            if (id === 'expression' && isFACSMode) disabledOpacity = 'opacity-30 pointer-events-none grayscale';
                                            if (id === 'facs' && !isFACSMode) disabledOpacity = 'opacity-30 pointer-events-none grayscale';

                                            return (
                                                <div key={id} className={`${id === 'additionalNotes' || id === 'outfitDetail' || id === 'situation' || id === 'bodyInterface' || id === 'aesthetic' ? 'col-span-2' : ''} ${disabledOpacity} transition-all duration-300`}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <label className="text-[7px] font-black text-slate-400 uppercase">{LABEL_MAP[id] || id}</label>
                                                        <div className="flex items-center gap-1.5">
                                                            <button type="button" onClick={() => startFocusEdit(id)} className="text-pink-500 bg-pink-50 p-1 rounded text-[8px] font-bold"><Icon name="zoom" /> ズーム</button>
                                                            {hasVal && (
                                                                <div className="flex gap-1 animate-fade-in">
                                                                    <button type="button" onClick={() => copySingleField(id)} className="text-[8px] text-slate-400">コピー</button>
                                                                    <button type="button" onClick={() => clearSingleField(id)} className="text-[8px] text-red-400">✕</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {id === 'facs' && isFACSMode && (
                                                        <div className="mb-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                                            <span className="text-[7px] text-slate-400 font-bold block mb-1">FACSパッチ:</span>
                                                            <div className="flex flex-wrap gap-1">
                                                                {FACS_PRESETS.map((preset, pIdx) => (
                                                                    <button key={pIdx} type="button" onClick={() => applySuggestion(id, preset.code)} className="bg-white hover:bg-slate-900 hover:text-white border border-slate-200 text-[8px] font-bold px-1.5 py-0.5 rounded transition-all active:scale-95 text-slate-600" title={preset.desc}>{preset.label}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {id === 'aesthetic' ? (
                                                        <div className="flex gap-3 justify-center px-1">
                                                            <button type="button" onClick={() => setSelections(p => ({ ...p, aesthetic: p.aesthetic === 'cute' ? '' : 'cute' }))} className={`flex-1 py-3 rounded-full border text-[10px] font-black transition-all ${selections.aesthetic === 'cute' ? 'bg-pink-400 text-white border-pink-400 shadow-md scale-[1.02]' : 'bg-white text-slate-400 border-slate-100 hover:border-pink-200'}`}>かわいい系 💕</button>
                                                            <button type="button" onClick={() => setSelections(p => ({ ...p, aesthetic: p.aesthetic === 'beautiful' ? '' : 'beautiful' }))} className={`flex-1 py-3 rounded-full border text-[10px] font-black transition-all ${selections.aesthetic === 'beautiful' ? 'bg-purple-500 text-white border-purple-500 shadow-md scale-[1.02]' : 'bg-white text-slate-400 border-slate-100 hover:border-pink-200'}`}>美人/きれい系 🔮</button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <textarea rows="2" className={`w-full p-2.5 border rounded-xl bg-slate-50 text-xs font-bold focus:bg-white focus:outline-none focus:border-pink-200 transition-colors resize-none ${hasVal ? 'text-pink-700' : ''}`} value={selections[id] || ''} onChange={(e) => setSelections(p=>({...p, [id]: e.target.value}))} />
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
                                                        </>
                                                    )}
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
                        <div className="grid grid-cols-2 gap-2">
                            {[{ label: '縦長 (Portrait)', value: 'portrait' }, { label: '横長 (Landscape)', value: 'landscape' }].map((o) => (
                                <button key={o.value} type="button" onClick={() => handleOrientationChange(o.value)} className={`p-3 rounded-2xl border-2 transition-all ${selections.orientation === o.value ? 'bg-pink-50 border-pink-400 text-pink-600 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-pink-200'}`}>{o.label}</button>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {['1:1', '3:4', '9:16', '54:86'].map((r) => (
                                <button key={r} type="button" onClick={() => setSelections(p=>({...p, ratio: r}))} className={`p-3 rounded-2xl border-2 transition-all ${selections.ratio === r ? 'bg-pink-50 border-pink-400 text-pink-600 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-pink-200'}`}>{r === '54:86' ? 'チェキ' : r}</button>
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

            {/* ズームエディタ */}
            {focusField && (
                <div className="fixed inset-0 bg-slate-950/95 z-[1000] flex flex-col justify-between p-4 animate-fade-in">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
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
                        <textarea ref={focusTextAreaRef} value={focusTempText} onChange={(e) => setFocusTempText(e.target.value)} className="w-full h-full bg-transparent text-white text-sm focus:outline-none resize-none custom-scrollbar font-bold leading-relaxed" placeholder="詳細を入力するか、下のサジェストチップを選択してください..." />
                        
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