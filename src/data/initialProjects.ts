import heroImg from '../assets/images/hero_graphic_designer_showcase_1790428734023.jpg';
import brandingImg from '../assets/images/project_minimalist_branding_1790428753061.jpg';
import editorialImg from '../assets/images/project_editorial_magazine_poster_1790428768020.jpg';
import coffeeImg from '../assets/images/project_coffee_packaging_1790428780329.jpg';
import avatarImg from '../assets/images/avatar_vandana_designer_1790428793409.jpg';
import mandalaImg from '../assets/images/mandala_sacred_art_1790433964075.jpg';
import hindiCarouselImg from '../assets/images/hindi_editorial_carousel_1790433980335.jpg';
import mangoDrinkImg from '../assets/images/mango_drink_packaging_1790433992963.jpg';
import moviePosterImg from '../assets/images/movie_poster_key_art_1790434005091.jpg';

import { Project, ServiceItem, Testimonial } from '../types';

export {
  heroImg,
  brandingImg,
  editorialImg,
  coffeeImg,
  avatarImg,
  mandalaImg,
  hindiCarouselImg,
  mangoDrinkImg,
  moviePosterImg
};

export const INITIAL_PROJECTS: Project[] = [
  // 1. Herbloom Naturals Skincare System (HERBLOOM NATURALS.png, BRAND 1.png - BRAND 5.png)
  {
    id: 'proj-herbloom-naturals',
    title: 'Herbloom Naturals · Botanical Skincare & Luxury Dropper System',
    titleHi: 'हर्बलूम नेचुरल्स · बॉटनिकल स्किनकेयर और एम्बर ड्रॉपर पैकेजिंग',
    category: 'Packaging',
    client: 'Herbloom Naturals Co.',
    year: '2026',
    coverImage: brandingImg,
    galleryImages: [brandingImg, heroImg],
    description: 'Complete brand identity, frosted amber glass dropper packaging, botanical vector leaf insignia, and outer retail cartons for pure herbal cosmetics. Incorporates Brand 1 to 5 packaging standards.',
    descriptionHi: 'हर्बलूम नेचुरल्स के लिए सम्पूर्ण विजुअल आइडेंटिटी, एम्बर ग्लास ड्रॉपर बॉटल पैकेजिंग, बॉटनिकल लीफ लोगो और लक्ज़री कॉस्मेटिक रिटेल बॉक्स डिज़ाइन (ब्रांड 1-5 पैकेजिंग)।',
    challenge: 'Creating a high-end apothecary identity that balances scientific botanical efficacy with organic, earth-rooted herbal purity in a competitive cosmetic space.',
    solution: 'Designed an elegant vector leaf insignia, minimal serif typography, rich forest green and copper foil finishes, and precise regulatory packaging dielines.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'InDesign', 'Blender 3D'],
    colors: [
      { hex: '#263B2F', name: 'Forest Green' },
      { hex: '#D6A87C', name: 'Warm Copper' },
      { hex: '#F7F4EE', name: 'Herbal Cream' },
      { hex: '#1A1D1A', name: 'Botanical Charcoal' }
    ],
    typography: {
      heading: 'Cormorant Garamond Light',
      body: 'Plus Jakarta Sans Regular'
    },
    deliverables: [
      'Master Brand Logo Suite & Vector Marks',
      'Dropper Bottle Label Dielines (30ml & 50ml)',
      'Brand 1–5 Retail Carton Packaging with Foil Stamping',
      'Full Brand Style Guide (48 Pages)'
    ],
    featured: true,
    createdAt: Date.now() - 86400000 * 1
  },

  // 2. Japanese Skincare (JAPANESE SKINCARE.png)
  {
    id: 'proj-japanese-skincare',
    title: 'Zen Radiance · Japanese Skincare Rituals Packaging',
    titleHi: 'ज़ेन रेडिएंस · जापानी स्किनकेयर रिचुअल्स पैकेजिंग सिस्टम',
    category: 'Packaging',
    client: 'Pure Nihon Cosmetics Tokyo',
    year: '2026',
    coverImage: brandingImg,
    galleryImages: [brandingImg],
    description: 'Minimalist Japanese skincare packaging celebrating Ma (negative space), dual-script typography (Kanji & Latin), and tactile frosted glass essence containers.',
    descriptionHi: 'जापानी सौंदर्यशास्त्र (मा/नेगेटिव स्पेस) पर आधारित मिनिमलिस्ट स्किनकेयर पैकेजिंग, कांजी व लैटिन टाइपोग्राफी और फ्रॉस्टेड ग्लास सीरम बॉटल्स।',
    challenge: 'Expressing calm Japanese minimalism and purity without the packaging looking empty or generic on crowded international retail shelves.',
    solution: 'Crafted delicate grid layouts, subtle embossed circles reminiscent of enso, and gentle monochrome stone tones with soft tactile finishes.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Cinema 4D'],
    colors: [
      { hex: '#EBE7DF', name: 'Washi Cream' },
      { hex: '#8F908A', name: 'River Stone' },
      { hex: '#1C1C1E', name: 'Sumi Ink' },
      { hex: '#C29B78', name: 'Cedar Wood' }
    ],
    typography: {
      heading: 'Shippori Mincho & Syne',
      body: 'Inter Tight'
    },
    deliverables: [
      'Dual-Script Brand Wordmark',
      'Frosted Glass Serum & Cream Jar Dielines',
      'Eco-friendly Unboxing Outer Sleeves',
      '3D Realistic Product Renders'
    ],
    featured: true,
    createdAt: Date.now() - 86400000 * 2
  },

  // 3. 350ml Aam Mango Drink (350 ML AAM.png)
  {
    id: 'proj-350ml-aam',
    title: 'Amrut Ras 350ml Aam (Mango) · Beverage Wrap Label Packaging',
    titleHi: 'अमृत रस 350ml आम रस · बेवरेज रैप-अराउंड लेबल पैकेजिंग',
    category: 'Packaging',
    client: 'Amrut Ras Natural Beverages',
    year: '2026',
    coverImage: mangoDrinkImg,
    galleryImages: [mangoDrinkImg, coffeeImg],
    description: 'Dynamic wrap-around label design for 350ml PET bottles of Alphonso Aam (Mango) fruit drink, featuring vibrant splash vector art, sunburst gradients, and nutritional hierarchy.',
    descriptionHi: '350ml बॉटल के लिए अल्फोंसो आम ड्रिंक की आकर्षक रैप-अराउंड लेबल पैकेजिंग, फ्रूट स्प्लैश वेक्टर कला और पोषण संबंधी तालिका डिज़ाइन।',
    challenge: 'Creating a high-shelf-impact label that visually conveys real pulpy mango richness and meets FSSAI labeling mandates.',
    solution: 'Engineered golden-amber fruit vector splashes with high-contrast typography, regulatory barcodes, and airtight seal packaging specifications.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Esko Studio'],
    colors: [
      { hex: '#FFA200', name: 'Alphonso Gold' },
      { hex: '#E65100', name: 'Mango Sunset' },
      { hex: '#2E7D32', name: 'Fresh Leaf' },
      { hex: '#FFFFFF', name: 'Pure White' }
    ],
    typography: {
      heading: 'Clash Display Bold',
      body: 'Plus Jakarta Sans SemiBold'
    },
    deliverables: [
      '350ml PET Bottle Label Dieline with Bleeds',
      'Mango Splash Vector Illustration Assets',
      'FSSAI Regulatory Table & Nutritional Grid',
      'Store Shelf 3D Mockup Visuals'
    ],
    featured: true,
    createdAt: Date.now() - 86400000 * 3
  },

  // 4. Strawberry Drink (STRAWBERRY 1.png)
  {
    id: 'proj-strawberry-drink',
    title: 'Berry Splash Strawberry · Fruit Drink Label Packaging',
    titleHi: 'बेरी स्प्लैश स्ट्रॉबेरी · फ्रूट ड्रिंक बॉटल लेबल पैकेजिंग',
    category: 'Packaging',
    client: 'Amrut Ras Natural Beverages',
    year: '2026',
    coverImage: coffeeImg,
    galleryImages: [coffeeImg, mangoDrinkImg],
    description: 'Vibrant fruit beverage wrap packaging for fresh strawberry juice, featuring droplet splatter effects, rich crimson palettes, and clean consumer branding.',
    descriptionHi: 'ताजा स्ट्रॉबेरी फ्रूट जूस बॉटल के लिए आकर्षक स्प्लैश और ड्रॉपलेट विजुअल्स, रिच क्रिमसन पैलेट और मॉडर्न बेवरेज ब्रांडिंग।',
    challenge: 'Achieving uniform shelf family harmony alongside the 350ml Aam line while giving Strawberry an instantly recognizable ruby look.',
    solution: 'Preserved the core typography and layout grid of the beverage family while deploying hyper-saturated berry accents and dynamic fluid drops.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    colors: [
      { hex: '#E61E43', name: 'Ruby Strawberry' },
      { hex: '#880E4F', name: 'Deep Berry' },
      { hex: '#4CAF50', name: 'Stem Green' },
      { hex: '#FFF3E0', name: 'Cream Accent' }
    ],
    typography: {
      heading: 'Clash Display Bold',
      body: 'Plus Jakarta Sans Regular'
    },
    deliverables: [
      'Strawberry 350ml Wrap-around Dieline',
      'Vector Fruit Cluster Illustrations',
      'Direct Printer-Ready CMYK Output',
      'Promotional Social Launch Assets'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 4
  },

  // 5. Chandigarh Workshop Poster (WORKSHOP IN CHANDIGARH.png)
  {
    id: 'proj-chandigarh-workshop',
    title: 'Design Workshop Chandigarh · Typography & Visual Poster Series',
    titleHi: 'डिज़ाइन वर्कशॉप चंडीगढ़ · टाइपोग्राफी व विजुअल पोस्टर श्रृंखला',
    category: 'Print & Posters',
    client: 'Chandigarh Design Collective & Creative Arts',
    year: '2026',
    coverImage: editorialImg,
    galleryImages: [editorialImg, heroImg],
    description: 'Monumental architectural posters, bilingual Hindi-English typography, and modular Swiss grid layouts created for an intensive creative masterclass in Chandigarh.',
    descriptionHi: 'चंडीगढ़ में आयोजित डिज़ाइन मास्टरक्लास के लिए आर्किटेक्चरल ग्रिड, द्विभाषी हिंदी-अंग्रेजी टाइपोग्राफी और प्रदर्शनी पोस्टर डिज़ाइन।',
    challenge: 'Unifying Le Corbusier inspired modernist concrete geometry with fluid Devanagari lettering for a multi-day creative arts workshop.',
    solution: 'Engineered an asymmetric 12-column typographic system pairing raw grid lines, high-contrast red accents, and bilingual speaker schedules.',
    tools: ['Adobe InDesign', 'Adobe Illustrator', 'Glyphs'],
    colors: [
      { hex: '#0D0E11', name: 'Raw Basalt' },
      { hex: '#FF3B30', name: 'Chandigarh Red' },
      { hex: '#F4F4F0', name: 'Concrete White' },
      { hex: '#8E8E93', name: 'Brutalist Grey' }
    ],
    typography: {
      heading: 'Syne ExtraBold & Noto Serif Devanagari',
      body: 'General Sans'
    },
    deliverables: [
      'A1 Screen-printed Exhibition & Event Posters',
      'Social Media Announcement Graphics & Stories',
      'Attendee Badge Lanyards & Workshop Handbooks',
      'Stage Backdrop Vector Graphics'
    ],
    featured: true,
    createdAt: Date.now() - 86400000 * 5
  },

  // 6. The Best & Movie Poster (MOVIE POSTER.jpg, THE BEST.png, 17-09-26.png)
  {
    id: 'proj-movie-poster-the-best',
    title: 'The Best · Theatrical Movie Poster & Visual Key Art',
    titleHi: 'द बेस्ट · सिनेमा की-आर्ट और ड्रामैटिक मूवी पोस्टर डिज़ाइन',
    category: 'Print & Posters',
    client: 'Indie Cine Studios & Film Premieres',
    year: '2025',
    coverImage: moviePosterImg,
    galleryImages: [moviePosterImg],
    description: 'Atmospheric theatrical movie poster key visual, psychological lighting, high-contrast actor treatment, date title card (17-09-26), and industry billing block typography.',
    descriptionHi: 'सिनेमा प्रीमियर और फिल्म फेस्टिवल्स के लिए ड्रामैटिक की-विजुअल पोस्टर, हाई-कंट्रास्ट लाइटिंग और इंटरनेशनल बिलिंग ब्लॉक टाइपोग्राफी।',
    challenge: 'Evoking visceral emotional suspense and narrative intrigue within a single theatrical 27x40 inch key visual poster.',
    solution: 'Composed a dramatic chiaroscuro color palette with cinematic grain, distressed grunge textures, and commanding uppercase typography.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'After Effects'],
    colors: [
      { hex: '#0A0A0C', name: 'Cinema Pitch' },
      { hex: '#D13838', name: 'Thriller Crimson' },
      { hex: '#D8D8DF', name: 'Hazy Silver' },
      { hex: '#2A2B36', name: 'Shadow Indigo' }
    ],
    typography: {
      heading: 'Bebas Neue Pro & Syne',
      body: 'Steelworks / Univers Billing'
    },
    deliverables: [
      '27x40 inch Theatrical Bus-Shelter Movie Poster',
      'IMDb & Netflix Streaming Title Thumbnails',
      'Cast & Crew Billing Block Vector Lockup',
      'Digital Motion Poster Loop for Socials'
    ],
    featured: true,
    createdAt: Date.now() - 86400000 * 6
  },

  // 7. Mountains Way Bike Full Circuit (Mountains way Bike full circuit 2.pdf)
  {
    id: 'proj-mountain-bike-circuit',
    title: 'Mountains Way Bike Full Circuit · Travel Route Guide & Map Layout',
    titleHi: 'माउंटेन्स वे बाइक सर्किट · एडवेंचर ट्रैवल गाइड व रूट मैप',
    category: 'Print & Posters',
    client: 'Himalayan Expeditions & Eco-Trails',
    year: '2025',
    coverImage: editorialImg,
    galleryImages: [editorialImg],
    description: 'Topological adventure travel guide brochure, multi-stage cycling route elevations, weather charts, and pocket editorial field guide for mountain bikers.',
    descriptionHi: 'माउंटेन बाइकिंग के लिए टोपोलॉजिकल रूट मैप, एलीवेशन प्रोफाइल्स, मौसम चार्ट्स और वे-फाइंडिंग गाइड बुकलेट लेआउट।',
    challenge: 'Translating complex GPS topological data, steep elevation charts, and safety checkpoints into an intuitive, weatherproof pocket guide format.',
    solution: 'Crafted clean isometric waypoint icons, color-coded elevation gradients, water-resistant folding panels, and high-readability outdoor typography.',
    tools: ['Adobe InDesign', 'Adobe Illustrator', 'QGIS'],
    colors: [
      { hex: '#1E2D2F', name: 'Alpine Pine' },
      { hex: '#E76F51', name: 'Trail Orange' },
      { hex: '#F4A261', name: 'Sandstone' },
      { hex: '#E9ECEF', name: 'Glacier Snow' }
    ],
    typography: {
      heading: 'General Sans Bold',
      body: 'JetBrains Mono & Inter'
    },
    deliverables: [
      'Folded Multi-Panel Pocket Expedition Map (PDF)',
      'Elevation Profile & Checkpoint Infographics',
      'Waterproof Field Handbook Editorial Layout',
      'Interactive Vector Route Overlays'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 7
  },

  // 8. Untitled Creative Studies (Untitled-1 gghf.png)
  {
    id: 'proj-untitled-creative-study',
    title: 'Avant-Garde Visual Studies & Geometric Layout Exploration',
    titleHi: 'अवांट-गार्ड विजुअल स्टडीज व ज्यामितीय लेआउट एक्सप्लोरेशन',
    category: 'Print & Posters',
    client: 'Experimental Atelier Archive',
    year: '2025',
    coverImage: editorialImg,
    galleryImages: [editorialImg],
    description: 'Experimental graphic design exploration playing with unconventional grid breakages, negative space tension, and contemporary typography specimens.',
    descriptionHi: 'अपरंपरागत ग्रिड, स्पेसिंग और आधुनिक टाइपोग्राफी के संतुलन पर आधारित प्रायोगिक ग्राफिक डिज़ाइन आर्टवर्क।',
    challenge: 'Testing limits of legibility, hierarchy, and optical balance outside commercial constraints.',
    solution: 'Constructed rhythmic modular layouts with asymmetric axis lines and tactile paper texture overlays.',
    tools: ['Adobe Illustrator', 'Photoshop'],
    colors: [
      { hex: '#111215', name: 'Graphite' },
      { hex: '#E2E8F0', name: 'Mist White' },
      { hex: '#D97706', name: 'Amber Glow' },
      { hex: '#475569', name: 'Slate' }
    ],
    typography: {
      heading: 'Syne ExtraBold',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'High-Resolution Gallery Art Prints',
      'Digital Vector Explorations',
      'Artistic Poster Mockups'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 8
  },

  // 9. कैसे हुई राधा जी की मृत्यु (कैसे हुई राधा जी की मृत्यु.png, CAROUSEL.pdf)
  {
    id: 'proj-radha-death-carousel',
    title: 'कैसे हुई राधा जी की मृत्यु · Vedic Heritage Narrative Carousel',
    titleHi: 'कैसे हुई राधा जी की मृत्यु · आध्यात्मिक कथा कैरोसेल श्रृंखला',
    category: 'Social Media',
    client: 'Cultural Epics & Vedic Heritage Series',
    year: '2025',
    coverImage: hindiCarouselImg,
    galleryImages: [hindiCarouselImg],
    description: 'Emotional, research-backed multi-slide Instagram carousel exploring the departure of Shri Radha Rani in Hindu epic tradition. High hook rate with respectful storytelling.',
    descriptionHi: 'श्री राधा रानी के परम धाम गमन पर आधारित भावपूर्ण व रिसर्च-युक्त इंस्टाग्राम कैरोसेल पोस्ट, सुंदर देवनागरी टाइपोग्राफी और भक्तिमय विजुअल फ्लो।',
    challenge: 'Conveying deep spiritual reverence without becoming sensationalist, maintaining clean typographic readability across 10 slides.',
    solution: 'Designed warm gold-saffron chapter numerals, illuminated quotes, and respectful devotional iconography with seamless slide transitions.',
    tools: ['Adobe Photoshop', 'Figma', 'Adobe Illustrator'],
    colors: [
      { hex: '#D97706', name: 'Divine Saffron' },
      { hex: '#7F1D1D', name: 'Sacred Ochre' },
      { hex: '#FEF3C7', name: 'Temple Gold' },
      { hex: '#1C1917', name: 'Deep Bronze' }
    ],
    typography: {
      heading: 'Rozha One & Noto Sans Devanagari Bold',
      body: 'Plus Jakarta Sans Regular'
    },
    deliverables: [
      '10-Slide Complete Instagram Carousel',
      'High-converting Cover Slide Hook Design',
      'Print-ready Curated PDF Carousel Portfolio',
      'Story Highlights Artwork'
    ],
    featured: true,
    createdAt: Date.now() - 86400000 * 9
  },

  // 10. भगवान कृष्ण का जन्म रहस्य (भगवान कृष्ण ने आठवीं संतान रूप में ही जन्म क्यों लिया.png)
  {
    id: 'proj-krishna-birth-carousel',
    title: 'भगवान कृष्ण ने आठवीं संतान रूप में जन्म क्यों लिया · Epics Carousel',
    titleHi: 'भगवान कृष्ण ने आठवीं संतान रूप में ही जन्म क्यों लिया · कथा कैरोसेल',
    category: 'Social Media',
    client: 'Cultural Epics & Vedic Heritage Series',
    year: '2025',
    coverImage: hindiCarouselImg,
    galleryImages: [hindiCarouselImg],
    description: 'Theological and symbolic analysis of Lord Krishna’s divine descent as the 8th child, translated into engaging visual infographics for modern social media audiences.',
    descriptionHi: 'भगवान श्री कृष्ण के 8वें अवतार के आध्यात्मिक और प्रतीकात्मक रहस्य का ज्ञानवर्धक व आकर्षक सोशल मीडिया कैरोसेल प्रस्तुतीकरण।',
    challenge: 'Condensing complex Puranic philosophy into bite-sized, visually captivating carousel slides.',
    solution: 'Structured a clear narrative question-to-revelation hook format with illuminated drop caps and dramatic divine glow elements.',
    tools: ['Adobe Photoshop', 'Figma'],
    colors: [
      { hex: '#1E3A8A', name: 'Krishna Peacock Blue' },
      { hex: '#F59E0B', name: 'Pitambari Yellow' },
      { hex: '#F8FAFC', name: 'Pearl White' },
      { hex: '#0F172A', name: 'Midnight Sky' }
    ],
    typography: {
      heading: 'Noto Serif Devanagari ExtraBold',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'Multi-Slide Educational Storyboard',
      'Cover Slide Hook & Thumbnail Lockup',
      'Shareable Quote Cards for Instagram'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 10
  },

  // 11. जामवंत जी का रहस्य (राम से कृष्ण तक जामवंत जी का रहस्य.png)
  {
    id: 'proj-jamwant-rahasya',
    title: 'राम से कृष्ण तक जामवंत जी का रहस्य · Narrative Carousel',
    titleHi: 'राम से कृष्ण तक जामवंत जी का रहस्य · पौराणिक गाथा कैरोसेल',
    category: 'Social Media',
    client: 'Cultural Epics & Vedic Heritage Series',
    year: '2025',
    coverImage: hindiCarouselImg,
    galleryImages: [hindiCarouselImg],
    description: 'Epic timeline connecting the Ramayana and Mahabharata through the immortality and duel of Jambavantha with Lord Krishna, formatted as a viral historical carousel.',
    descriptionHi: 'रामायण और महाभारत को जोड़ने वाली जामवंत जी की अमर कथा और भगवान कृष्ण से मल्लयुद्ध का रोमांचक ऐतिहासिक कैरोसेल।',
    challenge: 'Illustrating a dual-era timeline across two ancient epics while keeping typography readable on mobile screens.',
    solution: 'Designed a vertical chronological journey map across slides with dramatic warrior silhouette accents and golden scripture citations.',
    tools: ['Adobe Photoshop', 'Figma', 'Illustrator'],
    colors: [
      { hex: '#78350F', name: 'Ancient Bark' },
      { hex: '#D97706', name: 'Sun Saffron' },
      { hex: '#FFFBEB', name: 'Parchment' },
      { hex: '#1C1917', name: 'Cave Charcoal' }
    ],
    typography: {
      heading: 'Rozha One & Syne',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'Chronological Timeline Carousel (8 Slides)',
      'Hero Cover Slide with High CTR Visuals',
      'Exported High-Resolution Assets'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 11
  },

  // 12. बादल बेनी बारिश की (बादल बेनी बारिश की.png)
  {
    id: 'proj-badal-beni-poetry',
    title: 'बादल बेनी बारिश की · Hindi Poetry & Literature Creative',
    titleHi: 'बादल बेनी बारिश की · हिंदी कविता व साहित्यिक विजुअल क्रिएटिव',
    category: 'Social Media',
    client: 'Kavya Kala Sahitya Collective',
    year: '2025',
    coverImage: hindiCarouselImg,
    galleryImages: [hindiCarouselImg],
    description: 'Poetic visual typography capturing the romanticism and melancholy of monsoon clouds and raindrops, with delicate Devanagari calligraphy.',
    descriptionHi: 'बादलों और वर्षा की बूंदों की प्राकृतिक सुंदरता और साहित्यिक भावों को दर्शाने वाला काव्यात्मक टाइपोग्राफी पोस्ट डिज़ाइन।',
    challenge: 'Expressing the fluid lyrical rhythm of Hindi verse through static graphic layout and atmospheric textures.',
    solution: 'Combined soft misty blues, water droplet vectors, and flowing calligraphy with ample breathing space.',
    tools: ['Adobe Illustrator', 'Photoshop'],
    colors: [
      { hex: '#1E293B', name: 'Rain Cloud' },
      { hex: '#38BDF8', name: 'Monsoon Blue' },
      { hex: '#F0F9FF', name: 'Misty Drop' },
      { hex: '#0F172A', name: 'Overcast Night' }
    ],
    typography: {
      heading: 'Noto Serif Devanagari Italic',
      body: 'Plus Jakarta Sans Regular'
    },
    deliverables: [
      'Social Media Poetry Square & Story Post',
      'Typographic Poster Layout',
      'Artistic Wallpaper Set'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 12
  },

  // 13. Why We Must Worship (WHY WE MUST WORSHIP.png)
  {
    id: 'proj-why-we-must-worship',
    title: 'Why We Must Worship · Spiritual & Philosophical Carousel',
    titleHi: 'व्हाई वी मस्ट वर्शिप · आध्यात्मिक व दार्शनिक इन्फोग्राफिक कैरोसेल',
    category: 'Social Media',
    client: 'Spiritual Wisdom Publishing',
    year: '2025',
    coverImage: hindiCarouselImg,
    galleryImages: [hindiCarouselImg],
    description: 'Modern philosophical breakdown addressing spiritual mindfulness, mental peace, and Vedic rituals with contemporary infographic clarity.',
    descriptionHi: 'मानसिक शांति, ध्यान और वैदिक पूजा के वैज्ञानिक और आध्यात्मिक महत्व को समझाने वाला आधुनिक सोशल मीडिया इन्फोग्राफिक।',
    challenge: 'Making traditional philosophical thought appealing and logically compelling to young digital audiences.',
    solution: 'Utilized clean minimalist iconography, numbered takeaways, and soothing meditative color transitions.',
    tools: ['Figma', 'Adobe Photoshop'],
    colors: [
      { hex: '#B45309', name: 'Sacred Gold' },
      { hex: '#451A03', name: 'Sandalwood' },
      { hex: '#FEF3C7', name: 'Warm Cream' },
      { hex: '#18181B', name: 'Zen Obsidian' }
    ],
    typography: {
      heading: 'Syne ExtraBold',
      body: 'Inter & Plus Jakarta Sans'
    },
    deliverables: [
      'Multi-Slide Thought-Leadership Carousel',
      'High-Impact Instagram Story Templates',
      'Saveable Mind-Map Infographics'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 13
  },

  // 14. Every Time I Think Of (Every time I think of.png)
  {
    id: 'proj-every-time-i-think',
    title: 'Every Time I Think Of · Typographic Quote & Expressive Visual',
    titleHi: 'एवरी टाइम आई थिंक ऑफ़ · टाइपोग्राफिक कोट व सोशल मीडिया आर्ट',
    category: 'Social Media',
    client: 'Contemporary Lettering Studio',
    year: '2025',
    coverImage: editorialImg,
    galleryImages: [editorialImg],
    description: 'Expressive editorial lettering and heartfelt typography treatment exploring memory, longing, and delicate modern sentiment.',
    descriptionHi: 'यादों और भावनाओं पर आधारित संवेदनशील टाइपोग्राफी आर्टवर्क, कस्टम लेटरिंग और मॉडर्न सोशल मीडिया विजुअल।',
    challenge: 'Pairing modern display serif letterforms with intimate emotional subtext in a balanced editorial composition.',
    solution: 'Designed high-contrast italic serifs with generous kerning and gentle paper grain textures.',
    tools: ['Adobe Illustrator', 'Photoshop'],
    colors: [
      { hex: '#18181B', name: 'Dark Ink' },
      { hex: '#F43F5E', name: 'Rose Blush' },
      { hex: '#F5F5F4', name: 'Cotton Sheet' },
      { hex: '#71717A', name: 'Pencil Grey' }
    ],
    typography: {
      heading: 'Instrument Serif Italic',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'Editorial Instagram Square Post (1080x1080)',
      'Fullscreen Phone Wallpaper Version',
      'Vector Lettering Lockup'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 14
  },

  // 15. Mandala Art 1 (MANDALA ART 1.png)
  {
    id: 'proj-mandala-art-1',
    title: 'Sacred Mandala Art 1 · Vedic Symmetry Meditation Print',
    titleHi: 'पवित्र मंडाला आर्ट 1 · वैदिक सममिति मेडिटेशन प्रिंट',
    category: 'UI & Digital',
    client: 'Fine Art Editions & Sacred Geometry',
    year: '2025',
    coverImage: mandalaImg,
    galleryImages: [mandalaImg],
    description: 'Micro-detailed vector mandala artwork based on ancient Vedic cosmic geometry, featuring concentric floral petals, stippled dots, and golden metallic gradations.',
    descriptionHi: 'प्राचीन वैदिक ब्रह्मांडीय ज्यामिति पर आधारित सूक्ष्म वेक्टर मंडाला कलाकृति, जिसमें पुष्प पंखुड़ियां और सुनहरी आभा शामिल हैं।',
    challenge: 'Achieving sub-millimeter rotational symmetry across over 1,200 anchor points while maintaining file scalability.',
    solution: 'Engineered custom 24-spoke polar grid templates in Illustrator, balancing micro-stippling with bold outer silhouettes.',
    tools: ['Adobe Illustrator', 'Wacom Cintiq', 'Photoshop'],
    colors: [
      { hex: '#0B132B', name: 'Cosmic Blue' },
      { hex: '#D4AF37', name: 'Imperial Gold' },
      { hex: '#FAF0CA', name: 'Parchment Luster' },
      { hex: '#1C2541', name: 'Deep Space' }
    ],
    typography: {
      heading: 'Cinzel Decorative',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'High-Resolution Scalable Vector Artwork (SVG & EPS)',
      '300 DPI Museum Giclée Print Files',
      'Laser-cutting Vector Dielines for Decor'
    ],
    featured: true,
    createdAt: Date.now() - 86400000 * 15
  },

  // 16. Royal Indian Bride (BRIDE.png)
  {
    id: 'proj-bride-illustration',
    title: 'Royal Indian Bride · Traditional Bridal Vector Portrait',
    titleHi: 'रॉयल इंडियन ब्राइड · पारंपरिक दुल्हन डिजिटल वेक्टर पोट्रेट',
    category: 'UI & Digital',
    client: 'Heritage Wedding Couture & Digital Art Commissions',
    year: '2025',
    coverImage: mandalaImg,
    galleryImages: [mandalaImg, heroImg],
    description: 'Exquisite vector illustration of an Indian bride adorned in traditional golden zari jewelry, embroidered veil (chunari), and royal wedding attire.',
    descriptionHi: 'शाही भारतीय दुल्हन का भव्य डिजिटल वेक्टर चित्रण, पारंपरिक कुंदन आभूषण, नथ, मांगटीका और सुनहरी चुनरी का बारीक काम।',
    challenge: 'Rendering delicate sheer fabrics, intricate gold filigree jewelry, and expressive human emotion entirely in vector paths.',
    solution: 'Used multi-layered gradient meshes and intricate gold stroke brushes to reproduce realistic metallic sheen and sheer textile transparency.',
    tools: ['Adobe Illustrator', 'Procreate', 'Photoshop'],
    colors: [
      { hex: '#991B1B', name: 'Bridal Crimson' },
      { hex: '#D4AF37', name: 'Kundan Gold' },
      { hex: '#FEF3C7', name: 'Zari Shimmer' },
      { hex: '#1F2937', name: 'Velvet Charcoal' }
    ],
    typography: {
      heading: 'Rozha One & Cormorant Garamond',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'Ultra-HD Scalable Vector Portrait',
      'Luxury Wedding Invitation Suite Artwork',
      'Digital Commemorative Print File'
    ],
    featured: true,
    createdAt: Date.now() - 86400000 * 16
  },

  // 17. Small Mahabali (SMALL MAHABALI.png)
  {
    id: 'proj-small-mahabali',
    title: 'Small Mahabali · Onam Festival Character Vector Art',
    titleHi: 'स्मॉल महाबली · ओणम उत्सव कैरेक्टर वेक्टर आर्ट',
    category: 'UI & Digital',
    client: 'Kerala Cultural Mascot & Festival Creatives',
    year: '2025',
    coverImage: mandalaImg,
    galleryImages: [mandalaImg],
    description: 'Charming and affectionate stylized vector mascot of King Mahabali carrying the traditional palm-leaf umbrella (Olakkuda) for Onam festival greetings.',
    descriptionHi: 'राजा महाबली का आकर्षक व सौम्य कार्टून वेक्टर कैरेक्टर, पारंपरिक ताड़ के छाते (ओलाक्कुडा) के साथ ओणम त्योहार का विजुअल।',
    challenge: 'Balancing cute character design appeal with cultural authenticity and reverence.',
    solution: 'Designed bold friendly silhouettes, cheerful facial expressions, and authentic traditional Kerala mundu and crown details.',
    tools: ['Adobe Illustrator', 'Procreate'],
    colors: [
      { hex: '#F59E0B', name: 'Marigold Yellow' },
      { hex: '#10B981', name: 'Banana Leaf Green' },
      { hex: '#B45309', name: 'Kasavu Gold' },
      { hex: '#FFFFFF', name: 'Kerala Mundu White' }
    ],
    typography: {
      heading: 'Clash Display Bold',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'Scalable Mascot Vector Character in 4 Poses',
      'Festival Social Media Greeting Templates',
      'Sticker Pack & Merchandising Vector Assets'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 17
  },

  // 18. Digital Illustration Series 2 (illus 2.png)
  {
    id: 'proj-illus-series-2',
    title: 'Modern Vector Character & Stylized Illustration Series 2',
    titleHi: 'मॉडर्न वेक्टर कैरेक्टर व स्टाइलइज्ड इलस्ट्रेशन सीरीज़ 2',
    category: 'UI & Digital',
    client: 'Digital Storybook & Visual Editorial',
    year: '2025',
    coverImage: mandalaImg,
    galleryImages: [mandalaImg],
    description: 'Contemporary stylized vector illustration showcasing expressive digital storytelling, dynamic linework, and whimsical character design.',
    descriptionHi: 'समकालीन डिजिटल कहानी कहने की कला पर आधारित आधुनिक वेक्टर इलस्ट्रेशन, डायनामिक लाइन्स और कैरेक्टर डिज़ाइन।',
    challenge: 'Creating memorable, stylized visual assets suitable for editorial and website headers.',
    solution: 'Focused on geometric silhouettes, subtle grain shading, and harmonious limited color palettes.',
    tools: ['Adobe Illustrator', 'Photoshop'],
    colors: [
      { hex: '#3B82F6', name: 'Electric Blue' },
      { hex: '#F43F5E', name: 'Coral Punch' },
      { hex: '#F8FAFC', name: 'Pure Canvas' },
      { hex: '#1E293B', name: 'Midnight Charcoal' }
    ],
    typography: {
      heading: 'Syne ExtraBold',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'Scalable Vector Hero Illustration',
      'Editorial Asset Pack (SVG & PNG)',
      'Mobile App Onboarding Screens'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 18
  },

  // 19. Artboard Series 0 to 22 Master Suite (Artboard 0.png to Artboard 22.png)
  {
    id: 'proj-artboard-vector-suite',
    title: 'Artboard Series 0 to 22 · Vector Compositions & Graphic Collateral',
    titleHi: 'आर्टबोर्ड सीरीज़ 0 से 22 · वेक्टर कम्पोज़िशन्स व ग्राफिक संग्रह',
    category: 'UI & Digital',
    client: 'Creative Studio Master Design Archives',
    year: '2025',
    coverImage: heroImg,
    galleryImages: [heroImg, mandalaImg],
    description: 'Comprehensive 22-artboard design repository encompassing diverse graphic explorations: Artboard 0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 16, 17, 18, 19, 20, 21, and 22.',
    descriptionHi: '22 अलग-अलग आर्टबोर्ड्स का सम्पूर्ण डिज़ाइन संग्रह जिसमें विविध वेक्टर अन्वेषण, पोस्टर लेआउट्स और विजुअल एसेट्स शामिल हैं।',
    challenge: 'Organizing and unifying a vast body of creative design experiments across diverse themes and scales.',
    solution: 'Curated a modular portfolio collection highlighting versatility across icons, typography specimens, posters, and digital banners.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
    colors: [
      { hex: '#18181B', name: 'Zinc Slate' },
      { hex: '#EAB308', name: 'Studio Yellow' },
      { hex: '#6366F1', name: 'Digital Indigo' },
      { hex: '#F4F4F5', name: 'Paper White' }
    ],
    typography: {
      heading: 'Syne ExtraBold',
      body: 'Plus Jakarta Sans Medium'
    },
    deliverables: [
      '22x Master Illustrator Artboard Files',
      'Complete Vector Asset Collection (SVG, AI, PDF)',
      'Digital Showcase Slides for Portfolios'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 19
  },

  // 20. Commercial Projects Suite 1 to 12 (PRO JECT 1.jpg to PRO JECT 12.jpg)
  {
    id: 'proj-commercial-projects-suite',
    title: 'Commercial Brand Identity Suite · Client Projects 1 to 12',
    titleHi: 'कमर्शियल ब्रांड आइडेंटिटी सुइट · क्लाइंट प्रोजेक्ट्स 1 से 12',
    category: 'Branding',
    client: 'Enterprise Brands & Retail Companies',
    year: '2025',
    coverImage: heroImg,
    galleryImages: [heroImg, brandingImg],
    description: 'Comprehensive showcase spanning Projects 1 through 12, featuring master vector logos, stationery, product packaging, and brand design guidelines for corporate clients.',
    descriptionHi: 'कमर्शियल क्लाइंट्स के लिए प्रोजेक्ट 1 से 12 तक का सम्पूर्ण ब्रांड आइडेंटिटी संग्रह, जिसमें लोगो, स्टेशनरी और पैकेजिंग शामिल हैं।',
    challenge: 'Delivering distinctive and legally registrable visual identities across 12 diverse business sectors.',
    solution: 'Conducted in-depth competitor audits and designed bespoke geometric monograms, color hierarchies, and unified brand books.',
    tools: ['Adobe Illustrator', 'Adobe InDesign', 'Photoshop Mockup Studio'],
    colors: [
      { hex: '#0F172A', name: 'Corporate Slate' },
      { hex: '#D97706', name: 'Gold Leaf' },
      { hex: '#F8FAFC', name: 'Clean Bond' },
      { hex: '#475569', name: 'Neutral Grey' }
    ],
    typography: {
      heading: 'Syne SemiBold & Instrument Serif',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      '12 Master Vector Logo Lockups & Marks',
      'Corporate Stationery (Business Cards, Envelopes)',
      'Brand Guideline Documentation (PDF)',
      'Full Vector Asset Repository'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 20
  },

  // 21. Brand Architecture 1 to 5 (BRAND 1.png to BRAND 5.png, BRAND 2.jpg - BRAND 4.jpg)
  {
    id: 'proj-brand-systems-suite',
    title: 'Brand Architecture 1 to 5 · Monograms & Identity Standards',
    titleHi: 'ब्रांड सिस्टम आर्किटेक्चर 1 से 5 · मोनोग्राम व पहचान मानक',
    category: 'Branding',
    client: 'Verve & Modern Ventures',
    year: '2025',
    coverImage: brandingImg,
    galleryImages: [brandingImg, heroImg],
    description: 'Systematic corporate brand identity architecture from Brand 1 through Brand 5, detailing logo variations, spacing rules, color formulations, and packaging stamps.',
    descriptionHi: 'ब्रांड 1 से 5 तक के कॉर्पोरेट पहचान मानक, लोगो वेरिएशन्स, स्पेसिंग रूल्स, कलर फॉर्मूलेशन और पैकेजिंग सील डिज़ाइन।',
    challenge: 'Maintaining cohesive sub-brand identity hierarchy while ensuring distinct product vertical recognition.',
    solution: 'Created an overarching master brand grid with modular color accents and uniform type scales.',
    tools: ['Adobe Illustrator', 'InDesign'],
    colors: [
      { hex: '#1C1917', name: 'Warm Charcoal' },
      { hex: '#B45309', name: 'Bronze Foil' },
      { hex: '#F5F5F4', name: 'Linen White' },
      { hex: '#78716C', name: 'Stone Grey' }
    ],
    typography: {
      heading: 'General Sans & Syne',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'Brand 1–5 Master Mark Suites',
      'Sub-brand Style Specification Sheets',
      'Foil-stamping & Spot-UV Guidelines'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 21
  },

  // 22. Editorial Numbers 1, 5, 7 (1.png, 5.png, 7.png)
  {
    id: 'proj-creative-number-series',
    title: 'Editorial Number Series (1, 5, 7) · Minimalist Typography Art',
    titleHi: 'एडिटोरियल नंबर सीरीज़ (1, 5, 7) · मिनिमल टाइपोग्राफी आर्ट',
    category: 'Branding',
    client: 'Typographic Specimen Edition',
    year: '2025',
    coverImage: editorialImg,
    galleryImages: [editorialImg],
    description: 'High-contrast typographic numeral studies celebrating the sculptural geometry and curves of figures 1, 5, and 7 on gallery-grade backgrounds.',
    descriptionHi: 'अंक 1, 5 और 7 के ज्यामितीय घुमावों और टाइपोग्राफिक सुंदरता पर आधारित मिनिमलिस्ट आर्टवर्क श्रृंखला।',
    challenge: 'Transforming standalone numerical symbols into emotionally compelling artistic centerpieces.',
    solution: 'Paired oversized display serifs with negative space framing, tactile grain, and fine hairline strokes.',
    tools: ['Adobe Illustrator', 'Glyphs'],
    colors: [
      { hex: '#09090B', name: 'Jet Black' },
      { hex: '#FAFAFA', name: 'Gallery White' },
      { hex: '#E11D48', name: 'Crimson Accent' },
      { hex: '#71717A', name: 'Neutral Grey' }
    ],
    typography: {
      heading: 'Instrument Serif & Syne',
      body: 'Plus Jakarta Sans'
    },
    deliverables: [
      'Fine Art Specimen Posters (1, 5, 7)',
      'Vector Numeral Glyph Sets',
      'Editorial Layout Badges'
    ],
    featured: false,
    createdAt: Date.now() - 86400000 * 22
  },

  // 23. Vandana Resume & Creative Profile (Artboard 7 RESUME.png, Vandana Filming Raw.png)
  {
    id: 'proj-vandana-resume-profile',
    title: 'Vandana Graphic Designer Resume & Creative Studio Profile',
    titleHi: 'वंदना ग्राफिक डिज़ाइनर रिज्यूमे व स्टूडियो प्रोफाइल',
    category: 'Branding',
    client: 'Vandana Studio (Personal Creative Practice)',
    year: '2026',
    coverImage: avatarImg,
    galleryImages: [avatarImg, heroImg],
    description: 'Official graphic designer resume (Artboard 7 RESUME), behind-the-scenes production reels (Vandana Filming Raw), creative software mastery matrix, and client testimonials.',
    descriptionHi: 'आधिकारिक ग्राफिक डिज़ाइनर रिज्यूमे (आर्टबोर्ड 7), बिहाइंड-द-सीन्स प्रॉडक्शन रील्स, सॉफ्टवेयर टूल्स दक्षता और डिज़ाइन कार्यप्रणाली।',
    challenge: 'Designing a compelling, professional creative resume that demonstrates design mastery through its own typography and layout.',
    solution: 'Engineered an ultra-clean editorial resume layout with clear career milestones, core software badges, and immediate download options.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma'],
    colors: [
      { hex: '#121215', name: 'Atelier Dark' },
      { hex: '#D4AF37', name: 'Gold Leaf' },
      { hex: '#FFFFFF', name: 'Crisp White' },
      { hex: '#71717A', name: 'Cool Grey' }
    ],
    typography: {
      heading: 'Syne ExtraBold',
      body: 'Plus Jakarta Sans Medium'
    },
    deliverables: [
      'Print-ready Designer Resume (Artboard 7 RESUME)',
      'Behind-the-Scenes Creative Production Video Branding',
      'Interactive Design Portfolio Deck (PDF)',
      'Direct WhatsApp & Email Booking Integration'
    ],
    featured: true,
    createdAt: Date.now() - 86400000 * 23
  }
];

export const DESIGN_SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    number: '01',
    title: 'Brand Identity & Logo Systems',
    titleHi: 'ब्रांड पहचान और लोगो सिस्टम',
    description: 'End-to-end visual identity crafted to build trust, command premium pricing, and scale seamlessly across all touchpoints.',
    descriptionHi: 'लोगो डिज़ाइन, ब्रांड रंग पट्टिका, टाइपोग्राफी और संपूर्ण ब्रांड गाइडलाइन्स जो आपके व्यवसाय को प्रीमियम पहचान दिलाएं।',
    deliverables: [
      'Primary, secondary & sub-mark logo assets',
      'Comprehensive Brand Guideline Manual (PDF)',
      'Color Palette (CMYK, RGB, Pantone, HEX)',
      'Font hierarchy & typography pairings',
      'Vector master source files (AI, EPS, SVG, PNG)'
    ],
    turnaround: '2–3 Weeks',
    startingPrice: '$650',
    startingPriceInr: '₹28,000'
  },
  {
    id: 'serv-2',
    number: '02',
    title: 'Packaging & Label Architecture',
    titleHi: 'पैकेजिंग और लेबल डिज़ाइन',
    description: 'Shelf-stopping product packaging and label dielines engineered for retail visibility, tactile luxury, and consumer unboxing joy.',
    descriptionHi: 'उत्पादों के लिए आकर्षक बॉक्स, बॉटल लेबल, पाउच और मुद्रण-योग्य डाई-लाइन्स (Dielines) डिज़ाइन।',
    deliverables: [
      'Print-ready packaging dielines with bleeds',
      'Realistic 3D mockup renders for marketing',
      'Label design & nutritional layout compliance',
      'Finishing specs (foil stamp, spot UV, emboss)',
      'Direct printer-ready PDF & vector files'
    ],
    turnaround: '2 Weeks',
    startingPrice: '$550',
    startingPriceInr: '₹22,000'
  },
  {
    id: 'serv-3',
    number: '03',
    title: 'Print, Posters & Editorial Layouts',
    titleHi: 'प्रिंट, पोस्टर्स और एडिटोरियल डिज़ाइन',
    description: 'Masterfully typeset publications, exhibition catalogues, promotional brochures, business collateral, and large-format graphics.',
    descriptionHi: 'कैटलॉग, ब्रोशर, बिजनेस स्टेशनरी, इवेंट पोस्टर्स और मुद्रण योग्य कॉर्पोरेट सामग्री का आधुनिक डिज़ाइन।',
    deliverables: [
      'Brochures, magazines & annual reports',
      'Business cards, letterheads & envelopes',
      'Event & promotional poster series',
      'Large format banners & trade show booths',
      'High-res CMYK files with crop marks'
    ],
    turnaround: '1–2 Weeks',
    startingPrice: '$400',
    startingPriceInr: '₹15,000'
  },
  {
    id: 'serv-4',
    number: '04',
    title: 'Social Media & Marketing Creatives',
    titleHi: 'सोशल मीडिया और डिजिटल विज्ञापन',
    description: 'High-conversion Instagram carousels, campaign banners, ad creatives, and editable Canva/Figma templates for daily brand posting.',
    descriptionHi: 'इंस्टाग्राम कैरोसेल, फेसबुक एड्स, यूट्यूब थंबनेल्स और एडिटेबल टेम्प्लेट्स जो सोशल मीडिया पर एंगेजमेंट बढ़ाएं।',
    deliverables: [
      '15–30 custom branded social media posts/carousels',
      'Editable Figma/Canva templates for your team',
      'Story layouts & highlight icons',
      'Ad creatives optimized for Meta & Google',
      'Content calendar visual framework'
    ],
    turnaround: '5–7 Days',
    startingPrice: '$350',
    startingPriceInr: '₹14,000'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Vandana completely transformed our organic skincare brand. Her attention to typography, packaging dielines, and foil details elevated Herbloom Naturals onto premium luxury shelves.',
    quoteHi: 'वंदना ने हमारे स्किनकेयर ब्रांड हर्बलूम नेचुरल्स को पूरी तरह से नया प्रीमियम रूप दिया। टाइपोग्राफी और पैकेजिंग की बारीकियों ने प्रोडक्ट्स को टॉप स्टोर्स में पहुंचाया।',
    author: 'Ananya Singhania',
    role: 'Founder & CEO',
    company: 'Herbloom Naturals Organics',
    rating: 5
  },
  {
    id: 'test-2',
    quote: 'Her visual identity and 350ml beverage label work was brilliant. Vibrant colors, perfect print dielines, and customers constantly appreciate the aesthetic artwork.',
    quoteHi: 'अमृत रस 350ml ड्रिंक पैकेजिंग के लिए उनका काम अद्भुत था। रंग, प्रिंट डाई-लाइन्स और डिजाइन की ग्राहक हमेशा तारीफ करते हैं।',
    author: 'Rohan Mehra',
    role: 'Co-Founder',
    company: 'Amrut Ras Beverages',
    rating: 5
  },
  {
    id: 'test-3',
    quote: 'The best graphic designer for Hindi editorial carousels and brand design. Her storytelling layouts, mandala sacred art, and design craft are truly world class.',
    quoteHi: 'हिंदी एडिटोरियल कैरोसेल्स और ब्रांड डिज़ाइन के लिए बेहतरीन ग्राफिक डिज़ाइनर। उनकी विजुअल स्टोरीटेलिंग और कला वाकई विश्व स्तरीय है।',
    author: 'Vikramaditya Bose',
    role: 'Creative Director',
    company: 'Chandigarh Design Collective',
    rating: 5
  }
];
