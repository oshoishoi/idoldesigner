// ... existing code ...
    const generatePrompt = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setStatusMessage('生成中...');
        
        let delay = 1000;
        let response;
        let success = false;

        try {
            const arTag = selections.ratio === '1:1' ? "--ar 1:1" : (selections.orientation === 'portrait' ? `--ar ${selections.ratio.split(':')[0]}:${selections.ratio.split(':')[1]}` : `--ar ${selections.ratio.split(':')[1]}:${selections.ratio.split(':')[0]}`);
            
            // 表現モードの切り替え
            const activeData = { ...selections };
            if (expressionMode === 'facs') activeData.expression = ""; else activeData.facs = "";

            // ★超重要：生成AIに渡すデータの「優先順位（並び順）」を定義
            // これにより、AIが最初に構図やポーズを理解し、「顔の呪縛」から解放されます。
            const PRIORITY_ORDER = [
                'artStyle', 'cameraAngle', 'pose', 'situation', 'lighting', // 1. 全体の構図・環境（最優先）
                'age', 'height', 'bodyType', 'bodyFrame', 'threeSizes', // 2. 全体の体型・シルエット
                'skinColor', 'skinTexture', 'bodyInterface', // 3. 肌と肉の質感
                'outfit', 'outfitDetail', 'hairAccessory', // 4. 衣装・装飾
                'hairStyle', 'hairBangs', 'hairColor', 'hairTexture', // 5. 髪型
                'region', 'aesthetic', 'additionalNotes', // 6. 補足情報
                // 7. 顔のディテール（最後尾に下げることで構図破壊を防ぐ）
                'faceOutline', 'facePlacement', 'eyeShape', 'eyeSymmetry', 'irisRatio', 'eyeCorners', 'eyeColor', 'eyelidType', 'tearBags', 'eyelashes', 'eyeSparkle', 'eyeMakeupDetail', 'eyebrowShape', 'noseShape', 'mouthShape', 'lipTexture', 'teeth', 'cheekStyle', 'molesFreckles', 'makeupStyle', 'expression', 'facs'
            ];

            // 優先順位リストに従ってアクティブなデータをソート・結合
            const activeText = PRIORITY_ORDER
                .map(key => {
                    const value = activeData[key];
                    if (value && value !== '' && !['orientation', 'ratio'].includes(key)) {
                        return `${LABEL_MAP[key] || key}: ${value}`;
                    }
                    return null;
                })
                .filter(Boolean)
                .join('\n');

            const outfitText = ((selections.outfit || "") + " " + (selections.outfitDetail || "")).toLowerCase();
            let routeSpecificInstruction = "";
// ... existing code ...