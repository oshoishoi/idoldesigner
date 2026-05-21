// config.js
window.isPreview = typeof __app_id !== 'undefined';
window.apiKey = ""; 
window.proxyBaseUrl = "https://idol-designer-proxy.gris-aile.workers.dev"; 

window.getApiUrl = (endpoint) => {
    const model = "gemini-2.5-flash";
    if (window.isPreview) {
        return `https://generativelanguage.googleapis.com/v1beta/models/${model}:${endpoint}?key=${window.apiKey}`;
    }
    return `${window.proxyBaseUrl}/v1beta/models/${model}:${endpoint}`;
};

// 共通セーフティ設定
window.safetySettings = [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
];

// ⚠️ 精度を100%復元する元の完全なフィールドキー定義
window.FIELD_KEYS = [
    'hairStyle', 'hairBangs', 'hairColor', 'hairAccessory', 'hairTexture',
    'faceOutline', 'facePlacement', 
    'eyeShape', 'eyeSymmetry', 'irisRatio', 'eyeCorners', 'eyeColor', 'eyelidType', 'tearBags', 'eyelashes', 'eyeSparkle', 'eyeMakeupDetail', 'eyebrowShape',
    'noseShape', 'mouthShape', 'lipTexture', 'teeth', 'cheekStyle', 'expression', 'facs',
    'skinColor', 'skinTexture', 'bodyInterface', 'molesFreckles', 'makeupStyle',
    'age', 'height', 'bodyType', 'bodyFrame', 'threeSizes',
    'outfit', 'outfitDetail', 'pose',
    'situation', 'lighting', 'artStyle', 'cameraAngle',
    'region', 'aesthetic', 'additionalNotes'
];

window.LABEL_MAP = {
    hairStyle: '髪型', hairBangs: '前髪', hairColor: '髪色', hairAccessory: '飾り', hairTexture: '髪質',
    faceOutline: '輪郭', facePlacement: '顔のパーツ配置比率', 
    eyeShape: '目の形', eyeSymmetry: '目の対称性', irisRatio: '黒目の比率', eyeCorners: '目頭・目尻', 
    eyeColor: '瞳色', eyelidType: 'まぶた', tearBags: '涙袋', eyelashes: 'まつ毛', eyeSparkle: '瞳の輝き', 
    eyeMakeupDetail: 'アイメイク詳細', eyebrowShape: '眉の形',
    noseShape: '鼻の形', mouthShape: '口の形', lipTexture: '唇の質感', teeth: '歯の印象', cheekStyle: 'ほっぺ',
    expression: '表情', facs: 'FACS (動作符号/強度)',
    skinColor: '肌の色', skinTexture: '肌質', molesFreckles: '特徴', makeupStyle: '全体メイク',
    age: '年齢感', height: '身長', bodyType: '体型', bodyFrame: '骨格', threeSizes: '肉付き', 
    bodyInterface: 'その他(すき間等)',
    outfit: '衣装', outfitDetail: '衣装詳細', pose: 'ポーズ',
    situation: '状況', lighting: '光演出', artStyle: '画風', cameraAngle: 'アングル',
    region: '地域・文化的背景',
    aesthetic: '印象補正',
    additionalNotes: '追記'
};