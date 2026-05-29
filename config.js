// config.js
window.isPreview = typeof __app_id !== 'undefined';
window.apiKey = ""; // 本番テスト時やCanvasランタイムでは空文字のままで動作します
window.proxyBaseUrl = "https://idol-designer-proxy.gris-aile.workers.dev"; 

window.getApiUrl = (endpoint) => {
    // 正式リリース版の「gemini-2.5-flash」に最適化
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

// 44項目定義 (regionを削除)
window.FIELD_KEYS = [
    'hairStyle', 'hairBangs', 'hairColor', 'hairAccessory', 'hairTexture',
    'faceOutline', 'facePlacement', 
    'eyeShape', 'eyeSymmetry', 'irisRatio', 'eyeCorners', 'eyeColor', 'eyelidType', 'tearBags', 'eyelashes', 'eyeSparkle', 'eyeMakeupDetail', 'eyebrowShape',
    'noseShape', 'mouthShape', 'lipTexture', 'teeth', 'cheekStyle', 'expression', 'facs', 'makeupStyle',
    'skinColor', 'skinTexture', 'bodyInterface', 'molesFreckles', 
    'age', 'height', 'bodyType', 'bodyFrame', 'threeSizes',
    'outfit', 'outfitDetail', 'pose',
    'situation', 'lighting', 'artStyle', 'cameraAngle',
    'aesthetic', 'additionalNotes'
];

// 最新のラベルマッピング定義
window.LABEL_MAP = {
    hairStyle: '髪型', 
    hairBangs: '前髪', 
    hairColor: '髪色', 
    hairAccessory: 'ヘアアクセ', 
    hairTexture: '髪質',
    faceOutline: '輪郭', 
    facePlacement: '顔のパーツ配置比率', 
    eyeShape: '目の形', 
    eyeSymmetry: '目の対称性', 
    irisRatio: '黒目の比率', 
    eyeCorners: '目頭・目尻', 
    eyeColor: '瞳色', 
    eyelidType: 'まぶた', 
    tearBags: '涙袋', 
    eyelashes: 'まつ毛', 
    eyeSparkle: '瞳の輝き', 
    eyeMakeupDetail: 'アイメイク詳細', 
    eyebrowShape: '眉の形',
    noseShape: '鼻の形', 
    mouthShape: '口の形', 
    lipTexture: '唇の質感', 
    teeth: '歯', 
    cheekStyle: 'ほっぺ',
    expression: '表情', 
    facs: 'FACS (動作符号/強度)',
    makeupStyle: '全体メイク', 
    skinColor: '肌の色', 
    skinTexture: '肌質', 
    bodyInterface: 'その他', 
    molesFreckles: '特徴', 
    age: '年齢感', 
    height: '身長', 
    bodyType: '体型', 
    bodyFrame: '骨格', 
    threeSizes: '肉付き', 
    outfit: '衣装', 
    outfitDetail: '衣装詳細', 
    pose: 'ポーズ',
    situation: 'シチュエーション', 
    lighting: '光演出', 
    artStyle: '画風', 
    cameraAngle: 'アングル',
    aesthetic: '印象補正',
    additionalNotes: '追記' 
};

// 表現ロンダリング・ルールを適用した事前サジェスト辞書 (絵文字・タイポ等のクリーンアップ調整版)
window.FIELD_SUGGESTIONS = {
    hairStyle: [
        { label: 'ツインテール 🎀', value: 'Long twin-tails with soft bouncy curls, perfectly symmetrical' },
        { label: 'ボブカット 👩', value: 'Asymmetric sleek bob cut with clean razor-sharp edges' },
        { label: 'ストレートロング ✨', value: 'Flawless waist-length silky straight hair falling naturally' },
        { label: 'お団子 🍡', value: 'Cute double space buns (odango layout)' },
        { label: 'ポニーテール 🐎', value: 'High bouncy ponytail tied with a satin ribbon' },
        { label: 'ウェーブロング 🌊', value: 'Elegant long hair with romantic cascading waves' }
    ],
    hairBangs: [
        { label: 'パッツン ✂️', value: 'Neat straight-cut bangs resting perfectly right above eyebrows' },
        { label: 'シースルー 💨', value: 'Trendy light and airy see-through bangs' },
        { label: '姫カット 👸', value: 'Classic sharp side hime-cut strands beautifully framing her face' },
        { label: 'センター分け ⚖️', value: 'Cool center-parted curtain bangs tucked softly behind ears' },
        { label: 'ななめ流し 🧭', value: 'Soft side-swept bangs cascading to the side' }
    ],
    hairColor: [
        { label: 'パステルピンク 🌸', value: 'Pastel baby pink with soft cream undertones' },
        { label: '艶黒髪 🖤', value: 'Deep obsidian black with high-gloss reflective silver highlights' },
        { label: 'プラチナブロンド 👱‍♀️', value: 'Bright radiant platinum blonde' },
        { label: 'アッシュブラウン 🪵', value: 'Soft smoky mist ash brown' },
        { label: 'インナーカラー 🎨', value: 'Midnight charcoal blue with electric cyan inner dye layers' },
        { label: 'ミルクティー ☕', value: 'Warm creamy milk tea beige' }
    ],
    hairAccessory: [
        { label: '白いリボン 🤍', value: 'Oversized double silk white ribbon bows' },
        { label: '猫耳カチューシャ 🐾', value: 'Cute fluffy black cat-ear headband' },
        { label: 'シルバーピン 📎', value: 'Minimalist x-shaped silver metallic bobby pins' },
        { label: 'ローズ花飾り 🌹', value: 'Antique gothic red rose hair comb piece' },
        { label: 'ティアラ 👑', value: 'Sparkling delicate crystal mini tiara' }
    ],
    hairTexture: [
        { label: 'サラサラ 💫', value: 'Silky smooth hair texture, high-definition individual strands visible' },
        { label: 'ふわふわ ☁️', value: 'Voluminous fluffy air-light hair texture, high porosity look' },
        { label: '濡れ髪 💧', value: 'Trendy wet-look styled hair texture with glossy gel finish' }
    ],
    faceOutline: [
        { label: '卵型 🥚', value: 'Perfect soft oval face outline, elegant chin' },
        { label: '丸顔 👶', value: 'Youthful cute round baby face outline' },
        { label: 'シャープ ⚡', value: 'Slender sharp chin and clean jawline' }
    ],
    facePlacement: [
        { label: 'ベビー顔比率 🍼', value: 'Facial features concentrated on lower half for a youthful cute baby-face ratio' },
        { label: '完璧な対称性 📐', value: 'Flawlessly symmetrical facial proportions, precise central alignment' }
    ],
    eyeShape: [
        { label: 'たれ目/丸目 🥺', value: 'Large doe-like expressive rounded eyes, sweet innocent gaze' },
        { label: 'つり目/シャープ 🦊', value: 'Sleek upturned almond eyes, feline seductive glance' },
        { label: 'ジト目/眠たげ 🥱', value: 'Half-closed sleepy eyelids, aloof calm enigmatic eyes' }
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
        { label: 'サファイア青 🟦', value: 'Shining sapphire blue with galaxy dust details' },
        { label: 'エメラルド緑 🟩', value: 'Vibrant sparkling emerald green' },
        { label: 'オッドアイ 🌓', value: 'Striking heterochromia eyes: left eye electric blue, right eye gold' },
        { label: 'アンバー金 🟨', value: 'Glinting golden amber warm tone' }
    ],
    eyelidType: [
        { label: '平行二重 👁️‍🗨️', value: 'Wide parallel double eyelids, clear crease' }, // 絵文字クリーンアップ
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
        { label: 'うるうる 🥺', value: 'Glistening wet tearful sparkling eye gloss' }
    ],
    eyeMakeupDetail: [
        { label: 'ピンク地雷 🖤', value: 'Pinkish-red eyeshadow under eyes, soft droopy eyeliner styling' },
        { label: 'キャットライン 🐈‍⬛', value: 'Sleek sharp winged black liquid cat-eye eyeliner' },
        { label: 'グリッター 💎', value: 'Fine diamond cosmetic glitter specks applied along under-eyes and outer corners' }
    ],
    eyebrowShape: [
        { label: '平行眉 〰️', value: 'Soft straight horizontal flat eyebrows, natural texture' },
        { label: '困り眉 🥺', value: 'Slightly worried inner-raised soft delicate eyebrows' },
        { label: '細眉 ✏️', value: 'Elegant slender highly curved thin eyebrows' }
    ],
    noseShape: [
        { label: 'ツンとした小鼻 👃', value: 'Small delicate slightly upturned button nose' },
        { label: 'スッとした鼻筋 📏', value: 'Slender straight refined nose bridge' }
    ],
    mouthShape: [
        { label: 'アヒル口 🦆', value: 'Cute small cupids-bow lips with slightly upturned corners' },
        { label: 'ハーフオープン 👄', value: 'Slightly parted lips revealing a glimpse of tiny upper teeth' }
    ],
    lipTexture: [
        { label: 'うる艶リップ 💄', value: 'Glossy wet pink lip gloss texture, high reflective shine' },
        { label: 'マシュマロマット 🍑', value: 'Soft velvety matte peach lipstick texture' }
    ],
    teeth: [
        { label: '八重歯 🦷', value: 'Charming tiny single vampire-like fang poking out over her lower lip' },
        { label: '綺麗な並び ✨', value: 'Flawlessly aligned pearly white teeth' }
    ],
    cheekStyle: [
        { label: 'ほてり赤らみ 😊', value: 'Soft pastel coral pink blushing cheeks, natural warmth' },
        { label: 'そばかす 🍓', value: 'Charming dusting of light natural freckles across nose and cheeks' }
    ],
    expression: [
        { label: '満面笑顔 😄', value: 'Radiant joyful smile with squinting happy eyes' },
        { label: 'ドヤ顔 😎', value: 'Confident smug grin, half-lidded arrogant eyes' },
        { label: 'ぷくっと不機嫌 😡', value: 'Cute grumpy pout with slightly puffed cheeks' },
        { label: 'てへぺろ 😜', value: 'Playful cheeky wink with a tiny pink tongue peeking out' }
    ],
    facs: [
        { label: '笑顔 😃', value: 'AU12C + AU6B (smirk + eye squeeze)' },
        { label: 'ウィンク 😉', value: 'AU46 (Left eye closure) + AU12C (smile)' },
        { label: '眠たげ 😴', value: 'AU43 (drooping eyelids) + AU26 (lips parted)' },
        { label: '微不満 😐', value: 'AU15D (lip corner depress) + AU17B (chin raise)' }
    ],
    makeupStyle: [
        { label: 'ステージ盛 ✨', value: 'Glistening stage-ready professional idol make-up, sparkling high-fidelity pigments' },
        { label: 'ナチュラルすっぴん 🌿', value: 'Effortless bare-face look, minimalist light-reflecting makeup' }
    ],
    skinColor: [
        { label: '透明感美白 ❄️', value: 'Pale porcelain ivory skin, translucent texture with blue undertones' },
        { label: '桃肌 🍑', value: 'Healthy soft rosy-peach warm undertone skin' },
        { label: '小麦肌 ☀️', value: 'Healthy sun-kissed glowing golden bronze skin' }
    ],
    skinTexture: [
        { label: 'リアル毛穴 📸', value: 'Hyper-realistic raw skin texture with micro pores, peach fuzz, and natural oils' },
        { label: '陶器すべすべ 🏺', value: 'Flawlessly smooth, soft-matte studio-airbrushed skin texture' }
    ],
    bodyInterface: [], 
    molesFreckles: [
        { label: '泣きぼくろ 👁️', value: 'Single charming dark beauty mark right below her left eye corner' },
        { label: '口元ホクロ 💋', value: 'A tiny seductive beauty mole located just above her right upper lip border' }
    ],
    age: [
        { label: '10代後半 🎒', value: 'Late teens, around 17-19 years old, youthful innocent aura' },
        { label: '20代前半 👠', value: 'Early twenties, around 21-23 years old, mature elegant appearance' }
    ],
    height: [
        { label: '小柄(150cm) 🤏', value: 'Petite delicate build, around 152cm, cute compact bone structure' },
        { label: '普通(160cm) 🧍‍♀️', value: 'Average slender height, around 161cm with proportional limbs' },
        { label: '高身長(170cm) 🦒', value: 'Tall and statuesque, around 172cm, stylish model-like leg proportions' }
    ],
    bodyType: [
        { label: 'スレンダー 🧵', value: 'Slender graceful silhouette, delicate collarbones, flat midriff' },
        { label: 'メリハリ/マシュマロ ☁️', value: 'Soft voluptuous hourglass body shape with a tiny cinched waist' },
        { label: '引き締まり 🏃‍♀️', value: 'Toned fit athletic build with subtle abdominal lines and firm posture' } // タイポ修正
    ],
    bodyFrame: [
        { label: '華奢な骨格 🦴', value: 'Delicate bone structure, prominent clavicles and narrow rib cage' },
        { label: '骨格ウェーブ 🌊', value: 'Classic wave frame, long slender waist, gently flared hips' }
    ],
    threeSizes: [
        { label: 'メリハリ ⏳', value: 'Pronounced bust-to-waist ratio, flat stomach, soft curved hip silhouette' },
        { label: 'スリム 📏', value: 'Sleek slim hips, narrow athletic waist, elegant proportions' }
    ],
    outfit: [
        { label: '王道ドレス 👗', value: 'Tier-layered chiffon frilled idol stage dress' },
        { label: '夏祭り浴衣 👘', value: 'Traditional summer cotton yukata adorned with floral motifs, tied with a contrasting obi sash' },
        { label: 'セーラー制服 🏫', value: 'Classic Japanese school sailor uniform with a large collar and neat pleated skirt' },
        { label: 'サイドリボン水着 👙', value: 'High-gloss spandex-nylon micro bikini tied with thin side-tie strings' },
        { label: '肩あきニット 🧶', value: 'Oversized cozy off-shoulder pastel-pink knit sweater' }
    ],
    outfitDetail: [
        { label: 'レース刺繍 🕸️', value: 'Intricate scalloped sheer lace net linings, delicate floral embroidery' },
        { label: 'バック編み上げ 🎗️', value: 'Satin corset lace-up details stretching down the bodice' },
        { label: '金属チャーム ⛓️', value: 'Tiny dangling silver metallic stars, safety pins, and padlock ornaments' }
    ],
    pose: [
        { label: 'ピースサイン ✌️', value: 'Double peace sign gesture held close to her blushing cheek' },
        { label: '自撮りアングル 🤳', value: 'Cute selfie pose, holding an invisible phone at an angle' },
        { label: '指ハート 🫰', value: 'Delicate finger-heart gesture with a charming smile' },
        { label: '振り向き 💫', value: 'Dynamic over-the-shoulder look, mid-turn candid captured pose' }
    ],
    situation: [
        { label: 'ライブ本番 🎤', value: 'Performing live on a massive grand concert stage with glittering confetti falling around' },
        { label: 'オシャレカフェ ☕', value: 'Relaxing by a sunny indoor window seat at a chic modern Harajuku cafe' },
        { label: '夜のネオン雨 🌃', value: 'Walking through a rainy Tokyo backstreet with colorful neon shop billboard reflections' },
        { label: '満開の桜 🌸', value: 'Standing under a blooming cherry blossom tree canopy with a blizzard of falling pink petals' }
    ],
    lighting: [
        { label: 'スタジオ照明 💡', value: 'Cinematic key studio light with a soft volumetric hair backlight' },
        { label: '木漏れ日 ☀️', value: 'Soft warm dappled sunlight filtering through summer tree leaves' },
        { label: '夜間直フラッシュ 📸', value: 'Harsh raw camera-mounted direct hard flash, high contrast dark shadows behind her' },
        { label: 'サイバーネオン 🔮', value: 'Dramatic cyber neon underglow casting vivid pink and teal reflections on her skin' }
    ],
    artStyle: [
        { label: '実写DSLR 📷', value: 'Hyper-realistic raw photograph taken with high-end DSLR, sharp focus, photo masterclass 8k' },
        { label: 'アニメアート 🎨', value: 'Modern aesthetic high-fidelity digital anime illustration, clean lines, vibrant cell shading' },
        { label: 'Lo-Fiチェキ 🎞️', value: 'Vintage analog instant camera film with heavy grainy texture, soft warm details, Polaroid frame' }
    ],
    cameraAngle: [
        { label: 'アイレベル正面 👁️', value: 'Straight-on eye-level portrait shot, making intense direct eye contact' },
        { label: '見下ろし/あおり 📐', value: 'High-angle shot looking down at her, emphasizing large cute eyes' },
        { label: 'サイド斜め 🔄', value: 'Three-quarter angle medium portrait capturing her elegant side profile' }
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
    royal: {
        name: '王道純白アイドル 🤍',
        data: {
            hairStyle: 'Long twin-tails with soft bouncy curls, perfectly symmetrical',
            hairBangs: 'Flawless straight-cut neat bangs, resting perfectly above eyebrows',
            hairColor: 'Warm honey blonde with pastel pink undertones',
            hairAccessory: 'Pair of oversized silk white ribbon bows, delicate lace frills',
            eyeShape: 'Large, rounded doe-like eyes, ultra-kawaii manga scale',
            eyeSparkle: 'Intense starry anime sparkles, multi-layered catchlights',
            expression: 'Blushing idol-grade radiant smile',
            facs: 'AU12C + AU6B + AU25',
            outfit: 'Classic tier-layered frilled white chiffon idol dress',
            outfitDetail: 'Satin corset lace-up front, sheer puffed sleeves, micro pearls stitched along scalloped edges',
            situation: 'Performing on a grand bright stage, rain of glittering pastel pink confetti falling around her',
            lighting: 'Dazzling high-key stage spotlighting, rainbow flare',
            artStyle: 'Ultra-high-fidelity cinematic modern anime artwork, sharp lines, pastel color palette'
        }
    },
    cyber: {
        name: 'サイバーパンク・近未来 ⚡',
        data: {
            hairStyle: 'Sharp asymmetrical futuristic bob cut with clean edges',
            hairBangs: 'Micro fringe, futuristic cyber visor look',
            hairColor: 'Fluorescent neon cyan with glow-in-the-dark magenta streaks',
            hairAccessory: 'Mechanical cybernetic hair clamps, glowing fiber-optic strands',
            eyeShape: 'Piercing fox-like sharp upturned eyes',
            eyeColor: 'Luminous electric violet with glowing ring pupil pattern',
            expression: 'Cool confident smug smirk',
            facs: 'AU14 + AU12C (intensity 0.3)',
            outfit: 'Form-fitting matte black tactical cyber jumpsuit',
            outfitDetail: 'Translucent neon PVC harness straps, high-collared neck piece, integrated LED wire piping lines',
            situation: 'Walking down a rainy futuristic Tokyo Neo-Shinjuku alleyway, massive holographic billboard reflections',
            lighting: 'Cinematic dramatic chiaroscuro neon underglow, wet asphalt reflections',
            artStyle: 'Hyper-realistic Unreal Engine 5 render, cinematic raytracing, intricate mechanical details, 8k raw photo'
        }
    },
    jirai: {
        name: '地雷系・サブカル女子 🖤',
        data: {
            hairStyle: 'Half-up twin tails, heavily textured messy strands',
            hairBangs: 'Curved see-through bangs with long side-hime-cut framing',
            hairColor: 'Deep charcoal black with split pastel purple dye underneath',
            hairAccessory: 'Black velvet gothic crosses, tiny silver safety pin hair clips',
            eyeShape: 'Slightly droopy sleepy-looking eyes (tareme)',
            tearBags: 'Deeply defined teardrop bags highlighted with soft reddish pink blush',
            expression: 'Pouting melancholic gaze',
            facs: 'AU15D + AU1B',
            outfit: 'Oversized black school ribbon sailor blouse with gothic lace apron',
            outfitDetail: 'Heavy silver chains, pierced lace choker, spiked heart padlock necklace',
            situation: 'Sitting in a dimly lit Tokyo bedroom cluttered with gothic plushies, aesthetic warm fairy lights',
            lighting: 'Soft gloomy window light, atmospheric low-light mood',
            artStyle: 'High fidelity raw portrait photography, heavy grainy film texture, Japanese subculture aesthetic'
        }
    },
    gothic: {
        name: 'クラシックゴシック 🥀',
        data: {
            hairStyle: 'Elegant long Victorian curls cascade over shoulders, perfectly styled',
            hairColor: 'Silver-grey slate or midnight black with violet sheen',
            hairAccessory: 'Intricate black antique rose tiara, sheer lace cathedral veil',
            eyeShape: 'Enigmatic, deep set melancholic eyes, elegant dark eyeliner',
            expression: 'Slightly parting lips, mysterious neutral look',
            facs: 'AU26 + AU43 (half closed eyelids)',
            outfit: 'Floor-length heavy velvet gothic lolita ball gown',
            outfitDetail: 'High-neck ruffled collar, boned lace-corset waist, cascading rose lace tier skirts',
            situation: 'Inside a decadent gothic cathedral, towering stained glass windows, crumbling stone arches',
            lighting: 'Dramatic shafts of morning light cutting through dusty air, high contrast backlighting',
            artStyle: 'Dark Victorian masterclass painting, rich textured oil canvas texture, gothic romanticism realism'
        }
    },
    retro: {
        name: 'ギャル・平成レトロ 🌸',
        data: {
            hairStyle: 'Voluminous fluffy high-porosity layered blowout, vintage look',
            hairColor: 'Ash chestnut brown with sun-bleached thick blonde highlights',
            hairAccessory: 'Colorful neon plastic hair claws, Hibiscus floral accessory',
            eyeShape: 'Enlarged round eyes with dramatic dolly long falsies lashes',
            makeupStyle: 'Heavily bronzed skin look, silver white eyeshadow, sparkly lip gloss',
            expression: 'Winking cheekily with tongue out slightly',
            facs: 'AU19 (tongue out) + AU46 (wink) + AU12',
            outfit: 'Vintage cropped retro color vest over colorful spaghetti strap camisole',
            outfitDetail: 'Pink glitter text print, plastic bead chain straps, rhinestone belt',
            situation: 'Standing in front of a retro 2000s purikura photo booth, colorful graffiti-painted walls',
            lighting: 'Bright, high-contrast camera-mounted ring flash, instant print aesthetic',
            artStyle: 'Lo-fi grainy vintage print scan, nostalgic early digital camera vibe, highly saturated colors'
        }
    }
};

// FACSクイックパッチ
window.FACS_PRESETS = [
    { label: '自然な微笑み', code: 'AU12C + AU6B', desc: '口角上昇＋頬の持ち上がり' },
    { label: 'ウィンク', code: 'AU46 (Left) + AU12C', desc: '片目ウィンク＋笑顔' },
    { label: 'すまし顔/半開き', code: 'AU26 + AU43', desc: '顎の緩み＋目を伏せる' },
    { label: 'ぷくっと怒り顔', code: 'AU15D + AU17B', desc: '口角下垂＋顎のすぼめ' },
    { label: '小悪魔なはにかみ', code: 'AU12C + AU14', desc: '口角上昇＋口元の非対称な締まり' }
];