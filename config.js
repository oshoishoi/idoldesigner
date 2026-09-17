// ... existing code ...
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
            bodyInterface: 'fitting smoothly against the skin, highlighting the natural body contour',
            artStyle: 'Hyper-realistic studio portrait photograph, high-resolution 8k, sharp focus, clean aesthetic',
            cameraAngle: 'Straight-on full body shot, eye-level camera angle, perfectly centered',
            additionalNotes: 'masterpiece, highly detailed body proportions, clear anatomical structure, professional test shot'
        }
    },
    royal: {
        name: '王道純白アイドル 🤍',
        data: {
            hairAccessory: 'Pair of oversized silk white ribbon bows, delicate lace frills',
            expression: 'Blushing idol-grade radiant smile',
            facs: 'AU12C + AU6B + AU25',
            outfit: 'Classic tier-layered frilled white chiffon idol dress',
            outfitDetail: 'Satin corset lace-up front, sheer puffed sleeves, delicate pearls stitched along scalloped edges',
            situation: 'Performing on a grand bright stage, rain of glittering pastel pink confetti falling around her',
            lighting: 'Dazzling high-key stage spotlighting, rainbow flare',
            artStyle: 'Ultra-high-fidelity cinematic modern anime artwork, sharp lines, pastel color palette'
        }
    },
    cyber: {
        name: 'サイバーパンク・近未来 ⚡',
        data: {
            hairAccessory: 'Mechanical cybernetic hair clamps, glowing fiber-optic strands',
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
            hairAccessory: 'Black velvet gothic crosses, delicate silver safety pin hair clips',
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
            hairAccessory: 'Intricate black antique rose tiara, sheer lace cathedral veil',
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
            hairAccessory: 'Colorful neon plastic hair claws, Hibiscus floral accessory',
            expression: 'Winking cheekily with tongue out slightly',
            facs: 'AU19 (tongue out) + AU46 (wink) + AU12',
            outfit: 'Vintage cropped retro color vest over colorful spaghetti strap camisole',
            outfitDetail: 'Pink glitter text print, plastic bead chain straps, rhinestone belt',
            situation: 'Standing in front of a retro 2000s purikura photo booth, colorful graffiti-painted walls',
            lighting: 'Bright, high-contrast camera-mounted ring flash, instant print aesthetic',
            artStyle: 'Lo-fi grainy vintage print scan, nostalgic early digital camera vibe, highly saturated colors'
        }
    },
    voluptuous_bikini: {
        name: '豊満×極細紐ビキニ 🏖️',
        data: {
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
// ... existing code ...