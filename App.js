// App.js
const { useState, useEffect, useRef, useMemo } = React;

const Icon = ({ name, className = "" }) => {
    const svgs = {
        sparkles: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
        refresh: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>,
        undo: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 7V5c0-1.1.9-2 2-2h2"/><path d="M17 3h2c1.1 0 2 .9 2 2v2"/><path d="M21 17v2c0 1.1-.9 2-2 2h-2"/><path d="M7 21H5c-1.1 0-2-.9-2-2v-2"/><path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"/><path d="M12 16v2"/><path d="M12 8V6"/><path d="M8 12H6"/><path d="M18 12h-2"/></svg>,
        target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
        plus: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
        save: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
        zap: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
        brain: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/></svg>,
        info: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
        x: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
        check: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
    };
    return svgs[name] || null;
};

function App() {
    const createEmptyState = () => {
        const obj = { orientation: 'portrait', ratio: '9:16' };
        FIELD_KEYS.forEach(k => obj[k] = '');
        return obj;
    };

    const [selections, setSelections] = useState(createEmptyState);
    const [stagedData, setStagedData] = useState(null);
    const [selectedFields, setSelectedFields] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(null);
    const [expressionMode, setExpressionMode] = useState('standard');
    const [englishPrompt, setEnglishPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [copyFeedback, setCopyFeedback] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [previews, setPreviews] = useState({ base: null, plus: null });
    
    // v1.6.1: 10スロット対応
    const [memorySlots, setMemorySlots] = useState(Array(10).fill(null));

    const baseInputRef = useRef(null);
    const plusInputRef = useRef(null);
    const resultRef = useRef(null);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('idol_designer_slots');
            if (saved) setMemorySlots(JSON.parse(saved));
        } catch (e) { console.error("Restore failed:", e); }
    }, []);

    // v1.6.3: [object Object]バグを防止する平滑化関数
    const safeStringifyValue = (val) => {
        if (typeof val === 'string') return val;
        if (Array.isArray(val)) return val.join('、');
        if (typeof val === 'object' && val !== null) {
            return Object.entries(val).map(([k, v]) => `${k}：${v}`).join('、');
        }
        return String(val);
    };

    const applyPreset = (type) => {
        setSelections(prev => {
            const next = { ...prev };
            if (type === 'cheki') {
                next.ratio = '54:86';
                next.artStyle = 'Lo-fi analog instant camera film, highly grainy texture, harsh camera-mounted direct flash, heavy contrast shadows';
            } else if (type === 'camera') {
                next.ratio = '9:16';
                next.artStyle = 'SNS風、スマホ撮影スナップ';
            } else if (type === 'realistic') {
                next.ratio = '9:16';
                next.artStyle = 'Realistic, high fidelity photo';
            } else if (type === 'cute') {
                next.artStyle = next.artStyle ? next.artStyle + ', cute, charming' : 'cute, charming';
            } else if (type === 'beautiful') {
                next.artStyle = next.artStyle ? next.artStyle + ', beautiful, elegant' : 'beautiful, elegant';
            }
            return next;
        });
    };

    // v1.6.1: 超・容量軽量化 (サムネイル80px, 画質0.3)
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
                const b64Preview = canvas.toDataURL('image/jpeg', 0.3);
                
                URL.revokeObjectURL(url);
                resolve({ b64, pUrl: URL.createObjectURL(file), b64Preview });
            };
            img.src = url;
        });
    };

    // v1.5.6: 429エラーを自動突破するリトライ機能
    const fetchWithRetry = async (url, options, maxRetries = 5) => {
        let delay = 1000;
        for (let i = 0; i < maxRetries; i++) {
            const res = await fetch(url, options);
            if (res.status === 429) {
                setStatusMessage(`再試行中 (${i + 1}/${maxRetries})...`);
                await new Promise(r => setTimeout(r, delay));
                delay *= 2;
                continue;
            }
            return res;
        }
        throw new Error("Too Many Requests");
    };

    const handleUpload = async (e, mode) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsAnalyzing(mode);
        setStatusMessage('分析中');
        try {
            const { b64, pUrl, b64Preview } = await safeProcessImage(file);
            setPreviews(prev => ({ ...prev, [mode]: pUrl, [`${mode}Stored`]: b64Preview }));
            await runAnalysis(b64, mode);
        } catch (err) {
            setStatusMessage('Error: ' + err.message);
            setIsAnalyzing(null);
        } finally { e.target.value = ''; }
    };

    const runAnalysis = async (base64, mode) => {
        try {
            // v1.6.2: 最適化された安定版APIとスリム化されたプロンプト
            const auditPrompt = `画像分析: FACS(AU/AD厳密区別)、物理境界(食い込み・すき間・紐の幅)、配置重心、地域背景(region)を抽出。日本語JSONのみで出力。ネスト厳禁。キー: [${FIELD_KEYS.join(', ')}]`;
            const response = await fetchWithRetry(`${proxyBaseUrl}/v1/models/gemini-2.5-flash:generateContent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: auditPrompt }, { inlineData: { mimeType: "image/jpeg", data: base64 } }] }],
                    generationConfig: { response_mime_type: "application/json", temperature: 0 }
                }),
            });
            if (!response.ok) throw new Error("HTTP " + response.status);
            const res = await response.json();
            const rawText = res.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
const result = JSON.parse(rawText.match(/\{[\s\S]*\}/)?.[0] || "{}");

            if (mode === 'base') {
                setSelections(prev => {
                    const next = createEmptyState();
                    next.orientation = prev.orientation;
                    next.ratio = prev.ratio;
                    FIELD_KEYS.forEach(k => { 
                        if(result[k] && result[k] !== 'none') next[k] = safeStringifyValue(result[k]); 
                    });
                    return next;
                });
            } else {
                setStagedData(result);
                setSelectedFields(Object.keys(result).reduce((a, k) => ({ ...a, [k]: result[k] !== 'none' }), {}));
            }
            setStatusMessage('');
        } catch (e) { setStatusMessage('解析失敗: ' + e.message); } 
        finally { setIsAnalyzing(null); }
    };

    const saveToSlot = (index) => {
        const newSlots = [...memorySlots];
        const currentPreview = previews.baseStored || previews.plusStored || (memorySlots[index] ? memorySlots[index].preview : null);
        newSlots[index] = {
            data: { ...selections },
            preview: currentPreview
        };
        setMemorySlots(newSlots);
        localStorage.setItem('idol_designer_slots', JSON.stringify(newSlots));
        setStatusMessage(`Slot ${index + 1} Saved`);
        setTimeout(() => setStatusMessage(''), 2000);
    };

    const loadFromSlot = (index) => {
        const slot = memorySlots[index];
        if (!slot) return;
        setSelections(slot.data);
        if (slot.preview) {
            setPreviews(prev => ({ ...prev, base: slot.preview, baseStored: slot.preview }));
        }
        setStatusMessage(`Slot ${index + 1} Loaded`);
        setTimeout(() => setStatusMessage(''), 2000);
    };

    const generatePrompt = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setStatusMessage('生成中');
        try {
            const arTag = selections.ratio === '1:1' ? "--ar 1:1" : (selections.orientation === 'portrait' ? `--ar ${selections.ratio.split(':')}:${selections.ratio.split(':')[1]}` : `--ar ${selections.ratio.split(':')[1]}:${selections.ratio.split(':')}`);
            const activeData = { ...selections };
            if (expressionMode === 'facs') activeData.expression = ""; else activeData.facs = "";

            const activeText = Object.entries(activeData)
                .filter(([k, v]) => v && v !== '' && !['orientation', 'ratio'].includes(k))
                .map(([k, v]) => `${LABEL_MAP[k] || k}: ${v}`).join('\n');

            // v1.6.4: チェキ風フレーム動的ルーター
            const frameInst = selections.ratio === '54:86' ? (selections.orientation === 'portrait' ? "thick white border on the BOTTOM side" : "thick white border on the RIGHT side") : "";

            const response = await fetchWithRetry(`${proxyBaseUrl}/v1/models/gemini-2.5-flash:generateContent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `以下のデータから最高峰の画像生成プロンプトを作成し、JSON {"positive": "...", "negative": "..."} で出力。肉感、FACS(AU/AD)、地域背景を反映。${frameInst}\n\nデータ:\n${activeText}` }] }],
                    system_instruction: { parts: [{ text: "実写・高画質。lounge, athletic activewear使用禁止。CG, character, virtual, imaginary person等禁止。非実在の明記(non-existent person等)必須。衣装の形状改変厳禁(sleek stretch-nylon等活用)。JSON形式。" }] },
                    generationConfig: { response_mime_type: "application/json", temperature: 0.1 }
                }),
            });
            if (!response.ok) throw new Error("HTTP " + response.status);
            const res = await response.json();
            const result = JSON.parse(res.candidates?.?.content?.parts?.?.text.match(/\{[\s\S]*\}/)?. || "{}");
            
            setEnglishPrompt(result.positive || "");
            setNegativePrompt(result.negative || "");
            setStatusMessage('');
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
        } catch (e) { setStatusMessage('Error: ' + e.message); } 
        finally { setIsProcessing(false); }
    };

    const copyText = (text, type) => {
        const el = document.createElement("textarea");
        el.value = text; document.body.appendChild(el);
        el.select(); document.execCommand('copy');
        if(el.parentNode) el.parentNode.removeChild(el);
        setCopyFeedback(type);
        setTimeout(() => setCopyFeedback(null), 2000);
    };

    // v1.5.0: 一括コピー機能
    const copyBoth = () => {
        const text = `【Positive Prompt】\n${englishPrompt}\n\n【Negative Prompt】\n${negativePrompt}`;
        copyText(text, 'both');
    };

    const sections = useMemo(() => [
        { title: "髪のデザイン", fields: ['hairStyle', 'hairBangs', 'hairColor', 'hairAccessory', 'hairTexture'] },
        { title: "顔・表情の精密描写", fields: ['faceOutline', 'facePlacement', 'eyeShape', 'eyeColor', 'eyelidType', 'tearBags', 'eyelashes', 'eyeSparkle', 'eyebrowShape', 'noseShape', 'mouthShape', 'lipTexture', 'teeth', 'cheekStyle', 'expression', 'facs'] },
        { title: "身体・肌・詳細", fields: ['skinColor', 'skinTexture', 'bodyInterface', 'molesFreckles', 'makeupStyle', 'age', 'height', 'bodyType', 'bodyFrame', 'threeSizes', 'region'] },
        { title: "衣装・演出", fields: ['outfit', 'outfitDetail', 'pose', 'situation', 'lighting', 'artStyle', 'cameraAngle', 'additionalNotes'] }
    ], []);

    return (
        <div className={`min-h-[100dvh] bg-[#FFF8FA] text-slate-800 font-sans pb-40 overflow-x-hidden animate-fade-in ${(isProcessing || isAnalyzing) ? 'pointer-events-none opacity-80' : ''}`}>
            <header className="bg-white/90 border-b border-pink-100 p-4 sticky top-0 z-50 backdrop-blur-md flex justify-between items-center shadow-sm">
                <div className="flex flex-col">
                    <h1 className="font-bold text-base text-pink-600 italic flex items-center gap-2 tracking-tight">
                        <Icon name="sparkles" /> IDOL Designer
                    </h1>
                    <span className="text-[8px] font-black text-slate-300 ml-7 tracking-widest uppercase">Version 1.6.4 Stable Sync</span>
                </div>
                <button onClick={() => window.location.reload()} className="p-2 text-slate-300 active:rotate-180 transition-all duration-500"><Icon name="refresh" /></button>
            </header>

            <main className="max-w-xl mx-auto px-4 mt-4 space-y-6">
                <section className="space-y-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block ml-2">Memory Slots (Local Sync)</span>
                    <div className="grid grid-cols-5 gap-2">
                        {memorySlots.map((slot, i) => (
                            <div key={i} className="space-y-1">
                                <button 
                                    onClick={() => slot ? loadFromSlot(i) : saveToSlot(i)}
                                    className={`w-full aspect-square rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all relative ${slot ? 'border-pink-400 bg-white shadow-sm' : 'border-slate-200 bg-slate-50/50'}`}
                                >
                                    {slot ? (
                                        <>
                                            <img src={slot.preview} className="w-full h-full object-cover opacity-70" alt="" />
                                            <div className="absolute inset-0 flex items-center justify-center font-black text-[9px] text-pink-600 bg-white/20">{i+1}</div>
                                        </>
                                    ) : (
                                        <span className="text-[10px] text-slate-300 font-bold uppercase">{i+1}</span>
                                    )}
                                </button>
                                {slot && (
                                    <button onClick={() => saveToSlot(i)} className="w-full py-1 text-[6px] font-black bg-white text-pink-500 rounded border border-pink-100 uppercase active:scale-95">SAVE</button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl space-y-1.5 shadow-sm text-[9px]">
                     <div className="flex items-start gap-2">
                         <Icon name="info" className="text-blue-500 w-4 h-4 mt-0.5 shrink-0" />
                         <p className="text-blue-700 font-bold leading-relaxed italic">【FICTION】生成内容はすべて架空の創作物であり、実在の人物とは一切関係ありません。</p>
                     </div>
                     <p className="text-blue-600 font-bold leading-relaxed pl-6 opacity-80">※画像は要素の抽出のみに使用され、保存されません。</p>
                </div>

                <div className="h-6 flex items-center justify-center">
                    {statusMessage && (
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black shadow-sm flex items-center gap-3 ${statusMessage.startsWith('Error') || statusMessage.startsWith('解析失敗') ? 'bg-red-50 text-red-500' : 'bg-white text-pink-500'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full animate-ping ${statusMessage.startsWith('Error') || statusMessage.startsWith('解析失敗') ? 'bg-red-400' : 'bg-pink-400'}`}></div>
                            {statusMessage.toUpperCase()}
                        </div>
                    )}
                </div>

                <section className="bg-white rounded-3xl p-5 shadow-sm border border-pink-50 flex gap-4">
                    <div onClick={() => baseInputRef.current?.click()} className="flex-1 aspect-square border-2 border-dashed border-blue-100 rounded-2xl flex items-center justify-center bg-slate-50/50 relative active:scale-95 transition-all overflow-hidden shadow-inner cursor-pointer">
                        {previews.base ? <img src={previews.base} className="w-full h-full object-cover" alt="base" /> : <Icon name="target" className="text-blue-200" />}
                        {isAnalyzing === 'base' && <div className="absolute inset-0 bg-white/70 flex items-center justify-center animate-spin"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div></div>}
                    </div>
                    <div onClick={() => plusInputRef.current?.click()} className="flex-1 aspect-square border-2 border-dashed border-pink-100 rounded-2xl flex items-center justify-center bg-slate-50/50 relative active:scale-95 transition-all overflow-hidden shadow-inner cursor-pointer">
                        {previews.plus ? <img src={previews.plus} className="w-full h-full object-cover" alt="plus" /> : <Icon name="plus" className="text-pink-200" />}
                        {isAnalyzing === 'plus' && <div className="absolute inset-0 bg-white/70 flex items-center justify-center animate-spin"><div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full"></div></div>}
                    </div>
                    <input type="file" ref={baseInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'base')} />
                    <input type="file" ref={plusInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'plus')} />
                </section>

                {stagedData && (
                    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[2] flex items-center justify-center p-4">
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
                            <div className="p-4 bg-white border-t flex gap-2">
                                <button onClick={() => setStagedData(null)} className="flex-1 py-3 text-slate-400 font-bold text-xs uppercase tracking-tight">CANCEL</button>
                                <button onClick={() => {
                                    setSelections(prev => {
                                        const next = { ...prev };
                                        Object.keys(selectedFields).forEach(key => { if (selectedFields[key]) next[key] = String(stagedData[key]); });
                                        return next;
                                    });
                                    setStagedData(null);
                                }} className="flex-[3] bg-slate-900 text-white py-3 rounded-xl font-bold text-xs tracking-widest italic uppercase">Merge Items</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-pink-50 space-y-10">
                    {sections.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 border-l-2 border-pink-200 pl-3">{section.title}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {section.fields.map((id) => (
                                    <div key={id} className={(id === 'additionalNotes' || id === 'outfitDetail' || id === 'situation' || id === 'facePlacement' || id === 'bodyInterface' || id === 'facs' || id === 'region') ? 'col-span-2' : ''}>
                                        <label className="text-[7px] font-black text-slate-300 uppercase ml-1">{LABEL_MAP[id]}</label>
                                        <input type="text" className={`w-full p-3 border-none rounded-xl text-xs font-bold shadow-inner ${selections[id] ? 'bg-pink-50/50 text-pink-700' : 'bg-slate-50 focus:bg-white'} transition-all`} value={selections[id] || ''} onChange={(e) => setSelections(p=>({...p, [id]: e.target.value}))} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-pink-50 space-y-8 text-center text-[10px] font-black">
                    <div className="space-y-3 px-4">
                        <span className="text-pink-400 uppercase tracking-[0.2em] block">Style Presets</span>
                        <div className="flex gap-2 overflow-x-auto pb-1 justify-center no-scrollbar">
                            <button onClick={() => applyPreset('cheki')} className={`shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border transition-all ${selections.ratio === '54:86' ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-white text-slate-400 border-slate-100'}`}>チェキ風</button>
                            <button onClick={() => applyPreset('camera')} className={`shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border transition-all ${selections.artStyle.includes('SNS') ? 'bg-blue-500 text-white border-blue-500 shadow-md' : 'bg-white text-slate-400 border-slate-100'}`}>スマホ風</button>
                            <button onClick={() => applyPreset('realistic')} className={`shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border transition-all ${selections.artStyle.includes('Realistic') ? 'bg-slate-800 text-white border-slate-800 shadow-lg' : 'bg-white text-slate-400 border-slate-100'}`}>実写風</button>
                            <button onClick={() => applyPreset('cute')} className="shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border transition-all bg-white text-pink-400 border-pink-100 active:bg-pink-50">かわいい</button>
                            <button onClick={() => applyPreset('beautiful')} className="shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border transition-all bg-white text-blue-400 border-blue-100 active:bg-blue-50">キレイ</button>
                        </div>
                    </div>

                    <div className="space-y-4 px-4">
                        <span className="text-pink-400 uppercase tracking-[0.2em] block">Expression Mode</span>
                        <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
                            <button onClick={() => setExpressionMode('standard')} className={`flex-1 py-3 rounded-xl transition-all ${expressionMode === 'standard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>STANDARD</button>
                            <button onClick={() => setExpressionMode('facs')} className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${expressionMode === 'facs' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}><Icon name="brain" className="w-3 h-3" /> FACS MODE</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-pink-50">
                    <button onClick={generatePrompt} disabled={isProcessing} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-sm shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 italic tracking-widest uppercase">
                        {isProcessing ? 'プロンプト生成中...' : <><Icon name="zap" /> プロンプトを出力</>}
                    </button>
                    <p className="text-[7px] text-slate-400 text-center font-bold px-8 leading-relaxed opacity-60 uppercase tracking-tighter italic">
                        AI Character Production. Result is not a real individual.
                    </p>
                </div>

                <div ref={resultRef} className="pb-40 space-y-6 px-1">
                    {englishPrompt && (
                        <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-4">
                            <button onClick={copyBoth} className="w-full bg-blue-500 text-white py-4 rounded-2xl font-black text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 tracking-widest">
                                両方をコピー (COPY BOTH)
                            </button>
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse"></div>
                                <div className="flex justify-between items-center mb-6 text-pink-400 text-[10px] font-black uppercase tracking-[0.3em]">
                                    <span>Master Prompt</span>
                                    <button onClick={() => copyText(englishPrompt, 'pos')} className={`text-white text-[9px] font-black px-4 py-2 rounded-xl transition-all shadow-lg ${copyFeedback === 'pos' ? 'bg-green-500' : 'bg-slate-700'}`}>
                                        {copyFeedback === 'pos' ? 'COPIED!' : 'COPY'}
                                    </button>
                                </div>
                                <p className="text-pink-100/90 font-mono text-[10px] leading-relaxed italic select-all p-1">{englishPrompt}</p>
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-4 text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">
                                    <span>Negative</span>
                                    <button onClick={() => copyText(negativePrompt, 'neg')} className={`text-slate-400 text-[9px] font-black px-4 py-2 rounded-xl ${copyFeedback === 'neg' ? 'bg-green-500 text-white' : 'bg-slate-50'}`}>{copyFeedback === 'neg' ? 'DONE' : 'COPY'}</button>
                                </div>
                                <p className="text-slate-400 font-mono text-[9px] leading-relaxed italic select-all p-1">{negativePrompt}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {copyFeedback && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl text-[10px] font-black z-[4] border border-slate-700 animate-in fade-in slide-in-from-bottom-4 tracking-widest uppercase">Copied</div>}
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);