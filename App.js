const runAnalysis = async (base64, mode) => {
        let delay = 1000;
        let response;
        let success = false;
        
        const keyListString = FIELD_KEYS.join(', ');

        const analysisSystemInstruction = `あなたは世界最高峰のキャラクターデザイナー兼身体物理監査官です。
与えられた画像をミリ単位で超精密にスキャンし、指定されたすべての項目について分析結果を出力してください。

【出力の絶対ルール（対応関係ロック）】
1. 回答は純粋なJSONオブジェクトのみとし、解説やMarkdownの装飾（\`\`\`json等）は一切含めないこと。
2. JSONの「キー名（Key）」は、下部に指定された【対象フィールドキーリスト】の文字列と1文字も違わぬ同一の英語キー名を使用すること。大文字小文字、スペルミスは厳禁とする。
3. データ形式の平滑化：すべてのキーに対する値（Value）は、ネストさせず、必ずプレーンな「1つの文字列（String）」としてフラットに出力すること。オブジェクト「{}」や配列「[]」を値に含めることは絶対厳禁とする。
4. 画像から読み取れない項目、あるいは該当しない項目がある場合も、勝手に項目自体を削除せず、値を ""（空文字）または "なし" として、必ず指定されたすべてのキーを漏れなく出力すること。

【重要監査項目】
- height：モデルの骨格や背景の対比から推測される「身長の印象（例: 小柄で150cm前半の印象、高身長でスタイリッシュなバランス、等）」を日本語のプレーンテキストで詳細に記述せよ。
- threeSizes：胸の厚み、ウエストのくびれ、ヒップラインの肉付きから推測される「肉付きの質感や体格バランス（例: 砂時計型のメリハリボディ、豊かなバストと細いウエストのコントラスト、スレンダーで引き締まった肉付き、等）」を日本語のプレーンテキストで刻明に記述せよ。数値の出力は禁止する。
- facePlacement：顔全体の画像内位置ではなく、輪郭領域内における目・鼻・口・眉の間隔や配置比率（中顔面の長さ、求心・遠心顔、ベビーフェイス配置等）を正確な日本語で記述。
- bodyInterface：衣装の端やストラップと肌の接点を精密監査し、食い込み、盛り上がり、あるいは衣装と肌のすき間（緩み）を詳細に言語化。
- molesFreckles：ホクロ、そばかす、あるいは特筆すべき肌の特徴や着崩し位置の境界線を記述。
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
                        contents: [{ 
                            parts: [
                                { text: "添付された画像キャラクターのビジュアル要素を精密にスキャンし、指示されたフィールドキーリストに対応するJSONを出力してください。" },
                                { inlineData: { mimeType: "image/jpeg", data: base64 } }
                            ] 
                        }],
                        systemInstruction: { parts: [{ text: analysisSystemInstruction }] },
                        safetySettings,
                        generationConfig: { 
                            responseMimeType: "application/json"
                        }
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
                console.error("API Error Attempt " + attempt, err);
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
                
                // Markdownの ```json などを取り除く正規表現パッチを強化
                const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                const cleanJsonText = jsonMatch ? jsonMatch[0] : rawText;
                const result = JSON.parse(cleanJsonText);

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
                console.error("JSON Parse Error", e);
                setStatusMessage('解析失敗');
            } finally {
                setTimeout(() => setIsAnalyzing(null), 1000);
            }
        }
    };