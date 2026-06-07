// config.js
window.isPreview = typeof __app_id !== 'undefined';
window.apiKey = ""; // 本番テスト時やCanvasランタイムでは空文字のままで動作します
window.proxyBaseUrl = "https://idol-designer-proxy.gris-aile.workers.dev"; 

window.getApiUrl = (endpoint, modelOverride) => {
    // 優先フォールバックで指定されたモデルを使用、指定がなければデフォルト(3.5)を適用
    const model = modelOverride || "gemini-3.5-flash";
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

// 44項目定義
window.FIELD_KEYS = [
    'hairStyle', 'hairBangs', 'hairColor', 'hairTexture', 
    'faceOutline', 'facePlacement', 
    'eyeShape', 'eyeSymmetry', 'irisRatio', 'eyeCorners', 'eyeColor', 'eyelidType', 'tearBags', 'eyelashes', 'eyeSparkle', 'eyeMakeupDetail', 'eyebrowShape',
    'noseShape', 'mouthShape', 'lipTexture', 'teeth', 'cheekStyle', 'expression', 'facs', 'makeupStyle',
    'skinColor', 'skinTexture', 'molesFreckles', 
    'age', 'height', 'bodyType', 'bodyFrame', 'threeSizes',
    'hairAccessory', 
    'outfit', 'outfitDetail', 'bodyInterface', 'pose', 
    'situation', 'lighting', 'artStyle', 'cameraAngle',
    'aesthetic', 'additionalNotes'
];

// ラベルマッピング定義
window.LABEL_MAP = {
    hairStyle: '髪型', hairBangs: '前髪', hairColor: '髪色', hairAccessory: 'ヘアアクセ', hairTexture: '髪質',
    faceOutline: '輪郭', facePlacement: '顔のパーツ配置比率', 
    eyeShape: '目の形', eyeSymmetry: '目の対称性', irisRatio: '黒目の比率', eyeCorners: '目頭・目尻', 
    eyeColor: '瞳色', eyelidType: 'まぶた', tearBags: '涙袋', eyelashes: 'まつ毛', eyeSparkle: '瞳の輝き', 
    eyeMakeupDetail: 'アイメイク詳細', eyebrowShape: '眉の形', noseShape: '鼻の形', mouthShape: '口の形', 
    lipTexture: '唇の質感', teeth: '歯', cheekStyle: 'ほっぺ', expression: '表情', facs: 'FACS (動作符号/強度)',
    makeupStyle: '全体メイク', skinColor: '肌の色', skinTexture: '肌質', bodyInterface: 'その他(すき間等)', 
    molesFreckles: '特徴', age: '年齢感', height: '身長', bodyType: '体型', bodyFrame: '骨格', threeSizes: '肉付き', 
    outfit: '衣装', outfitDetail: '衣装詳細', pose: 'ポーズ', situation: 'シチュエーション', lighting: '光演出', 
    artStyle: '画風', cameraAngle: 'アングル', aesthetic: '印象補正', additionalNotes: '追記' 
};

// 表現ルールを適用した極上の事前サジェスト辞書
window.FIELD_SUGGESTIONS = {
    hairStyle: [
        { label: 'ツインテール 🎀', value: 'Long twin-tails with soft bouncy curls, perfectly symmetrical' },
        { label: 'ボブカット 👩', value: 'Asymmetric sleek bob cut with clean razor-sharp edges' },
        { label: 'ストレートロング ✨', value: 'Flawless waist-length silky straight hair falling naturally' },
        { label: 'お団子 🍡', value: 'Cute double space buns (odango layout)' }
    ],
    hairBangs: [
        { label: 'パッツン ✂️', value: 'Neat straight-cut bangs resting perfectly right above eyebrows' },
        { label: 'シースルー 💨', value: 'Trendy light and airy see-through bangs' },
        { label: 'ななめ流し 🧭', value: 'Soft side-swept bangs cascading to the side' }
    ],
    hairColor: [
        { label: '艶黒髪 🖤', value: 'Deep obsidian black with high-gloss reflective silver highlights' },
        { label: 'アッシュブラウン 🪵', value: 'Soft smoky mist ash brown' },
        { label: 'ミルクティー ☕', value: 'Warm creamy milk tea beige' }
    ],
    hairAccessory: [
        { label: '白いリボン 🤍', value: 'Oversized double silk white ribbon bows' },
        { label: 'シルバーピン 📎', value: 'Minimalist x-shaped silver metallic bobby pins' }
    ],
    hairTexture: [
        { label: 'サラサラ 💫', value: 'Silky smooth hair texture, high-definition individual strands visible' },
        { label: 'ふわふわ ☁️', value: 'Voluminous fluffy air-light hair texture, high porosity look' }
    ],
    faceOutline: [
        { label: '卵型 🥚', value: 'Perfect soft oval face outline, elegant chin' },
        { label: '丸顔 👶', value: 'Youthful cute round baby face outline' }
    ],
    facePlacement: [
        { label: 'ベビー顔比率 🍼', value: 'Facial features concentrated on lower half for a youthful cute baby-face ratio' }
    ],
    eyeShape: [
        { label: 'たれ目/丸目 🥺', value: 'Large doe-like expressive rounded eyes, sweet innocent gaze' },
        { label: 'つり目/シャープ 🦊', value: 'Sleek upturned almond eyes, feline captivating glance' }
    ],
    eyeSymmetry: [
        { label: '完全対称 ⚖️', value: 'Flawlessly symmetrical eyes with exactly one-eye-width distance between them' }
    ],
    irisRatio: [
        { label: '黒目がち 👀', value: 'Enlarged deep expressive irises, prominent pupil-to-sclera ratio' }
    ],
    eyeCorners: [
        { label: 'シャープ目頭 👁️', value: 'Sharply defined inner corners (epicanthic fold detail), clean outer corners' }
    ],
    eyeColor: [
        { label: 'ルビー赤 🟥', value: 'Deep luminous crystal ruby red' },
        { label: 'アンバー金 🟨', value: 'Glinting golden amber warm tone' }
    ],
    eyelidType: [
        { label: '平行二重', value: 'Wide parallel double eyelids, clear crease' },
        { label: '一重クール 😑', value: 'Elegant clean single-crease monolid eyes' }
    ],
    tearBags: [
        { label: 'ぷっくり 💖', value: 'Highly defined puffy tear bags (aegyo-sal) highlighted with soft pearlescent shimmer' }
    ],
    eyelashes: [
        { label: 'バサバサ長め 👁️', value: 'Thick voluminous long dark eyelashes curling upwards' },
        { label: '束感/ドーリー 🧸', value: 'Dolly-like separated spiky grouped eyelashes, clean lower lashes' }
    ],
    eyeSparkle: [
        { label: '星の輝き ✨', value: 'Intense starry catchlights, multi-layered complex lens reflections' },
        { label: 'うるうる 🥺', value: 'Glistening tearful sparkling eye gloss' }
    ],
    eyeMakeupDetail: [
        { label: 'ピンク地雷 🖤', value: 'Pinkish-red eyeshadow under eyes, soft droopy eyeliner styling' },
        { label: 'グリッター 💎', value: 'Fine diamond cosmetic glitter specks applied along under-eyes and outer corners' }
    ],
    eyebrowShape: [
        { label: '平行眉 〰️', value: 'Soft straight horizontal flat eyebrows, natural texture' },
        { label: '困り眉 🥺', value: 'Slightly worried inner-raised soft delicate eyebrows' }
    ],
    noseShape: [
        { label: 'ツンとした小鼻 👃', value: 'Small delicate slightly upturned button nose' }
    ],
    mouthShape: [
        { label: 'アヒル口 🦆', value: 'Cute small cupids-bow lips with slightly upturned corners' },
        { label: 'ハーフオープン 👄', value: 'Slightly parted lips revealing a glimpse of delicate upper teeth' }
    ],
    lipTexture: [
        { label: 'うる艶リップ 💄', value: 'Glossy wet pink lip gloss texture, high reflective shine' },
        { label: 'マシュマロマット 🍑', value: 'Soft velvety matte peach lipstick texture' }
    ],
    teeth: [
        { label: '綺麗な並び ✨', value: 'Flawlessly aligned pearly white teeth' }
    ],
    cheekStyle: [
        { label: 'ほてり赤らみ 😊', value: 'Soft pastel coral pink blushing cheeks, natural warmth' }
    ],
    expression: [
        { label: '満面笑顔 😄', value: 'Radiant joyful smile with squinting happy eyes' },
        { label: 'ぷくっと不機嫌 😡', value: 'Cute grumpy pout with slightly puffed cheeks' },
        { label: 'てへぺろ 😜', value: 'Playful cheeky wink with a delicate pink tongue peeking out' }
    ],
    facs: [
        { label: '笑顔 😃', value: 'AU12C + AU6B (smirk + eye squeeze)' },
        { label: '眠たげ 😴', value: 'AU43 (drooping eyelids) + AU26 (lips parted)' },
        { label: '微不満 😐', value: 'AU15D (lip corner depress) + AU17B (chin raise)' }
    ],
    makeupStyle: [
        { label: 'ステージ盛 ✨', value: 'Glistening stage-ready professional idol make-up, sparkling high-fidelity pigments' },
        { label: 'ナチュラルすっぴん 🌿', value: 'Effortless bare-face look, minimalist light-reflecting makeup' }
    ],
    skinColor: [
        { label: '透明感美白 ❄️', value: 'Pale porcelain ivory skin, translucent texture with blue undertones' },
        { label: '桃肌 🍑', value: 'Healthy soft rosy-peach warm undertone skin' }
    ],
    skinTexture: [
        { label: '極上の柔らかさ ☁️', value: 'Extremely soft, supple skin texture, smooth and yielding like marshmallow' },
        { label: 'リアル毛穴 📸', value: 'Hyper-realistic raw skin texture with fine pores, peach fuzz, and natural oils' }
    ],
    bodyInterface: [
        { label: '極細紐の張力と肌の沈み込み 🎀', value: '極細の糸のような紐の確かな張力と、それに優しく沈み込む極めて柔らかいマシュマロのような肌のコントラストが、極上の柔らかさと自然な肉感を視覚化している' },
        { label: '柔らかい肌への沈み込み ☁️', value: '布地が極めて柔らかくしなやかな肌に優しく沈み込み、マシュマロのようなふかふかの質感と身体の自然な柔らかさを際立たせている' },
        { label: '胸の自重と谷間 🕊️', value: '極細の布地がこぼれるような豊かなボリュームと自然な重みを優雅に支え、深く開いたネックラインに沿ってリアルで美しい起伏と陰影を生み出している' }
    ], 
    molesFreckles: [
        { label: '泣きぼくろ 👁️', value: 'Single charming dark beauty mark right below her left eye corner' },
        { label: '口元ホクロ 💋', value: 'A delicate captivating beauty mole located just above her right upper lip border' }
    ],
    age: [
        { label: '10代後半 🎒', value: 'Late teens, around 17-19 years old, youthful impression' },
        { label: '20代前半 👠', value: 'Early twenties, around 21-23 years old, mature elegant appearance' }
    ],
    height: [
        { label: '小柄(150cm) 🤏', value: 'Petite delicate build, around 152cm, cute compact bone structure' },
        { label: '普通(160cm) 🧍‍♀️', value: 'Average slender height, around 161cm with proportional limbs' }
    ],
    bodyType: [
        { label: 'スレンダー×マシュマロ 🌿☁️', value: 'Toned yet exceptionally soft body contour, delicate balance of a slender frame and plush, yielding curves especially around the hips' },
        { label: '豊満な重み/こぼれる肉付き ☁️', value: 'Voluptuous silhouette with generously full upper contours featuring a natural, elegant heavy drape gracefully supported by the garment' },
        { label: 'スレンダー 🧵', value: 'Slender graceful silhouette, delicate collarbones, flat midriff' }
    ],
    bodyFrame: [
        { label: '華奢な骨格 🦴', value: 'Delicate bone structure, prominent clavicles and narrow rib cage' },
        { label: '骨格ウェーブ 🌊', value: 'Classic wave frame, long slender waist, gently flared hips' }
    ],
    threeSizes: [
        { label: '重力を感じる豊満さ ☁️', value: 'Generously full upper torso with plush volume and a natural heavy drape resting naturally, creating a breathtaking and elegant silhouette' },
        { label: '引き締まりと柔らかさの同居 ⏳', value: 'Gentle firmness in the waist combined with yielding plush softness in the hips and lower torso, balanced elegant proportions' }
    ],
    outfit: [
        { label: '極小の白紐ビキニ 👙', value: 'Minimalist white string two-piece swimwear with triangular cups and delicate thread-like side-ties' },
        { label: '繊細なブルーレースのセット 🎀', value: 'Intricate pale blue lace-trimmed two-piece ensemble with structured underwire and scalloped edges softly resting against the skin' },
        { label: '王道ドレス 👗', value: 'Tier-layered chiffon frilled idol stage dress' },
        { label: '夏祭り浴衣 👘', value: 'Traditional summer cotton yukata adorned with floral motifs, tied with a contrasting obi sash' }
    ],
    outfitDetail: [
        { label: '極細のサイドストリング 🪢', value: 'Delicate thread-like side-tie strings providing structural tension' },
        { label: 'レース刺繍 🕸️', value: 'Intricate scalloped sheer lace net linings, delicate floral embroidery' }
    ],
    pose: [
        { label: '正座・むっちり座り 🧎‍♀️', value: 'seiza sitting pose, resting her soft weight naturally on her calves, emphasizing the beautiful, full spread and supple curves of her lower body' },
        { label: '膝立ち 🦵', value: 'kneeling pose, resting on both knees, upright torso, thighs gently pressing together' },
        { label: 'あぐら 🧘‍♀️', value: 'sitting cross-legged on the floor, relaxed posture' },
        { label: '振り向き 💫', value: 'Dynamic over-the-shoulder look, mid-turn candid captured pose' }
    ],
    situation: [
        { label: '砂浜・ビーチ 🏖️', value: 'Kneeling on a beautiful sunlit sandy beach with clear blue ocean waves in the background' },
        { label: '和室の畳 🍵', value: 'Inside a traditional Japanese washitsu room with tatami flooring and shoji sliding doors' },
        { label: '白いベッドシーツ 🛏️', value: 'Resting on soft, wrinkled white bed sheets in a bright morning room' }
    ],
    lighting: [
        { label: '窓からの自然光 ☀️', value: 'Soft natural daylight filtering through the window, highlighting the smooth skin contours' },
        { label: 'スタジオ照明 💡', value: 'Cinematic key studio light with a soft volumetric hair backlight' }
    ],
    artStyle: [
        { label: '実写DSLRグラビア 📷', value: 'Hyper-realistic gravure raw photograph taken with high-end DSLR, sharp focus, photo masterclass 8k' },
        { label: 'アニメアート 🎨', value: 'Modern aesthetic high-fidelity digital anime illustration, clean lines, vibrant cell shading' }
    ],
    cameraAngle: [
        { label: 'アイレベル正面 👁️', value: 'Straight-on eye-level portrait shot, making intense direct eye contact' },
        { label: '後ろ・斜めローアングル 🔄', value: 'Captured from a middle-low angle from behind, emphasizing the elegant S-curve and full silhouette from the back to the lower torso' }
    ],
    aesthetic: [
        { label: 'かわいい系 💕', value: 'cute' },
        { label: '美人/きれい系 🔮', value: 'beautiful' }
    ],
    additionalNotes: [
        { label: '傑作/高詳細 🏆', value: 'masterpiece, highly detailed features, intricate clothing cuts' },
        { label: 'シネマチック深み 🎬', value: 'award-winning portrait photography, cinematic depth of field, sharp focus' }
    ]
};

// 共通インスピレーション用テーマプリセット
window.INSPI_THEMES = {
    plain_model: {
        name: '人物のみクリア 👤',
        data: {
            hairAccessory: '',
            eyeMakeupDetail: '',
            lipTexture: '',
            cheekStyle: '',
            makeupStyle: '',
            outfit: '',
            outfitDetail: '',
            bodyInterface: ''
        }
    },
    style_check: {
        name: 'スタイル確認(グレー無地) 📏',
        data: {
            hairAccessory: '',
            outfit: 'minimalist unbranded heather-grey sporty two-piece ensemble',
            outfitDetail: 'solid light grey bralette top and matching basic bottoms, plain wide elastic bands with strictly no logos or text, sleek and seamless design',
            pose: 'standing naturally, simple straight posture to clearly show body proportions',
            situation: 'pure white seamless studio backdrop, minimalist setting',
            lighting: 'clean, even soft studio lighting for clear visibility of body contours',
            bodyInterface: 'fitting smoothly against the skin, highlighting the natural body contour'
        }
    },
    voluptuous_bikini: {
        name: '豊満×極細紐ビキニ 🏖️',
        data: {
            hairStyle: 'Flawless waist-length silky straight black hair',
            hairBangs: 'Trendy light and airy see-through bangs',
            eyeShape: 'Large doe-like expressive rounded eyes',
            bodyType: 'Voluptuous silhouette with generously full upper contours featuring a natural, elegant heavy drape gracefully supported by the garment',
            threeSizes: 'Generously full upper torso with plush volume resting naturally, creating a breathtaking and elegant silhouette',
            skinTexture: 'Extremely soft, supple skin texture, smooth and yielding like marshmallow',
            bodyInterface: '極細の糸のような紐の確かな張力と、それに優しく沈み込む極めて柔らかいマシュマロのような肌のコントラストが、極上の柔らかさと自然な肉感を視覚化している',
            outfit: 'Minimalist white string two-piece swimwear with triangular cups and delicate thread-like side-ties',
            outfitDetail: 'Delicate thread-like side-tie strings providing structural tension',
            pose: 'Kneeling pose, resting on both knees, upright torso, gently pulling the side string of the bottoms',
            situation: 'Kneeling on a beautiful sunlit sandy beach with clear blue ocean waves in the background',
            lighting: 'Bright, radiant sun-kissed lighting, highlighting the smooth skin contours',
            artStyle: 'Hyper-realistic gravure raw photograph taken with high-end DSLR, sharp focus, 8k',
            cameraAngle: 'Three-quarter angle medium portrait'
        }
    },
    slender_marshmallow: {
        name: 'スレンダー×マシュマロ 🎀',
        data: {
            hairStyle: 'Natural black short bob, rounded and softly curled inward',
            hairBangs: 'Soft side-swept bangs cascading to the side',
            eyeShape: 'Sleek upturned almond eyes, feline captivating glance',
            bodyType: 'Toned yet exceptionally soft body contour, delicate balance of a slender frame and plush, yielding curves especially around the hips',
            threeSizes: 'Gentle firmness in the waist combined with yielding plush softness in the hips and lower torso, balanced elegant proportions',
            skinTexture: 'Pale porcelain ivory skin, translucent texture, soft-matte studio-airbrushed finish',
            bodyInterface: '衣装の縁や極細のストラップが腰回りやヒップの肌になめらかに密着・沈み込み、自然な物理的フィット感と極上の柔らかさを視覚化している',
            outfit: 'Intricate pale blue lace-trimmed two-piece ensemble with structured underwire and scalloped edges softly resting against the skin',
            pose: 'seiza sitting pose, resting her soft weight naturally on her calves, emphasizing the beautiful, full spread and supple curves of her lower body',
            situation: 'Resting on soft, wrinkled white bed sheets in a bright morning room',
            lighting: 'Soft natural daylight filtering through the window, highlighting the smooth skin contours',
            artStyle: 'Hyper-realistic gravure raw photograph taken with high-end DSLR, sharp focus, 8k',
            cameraAngle: 'Captured from a middle-low angle from behind, emphasizing the elegant S-curve and full silhouette from the back to the lower torso'
        }
    }
};

window.FACS_PRESETS = [
    { label: '自然な微笑み', code: 'AU12C + AU6B', desc: '口角上昇＋頬の持ち上がり' },
    { label: 'すまし顔/半開き', code: 'AU26 + AU43', desc: '顎の緩み＋目を伏せる' }
];