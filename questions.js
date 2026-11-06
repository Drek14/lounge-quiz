// Question bank — Easy, Medium and Hard, Aussie-flavoured. Flags and Pictures are drawn inline so they load instantly.
// Format: { cat, q, options:[4 strings], a: index of correct option, svg?: inline svg string }
// Add your own anywhere in here. Photo questions come from photos/manifest.json (see README).

const CATEGORIES = [
  { id: 'sports',   name: 'Sports',        icon: '🏉', color: '#ff6b35' },
  { id: 'history',  name: 'History',       icon: '🏛️', color: '#c9a227' },
  { id: 'maths',    name: 'Maths',         icon: '🔢', color: '#2ec4b6' },
  { id: 'advmaths', name: 'Advanced Maths',icon: '∫',  color: '#3a86ff' },
  { id: 'geo',      name: 'Geography',     icon: '🌏', color: '#06d6a0' },
  { id: 'science',  name: 'Science',       icon: '🧪', color: '#8338ec' },
  { id: 'movies',   name: 'Movies & TV',   icon: '🎬', color: '#ef476f' },
  { id: 'music',    name: 'Music',         icon: '🎵', color: '#ff2e97' },
  { id: 'food',     name: 'Food & Drink',  icon: '🍔', color: '#ffbe0b' },
  { id: 'flags',    name: 'Flags',         icon: '🚩', color: '#fb5607' },
  { id: 'pop',      name: 'Pop Culture',   icon: '⭐', color: '#f72585' },
  { id: 'aussie',   name: 'Aussie',        icon: '🇦🇺', color: '#1b998b' },
  { id: 'animals',  name: 'Animals',       icon: '🐨', color: '#80b918' },
  { id: 'tech',     name: 'Tech',          icon: '💻', color: '#4895ef' },
  { id: 'games',    name: 'Video Games',   icon: '🎮', color: '#7209b7' },
  { id: 'cars',     name: 'Cars',          icon: '🏎️', color: '#d62828' },
  { id: 'space',    name: 'Space',         icon: '🚀', color: '#3d5a80' },
  { id: 'body',     name: 'Human Body',    icon: '🫀', color: '#e76f51' },
  { id: 'words',    name: 'Words & Slang', icon: '🔤', color: '#2a9d8f' },
  { id: 'myth',     name: 'Myths & Legends', icon: '⚡', color: '#9d4edd' },
  { id: 'brands',   name: 'Brands',        icon: '🏷️', color: '#f77f00' },
  { id: 'books',    name: 'Art & Books',   icon: '📚', color: '#6d597a' },
  { id: 'pics',     name: 'Pictures',      icon: '🖼️', color: '#00b4d8' },
  { id: 'photo',    name: 'Your Photos',   icon: '📸', color: '#7b2cbf' }, // added on the host phone
];

// ---- Flag SVGs (so the Flags round works on any TV without emoji support) ----
const star = (cx, cy, R, r, fill) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const ang = (-90 + i * 36) * Math.PI / 180;
    const rad = i % 2 === 0 ? R : r;
    pts.push((cx + rad * Math.cos(ang)).toFixed(3) + ',' + (cy + rad * Math.sin(ang)).toFixed(3));
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
};
const F = {
  sweden:      `<svg viewBox="0 0 16 10"><rect width="16" height="10" fill="#006AA7"/><rect x="5" width="2" height="10" fill="#FECC02"/><rect y="4" width="16" height="2" fill="#FECC02"/></svg>`,
  ireland:     `<svg viewBox="0 0 3 2"><rect width="1" height="2" fill="#169B62"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#FF883E"/></svg>`,
  nigeria:     `<svg viewBox="0 0 3 2"><rect width="1" height="2" fill="#008751"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#008751"/></svg>`,
  thailand:    `<svg viewBox="0 0 6 4"><rect width="6" height="4" fill="#A51931"/><rect y="0.667" width="6" height="2.667" fill="#fff"/><rect y="1.333" width="6" height="1.333" fill="#2D2A4A"/></svg>`,
  netherlands: `<svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#21468B"/><rect width="3" height="1.333" fill="#fff"/><rect width="3" height="0.667" fill="#AE1C28"/></svg>`,
  colombia:    `<svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#CE1126"/><rect width="3" height="1.5" fill="#003893"/><rect width="3" height="1" fill="#FCD116"/></svg>`,
  chile:       `<svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#D52B1E"/><rect width="3" height="1" fill="#fff"/><rect width="1" height="1" fill="#0039A6"/>${star(0.5,0.5,0.3,0.12,'#fff')}</svg>`,
  vietnam:     `<svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#DA251D"/>${star(1.5,1,0.6,0.24,'#FFFF00')}</svg>`,
  austria:     `<svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#ED2939"/><rect y="0.667" width="3" height="0.667" fill="#fff"/></svg>`,
  finland:     `<svg viewBox="0 0 18 11"><rect width="18" height="11" fill="#fff"/><rect x="5" width="3" height="11" fill="#003580"/><rect y="4" width="18" height="3" fill="#003580"/></svg>`,
  denmark:     `<svg viewBox="0 0 37 28"><rect width="37" height="28" fill="#C60C30"/><rect x="12" width="4" height="28" fill="#fff"/><rect y="12" width="37" height="4" fill="#fff"/></svg>`,
  norway:      `<svg viewBox="0 0 22 16"><rect width="22" height="16" fill="#BA0C2F"/><rect x="6" width="4" height="16" fill="#fff"/><rect y="6" width="22" height="4" fill="#fff"/><rect x="7" width="2" height="16" fill="#00205B"/><rect y="7" width="22" height="2" fill="#00205B"/></svg>`,
  iceland:     `<svg viewBox="0 0 25 18"><rect width="25" height="18" fill="#02529C"/><rect x="7" width="4" height="18" fill="#fff"/><rect y="7" width="25" height="4" fill="#fff"/><rect x="8" width="2" height="18" fill="#DC1E35"/><rect y="8" width="25" height="2" fill="#DC1E35"/></svg>`,
  switzerland: `<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="#FF0000"/><rect x="13" y="6" width="6" height="20" fill="#fff"/><rect x="6" y="13" width="20" height="6" fill="#fff"/></svg>`,
  greece:      `<svg viewBox="0 0 27 18"><rect width="27" height="18" fill="#0D5EAF"/>${[1,3,5,7].map(i=>`<rect y="${i*2}" width="27" height="2" fill="#fff"/>`).join('')}<rect width="10" height="10" fill="#0D5EAF"/><rect x="4" width="2" height="10" fill="#fff"/><rect y="4" width="10" height="2" fill="#fff"/></svg>`,
  jamaica:     `<svg viewBox="0 0 12 6"><rect width="12" height="6" fill="#009B3A"/><polygon points="0,0 6,3 0,6" fill="#000"/><polygon points="12,0 6,3 12,6" fill="#000"/><path d="M0,0 L12,6 M12,0 L0,6" stroke="#FED100" stroke-width="1.2"/></svg>`,
  bangladesh:  `<svg viewBox="0 0 10 6"><rect width="10" height="6" fill="#006A4E"/><circle cx="4.5" cy="3" r="2" fill="#F42A41"/></svg>`,
  poland:      `<svg viewBox="0 0 8 5"><rect width="8" height="5" fill="#DC143C"/><rect width="8" height="2.5" fill="#fff"/></svg>`,
  belgium:     `<svg viewBox="0 0 3 2"><rect width="1" height="2" fill="#000"/><rect x="1" width="1" height="2" fill="#FAE042"/><rect x="2" width="1" height="2" fill="#ED2939"/></svg>`,
  romania:     `<svg viewBox="0 0 3 2"><rect width="1" height="2" fill="#002B7F"/><rect x="1" width="1" height="2" fill="#FCD116"/><rect x="2" width="1" height="2" fill="#CE1126"/></svg>`,
  hungary:     `<svg viewBox="0 0 6 3"><rect width="6" height="3" fill="#477050"/><rect width="6" height="2" fill="#fff"/><rect width="6" height="1" fill="#CE2939"/></svg>`,
  estonia:     `<svg viewBox="0 0 11 7"><rect width="11" height="7" fill="#fff"/><rect width="11" height="4.667" fill="#000"/><rect width="11" height="2.333" fill="#0072CE"/></svg>`,
  lithuania:   `<svg viewBox="0 0 5 3"><rect width="5" height="3" fill="#C1272D"/><rect width="5" height="2" fill="#006A44"/><rect width="5" height="1" fill="#FDB913"/></svg>`,
  turkey:      `<svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#E30A17"/><circle cx="1.1" cy="1" r="0.5" fill="#fff"/><circle cx="1.225" cy="1" r="0.4" fill="#E30A17"/>${star(1.65,1,0.25,0.1,'#fff')}</svg>`,
};

// ---- Picture round (planets, Aussie road signs, visual maths) ----
const SPACE = (inner) => `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#05060f"/><circle cx="40" cy="50" r="1.5" fill="#fff"/><circle cx="330" cy="40" r="1" fill="#fff"/><circle cx="370" cy="250" r="1.5" fill="#fff"/><circle cx="90" cy="260" r="1" fill="#fff"/><circle cx="250" cy="20" r="1" fill="#fff"/>${inner}</svg>`;
const P = {
  saturn:  SPACE(`<ellipse cx="200" cy="150" rx="150" ry="38" fill="none" stroke="#d9c38f" stroke-width="14" opacity=".85"/><circle cx="200" cy="150" r="70" fill="#e8d5a3"/><path d="M50,150 A150,38 0 0 0 350,150" fill="none" stroke="#d9c38f" stroke-width="14" opacity=".85"/>`),
  jupiter: SPACE(`<clipPath id="j"><circle cx="200" cy="150" r="110"/></clipPath><g clip-path="url(#j)"><rect x="90" y="40" width="220" height="220" fill="#e8c9a0"/><rect x="90" y="70" width="220" height="22" fill="#c98b5a"/><rect x="90" y="115" width="220" height="30" fill="#b9754a"/><rect x="90" y="165" width="220" height="18" fill="#d2a06e"/><rect x="90" y="205" width="220" height="24" fill="#c08157"/><ellipse cx="245" cy="178" rx="26" ry="14" fill="#b43a2a"/></g>`),
  mars:    SPACE(`<circle cx="200" cy="150" r="95" fill="#c1440e"/><circle cx="170" cy="120" r="14" fill="#9e3409"/><circle cx="235" cy="175" r="22" fill="#a83a0b"/><circle cx="200" cy="65" r="18" fill="#f1e4d6"/>`),
  neptune: SPACE(`<circle cx="200" cy="150" r="100" fill="#2a4fd6"/><ellipse cx="180" cy="140" rx="30" ry="14" fill="#1b2e8a"/><path d="M120,190 Q200,170 290,200" stroke="#4b6ff0" stroke-width="8" fill="none"/>`),
  uranus:  SPACE(`<circle cx="200" cy="150" r="95" fill="#a7e4ec"/><ellipse cx="200" cy="150" rx="22" ry="140" fill="none" stroke="#7fb9c4" stroke-width="4"/>`),
  mercury: SPACE(`<circle cx="200" cy="150" r="90" fill="#8a8680"/><circle cx="170" cy="120" r="14" fill="#6e6a64"/><circle cx="225" cy="160" r="20" fill="#6e6a64"/><circle cx="190" cy="195" r="9" fill="#6e6a64"/><circle cx="240" cy="110" r="7" fill="#6e6a64"/>`),
  giveway: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e9eef5"/><polygon points="60,50 340,50 200,270" fill="#c8102e"/><polygon points="90,66 310,66 200,240" fill="#fff"/><text x="200" y="130" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="34" text-anchor="middle" fill="#000">GIVE</text><text x="200" y="172" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="34" text-anchor="middle" fill="#000">WAY</text></svg>`,
  roundabout: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e9eef5"/><polygon points="200,30 320,150 200,270 80,150" fill="#ffd200" stroke="#000" stroke-width="6"/><circle cx="200" cy="150" r="42" fill="none" stroke="#000" stroke-width="16" stroke-dasharray="52 20"/><polygon points="236,96 262,118 226,126" fill="#000"/><polygon points="164,204 138,182 174,174" fill="#000"/><polygon points="148,110 160,80 180,112" fill="#000"/></svg>`,
  noparking: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e9eef5"/><circle cx="200" cy="150" r="110" fill="#fff" stroke="#c8102e" stroke-width="20"/><text x="200" y="192" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="120" text-anchor="middle" fill="#000">P</text><line x1="128" y1="78" x2="272" y2="222" stroke="#c8102e" stroke-width="20"/></svg>`,
  keepleft: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e9eef5"/><circle cx="200" cy="150" r="110" fill="#1d5fbf"/><path d="M260,70 L260,150 Q260,210 200,210 L160,210" stroke="#fff" stroke-width="26" fill="none"/><polygon points="170,170 110,210 170,250" fill="#fff"/></svg>`,
  squares: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e9eef5"/><g stroke="#111" stroke-width="5" fill="#fff">${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${110+c*60}" y="${60+r*60}" width="60" height="60"/>`).join('')).join('')}</g></svg>`,
  triangles: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e9eef5"/><polygon points="200,40 60,260 340,260" fill="#fff" stroke="#111" stroke-width="6"/><line x1="200" y1="40" x2="200" y2="260" stroke="#111" stroke-width="6"/><line x1="130" y1="150" x2="270" y2="150" stroke="#111" stroke-width="6"/></svg>`,
  shaded: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e9eef5"/><circle cx="200" cy="150" r="110" fill="#fff" stroke="#111" stroke-width="5"/><path d="M200,150 L200,40 A110,110 0 0 1 277.8,72.2 Z" fill="#1d5fbf"/><path d="M200,150 L310,150 A110,110 0 0 1 277.8,227.8 Z" fill="#1d5fbf"/><path d="M200,150 L122.2,227.8 A110,110 0 0 1 90,150 Z" fill="#1d5fbf"/><g stroke="#111" stroke-width="3"><line x1="200" y1="40" x2="200" y2="260"/><line x1="90" y1="150" x2="310" y2="150"/><line x1="122.2" y1="72.2" x2="277.8" y2="227.8"/><line x1="277.8" y1="72.2" x2="122.2" y2="227.8"/></g></svg>`,
};

const QUESTIONS = [
  // ---------------- SPORTS ----------------
  { cat:'sports', q:'How many players does a rugby league team have on the field?', options:['11','13','15','7'], a:1 },
  { cat:'sports', q:'Which country has won the most FIFA World Cups?', options:['Germany','Argentina','Brazil','Italy'], a:2 },
  { cat:'sports', q:'In tennis, what is the score called when both players are on 40?', options:['Advantage','Deuce','Love-all','Let'], a:1 },
  { cat:'sports', q:'Who holds the NBA record for most career regular-season points?', options:['Michael Jordan','Kobe Bryant','Kareem Abdul-Jabbar','LeBron James'], a:3 },
  { cat:'sports', q:'How long is an Olympic swimming pool?', options:['25 m','50 m','75 m','100 m'], a:1 },
  { cat:'sports', q:'In golf, what is a score of two under par on a single hole called?', options:['Birdie','Eagle','Albatross','Bogey'], a:1 },
  { cat:'sports', q:'How many Formula 1 world titles do Lewis Hamilton and Michael Schumacher each have?', options:['5','6','7','8'], a:2 },
  { cat:'sports', q:'What is the maximum break possible in a single frame of snooker?', options:['147','155','180','100'], a:0 },
  { cat:'sports', q:'Which country has won the most Rugby World Cups?', options:['New Zealand','Australia','England','South Africa'], a:3 },
  { cat:'sports', q:'What is the official distance of a marathon?', options:['40 km','42.195 km','45 km','38.5 km'], a:1 },

  // ---------------- HISTORY ----------------
  { cat:'history', q:'In which year did World War II end?', options:['1943','1944','1945','1946'], a:2 },
  { cat:'history', q:'In which year did the Berlin Wall fall?', options:['1987','1989','1991','1993'], a:1 },
  { cat:'history', q:'The Titanic sank in which year?', options:['1905','1912','1918','1921'], a:1 },
  { cat:'history', q:'Who was the first Prime Minister of Australia?', options:['Alfred Deakin','John Curtin','Edmund Barton','Robert Menzies'], a:2 },
  { cat:'history', q:'Which ancient civilisation built Machu Picchu?', options:['Aztec','Maya','Inca','Olmec'], a:2 },
  { cat:'history', q:'The Rosetta Stone was the key to deciphering which writing system?', options:['Cuneiform','Egyptian hieroglyphs','Linear B','Sanskrit'], a:1 },
  { cat:'history', q:'In which year did the First Fleet arrive in Australia?', options:['1770','1788','1801','1815'], a:1 },
  { cat:'history', q:'Who was British Prime Minister for most of World War II?', options:['Neville Chamberlain','Clement Attlee','Winston Churchill','Anthony Eden'], a:2 },
  { cat:'history', q:'Which empire was founded by Genghis Khan?', options:['Ottoman','Mongol','Persian','Mughal'], a:1 },
  { cat:'history', q:'The Chernobyl nuclear disaster happened in which year?', options:['1979','1986','1991','1996'], a:1 },

  // ---------------- MATHS ----------------
  { cat:'maths', q:'What is 15% of 200?', options:['25','30','35','40'], a:1 },
  { cat:'maths', q:'What is 13 × 14?', options:['172','178','182','186'], a:2 },
  { cat:'maths', q:'What is the square root of 169?', options:['11','12','13','14'], a:2 },
  { cat:'maths', q:'A shirt costs $80 and is 25% off. What do you pay?', options:['$55','$60','$65','$70'], a:1 },
  { cat:'maths', q:'What is 2 to the power of 10?', options:['512','1000','1024','2048'], a:2 },
  { cat:'maths', q:'The interior angles of a triangle add up to how many degrees?', options:['90°','180°','270°','360°'], a:1 },
  { cat:'maths', q:'What is 0.2 as a fraction in simplest form?', options:['1/2','1/4','1/5','2/5'], a:2 },
  { cat:'maths', q:'What is 1000 − 387?', options:['603','613','623','713'], a:1 },
  { cat:'maths', q:'What is the next prime number after 31?', options:['33','35','37','39'], a:2 },
  { cat:'maths', q:'What is the average of 4, 8, 15, 16, 23 and 42?', options:['16','17','18','19'], a:2 },

  // ---------------- ADVANCED MATHS ----------------
  { d:'easy', cat:'advmaths', q:'What is the derivative of x³?', options:['x²','3x²','3x','x³/3'], a:1 },
  { d:'easy', cat:'advmaths', q:'What is 5! (five factorial)?', options:['25','60','120','720'], a:2 },
  { d:'easy', cat:'advmaths', q:'What is the integral of 2x dx?', options:['2x² + C','x² + C','x + C','2 + C'], a:1 },
  { cat:'advmaths', q:'Solve x² − 5x + 6 = 0', options:['x = 1 or 6','x = 2 or 3','x = −2 or −3','x = 5 or 6'], a:1 },
  { d:'easy', cat:'advmaths', q:'What is log base 10 of 1000?', options:['2','3','10','100'], a:1 },
  { cat:'advmaths', q:'The interior angles of a hexagon add up to?', options:['540°','630°','720°','900°'], a:2 },
  { cat:'advmaths', q:'Which number under 100 is both a perfect square and a perfect cube?', options:['36','49','64','81'], a:2 },
  { d:'easy', cat:'advmaths', q:'What is i² (where i is the imaginary unit)?', options:['1','−1','i','0'], a:1 },
  { d:'easy', cat:'advmaths', q:'What is the sum of the integers from 1 to 100?', options:['4950','5000','5050','5100'], a:2 },
  { d:'easy', cat:'advmaths', q:'What is the probability of rolling two sixes with two dice?', options:['1/6','1/12','1/18','1/36'], a:3 },

  { cat:'advmaths', q:'What is the derivative of sin(x)?', options:['cos(x)','−cos(x)','−sin(x)','tan(x)'], a:0 },
  { cat:'advmaths', q:'What is 2⁸ × 2⁻³?', options:['16','32','64','128'], a:1 },
  { cat:'advmaths', q:'Solve for x: 2ˣ = 64', options:['5','6','7','8'], a:1 },
  { cat:'advmaths', q:'What is the sum of the infinite series 1 + 1/2 + 1/4 + 1/8 + …?', options:['1.5','2','e','It diverges'], a:1 },
  { cat:'advmaths', q:'What is the determinant of the matrix [[3, 1], [2, 4]]?', options:['8','10','12','14'], a:1 },
  { cat:'advmaths', q:'How many ways can you arrange the letters A, B, C, D?', options:['12','16','24','32'], a:2 },
  { cat:'advmaths', q:'What is cos(60°)?', options:['0','0.5','√3/2','1'], a:1 },
  { cat:'advmaths', q:'What is the derivative of eˣ?', options:['xeˣ⁻¹','eˣ','ln(x)','1/x'], a:1 },
  { cat:'advmaths', q:'What is ln(e³)?', options:['1','e','3','3e'], a:2 },
  { cat:'advmaths', q:'How many diagonals does a hexagon have?', options:['6','9','12','15'], a:1 },

  { cat:'maths', q:'What is 17 × 6?', options:['96','102','108','112'], a:1 },
  { cat:'maths', q:'What is 3/4 as a percentage?', options:['65%','70%','75%','80%'], a:2 },
  { cat:'maths', q:'A car travels 150 km in 2.5 hours. Average speed?', options:['50 km/h','55 km/h','60 km/h','65 km/h'], a:2 },
  { cat:'maths', q:'What is 45% of 80?', options:['32','34','36','38'], a:2 },
  { cat:'maths', q:'What is 9 squared minus 7 squared?', options:['28','30','32','34'], a:2 },
  { cat:'maths', q:'Solve: 3x + 7 = 25', options:['x = 5','x = 6','x = 7','x = 8'], a:1 },
  { cat:'maths', q:'What is 144 ÷ 12 + 8 × 3?', options:['36','48','52','60'], a:0 },
  { cat:'maths', q:'How many minutes are in 2.75 hours?', options:['155','160','165','175'], a:2 },
  { cat:'maths', q:'A $120 item is marked up 15%. New price?', options:['$132','$135','$138','$142'], a:2 },
  { cat:'maths', q:'What is the area of a rectangle 12 m × 7.5 m?', options:['80 m²','85 m²','90 m²','95 m²'], a:2 },

  // ---------------- GEOGRAPHY ----------------
  { cat:'geo', q:'What is the capital city of Canada?', options:['Toronto','Vancouver','Ottawa','Montreal'], a:2 },
  { cat:'geo', q:'Which river is traditionally considered the longest in the world?', options:['Amazon','Nile','Yangtze','Mississippi'], a:1 },
  { cat:'geo', q:'Which country has the most time zones (including territories)?', options:['Russia','USA','France','China'], a:2 },
  { cat:'geo', q:'What is the largest hot desert in the world?', options:['Gobi','Kalahari','Arabian','Sahara'], a:3 },
  { cat:'geo', q:'Mount Kosciuszko is in which Australian state?', options:['Victoria','New South Wales','Tasmania','Queensland'], a:1 },
  { cat:'geo', q:'How many countries share a land border with Germany?', options:['6','7','9','11'], a:2 },
  { cat:'geo', q:'What is the smallest country in the world by area?', options:['Monaco','Vatican City','San Marino','Nauru'], a:1 },
  { cat:'geo', q:'What is the capital of New Zealand?', options:['Auckland','Christchurch','Wellington','Queenstown'], a:2 },
  { cat:'geo', q:'Which is the largest ocean on Earth?', options:['Atlantic','Indian','Southern','Pacific'], a:3 },
  { cat:'geo', q:'Uluru is located in which Australian state or territory?', options:['Western Australia','South Australia','Northern Territory','Queensland'], a:2 },

  // ---------------- SCIENCE ----------------
  { cat:'science', q:'What is the chemical symbol for gold?', options:['Go','Gd','Au','Ag'], a:2 },
  { cat:'science', q:'Which planet in our solar system has the most confirmed moons?', options:['Jupiter','Saturn','Uranus','Neptune'], a:1 },
  { cat:'science', q:'Which part of the cell is known as the "powerhouse"?', options:['Nucleus','Ribosome','Mitochondria','Golgi apparatus'], a:2 },
  { cat:'science', q:'Roughly how fast does light travel in a vacuum?', options:['30,000 km/s','300,000 km/s','3,000,000 km/s','300 km/s'], a:1 },
  { cat:'science', q:'What is the hardest naturally occurring substance?', options:['Titanium','Quartz','Diamond','Tungsten'], a:2 },
  { cat:'science', q:'How many bones are in the adult human body?', options:['186','206','226','256'], a:1 },
  { cat:'science', q:'Which gas do plants absorb from the air for photosynthesis?', options:['Oxygen','Nitrogen','Carbon dioxide','Hydrogen'], a:2 },
  { cat:'science', q:'What is the most abundant gas in Earth\'s atmosphere?', options:['Oxygen','Carbon dioxide','Argon','Nitrogen'], a:3 },
  { cat:'science', q:'What is the pH of pure water?', options:['0','5','7','10'], a:2 },
  { cat:'science', q:'Which element has atomic number 1?', options:['Helium','Hydrogen','Lithium','Carbon'], a:1 },

  // ---------------- MOVIES & TV ----------------
  { cat:'movies', q:'Who played Jack Dawson in Titanic (1997)?', options:['Brad Pitt','Leonardo DiCaprio','Matt Damon','Johnny Depp'], a:1 },
  { cat:'movies', q:'Which Australian actor plays Thor in the Marvel films?', options:['Liam Hemsworth','Hugh Jackman','Chris Hemsworth','Sam Worthington'], a:2 },
  { cat:'movies', q:'In The Matrix, which pill does Neo take?', options:['Blue','Red','Green','Yellow'], a:1 },
  { cat:'movies', q:'Which Australian actress won an Oscar for Blue Jasmine?', options:['Nicole Kidman','Margot Robbie','Naomi Watts','Cate Blanchett'], a:3 },
  { cat:'movies', q:'What is the name of the fictional African nation in Black Panther?', options:['Zamunda','Wakanda','Genosha','Latveria'], a:1 },
  { cat:'movies', q:'Who directed Inception?', options:['Steven Spielberg','Christopher Nolan','Denis Villeneuve','Ridley Scott'], a:1 },
  { cat:'movies', q:'Walter White is the main character of which TV series?', options:['The Sopranos','Ozark','Breaking Bad','Better Call Saul'], a:2 },
  { cat:'movies', q:'Heath Ledger won a posthumous Oscar for playing which character?', options:['Ennis Del Mar','The Joker','Patrick Verona','Sir Ulrich'], a:1 },
  { cat:'movies', q:'Which actor voices Woody in the Toy Story films?', options:['Tim Allen','Tom Hanks','Billy Crystal','John Goodman'], a:1 },
  { cat:'movies', q:'In Friends, what is the name of Ross\'s pet monkey?', options:['Marcel','Milo','Murphy','Max'], a:0 },

  // ---------------- MUSIC ----------------
  { cat:'music', q:'Which Australian band recorded "Highway to Hell"?', options:['INXS','Midnight Oil','AC/DC','Cold Chisel'], a:2 },
  { cat:'music', q:'Which artist is known as the "Queen of Pop"?', options:['Beyoncé','Madonna','Britney Spears','Lady Gaga'], a:1 },
  { cat:'music', q:'Which artist released the album "1989"?', options:['Katy Perry','Adele','Taylor Swift','Ariana Grande'], a:2 },
  { cat:'music', q:'Which rapper\'s real name is Marshall Mathers?', options:['Dr. Dre','Jay-Z','50 Cent','Eminem'], a:3 },
  { cat:'music', q:'Freddie Mercury was the frontman of which band?', options:['The Who','Queen','Led Zeppelin','Pink Floyd'], a:1 },
  { cat:'music', q:'"Down Under" was a hit for which Australian band?', options:['Men at Work','The Church','Icehouse','Crowded House'], a:0 },
  { cat:'music', q:'Who had the hit "Blinding Lights"?', options:['Drake','The Weeknd','Post Malone','Bruno Mars'], a:1 },
  { cat:'music', q:'Beethoven composed some of his greatest works while suffering from what?', options:['Blindness','Deafness','Paralysis','Gout'], a:1 },
  { cat:'music', q:'What is the best-selling studio album of all time?', options:['Back in Black','Thriller','The Dark Side of the Moon','21'], a:1 },
  { cat:'music', q:'Which Australian artist had the global hit "Dance Monkey"?', options:['Sia','Tones and I','Amy Shark','Vance Joy'], a:1 },

  // ---------------- FOOD & DRINK ----------------
  { cat:'food', q:'What spirit is the base of a mojito?', options:['Vodka','Gin','Rum','Tequila'], a:2 },
  { cat:'food', q:'Goulash is the national dish of which country?', options:['Poland','Hungary','Czech Republic','Austria'], a:1 },
  { cat:'food', q:'Which nut is marzipan made from?', options:['Hazelnut','Cashew','Almond','Pistachio'], a:2 },
  { cat:'food', q:'Vegemite is made primarily from what?', options:['Beef extract','Yeast extract','Soy paste','Malt syrup'], a:1 },
  { cat:'food', q:'Which cheese is traditionally used on a Margherita pizza?', options:['Parmesan','Ricotta','Provolone','Mozzarella'], a:3 },
  { cat:'food', q:'What type of rice is traditionally used in risotto?', options:['Basmati','Jasmine','Arborio','Brown'], a:2 },
  { cat:'food', q:'Which country produces the most coffee in the world?', options:['Colombia','Vietnam','Ethiopia','Brazil'], a:3 },
  { cat:'food', q:'Tofu is made from which bean?', options:['Kidney bean','Soybean','Black bean','Mung bean'], a:1 },
  { cat:'food', q:'The Scoville scale measures what?', options:['Sweetness','Acidity','Chilli heat','Alcohol content'], a:2 },
  { cat:'food', q:'A prune is a dried version of which fruit?', options:['Apricot','Fig','Plum','Date'], a:2 },

  // ================= EASY SETS =================
  { d:'easy', cat:'sports', q:'How many players does a soccer team have on the field?', options:['9','10','11','12'], a:2 },
  { d:'easy', cat:'sports', q:'Usain Bolt is famous for which sport?', options:['Swimming','Sprinting','Cycling','Boxing'], a:1 },
  { d:'easy', cat:'sports', q:'In which sport do you score a "try"?', options:['Cricket','Rugby','Hockey','Netball'], a:1 },
  { d:'easy', cat:'sports', q:'How many holes are in a full round of golf?', options:['9','12','18','24'], a:2 },
  { d:'easy', cat:'sports', q:'Wimbledon is played in which country?', options:['USA','France','Australia','England'], a:3 },
  { d:'easy', cat:'sports', q:'How many rings are on the Olympic flag?', options:['4','5','6','7'], a:1 },
  { d:'easy', cat:'sports', q:'The Tour de France is a race in which sport?', options:['Running','Cycling','Sailing','Motor racing'], a:1 },
  { d:'easy', cat:'sports', q:'Michael Jordan is a legend of which sport?', options:['Baseball','American football','Basketball','Golf'], a:2 },
  { d:'easy', cat:'sports', q:'State of Origin is played in which sport?', options:['AFL','Rugby union','Rugby league','Cricket'], a:2 },
  { d:'easy', cat:'sports', q:'What colour is the centre of an archery target?', options:['Red','Gold','Blue','White'], a:1 },

  { d:'easy', cat:'history', q:'Who was the first person to walk on the Moon?', options:['Buzz Aldrin','Neil Armstrong','Yuri Gagarin','John Glenn'], a:1 },
  { d:'easy', cat:'history', q:'The pyramids of Giza are in which country?', options:['Mexico','Egypt','Peru','Sudan'], a:1 },
  { d:'easy', cat:'history', q:'Who was the first President of the United States?', options:['Abraham Lincoln','Thomas Jefferson','George Washington','John Adams'], a:2 },
  { d:'easy', cat:'history', q:'Which Japanese city was hit by the first atomic bomb in 1945?', options:['Tokyo','Nagasaki','Osaka','Hiroshima'], a:3 },
  { d:'easy', cat:'history', q:'In which year did Sydney host the Olympic Games?', options:['1996','2000','2004','2008'], a:1 },
  { d:'easy', cat:'history', q:'The Great Wall is in which country?', options:['Japan','China','India','Mongolia'], a:1 },
  { d:'easy', cat:'history', q:'What language did the ancient Romans speak?', options:['Greek','Latin','Italian','Hebrew'], a:1 },
  { d:'easy', cat:'history', q:'Who painted the Mona Lisa?', options:['Michelangelo','Picasso','Leonardo da Vinci','Van Gogh'], a:2 },
  { d:'easy', cat:'history', q:'Which British queen reigned from 1952 to 2022?', options:['Victoria','Elizabeth I','Elizabeth II','Mary'], a:2 },
  { d:'easy', cat:'history', q:'Captain James Cook sailed from which country?', options:['Netherlands','Spain','Portugal','Britain'], a:3 },

  { d:'easy', cat:'maths', q:'What is 7 × 8?', options:['54','56','58','64'], a:1 },
  { d:'easy', cat:'maths', q:'What is 100 − 37?', options:['63','67','73','77'], a:0 },
  { d:'easy', cat:'maths', q:'What is half of 90?', options:['40','45','50','55'], a:1 },
  { d:'easy', cat:'maths', q:'What is 25 + 39?', options:['54','62','64','66'], a:2 },
  { d:'easy', cat:'maths', q:'How many sides does a hexagon have?', options:['5','6','7','8'], a:1 },
  { d:'easy', cat:'maths', q:'What is 10% of 250?', options:['20','25','30','35'], a:1 },
  { d:'easy', cat:'maths', q:'What is 12 × 5?', options:['50','55','60','65'], a:2 },
  { d:'easy', cat:'maths', q:'What is 3 cubed (3³)?', options:['9','18','27','81'], a:2 },
  { d:'easy', cat:'maths', q:'What is 81 ÷ 9?', options:['7','8','9','11'], a:2 },
  { d:'easy', cat:'maths', q:'What is double 47?', options:['84','92','94','96'], a:2 },

  { d:'easy', cat:'geo', q:'What is the capital of Australia?', options:['Sydney','Melbourne','Canberra','Brisbane'], a:2 },
  { d:'easy', cat:'geo', q:'Which is the largest country in the world by area?', options:['Canada','China','USA','Russia'], a:3 },
  { d:'easy', cat:'geo', q:'Egypt is on which continent?', options:['Asia','Africa','Europe','South America'], a:1 },
  { d:'easy', cat:'geo', q:'What is the capital of France?', options:['Lyon','Marseille','Paris','Nice'], a:2 },
  { d:'easy', cat:'geo', q:'Tokyo is the capital of which country?', options:['China','South Korea','Japan','Thailand'], a:2 },
  { d:'easy', cat:'geo', q:'How many continents are there?', options:['5','6','7','8'], a:2 },
  { d:'easy', cat:'geo', q:'Perth is in which Australian state?', options:['South Australia','Western Australia','Queensland','Victoria'], a:1 },
  { d:'easy', cat:'geo', q:'What is the longest river in Australia?', options:['Darling','Murray','Yarra','Swan'], a:1 },
  { d:'easy', cat:'geo', q:'Which country is shaped like a boot?', options:['Spain','Greece','Italy','Portugal'], a:2 },
  { d:'easy', cat:'geo', q:'Which is the biggest Australian state by area?', options:['Queensland','New South Wales','Western Australia','Northern Territory'], a:2 },

  { d:'easy', cat:'science', q:'H₂O is the chemical formula for what?', options:['Salt','Water','Oxygen','Hydrogen peroxide'], a:1 },
  { d:'easy', cat:'science', q:'How many planets are in our solar system?', options:['7','8','9','10'], a:1 },
  { d:'easy', cat:'science', q:'What force keeps us on the ground?', options:['Magnetism','Friction','Gravity','Inertia'], a:2 },
  { d:'easy', cat:'science', q:'Water freezes at what temperature (°C)?', options:['−10°','0°','4°','10°'], a:1 },
  { d:'easy', cat:'science', q:'Which organ pumps blood around the body?', options:['Lungs','Liver','Heart','Kidneys'], a:2 },
  { d:'easy', cat:'science', q:'Which gas do humans need to breathe to survive?', options:['Nitrogen','Carbon dioxide','Oxygen','Helium'], a:2 },
  { d:'easy', cat:'science', q:'What is the largest organ of the human body?', options:['Liver','Skin','Brain','Lungs'], a:1 },
  { d:'easy', cat:'science', q:'What is the centre of an atom called?', options:['Electron','Proton','Nucleus','Core'], a:2 },
  { d:'easy', cat:'science', q:'What star is at the centre of our solar system?', options:['Sirius','The Sun','Polaris','Alpha Centauri'], a:1 },
  { d:'easy', cat:'science', q:'How many legs does a spider have?', options:['6','8','10','12'], a:1 },

  { d:'easy', cat:'movies', q:'Who plays Iron Man in the Marvel films?', options:['Chris Evans','Robert Downey Jr.','Mark Ruffalo','Chris Pratt'], a:1 },
  { d:'easy', cat:'movies', q:'What kind of creature is Shrek?', options:['Troll','Giant','Ogre','Goblin'], a:2 },
  { d:'easy', cat:'movies', q:'"May the Force be with you" is from which film series?', options:['Star Trek','Star Wars','Dune','Avatar'], a:1 },
  { d:'easy', cat:'movies', q:'Nemo in Finding Nemo is what kind of fish?', options:['Goldfish','Clownfish','Blue tang','Pufferfish'], a:1 },
  { d:'easy', cat:'movies', q:'Who played Captain Jack Sparrow?', options:['Orlando Bloom','Johnny Depp','Brad Pitt','Hugh Jackman'], a:1 },
  { d:'easy', cat:'movies', q:'In Frozen, what is the name of Elsa\'s sister?', options:['Ariel','Belle','Anna','Olaf'], a:2 },
  { d:'easy', cat:'movies', q:'What is the name of Harry Potter\'s school?', options:['Hogwarts','Durmstrang','Beauxbatons','Ilvermorny'], a:0 },
  { d:'easy', cat:'movies', q:'Which Australian soap did Chris Hemsworth star in before Hollywood?', options:['Neighbours','Home and Away','Packed to the Rafters','Blue Heelers'], a:1 },
  { d:'easy', cat:'movies', q:'The Simpsons live in which town?', options:['Shelbyville','Springfield','Quahog','South Park'], a:1 },
  { d:'easy', cat:'movies', q:'"I\'ll be back" is a famous line from which film?', options:['Predator','RoboCop','The Terminator','Die Hard'], a:2 },

  { d:'easy', cat:'music', q:'Which singer is known as "Queen Bey"?', options:['Rihanna','Beyoncé','Lady Gaga','Katy Perry'], a:1 },
  { d:'easy', cat:'music', q:'How many strings does a standard guitar have?', options:['4','5','6','7'], a:2 },
  { d:'easy', cat:'music', q:'Who sang "Shape of You"?', options:['Harry Styles','Shawn Mendes','Ed Sheeran','Sam Smith'], a:2 },
  { d:'easy', cat:'music', q:'Which band recorded "Hey Jude"?', options:['The Rolling Stones','The Beatles','The Who','Queen'], a:1 },
  { d:'easy', cat:'music', q:'Which Australian pop star sang "Can\'t Get You Out of My Head"?', options:['Delta Goodrem','Kylie Minogue','Sia','Natalie Imbruglia'], a:1 },
  { d:'easy', cat:'music', q:'What are Taylor Swift\'s fans called?', options:['Swifters','Taylors','Swifties','Belieswift'], a:2 },
  { d:'easy', cat:'music', q:'Which instrument has 88 keys?', options:['Organ','Piano','Accordion','Harpsichord'], a:1 },
  { d:'easy', cat:'music', q:'Who sang "Rolling in the Deep"?', options:['Adele','Amy Winehouse','Duffy','Jessie J'], a:0 },
  { d:'easy', cat:'music', q:'Drake is from which country?', options:['USA','UK','Canada','Jamaica'], a:2 },
  { d:'easy', cat:'music', q:'Who sang "Riptide"?', options:['Vance Joy','Tones and I','Dean Lewis','Matt Corby'], a:0 },

  { d:'easy', cat:'food', q:'What is sushi traditionally wrapped in?', options:['Rice paper','Seaweed','Lettuce','Tofu skin'], a:1 },
  { d:'easy', cat:'food', q:'Pizza originally comes from which country?', options:['Greece','Spain','Italy','France'], a:2 },
  { d:'easy', cat:'food', q:'What is the main ingredient in guacamole?', options:['Avocado','Cucumber','Green pepper','Lime'], a:0 },
  { d:'easy', cat:'food', q:'Croissants are most associated with which country?', options:['Italy','France','Germany','Belgium'], a:1 },
  { d:'easy', cat:'food', q:'What fruit is wine made from?', options:['Apples','Plums','Grapes','Cherries'], a:2 },
  { d:'easy', cat:'food', q:'What do Aussies call a sausage?', options:['A banger','A snag','A frank','A dog'], a:1 },
  { d:'easy', cat:'food', q:'Who makes Tim Tams?', options:['Cadbury','Arnott\'s','Nestlé','Allen\'s'], a:1 },
  { d:'easy', cat:'food', q:'Which nut is in Nutella?', options:['Peanut','Almond','Hazelnut','Cashew'], a:2 },
  { d:'easy', cat:'food', q:'What is the main ingredient of hummus?', options:['Lentils','Chickpeas','White beans','Sesame'], a:1 },
  { d:'easy', cat:'food', q:'Which sauce goes on a classic Aussie meat pie?', options:['BBQ sauce','Tomato sauce','Mustard','Gravy'], a:1 },

  // ================= POP CULTURE =================
  { d:'easy', cat:'pop', q:'Which app is famous for short dance videos?', options:['Snapchat','TikTok','Pinterest','LinkedIn'], a:1 },
  { d:'easy', cat:'pop', q:'Which pop star\'s fandom is called the "Beyhive"?', options:['Rihanna','Beyoncé','Nicki Minaj','Doja Cat'], a:1 },
  { d:'easy', cat:'pop', q:'Harry Styles was in which boy band?', options:['The Wanted','5 Seconds of Summer','One Direction','Westlife'], a:2 },
  { d:'easy', cat:'pop', q:'Which rapper was married to Kim Kardashian?', options:['Drake','Jay-Z','Kanye West','Travis Scott'], a:2 },
  { d:'easy', cat:'pop', q:'Which streaming service made Stranger Things?', options:['Disney+','Netflix','Stan','Prime Video'], a:1 },
  { d:'easy', cat:'pop', q:'Bruce Wayne is the secret identity of which superhero?', options:['Superman','Iron Man','Batman','Green Arrow'], a:2 },
  { d:'easy', cat:'pop', q:'Mario and Luigi are characters in which game series?', options:['Sonic','Super Mario','Zelda','Donkey Kong'], a:1 },
  { d:'easy', cat:'pop', q:'Who played Barbie in the 2023 film?', options:['Emma Stone','Margot Robbie','Sydney Sweeney','Anya Taylor-Joy'], a:1 },
  { d:'easy', cat:'pop', q:'What colour is the Snapchat logo?', options:['Blue','Green','Yellow','Red'], a:2 },
  { d:'easy', cat:'pop', q:'Which car company is run by Elon Musk?', options:['Rivian','Tesla','Lucid','Polestar'], a:1 },
  { cat:'pop', q:'Which Australian comedian made the stand-up special "Nanette"?', options:['Celeste Barber','Hannah Gadsby','Judith Lucy','Kitty Flanagan'], a:1 },
  { cat:'pop', q:'In which Australian city is Bluey set?', options:['Sydney','Melbourne','Brisbane','Perth'], a:2 },
  { cat:'pop', q:'Which rapper released the album "DAMN."?', options:['Drake','J. Cole','Kendrick Lamar','Travis Scott'], a:2 },
  { cat:'pop', q:'Who played Ken in Barbie (2023)?', options:['Ryan Reynolds','Ryan Gosling','Chris Evans','Simu Liu'], a:1 },
  { cat:'pop', q:'Which TV series is set in the land of Westeros?', options:['The Witcher','Vikings','Game of Thrones','Wheel of Time'], a:2 },
  { cat:'pop', q:'What is "Baby Yoda" from The Mandalorian actually called?', options:['Grogu','Yaddle','Din','Kuiil'], a:0 },
  { cat:'pop', q:'What is MrBeast\'s real first name?', options:['Jake','Jimmy','Logan','Mark'], a:1 },
  { cat:'pop', q:'Which show follows the Roy family fighting over a media empire?', options:['Billions','Succession','Industry','Yellowstone'], a:1 },
  { cat:'pop', q:'Which Australian hosts the quiz show "Hard Quiz"?', options:['Shaun Micallef','Tom Gleeson','Hamish Blake','Rove McManus'], a:1 },
  { cat:'pop', q:'Which K-pop group had the hit "Dynamite"?', options:['BLACKPINK','EXO','BTS','Stray Kids'], a:2 },

  // ================= AUSSIE =================
  { d:'easy', cat:'aussie', q:'Which two animals are on the Australian coat of arms?', options:['Koala and wombat','Kangaroo and emu','Kangaroo and koala','Emu and platypus'], a:1 },
  { d:'easy', cat:'aussie', q:'What is the capital of New South Wales?', options:['Newcastle','Canberra','Sydney','Wollongong'], a:2 },
  { d:'easy', cat:'aussie', q:'The Gold Coast is closest to which capital city?', options:['Sydney','Brisbane','Melbourne','Darwin'], a:1 },
  { d:'easy', cat:'aussie', q:'What date is Australia Day?', options:['1 January','26 January','25 April','1 July'], a:1 },
  { d:'easy', cat:'aussie', q:'What is a "bottle-o"?', options:['A recycling bin','A bottle shop','A water bottle','A pub'], a:1 },
  { d:'easy', cat:'aussie', q:'What is a joey?', options:['A baby koala only','A baby kangaroo','A young emu','A small wombat'], a:1 },
  { d:'easy', cat:'aussie', q:'Bunnings is famous for what on weekends?', options:['Free timber','Sausage sizzles','Live music','Pet adoptions'], a:1 },
  { d:'easy', cat:'aussie', q:'What is the big red rock in the middle of Australia?', options:['Kata Tjuta','Uluru','Mount Augustus','Wave Rock'], a:1 },
  { d:'easy', cat:'aussie', q:'What colour is the Australian $50 note?', options:['Red','Blue','Yellow','Green'], a:2 },
  { d:'easy', cat:'aussie', q:'What do Australians call flip-flops?', options:['Slides','Thongs','Jandals','Sandals'], a:1 },
  { cat:'aussie', q:'Which Australian Prime Minister famously set a beer-sculling record?', options:['Paul Keating','Bob Hawke','Kevin Rudd','John Howard'], a:1 },
  { cat:'aussie', q:'In what year did Australia become a federation?', options:['1788','1851','1901','1927'], a:2 },
  { cat:'aussie', q:'Which Australian city hosted the 1956 Olympics?', options:['Sydney','Melbourne','Brisbane','Adelaide'], a:1 },
  { cat:'aussie', q:'Which is Australia\'s oldest bank?', options:['Commonwealth','ANZ','NAB','Westpac'], a:3 },
  { cat:'aussie', q:'The Big Banana is in which town?', options:['Coffs Harbour','Byron Bay','Ballina','Port Macquarie'], a:0 },
  { cat:'aussie', q:'Which state has the largest population?', options:['Victoria','Queensland','New South Wales','Western Australia'], a:2 },
  { cat:'aussie', q:'In what year could Australian women first vote in federal elections?', options:['1894','1902','1918','1945'], a:1 },
  { cat:'aussie', q:'How many kangaroos are on the Australian $1 coin?', options:['1','3','5','7'], a:2 },
  { cat:'aussie', q:'Who wrote the words to "Waltzing Matilda"?', options:['Henry Lawson','Banjo Paterson','Dorothea Mackellar','C.J. Dennis'], a:1 },
  { cat:'aussie', q:'The Melbourne Cup is run on which day?', options:['First Monday in November','First Tuesday in November','Last Saturday in October','Second Tuesday in November'], a:1 },

  // ================= ANIMALS =================
  { d:'easy', cat:'animals', q:'What is the fastest land animal?', options:['Lion','Cheetah','Greyhound','Horse'], a:1 },
  { d:'easy', cat:'animals', q:'What is the largest animal that has ever lived?', options:['Elephant','T-Rex','Blue whale','Giraffe'], a:2 },
  { d:'easy', cat:'animals', q:'How many legs does an insect have?', options:['4','6','8','10'], a:1 },
  { d:'easy', cat:'animals', q:'What is a group of lions called?', options:['Pack','Herd','Pride','Troop'], a:2 },
  { d:'easy', cat:'animals', q:'What do giant pandas mainly eat?', options:['Fish','Bamboo','Berries','Insects'], a:1 },
  { d:'easy', cat:'animals', q:'What is the tallest animal in the world?', options:['Elephant','Camel','Giraffe','Ostrich'], a:2 },
  { d:'easy', cat:'animals', q:'Which of these birds cannot fly?', options:['Emu','Eagle','Parrot','Swan'], a:0 },
  { d:'easy', cat:'animals', q:'A koala is what type of animal?', options:['Bear','Marsupial','Rodent','Primate'], a:1 },
  { d:'easy', cat:'animals', q:'What is the largest reptile in the world?', options:['Komodo dragon','Green anaconda','Saltwater crocodile','Leatherback turtle'], a:2 },
  { d:'easy', cat:'animals', q:'Which animal has black and white stripes?', options:['Zebra','Okapi','Tapir','Hyena'], a:0 },
  { cat:'animals', q:'How many hearts does an octopus have?', options:['1','2','3','4'], a:2 },
  { cat:'animals', q:'What is the only mammal that can truly fly?', options:['Flying squirrel','Bat','Sugar glider','Colugo'], a:1 },
  { cat:'animals', q:'Which Australian mammal lays eggs and has a duck-like bill?', options:['Echidna','Platypus','Numbat','Quokka'], a:1 },
  { cat:'animals', q:'What is the largest species of penguin?', options:['King','Gentoo','Emperor','Adélie'], a:2 },
  { cat:'animals', q:'How many stomach compartments does a cow have?', options:['1','2','3','4'], a:3 },
  { cat:'animals', q:'What is a group of crows called?', options:['A murder','A parliament','A gaggle','A conspiracy'], a:0 },
  { cat:'animals', q:'Which is the largest of the big cats?', options:['Lion','Jaguar','Tiger','Leopard'], a:2 },
  { cat:'animals', q:'What is a female deer called?', options:['Mare','Doe','Ewe','Hind only'], a:1 },
  { cat:'animals', q:'Which animal has the largest eyes in the animal kingdom?', options:['Blue whale','Ostrich','Giant squid','Elephant'], a:2 },
  { cat:'animals', q:'What is the most venomous snake in the world?', options:['King cobra','Black mamba','Inland taipan','Eastern brown'], a:2 },

  // ================= TECH =================
  { d:'easy', cat:'tech', q:'What does "www" stand for?', options:['World Wide Web','World Web Wire','Wide World Web','Web World Wide'], a:0 },
  { d:'easy', cat:'tech', q:'Who co-founded Microsoft?', options:['Steve Jobs','Bill Gates','Jeff Bezos','Larry Page'], a:1 },
  { d:'easy', cat:'tech', q:'Which company makes the iPhone?', options:['Samsung','Google','Apple','Nokia'], a:2 },
  { d:'easy', cat:'tech', q:'What does "AI" stand for?', options:['Automated internet','Artificial intelligence','Advanced input','Applied information'], a:1 },
  { d:'easy', cat:'tech', q:'Which company owns YouTube?', options:['Meta','Amazon','Google','Microsoft'], a:2 },
  { d:'easy', cat:'tech', q:'What is Amazon\'s voice assistant called?', options:['Siri','Cortana','Alexa','Bixby'], a:2 },
  { d:'easy', cat:'tech', q:'What does "CPU" stand for?', options:['Central processing unit','Computer power unit','Central program utility','Core processing unit'], a:0 },
  { d:'easy', cat:'tech', q:'Who founded Facebook?', options:['Jack Dorsey','Mark Zuckerberg','Evan Spiegel','Kevin Systrom'], a:1 },
  { d:'easy', cat:'tech', q:'What does "USB" stand for?', options:['Universal serial bus','United system bus','Universal system board','Unified serial band'], a:0 },
  { d:'easy', cat:'tech', q:'Which company makes the PlayStation?', options:['Nintendo','Microsoft','Sony','Sega'], a:2 },
  { cat:'tech', q:'Which company developed ChatGPT?', options:['Google','OpenAI','Meta','Anthropic'], a:1 },
  { cat:'tech', q:'In what year was the first iPhone released?', options:['2005','2006','2007','2008'], a:2 },
  { cat:'tech', q:'What does "HTTP" stand for?', options:['HyperText Transfer Protocol','High Transfer Text Process','Hyper Transfer Text Program','Home Text Transport Protocol'], a:0 },
  { cat:'tech', q:'How many bits are in a byte?', options:['4','8','16','32'], a:1 },
  { cat:'tech', q:'Which programming language is named after a snake?', options:['Cobra','Viper','Python','Anaconda'], a:2 },
  { cat:'tech', q:'What was Google originally called?', options:['BackRub','SearchIt','WebCrawl','Googol'], a:0 },
  { cat:'tech', q:'Who co-founded Apple with Steve Jobs?', options:['Steve Ballmer','Steve Wozniak','Jony Ive','Tim Cook'], a:1 },
  { cat:'tech', q:'What does "GPU" stand for?', options:['General processing unit','Graphics processing unit','Game power unit','Graphical program utility'], a:1 },
  { cat:'tech', q:'What does "SSD" stand for?', options:['Super speed disk','Solid-state drive','System storage device','Serial storage drive'], a:1 },
  { cat:'tech', q:'What does "VPN" stand for?', options:['Virtual private network','Verified public network','Virtual public node','Variable private net'], a:0 },

  // ---------------- FLAGS ----------------
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.sweden,      options:['Finland','Sweden','Norway','Iceland'], a:1 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.ireland,     options:['Italy','Côte d\'Ivoire','Ireland','Nigeria'], a:2 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.nigeria,     options:['Ireland','Nigeria','Pakistan','Italy'], a:1 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.thailand,    options:['Costa Rica','Cuba','Thailand','North Korea'], a:2 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.netherlands, options:['Luxembourg','Russia','France','Netherlands'], a:3 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.colombia,    options:['Venezuela','Colombia','Ecuador','Romania'], a:1 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.chile,       options:['Cuba','Panama','Chile','Liberia'], a:2 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.vietnam,     options:['China','Vietnam','Morocco','Turkey'], a:1 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.austria,     options:['Latvia','Indonesia','Poland','Austria'], a:3 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.turkey,      options:['Tunisia','Turkey','Pakistan','Algeria'], a:1 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.finland,     options:['Sweden','Finland','Estonia','Greece'], a:1 },
  { d:'easy', cat:'flags', q:'Which country does this flag belong to?', svg:F.denmark,     options:['Switzerland','Norway','Denmark','Georgia'], a:2 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.norway,      options:['Iceland','Norway','Denmark','Faroe Islands'], a:1 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.iceland,     options:['Norway','Finland','Iceland','Sweden'], a:2 },
  { d:'easy', cat:'flags', q:'Which country does this flag belong to?', svg:F.switzerland, options:['Denmark','Switzerland','Georgia','Tonga'], a:1 },
  { d:'easy', cat:'flags', q:'Which country does this flag belong to?', svg:F.greece,      options:['Uruguay','Greece','Israel','Finland'], a:1 },
  { d:'easy', cat:'flags', q:'Which country does this flag belong to?', svg:F.jamaica,     options:['Jamaica','Trinidad and Tobago','Grenada','Guyana'], a:0 },
  { d:'easy', cat:'flags', q:'Which country does this flag belong to?', svg:F.bangladesh,  options:['Japan','Palau','Bangladesh','Laos'], a:2 },
  { d:'easy', cat:'flags', q:'Which country does this flag belong to?', svg:F.poland,      options:['Indonesia','Monaco','Poland','Singapore'], a:2 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.belgium,     options:['Germany','Belgium','Chad','Mali'], a:1 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.romania,     options:['Chad','Moldova','Andorra','Romania'], a:3 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.hungary,     options:['Italy','Bulgaria','Hungary','Iran'], a:2 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.estonia,     options:['Estonia','Latvia','Lithuania','Ukraine'], a:0 },
  { cat:'flags', q:'Which country does this flag belong to?', svg:F.lithuania,   options:['Latvia','Lithuania','Bolivia','Ghana'], a:1 },

  // ---------------- PICTURES ----------------
  { d:'easy', cat:'pics', q:'Which planet is this?', svg:P.saturn,  options:['Jupiter','Saturn','Uranus','Neptune'], a:1 },
  { d:'easy', cat:'pics', q:'Which planet is this?', svg:P.jupiter, options:['Jupiter','Saturn','Mars','Venus'], a:0 },
  { d:'easy', cat:'pics', q:'Which planet is this?', svg:P.mars,    options:['Mercury','Venus','Mars','Jupiter'], a:2 },
  { d:'easy', cat:'pics', q:'Which planet is this?', svg:P.neptune, options:['Earth','Uranus','Neptune','Saturn'], a:2 },
  { d:'easy', cat:'pics', q:'Which planet is this? (hint: it spins on its side)', svg:P.uranus, options:['Neptune','Uranus','Venus','Earth'], a:1 },
  { d:'easy', cat:'pics', q:'Which planet is this? (the closest to the Sun)', svg:P.mercury, options:['Mars','Pluto','Mercury','The Moon'], a:2 },
  { d:'easy', cat:'pics', q:'What must you do at this sign?', svg:P.giveway,    options:['Stop completely','Slow down and give way to other traffic','Sound your horn','Keep left'], a:1 },
  { d:'easy', cat:'pics', q:'What is this sign warning you about?', svg:P.roundabout, options:['Slippery road','Roundabout ahead','Road works','U-turn permitted'], a:1 },
  { d:'easy', cat:'pics', q:'What does this sign mean?', svg:P.noparking, options:['No stopping','No parking','Permit holders only','No pedestrians'], a:1 },
  { d:'easy', cat:'pics', q:'What does this sign mean?', svg:P.keepleft,  options:['Turn left only','Keep left','One way','Detour left'], a:1 },
  { cat:'pics', q:'How many squares are in this grid? (count every size)', svg:P.squares, options:['9','10','13','14'], a:3 },
  { cat:'pics', q:'How many triangles can you find in this shape?', svg:P.triangles, options:['4','6','8','10'], a:1 },
  { cat:'pics', q:'What fraction of the circle is shaded?', svg:P.shaded, options:['1/4','3/8','1/2','5/8'], a:1 },
];

QUESTIONS.forEach(q => { if (!q.d) q.d = 'medium'; });
if (typeof module !== 'undefined') module.exports = { CATEGORIES, QUESTIONS };

// ---- Nov 2026: reviewed fixes + Hard tier and extra Easy/Medium questions ----
(function () {
  const FIX = {
 "1": {
  "cat": "sports",
  "q": "Which country became the first to win five FIFA World Cups, in 2002?",
  "options": [
   "Germany",
   "Argentina",
   "Brazil",
   "Italy"
  ],
  "a": 2,
  "d": "medium"
 },
 "3": {
  "cat": "sports",
  "q": "In 2023, LeBron James broke whose NBA career regular-season points record?",
  "options": [
   "Michael Jordan",
   "Kobe Bryant",
   "Kareem Abdul-Jabbar",
   "Karl Malone"
  ],
  "a": 2,
  "d": "medium"
 },
 "6": {
  "cat": "sports",
  "q": "How many Formula 1 world titles did Michael Schumacher win?",
  "options": [
   "5",
   "6",
   "7",
   "8"
  ],
  "a": 2,
  "d": "medium"
 },
 "7": {
  "cat": "sports",
  "q": "What is the standard maximum break in a single frame of snooker?",
  "options": [
   "147",
   "150",
   "180",
   "100"
  ],
  "a": 0,
  "d": "medium"
 },
 "8": {
  "cat": "sports",
  "q": "Which country won both the 2019 and 2023 Rugby World Cups?",
  "options": [
   "New Zealand",
   "Australia",
   "England",
   "South Africa"
  ],
  "a": 3,
  "d": "medium"
 },
 "25": {
  "cat": "maths",
  "q": "The interior angles of a triangle add up to how many degrees?",
  "options": [
   "90°",
   "180°",
   "270°",
   "360°"
  ],
  "a": 1,
  "d": "easy"
 },
 "26": {
  "cat": "maths",
  "q": "What is 0.2 as a fraction in simplest form?",
  "options": [
   "1/2",
   "1/4",
   "1/5",
   "2/5"
  ],
  "a": 2,
  "d": "easy"
 },
 "38": {
  "cat": "advmaths",
  "q": "What is the sum of the integers from 1 to 100?",
  "options": [
   "4950",
   "5000",
   "5050",
   "5100"
  ],
  "a": 2,
  "d": "medium"
 },
 "51": {
  "cat": "maths",
  "q": "What is 3/4 as a percentage?",
  "options": [
   "65%",
   "70%",
   "75%",
   "80%"
  ],
  "a": 2,
  "d": "easy"
 },
 "80": {
  "cat": "movies",
  "q": "Who played Jack Dawson in Titanic (1997)?",
  "options": [
   "Brad Pitt",
   "Leonardo DiCaprio",
   "Matt Damon",
   "Johnny Depp"
  ],
  "a": 1,
  "d": "easy"
 },
 "81": {
  "cat": "movies",
  "q": "Which Australian actor plays Thor in the Marvel films?",
  "options": [
   "Liam Hemsworth",
   "Hugh Jackman",
   "Chris Hemsworth",
   "Sam Worthington"
  ],
  "a": 2,
  "d": "easy"
 },
 "94": {
  "cat": "music",
  "q": "Freddie Mercury was the frontman of which band?",
  "options": [
   "The Who",
   "Queen",
   "Led Zeppelin",
   "Pink Floyd"
  ],
  "a": 1,
  "d": "easy"
 },
 "118": {
  "cat": "sports",
  "q": "The annual NSW v Queensland State of Origin series is played in which sport?",
  "options": [
   "AFL",
   "Rugby union",
   "Rugby league",
   "Cricket"
  ],
  "a": 2,
  "d": "easy"
 },
 "145": {
  "cat": "geo",
  "q": "Brazil is on which continent?",
  "options": [
   "Africa",
   "South America",
   "North America",
   "Europe"
  ],
  "a": 1,
  "d": "easy"
 },
 "180": {
  "cat": "food",
  "q": "What are sushi rolls (maki) traditionally wrapped in?",
  "options": [
   "Rice paper",
   "Seaweed",
   "Lettuce",
   "Tofu skin"
  ],
  "a": 1,
  "d": "easy"
 },
 "196": {
  "cat": "pop",
  "q": "Mario and Luigi are characters in which game series?",
  "options": [
   "Sonic",
   "Super Mario",
   "Zelda",
   "Kirby"
  ],
  "a": 1,
  "d": "easy"
 },
 "199": {
  "cat": "pop",
  "q": "Elon Musk became CEO of which electric car company in 2008?",
  "options": [
   "Rivian",
   "Tesla",
   "Lucid",
   "Polestar"
  ],
  "a": 1,
  "d": "easy"
 },
 "203": {
  "cat": "pop",
  "q": "Who played the main Ken in Barbie (2023)?",
  "options": [
   "Ryan Reynolds",
   "Ryan Gosling",
   "Chris Evans",
   "Chris Pine"
  ],
  "a": 1,
  "d": "medium"
 },
 "208": {
  "cat": "pop",
  "q": "Which comedian was the original host of ABC's \"Hard Quiz\"?",
  "options": [
   "Shaun Micallef",
   "Tom Gleeson",
   "Hamish Blake",
   "Rove McManus"
  ],
  "a": 1,
  "d": "medium"
 },
 "215": {
  "cat": "aussie",
  "q": "What is a baby kangaroo called?",
  "options": [
   "Kit",
   "Cub",
   "Joey",
   "Pup"
  ],
  "a": 2,
  "d": "easy"
 },
 "226": {
  "cat": "aussie",
  "q": "In what year did Australian women win the right to vote federally?",
  "options": [
   "1894",
   "1902",
   "1918",
   "1945"
  ],
  "a": 1,
  "d": "medium"
 },
 "245": {
  "cat": "animals",
  "q": "What is a group of crows called?",
  "options": [
   "A murder",
   "A parliament",
   "A gaggle",
   "A pod"
  ],
  "a": 0,
  "d": "medium"
 },
 "247": {
  "cat": "animals",
  "q": "What is a female deer called?",
  "options": [
   "Mare",
   "Doe",
   "Ewe",
   "Sow"
  ],
  "a": 1,
  "d": "medium"
 },
 "249": {
  "cat": "animals",
  "q": "Which is the most venomous land snake in the world?",
  "options": [
   "King cobra",
   "Black mamba",
   "Inland taipan",
   "Eastern brown"
  ],
  "a": 2,
  "d": "medium"
 },
 "260": {
  "cat": "tech",
  "q": "Which company developed ChatGPT?",
  "options": [
   "Google",
   "OpenAI",
   "Meta",
   "Anthropic"
  ],
  "a": 1,
  "d": "easy"
 }
};
  const NEW = [
    {"cat":"sports","q":"Which team won the first men's Cricket World Cup in 1975?","options":["West Indies","Australia","England","India"],"a":0,"d":"hard"},
    {"cat":"sports","q":"In darts, what is the highest possible checkout finishing on a double or bull?","options":["160","167","180","170"],"a":3,"d":"hard"},
    {"cat":"sports","q":"Which mare won three straight Melbourne Cups from 2003 to 2005?","options":["Winx","Black Caviar","Makybe Diva","Phar Lap"],"a":2,"d":"hard"},
    {"cat":"sports","q":"Which country hosted the first FIFA World Cup in 1930?","options":["Brazil","Uruguay","Italy","France"],"a":1,"d":"hard"},
    {"cat":"sports","q":"Who won tennis's 'Golden Slam' (all four majors plus Olympic gold) in 1988?","options":["Martina Navratilova","Steffi Graf","Monica Seles","Chris Evert"],"a":1,"d":"hard"},
    {"cat":"sports","q":"How long is a cricket pitch from stumps to stumps?","options":["22 yards","20 yards","24 yards","25 yards"],"a":0,"d":"hard"},
    {"cat":"sports","q":"Australia II's 1983 America's Cup win ended which nation's 132-year hold on it?","options":["Great Britain","New Zealand","France","USA"],"a":3,"d":"hard"},
    {"cat":"sports","q":"Muhammad Ali was born with what name?","options":["Joe Louis","Sonny Liston","Cassius Clay","Jack Johnson"],"a":2,"d":"hard"},
    {"cat":"sports","q":"The 'Fosbury Flop' is a technique in which event?","options":["Pole vault","Long jump","High jump","Diving"],"a":2,"d":"hard"},
    {"cat":"sports","q":"Which Australian won the 1980 Formula 1 World Championship?","options":["Jack Brabham","Alan Jones","Mark Webber","Daniel Ricciardo"],"a":1,"d":"hard"},
    {"cat":"sports","q":"How high off the ground is a regulation basketball hoop?","options":["3.05 m","2.85 m","3.25 m","3.50 m"],"a":0,"d":"hard"},
    {"cat":"sports","q":"How many players per team are in the pool at once in water polo?","options":["5","6","8","7"],"a":3,"d":"hard"},
    {"cat":"sports","q":"How many points is a goal worth in AFL?","options":["1","3","5","6"],"a":3,"d":"easy"},
    {"cat":"sports","q":"The Boxing Day Test at the MCG is played in which sport?","options":["AFL","Rugby league","Cricket","Tennis"],"a":2,"d":"easy"},
    {"cat":"sports","q":"How many players per team are on the court in basketball?","options":["4","5","6","7"],"a":1,"d":"easy"},
    {"cat":"sports","q":"In which sport would you hope to hit a 'hole in one'?","options":["Golf","Tennis","Bowls","Cricket"],"a":0,"d":"easy"},
    {"cat":"sports","q":"The Stanley Cup is the top prize in which sport?","options":["Ice hockey","Baseball","Basketball","Lacrosse"],"a":0,"d":"medium"},
    {"cat":"sports","q":"Which Australian city hosted the 1956 Summer Olympics?","options":["Sydney","Brisbane","Adelaide","Melbourne"],"a":3,"d":"medium"},
    {"cat":"sports","q":"What was Don Bradman's career Test batting average?","options":["89.94","100.94","99.94","96.14"],"a":2,"d":"medium"},
    {"cat":"sports","q":"Which golf major is played every year at Augusta National?","options":["The Open","The Masters","US Open","US PGA"],"a":1,"d":"medium"},
    {"cat":"history","q":"Which Roman emperor was in power during the Great Fire of Rome in AD 64?","options":["Nero","Caligula","Claudius","Tiberius"],"a":0,"d":"hard"},
    {"cat":"history","q":"The 1854 Eureka Stockade rebellion took place in which goldfields town?","options":["Bendigo","Kalgoorlie","Bathurst","Ballarat"],"a":3,"d":"hard"},
    {"cat":"history","q":"Which Australian Prime Minister disappeared while swimming in 1967?","options":["John Gorton","William McMahon","Harold Holt","Robert Menzies"],"a":2,"d":"hard"},
    {"cat":"history","q":"Who was the first Emperor of Rome?","options":["Julius Caesar","Augustus","Nero","Trajan"],"a":1,"d":"hard"},
    {"cat":"history","q":"Who was the last Tsar of Russia?","options":["Alexander III","Nicholas II","Peter III","Alexander II"],"a":1,"d":"hard"},
    {"cat":"history","q":"Whose expedition was the first to circumnavigate the globe?","options":["Ferdinand Magellan","Christopher Columbus","Vasco da Gama","Francis Drake"],"a":0,"d":"hard"},
    {"cat":"history","q":"In which year did Japanese aircraft first bomb Darwin?","options":["1940","1941","1943","1942"],"a":3,"d":"hard"},
    {"cat":"history","q":"Before Canberra, which city was the seat of Australia's federal parliament?","options":["Sydney","Adelaide","Melbourne","Brisbane"],"a":2,"d":"hard"},
    {"cat":"history","q":"In 1893, which became the first self-governing country to give women the vote?","options":["Australia","United Kingdom","New Zealand","Finland"],"a":2,"d":"hard"},
    {"cat":"history","q":"Bushranger Ned Kelly was hanged in which city?","options":["Sydney","Melbourne","Ballarat","Beechworth"],"a":1,"d":"hard"},
    {"cat":"history","q":"In which year did the Sydney Harbour Bridge open?","options":["1932","1923","1938","1945"],"a":0,"d":"hard"},
    {"cat":"history","q":"What was the code name of the first atomic bomb test in 1945?","options":["Manhattan","Fat Man","Little Boy","Trinity"],"a":3,"d":"hard"},
    {"cat":"history","q":"The Gallipoli landing is remembered on which Australian day?","options":["Australia Day","Remembrance Day","Boxing Day","Anzac Day"],"a":3,"d":"easy"},
    {"cat":"history","q":"The Colosseum is in which city?","options":["Athens","Paris","Rome","Istanbul"],"a":2,"d":"easy"},
    {"cat":"history","q":"Which US President gave the Gettysburg Address?","options":["George Washington","Abraham Lincoln","Thomas Jefferson","Theodore Roosevelt"],"a":1,"d":"easy"},
    {"cat":"history","q":"Which country gave the Statue of Liberty to the USA?","options":["France","Britain","Spain","Italy"],"a":0,"d":"easy"},
    {"cat":"history","q":"Which Australian PM was dismissed by the Governor-General in 1975?","options":["Gough Whitlam","Malcolm Fraser","Bob Hawke","John Gorton"],"a":0,"d":"medium"},
    {"cat":"history","q":"Which treaty formally ended World War I with Germany?","options":["Treaty of Paris","Treaty of Ghent","Treaty of Utrecht","Treaty of Versailles"],"a":3,"d":"medium"},
    {"cat":"history","q":"Howard Carter discovered which pharaoh's tomb in 1922?","options":["Ramesses II","Cleopatra","Tutankhamun","Khufu"],"a":2,"d":"medium"},
    {"cat":"history","q":"Which ship did James Cook command on his 1770 voyage to Australia?","options":["HMS Resolution","HMS Endeavour","HMS Bounty","HMS Beagle"],"a":1,"d":"medium"},
    {"cat":"geo","q":"What is the capital of Turkey?","options":["Ankara","Istanbul","Izmir","Antalya"],"a":0,"d":"hard"},
    {"cat":"geo","q":"What is the capital of Vietnam?","options":["Ho Chi Minh City","Da Nang","Hue","Hanoi"],"a":3,"d":"hard"},
    {"cat":"geo","q":"Lake Titicaca sits on the border of Peru and which country?","options":["Chile","Ecuador","Bolivia","Colombia"],"a":2,"d":"hard"},
    {"cat":"geo","q":"What is the capital of Morocco?","options":["Casablanca","Rabat","Marrakesh","Fez"],"a":1,"d":"hard"},
    {"cat":"geo","q":"Which country has the longest coastline in the world?","options":["Australia","Canada","Russia","Indonesia"],"a":1,"d":"hard"},
    {"cat":"geo","q":"Mount Kilimanjaro is in which country?","options":["Tanzania","Kenya","Uganda","Ethiopia"],"a":0,"d":"hard"},
    {"cat":"geo","q":"What is the capital of Switzerland?","options":["Zurich","Geneva","Basel","Bern"],"a":3,"d":"hard"},
    {"cat":"geo","q":"Which river flows through Baghdad?","options":["Euphrates","Jordan","Tigris","Nile"],"a":2,"d":"hard"},
    {"cat":"geo","q":"The historic city of Timbuktu is in which country?","options":["Niger","Chad","Mali","Morocco"],"a":2,"d":"hard"},
    {"cat":"geo","q":"The Atacama Desert lies mostly in which country?","options":["Peru","Chile","Argentina","Mexico"],"a":1,"d":"hard"},
    {"cat":"geo","q":"What is the capital of Nigeria?","options":["Abuja","Lagos","Kano","Ibadan"],"a":0,"d":"hard"},
    {"cat":"geo","q":"What is the longest continental mountain range in the world?","options":["Rocky Mountains","Himalayas","Great Dividing Range","Andes"],"a":3,"d":"hard"},
    {"cat":"geo","q":"The Great Barrier Reef lies off the coast of which state?","options":["New South Wales","Western Australia","Northern Territory","Queensland"],"a":3,"d":"easy"},
    {"cat":"geo","q":"Which sea lies between Australia and New Zealand?","options":["Coral Sea","Timor Sea","Tasman Sea","Arafura Sea"],"a":2,"d":"easy"},
    {"cat":"geo","q":"Bangkok is the capital of which country?","options":["Vietnam","Thailand","Malaysia","Cambodia"],"a":1,"d":"easy"},
    {"cat":"geo","q":"Mount Everest is in which mountain range?","options":["Himalayas","Andes","Alps","Rockies"],"a":0,"d":"easy"},
    {"cat":"geo","q":"What is the capital of Brazil?","options":["Brasília","Rio de Janeiro","São Paulo","Salvador"],"a":0,"d":"medium"},
    {"cat":"geo","q":"Which strait separates mainland Australia from Tasmania?","options":["Torres Strait","Cook Strait","Bering Strait","Bass Strait"],"a":3,"d":"medium"},
    {"cat":"geo","q":"Which is the most populous country in Africa?","options":["Egypt","Ethiopia","Nigeria","South Africa"],"a":2,"d":"medium"},
    {"cat":"geo","q":"What is the world's largest island that isn't a continent?","options":["New Guinea","Greenland","Borneo","Madagascar"],"a":1,"d":"medium"},
    {"cat":"maths","q":"A price goes up 20%, then down 20%. Overall change?","options":["−4%","0%","+4%","−2%"],"a":0,"d":"hard"},
    {"cat":"maths","q":"What is 99 × 99?","options":["9081","9801","9901","9810"],"a":1,"d":"hard"},
    {"cat":"maths","q":"How many times is the digit 1 written when you count from 1 to 20?","options":["10","11","12","13"],"a":2,"d":"hard"},
    {"cat":"maths","q":"A bat and ball cost $1.10. The bat costs $1 more than the ball. Ball price?","options":["10c","15c","1c","5c"],"a":3,"d":"hard"},
    {"cat":"maths","q":"What is 15% of 15% of 400?","options":["9","60","90","6"],"a":0,"d":"hard"},
    {"cat":"maths","q":"What is the sum of the first 10 odd numbers?","options":["99","100","110","121"],"a":1,"d":"hard"},
    {"cat":"maths","q":"You drive there at 60 km/h and back at 40 km/h. Average speed for the trip?","options":["50 km/h","45 km/h","48 km/h","52 km/h"],"a":2,"d":"hard"},
    {"cat":"maths","q":"How many squares of any size are on a 3×3 grid?","options":["9","13","16","14"],"a":3,"d":"hard"},
    {"cat":"maths","q":"What is the last digit of 7¹⁰⁰?","options":["1","3","7","9"],"a":0,"d":"hard"},
    {"cat":"maths","q":"5 machines make 5 widgets in 5 min. How long for 100 machines to make 100?","options":["100 minutes","5 minutes","20 minutes","1 minute"],"a":1,"d":"hard"},
    {"cat":"maths","q":"10 people each shake hands with every other person once. How many handshakes?","options":["90","100","45","50"],"a":2,"d":"hard"},
    {"cat":"maths","q":"A clock reads 3:15. What is the angle between the hands?","options":["0°","15°","22.5°","7.5°"],"a":3,"d":"hard"},
    {"cat":"maths","q":"What is 9 × 6?","options":["54","48","56","63"],"a":0,"d":"easy"},
    {"cat":"maths","q":"How many minutes are in 3 hours?","options":["120","180","150","300"],"a":1,"d":"easy"},
    {"cat":"maths","q":"What is 50% of 64?","options":["16","28","32","34"],"a":2,"d":"easy"},
    {"cat":"maths","q":"How many centimetres are in 2 metres?","options":["20","2000","120","200"],"a":3,"d":"easy"},
    {"cat":"maths","q":"What is 16 × 25?","options":["400","350","375","425"],"a":0,"d":"medium"},
    {"cat":"maths","q":"What is 1/3 + 1/6?","options":["2/9","1/2","1/9","2/3"],"a":1,"d":"medium"},
    {"cat":"maths","q":"A $40 meal plus a 15% tip. Total?","options":["$44","$45","$46","$48"],"a":2,"d":"medium"},
    {"cat":"maths","q":"What is 3.6 ÷ 0.4?","options":["0.9","90","1.44","9"],"a":3,"d":"medium"},
    {"cat":"advmaths","q":"What is the derivative of ln(x²)?","options":["1/x²","2/x","2ln(x)","1/(2x)"],"a":1,"d":"hard"},
    {"cat":"advmaths","q":"What is the integral of x² from 0 to 1?","options":["1/2","1","1/3","2/3"],"a":2,"d":"hard"},
    {"cat":"advmaths","q":"How many ways can you choose 3 people from a group of 6?","options":["120","18","216","20"],"a":3,"d":"hard"},
    {"cat":"advmaths","q":"What is i to the power of 2026?","options":["−1","1","i","−i"],"a":0,"d":"hard"},
    {"cat":"advmaths","q":"What is log₂(1/8)?","options":["3","−3","1/3","−1/3"],"a":1,"d":"hard"},
    {"cat":"advmaths","q":"What is the derivative of x·eˣ?","options":["eˣ","xeˣ","(x + 1)eˣ","(x − 1)eˣ"],"a":2,"d":"hard"},
    {"cat":"advmaths","q":"Flip 3 fair coins. Probability of at least one head?","options":["1/2","3/4","3/8","7/8"],"a":3,"d":"hard"},
    {"cat":"advmaths","q":"The interior angles of a decagon add up to?","options":["1440°","1800°","1260°","1620°"],"a":0,"d":"hard"},
    {"cat":"advmaths","q":"What is the limit of sin(x)/x as x → 0?","options":["0","1","∞","Undefined"],"a":1,"d":"hard"},
    {"cat":"advmaths","q":"Fibonacci starts 1, 1, 2, 3… What is the 10th term?","options":["34","89","55","44"],"a":2,"d":"hard"},
    {"cat":"advmaths","q":"How many distinct ways can you arrange the letters of LEVEL?","options":["60","120","20","30"],"a":3,"d":"hard"},
    {"cat":"advmaths","q":"Roll two dice. Probability the total is 8?","options":["5/36","1/6","1/9","7/36"],"a":0,"d":"hard"},
    {"cat":"advmaths","q":"What is 4! (four factorial)?","options":["16","24","12","10"],"a":1,"d":"easy"},
    {"cat":"advmaths","q":"What is the derivative of 5x?","options":["5x","x","5","0"],"a":2,"d":"easy"},
    {"cat":"advmaths","q":"What is log₂(8)?","options":["4","2","16","3"],"a":3,"d":"easy"},
    {"cat":"advmaths","q":"What is π to two decimal places?","options":["3.14","3.12","3.16","3.41"],"a":0,"d":"easy"},
    {"cat":"advmaths","q":"What is e^(iπ) + 1?","options":["1","0","−1","2"],"a":1,"d":"medium"},
    {"cat":"advmaths","q":"What is the derivative of cos(x)?","options":["sin(x)","−cos(x)","−sin(x)","tan(x)"],"a":2,"d":"medium"},
    {"cat":"advmaths","q":"What is the integral of 1/x dx?","options":["−1/x² + C","x⁰ + C","eˣ + C","ln|x| + C"],"a":3,"d":"medium"},
    {"cat":"advmaths","q":"How many ways can you choose 2 items from 5?","options":["10","20","25","5"],"a":0,"d":"medium"},
    {"cat":"science","q":"Which element has the chemical symbol W?","options":["Titanium","Vanadium","Tungsten","Yttrium"],"a":2,"d":"hard"},
    {"cat":"science","q":"What is the most abundant element in Earth's crust by mass?","options":["Silicon","Iron","Aluminium","Oxygen"],"a":3,"d":"hard"},
    {"cat":"science","q":"Which planet has the shortest day?","options":["Jupiter","Saturn","Mercury","Earth"],"a":0,"d":"hard"},
    {"cat":"science","q":"Which particle did J.J. Thomson discover in 1897?","options":["Proton","Electron","Neutron","Photon"],"a":1,"d":"hard"},
    {"cat":"science","q":"Absolute zero is roughly what temperature in °C?","options":["−100°C","−460°C","−273°C","−373°C"],"a":2,"d":"hard"},
    {"cat":"science","q":"What is the hottest planet in our solar system?","options":["Mercury","Mars","Jupiter","Venus"],"a":3,"d":"hard"},
    {"cat":"science","q":"Roughly what is the half-life of carbon-14?","options":["5,730 years","573 years","57,300 years","1,000 years"],"a":0,"d":"hard"},
    {"cat":"science","q":"What is the third most abundant gas in Earth's atmosphere?","options":["Carbon dioxide","Argon","Neon","Helium"],"a":1,"d":"hard"},
    {"cat":"science","q":"Roughly how fast does sound travel in air at 20°C?","options":["1,235 m/s","3,430 m/s","34 m/s","343 m/s"],"a":3,"d":"hard"},
    {"cat":"science","q":"What is the smallest bone in the human body?","options":["Stapes","Incus","Malleus","Hyoid"],"a":0,"d":"hard"},
    {"cat":"science","q":"Which part of a cell builds proteins?","options":["Mitochondria","Ribosome","Nucleus","Vacuole"],"a":1,"d":"hard"},
    {"cat":"science","q":"What gives plants their green colour?","options":["Glucose","Chloroform","Chlorophyll","Keratin"],"a":2,"d":"easy"},
    {"cat":"science","q":"Which planet is closest to the Sun?","options":["Venus","Mars","Earth","Mercury"],"a":3,"d":"easy"},
    {"cat":"science","q":"What do bees collect from flowers to make honey?","options":["Nectar","Pollen","Sap","Water"],"a":0,"d":"easy"},
    {"cat":"science","q":"At sea level, water boils at what temperature (°C)?","options":["90°","100°","110°","212°"],"a":1,"d":"easy"},
    {"cat":"science","q":"Which metal is liquid at room temperature?","options":["Gallium","Lead","Mercury","Sodium"],"a":2,"d":"medium"},
    {"cat":"science","q":"Which blood type is the universal red-cell donor?","options":["AB positive","O positive","A negative","O negative"],"a":3,"d":"medium"},
    {"cat":"science","q":"Which planet rotates on its side, tilted about 98°?","options":["Uranus","Neptune","Saturn","Venus"],"a":0,"d":"medium"},
    {"cat":"science","q":"How many chromosomes are in a typical human body cell?","options":["23","46","44","48"],"a":1,"d":"medium"},
    {"cat":"movies","q":"Which film won the first ever Oscar for Best Animated Feature?","options":["Shrek","Monsters, Inc.","Spirited Away","Ice Age"],"a":0,"d":"hard"},
    {"cat":"movies","q":"Who directed the Oscar-winning film Parasite (2019)?","options":["Park Chan-wook","Bong Joon-ho","Kim Jee-woon","Lee Chang-dong"],"a":1,"d":"hard"},
    {"cat":"movies","q":"What is the name of the hotel in The Shining (1980)?","options":["The Stanley","The Bates","The Overlook","The Cecil"],"a":2,"d":"hard"},
    {"cat":"movies","q":"Who played the villain Hela in Thor: Ragnarok?","options":["Tessa Thompson","Rose Byrne","Elizabeth Debicki","Cate Blanchett"],"a":3,"d":"hard"},
    {"cat":"movies","q":"In Titanic, the 'Heart of the Ocean' necklace features what kind of gem?","options":["Blue diamond","Sapphire","Emerald","Black pearl"],"a":0,"d":"hard"},
    {"cat":"movies","q":"In Friends, what is the name of Joey's stuffed penguin?","options":["Waddles","Hugsy","Pengy","Mr. Flippers"],"a":1,"d":"hard"},
    {"cat":"movies","q":"What was Pixar's second feature film, after Toy Story?","options":["Monsters, Inc.","Toy Story 2","A Bug's Life","Finding Nemo"],"a":2,"d":"hard"},
    {"cat":"movies","q":"What is the name of the spaceship in Alien (1979)?","options":["Sulaco","Prometheus","Covenant","Nostromo"],"a":3,"d":"hard"},
    {"cat":"movies","q":"Who composed the score for Christopher Nolan's Interstellar?","options":["Hans Zimmer","John Williams","Ludwig Göransson","Howard Shore"],"a":0,"d":"hard"},
    {"cat":"movies","q":"In Game of Thrones, what is the name of Arya Stark's sword?","options":["Longclaw","Needle","Oathkeeper","Ice"],"a":1,"d":"hard"},
    {"cat":"movies","q":"In the TV series Severance, what is the name of the company?","options":["Hooli","Initech","Lumon Industries","Vought International"],"a":2,"d":"hard"},
    {"cat":"movies","q":"The Office (US) mostly takes place at Dunder Mifflin's branch in which city?","options":["Stamford","Nashua","Utica","Scranton"],"a":3,"d":"hard"},
    {"cat":"movies","q":"Which Australian directed Mad Max: Fury Road (2015)?","options":["George Miller","Baz Luhrmann","Peter Weir","Phillip Noyce"],"a":0,"d":"medium"},
    {"cat":"movies","q":"Who played Patrick Bateman in American Psycho (2000)?","options":["Jared Leto","Christian Bale","Matthew McConaughey","Ethan Hawke"],"a":1,"d":"medium"},
    {"cat":"movies","q":"How many Infinity Stones are there in the Marvel films?","options":["5","7","6","8"],"a":2,"d":"medium"},
    {"cat":"movies","q":"Stranger Things is set in which fictional town?","options":["Derry","Haddonfield","Twin Peaks","Hawkins"],"a":3,"d":"medium"},
    {"cat":"movies","q":"In The Lion King (1994), what is the name of the cub who grows up to be king?","options":["Simba","Mufasa","Scar","Kovu"],"a":0,"d":"easy"},
    {"cat":"movies","q":"Who is the headmaster of Hogwarts for most of the Harry Potter films?","options":["Severus Snape","Albus Dumbledore","Minerva McGonagall","Rubeus Hagrid"],"a":1,"d":"easy"},
    {"cat":"movies","q":"Which Australian actor played Wolverine in the X-Men films?","options":["Russell Crowe","Eric Bana","Hugh Jackman","Chris Hemsworth"],"a":2,"d":"easy"},
    {"cat":"movies","q":"What is Jennifer Lawrence's character called in The Hunger Games?","options":["Tris Prior","Bella Swan","Effie Trinket","Katniss Everdeen"],"a":3,"d":"easy"},
    {"cat":"music","q":"Which band's debut album was 'Pablo Honey' (1993)?","options":["Radiohead","Coldplay","Muse","Blur"],"a":0,"d":"hard"},
    {"cat":"music","q":"Which Australian band released the 1987 album 'Diesel and Dust'?","options":["INXS","Midnight Oil","Cold Chisel","Hunters & Collectors"],"a":1,"d":"hard"},
    {"cat":"music","q":"Which AC/DC singer died in 1980, before Brian Johnson joined?","options":["Dave Evans","Jimmy Barnes","Bon Scott","Malcolm Young"],"a":2,"d":"hard"},
    {"cat":"music","q":"Who released the 2012 album 'Channel Orange'?","options":["Childish Gambino","Miguel","The Weeknd","Frank Ocean"],"a":3,"d":"hard"},
    {"cat":"music","q":"Who topped Triple J's Hottest 100 of 2017?","options":["Kendrick Lamar","Amy Shark","Gang of Youths","Lorde"],"a":0,"d":"hard"},
    {"cat":"music","q":"What was Beyoncé's debut solo studio album?","options":["B'Day","Dangerously in Love","I Am... Sasha Fierce","4"],"a":1,"d":"hard"},
    {"cat":"music","q":"What is Lady Gaga's real first name?","options":["Joanne","Christina","Stefani","Alicia"],"a":2,"d":"hard"},
    {"cat":"music","q":"Tame Impala is the musical project of which Australian?","options":["Kevin Mitchell","Matt Corby","Nick Allbrook","Kevin Parker"],"a":3,"d":"hard"},
    {"cat":"music","q":"Which Daft Punk album includes 'Get Lucky'?","options":["Random Access Memories","Discovery","Homework","Human After All"],"a":0,"d":"hard"},
    {"cat":"music","q":"Fleetwood Mac's song 'Dreams' is from which album?","options":["Tusk","Rumours","Tango in the Night","Mirage"],"a":1,"d":"hard"},
    {"cat":"music","q":"'Uptown Funk' (2014) was released by which artist, featuring Bruno Mars?","options":["Calvin Harris","Pharrell Williams","Mark Ronson","David Guetta"],"a":2,"d":"hard"},
    {"cat":"music","q":"Who topped Triple J's Hottest 100 of 2021 with a Tame Impala cover?","options":["Spacey Jane","Ocean Alley","Gang of Youths","The Wiggles"],"a":3,"d":"hard"},
    {"cat":"music","q":"Which band had the hit 'Mr. Brightside'?","options":["The Killers","The Strokes","Kings of Leon","Franz Ferdinand"],"a":0,"d":"medium"},
    {"cat":"music","q":"Which NZ singer featured on Gotye's 'Somebody That I Used to Know'?","options":["Lorde","Kimbra","Ladyhawke","Brooke Fraser"],"a":1,"d":"medium"},
    {"cat":"music","q":"Who released the 2012 album 'Born to Die'?","options":["Lorde","Halsey","Lana Del Rey","Marina"],"a":2,"d":"medium"},
    {"cat":"music","q":"Rihanna was born in which country?","options":["Jamaica","Trinidad and Tobago","Bahamas","Barbados"],"a":3,"d":"medium"},
    {"cat":"music","q":"Kurt Cobain was the frontman of which band?","options":["Nirvana","Pearl Jam","Foo Fighters","Soundgarden"],"a":0,"d":"easy"},
    {"cat":"music","q":"ABBA come from which country?","options":["Norway","Sweden","Denmark","Finland"],"a":1,"d":"easy"},
    {"cat":"music","q":"How many Spice Girls were there?","options":["4","3","5","6"],"a":2,"d":"easy"},
    {"cat":"music","q":"Elvis Presley is known as the 'King of' what?","options":["Pop","Soul","Country","Rock and Roll"],"a":3,"d":"easy"},
    {"cat":"pop","q":"Who won the first season of Australian Idol in 2003?","options":["Guy Sebastian","Shannon Noll","Anthony Callea","Damien Leith"],"a":0,"d":"hard"},
    {"cat":"pop","q":"What does the 'GIF' in GIF image stand for?","options":["Graphic Image File","Graphics Interchange Format","General Image Format","Graphical Internet File"],"a":1,"d":"hard"},
    {"cat":"pop","q":"In what year was Fortnite's Battle Royale mode released?","options":["2015","2016","2017","2018"],"a":2,"d":"hard"},
    {"cat":"pop","q":"What was the name of Twitter's bird logo?","options":["Tweety","Jack","Birdie","Larry"],"a":3,"d":"hard"},
    {"cat":"pop","q":"In Minecraft, which block is used to build a Nether portal?","options":["Obsidian","Bedrock","Netherrack","Diamond"],"a":0,"d":"hard"},
    {"cat":"pop","q":"The 2014 Ice Bucket Challenge raised money for research into which disease?","options":["Multiple sclerosis","Motor neurone disease","Parkinson's disease","Cystic fibrosis"],"a":1,"d":"hard"},
    {"cat":"pop","q":"Which app was originally launched under the name 'Picaboo'?","options":["Instagram","Pinterest","Snapchat","Tumblr"],"a":2,"d":"hard"},
    {"cat":"pop","q":"What was internet-famous Grumpy Cat's real name?","options":["Lil Bub","Maru","Colonel Meow","Tardar Sauce"],"a":3,"d":"hard"},
    {"cat":"pop","q":"Which Pokémon is number 001 in the National Pokédex?","options":["Bulbasaur","Pikachu","Charmander","Mew"],"a":0,"d":"hard"},
    {"cat":"pop","q":"What is the made-up language spoken in The Sims called?","options":["Simspeak","Simlish","Plumbob","Simanese"],"a":1,"d":"hard"},
    {"cat":"pop","q":"What was the title of the first video ever uploaded to YouTube?","options":["Charlie bit my finger","Evolution of Dance","Hello YouTube","Me at the zoo"],"a":3,"d":"hard"},
    {"cat":"pop","q":"Which company bought Instagram in 2012?","options":["Facebook","Twitter","Google","Microsoft"],"a":0,"d":"medium"},
    {"cat":"pop","q":"In the game Among Us, what are the saboteur players called?","options":["Traitors","Impostors","Infected","Spies"],"a":1,"d":"medium"},
    {"cat":"pop","q":"Which Kardashian founded the shapewear brand SKIMS?","options":["Khloé","Kourtney","Kim","Kylie"],"a":2,"d":"medium"},
    {"cat":"pop","q":"Which South Korean singer had the 2012 viral hit 'Gangnam Style'?","options":["Rain","G-Dragon","Jungkook","PSY"],"a":3,"d":"medium"},
    {"cat":"pop","q":"What is the name of Bluey's little sister?","options":["Bingo","Coco","Muffin","Socks"],"a":0,"d":"easy"},
    {"cat":"pop","q":"Who co-founded Facebook in 2004?","options":["Jack Dorsey","Mark Zuckerberg","Evan Spiegel","Larry Page"],"a":1,"d":"easy"},
    {"cat":"pop","q":"Which 2016 mobile game had people catching creatures in real-world locations?","options":["Candy Crush","Clash of Clans","Pokémon Go","Angry Birds"],"a":2,"d":"easy"},
    {"cat":"food","q":"Which grape is NOT one of Champagne's three main varieties?","options":["Chardonnay","Pinot Noir","Sauvignon Blanc","Pinot Meunier"],"a":2,"d":"hard"},
    {"cat":"food","q":"Manchego cheese comes from which country?","options":["Spain","Portugal","Italy","Greece"],"a":0,"d":"hard"},
    {"cat":"food","q":"Which spirit is the base of a classic Negroni?","options":["Vodka","Gin","Whisky","Rum"],"a":1,"d":"hard"},
    {"cat":"food","q":"Profiteroles are made from which type of pastry?","options":["Filo","Puff","Shortcrust","Choux"],"a":3,"d":"hard"},
    {"cat":"food","q":"Most 'wasabi' served outside Japan is mainly made from what?","options":["Horseradish","Green chilli","Pickled ginger","Avocado"],"a":0,"d":"hard"},
    {"cat":"food","q":"Which nut goes in a traditional pesto alla genovese?","options":["Walnuts","Pine nuts","Almonds","Cashews"],"a":1,"d":"hard"},
    {"cat":"food","q":"Pimm's No. 1 Cup is a liqueur based on which spirit?","options":["Brandy","Rum","Gin","Whisky"],"a":2,"d":"hard"},
    {"cat":"food","q":"Halloumi cheese originated in which country?","options":["Greece","Turkey","Lebanon","Cyprus"],"a":3,"d":"hard"},
    {"cat":"food","q":"The umami taste is mainly triggered by which compound?","options":["Sucrose","Capsaicin","Citric acid","Glutamate"],"a":3,"d":"hard"},
    {"cat":"food","q":"By US law, bourbon must be at least 51% which grain?","options":["Corn","Rye","Barley","Wheat"],"a":0,"d":"hard"},
    {"cat":"food","q":"Which fish is an ingredient in Worcestershire sauce?","options":["Sardine","Anchovy","Tuna","Mackerel"],"a":1,"d":"hard"},
    {"cat":"food","q":"The Granny Smith apple was first grown in which country?","options":["New Zealand","England","Australia","USA"],"a":2,"d":"hard"},
    {"cat":"food","q":"Paella is a famous dish from which country?","options":["Mexico","Italy","Portugal","Spain"],"a":3,"d":"easy"},
    {"cat":"food","q":"Popcorn is made from which grain?","options":["Corn","Wheat","Rice","Barley"],"a":0,"d":"easy"},
    {"cat":"food","q":"What is a lamington coated in?","options":["Icing sugar","Chocolate and coconut","Caramel and nuts","Jam and cream"],"a":1,"d":"easy"},
    {"cat":"food","q":"Sake is a traditional drink from which country?","options":["China","Korea","Japan","Thailand"],"a":2,"d":"easy"},
    {"cat":"food","q":"Which spice comes from the stigma of a crocus flower?","options":["Turmeric","Paprika","Cardamom","Saffron"],"a":3,"d":"medium"},
    {"cat":"food","q":"Tequila is distilled from which plant?","options":["Blue agave","Sugar cane","Cactus pear","Yucca"],"a":0,"d":"medium"},
    {"cat":"food","q":"Which fizzy drink is made by fermenting sweet tea with a SCOBY?","options":["Kefir","Kombucha","Kvass","Ginger beer"],"a":1,"d":"medium"},
    {"cat":"food","q":"Traditional Italian gnocchi are usually made mainly from what?","options":["Rice","Semolina","Potato","Chickpeas"],"a":2,"d":"medium"},
    {"cat":"aussie","q":"Which Australian colony was the first to give women the vote?","options":["South Australia","New South Wales","Victoria","Western Australia"],"a":0,"d":"hard"},
    {"cat":"aussie","q":"Which strait separates Australia from Papua New Guinea?","options":["Bass Strait","Cook Strait","Torres Strait","Malacca Strait"],"a":2,"d":"hard"},
    {"cat":"aussie","q":"Who was Australia's first Prime Minister?","options":["Alfred Deakin","Henry Parkes","Joseph Lyons","Edmund Barton"],"a":3,"d":"hard"},
    {"cat":"aussie","q":"Which opera singer appears on the Australian $100 note?","options":["Nellie Melba","Joan Sutherland","June Bronhill","Joan Carden"],"a":0,"d":"hard"},
    {"cat":"aussie","q":"The Barossa Valley wine region is in which state?","options":["Victoria","New South Wales","South Australia","Western Australia"],"a":2,"d":"hard"},
    {"cat":"aussie","q":"In what year did Australia switch to decimal currency?","options":["1956","1972","1976","1966"],"a":3,"d":"hard"},
    {"cat":"aussie","q":"Which architect designed the Sydney Opera House?","options":["Harry Seidler","Jørn Utzon","Frank Gehry","Renzo Piano"],"a":1,"d":"hard"},
    {"cat":"aussie","q":"Who won the competition to design Canberra's city plan?","options":["Harry Seidler","John Monash","Walter Burley Griffin","Robin Boyd"],"a":2,"d":"hard"},
    {"cat":"aussie","q":"Which state was originally called Van Diemen's Land?","options":["Victoria","South Australia","Western Australia","Tasmania"],"a":3,"d":"hard"},
    {"cat":"aussie","q":"How many states does Australia have?","options":["6","5","7","8"],"a":0,"d":"easy"},
    {"cat":"aussie","q":"What is the name of Australia's national anthem?","options":["Waltzing Matilda","Advance Australia Fair","I Am Australian","Down Under"],"a":1,"d":"easy"},
    {"cat":"aussie","q":"Hobart is the capital of which state?","options":["Victoria","South Australia","Tasmania","Queensland"],"a":2,"d":"easy"},
    {"cat":"aussie","q":"Which ocean lies off Australia's east coast?","options":["Indian","Southern","Atlantic","Pacific"],"a":3,"d":"easy"},
    {"cat":"aussie","q":"The kids' show Bluey is set in which city?","options":["Brisbane","Sydney","Melbourne","Perth"],"a":0,"d":"medium"},
    {"cat":"aussie","q":"Which is Australia's largest state by area?","options":["Queensland","Western Australia","Northern Territory","New South Wales"],"a":1,"d":"medium"},
    {"cat":"aussie","q":"What is the highest mountain on mainland Australia?","options":["Mount Bogong","Mount Buller","Mount Kosciuszko","Mount Wellington"],"a":2,"d":"medium"},
    {"cat":"aussie","q":"What is Australia's national floral emblem?","options":["Waratah","Kangaroo paw","Sturt's desert pea","Golden wattle"],"a":3,"d":"medium"},
    {"cat":"animals","q":"What colour is a polar bear's skin?","options":["Black","White","Pink","Grey"],"a":0,"d":"hard"},
    {"cat":"animals","q":"What is a baby echidna called?","options":["Kit","Puggle","Cub","Pup"],"a":1,"d":"hard"},
    {"cat":"animals","q":"What is the closest living relative of the hippopotamus?","options":["Pig","Elephant","Whale","Rhinoceros"],"a":2,"d":"hard"},
    {"cat":"animals","q":"A 'flamboyance' is a group of which bird?","options":["Peacocks","Parrots","Pelicans","Flamingos"],"a":3,"d":"hard"},
    {"cat":"animals","q":"Which mammal has the longest pregnancy?","options":["Elephant","Blue whale","Giraffe","Rhinoceros"],"a":0,"d":"hard"},
    {"cat":"animals","q":"What is the national animal of Scotland?","options":["Red deer","Unicorn","Lion","Golden eagle"],"a":1,"d":"hard"},
    {"cat":"animals","q":"Which bird is the fastest in a hunting dive?","options":["Golden eagle","Bald eagle","Peregrine falcon","Swift"],"a":2,"d":"hard"},
    {"cat":"animals","q":"What is a male duck called?","options":["Cob","Gander","Tom","Drake"],"a":3,"d":"hard"},
    {"cat":"animals","q":"Which of these animals is a marsupial?","options":["Tasmanian devil","Dingo","Flying fox","Echidna"],"a":0,"d":"hard"},
    {"cat":"animals","q":"How many chambers does a crocodile's heart have?","options":["2","4","3","5"],"a":1,"d":"hard"},
    {"cat":"animals","q":"What word describes animals most active at dawn and dusk?","options":["Nocturnal","Diurnal","Crepuscular","Matutinal"],"a":2,"d":"hard"},
    {"cat":"animals","q":"The kookaburra belongs to which bird family?","options":["Crow","Parrot","Owl","Kingfisher"],"a":3,"d":"hard"},
    {"cat":"animals","q":"What do bees make?","options":["Silk","Honey","Sap","Maple syrup"],"a":1,"d":"easy"},
    {"cat":"animals","q":"Which animal is known as the 'king of the jungle'?","options":["Tiger","Gorilla","Lion","Elephant"],"a":2,"d":"easy"},
    {"cat":"animals","q":"Which lizard is famous for changing colour?","options":["Iguana","Gecko","Skink","Chameleon"],"a":3,"d":"easy"},
    {"cat":"animals","q":"Which living bird lays the largest egg?","options":["Ostrich","Emu","Cassowary","Albatross"],"a":0,"d":"medium"},
    {"cat":"animals","q":"Wombats are famous for doing poo in what shape?","options":["Spheres","Cubes","Pyramids","Spirals"],"a":1,"d":"medium"},
    {"cat":"animals","q":"What is a group of owls called?","options":["A murder","A pride","A parliament","A pod"],"a":2,"d":"medium"},
    {"cat":"animals","q":"In which of these animals do the males give birth?","options":["Clownfish","Octopus","Penguin","Seahorse"],"a":3,"d":"medium"},
    {"cat":"tech","q":"Bluetooth is named after what kind of historical figure?","options":["A Roman emperor","A pirate","A Viking king","A Greek god"],"a":2,"d":"hard"},
    {"cat":"tech","q":"What does 'QR' in QR code stand for?","options":["Quality Read","Quick Reference","Query Result","Quick Response"],"a":3,"d":"hard"},
    {"cat":"tech","q":"Which company makes Snapdragon phone chips?","options":["Qualcomm","MediaTek","Intel","AMD"],"a":0,"d":"hard"},
    {"cat":"tech","q":"What was Twitter's original name?","options":["Chirp","twttr","Tweeter","Status"],"a":1,"d":"hard"},
    {"cat":"tech","q":"Who is often called the first computer programmer?","options":["Alan Turing","Charles Babbage","Ada Lovelace","Grace Hopper"],"a":2,"d":"hard"},
    {"cat":"tech","q":"Which Australian organisation patented key Wi-Fi technology?","options":["Telstra","ANU","BHP","CSIRO"],"a":3,"d":"hard"},
    {"cat":"tech","q":"Which language did Brendan Eich create in about 10 days?","options":["JavaScript","Java","PHP","Ruby"],"a":0,"d":"hard"},
    {"cat":"tech","q":"Minecraft is developed by which studio?","options":["Rockstar","Mojang","Valve","Epic Games"],"a":1,"d":"hard"},
    {"cat":"tech","q":"Which Nintendo character was originally called 'Jumpman'?","options":["Donkey Kong","Luigi","Mario","Link"],"a":2,"d":"hard"},
    {"cat":"tech","q":"What does 'SIM' in SIM card stand for?","options":["Secure Internet Module","System Identity Mobile","Subscriber Info Media","Subscriber Identity Module"],"a":3,"d":"hard"},
    {"cat":"tech","q":"Which company makes Galaxy smartphones?","options":["Samsung","Apple","Google","Sony"],"a":0,"d":"easy"},
    {"cat":"tech","q":"On Windows, which shortcut copies selected text?","options":["Ctrl+V","Ctrl+C","Ctrl+X","Ctrl+Z"],"a":1,"d":"easy"},
    {"cat":"tech","q":"Which app is known for photos that disappear after viewing?","options":["Instagram","Pinterest","Snapchat","LinkedIn"],"a":2,"d":"easy"},
    {"cat":"tech","q":"Which company makes the Xbox?","options":["Sony","Nintendo","Sega","Microsoft"],"a":3,"d":"easy"},
    {"cat":"tech","q":"What does 'HTML' stand for?","options":["HyperText Markup Language","High Tech Modern Language","HyperText Main Link","Home Tool Markup Language"],"a":0,"d":"medium"},
    {"cat":"tech","q":"Who invented the World Wide Web?","options":["Vint Cerf","Tim Berners-Lee","Bill Gates","Linus Torvalds"],"a":1,"d":"medium"},
    {"cat":"tech","q":"What does 'PDF' stand for?","options":["Printable Data File","Public Document File","Portable Document Format","Print Display Format"],"a":2,"d":"medium"},
    {"cat":"tech","q":"What does 'IP' in IP address stand for?","options":["Internal Port","Internet Provider","Information Path","Internet Protocol"],"a":3,"d":"medium"}
  ];
  Object.keys(FIX).forEach(i => { if (FIX[i].drop) QUESTIONS[i] = null; else Object.assign(QUESTIONS[i], FIX[i]); });
  for (let i = QUESTIONS.length - 1; i >= 0; i--) if (!QUESTIONS[i]) QUESTIONS.splice(i, 1);
  QUESTIONS.push(...NEW);
})();

// ---- Nov 2026: Hard tier recalibrated to "harder medium" (gettable when typed) ----
(function () {
  const REPLACE = {
 "Who won tennis's 'Golden Slam' (all four majors plus Olympic gold) in 1988?": {
  "cat": "sports",
  "q": "Which Aussie swimmer was nicknamed 'the Thorpedo'?",
  "options": [
   "Ian Thorpe",
   "Grant Hackett",
   "Kieren Perkins",
   "Michael Klim"
  ],
  "a": 0,
  "d": "hard"
 },
 "Which Australian won the 1980 Formula 1 World Championship?": {
  "cat": "sports",
  "q": "Which Australian won the Wimbledon men's singles title in 2002?",
  "options": [
   "Pat Rafter",
   "Lleyton Hewitt",
   "Mark Philippoussis",
   "Nick Kyrgios"
  ],
  "a": 1,
  "d": "hard"
 },
 "How high off the ground is a regulation basketball hoop?": {
  "cat": "sports",
  "q": "In golf, what is a score of three under par on one hole called?",
  "options": [
   "Eagle",
   "Condor",
   "Albatross",
   "Birdie"
  ],
  "a": 2,
  "d": "hard"
 },
 "What was the code name of the first atomic bomb test in 1945?": {
  "cat": "history",
  "q": "Which ship carried the Pilgrims to America in 1620?",
  "options": [
   "Endeavour",
   "Santa Maria",
   "Beagle",
   "Mayflower"
  ],
  "a": 3,
  "d": "hard"
 },
 "A price goes up 20%, then down 20%. Overall change?": {
  "cat": "maths",
  "q": "What is 15 × 15?",
  "options": [
   "225",
   "215",
   "235",
   "250"
  ],
  "a": 0,
  "d": "hard"
 },
 "How many times is the digit 1 written when you count from 1 to 20?": {
  "cat": "maths",
  "q": "What is 20% of 350?",
  "options": [
   "35",
   "70",
   "75",
   "50"
  ],
  "a": 1,
  "d": "hard"
 },
 "A bat and ball cost $1.10. The bat costs $1 more than the ball. Ball price?": {
  "cat": "maths",
  "q": "What is 2 to the power of 8?",
  "options": [
   "128",
   "512",
   "256",
   "64"
  ],
  "a": 2,
  "d": "hard"
 },
 "You drive there at 60 km/h and back at 40 km/h. Average speed for the trip?": {
  "cat": "maths",
  "q": "What is the square root of 196?",
  "options": [
   "16",
   "13",
   "15",
   "14"
  ],
  "a": 3,
  "d": "hard"
 },
 "How many squares of any size are on a 3×3 grid?": {
  "cat": "maths",
  "q": "What is 25 × 24?",
  "options": [
   "600",
   "625",
   "575",
   "550"
  ],
  "a": 0,
  "d": "hard"
 },
 "What is the last digit of 7¹⁰⁰?": {
  "cat": "maths",
  "q": "How many seconds are there in one hour?",
  "options": [
   "360",
   "6000",
   "3600",
   "1440"
  ],
  "a": 2,
  "d": "hard"
 },
 "5 machines make 5 widgets in 5 min. How long for 100 machines to make 100?": {
  "cat": "maths",
  "q": "What is 75% of 240?",
  "options": [
   "160",
   "180",
   "200",
   "120"
  ],
  "a": 1,
  "d": "hard"
 },
 "A clock reads 3:15. What is the angle between the hands?": {
  "cat": "maths",
  "q": "What is 7 × 7 × 7?",
  "options": [
   "243",
   "294",
   "349",
   "343"
  ],
  "a": 3,
  "d": "hard"
 },
 "What is the derivative of ln(x²)?": {
  "cat": "advmaths",
  "q": "What is 7! divided by 5!?",
  "options": [
   "42",
   "35",
   "56",
   "30"
  ],
  "a": 0,
  "d": "hard"
 },
 "What is the integral of x² from 0 to 1?": {
  "cat": "advmaths",
  "q": "If f(x) = x² + 3x, what is f(4)?",
  "options": [
   "24",
   "28",
   "19",
   "32"
  ],
  "a": 1,
  "d": "hard"
 },
 "What is i to the power of 2026?": {
  "cat": "advmaths",
  "q": "What is the derivative of 3x² when x = 2?",
  "options": [
   "6",
   "24",
   "12",
   "10"
  ],
  "a": 2,
  "d": "hard"
 },
 "What is log₂(1/8)?": {
  "cat": "advmaths",
  "q": "A right-angled triangle has sides 6 and 8. How long is the hypotenuse?",
  "options": [
   "12",
   "14",
   "9",
   "10"
  ],
  "a": 3,
  "d": "hard"
 },
 "What is the derivative of x·eˣ?": {
  "cat": "advmaths",
  "q": "How many diagonals does an octagon have?",
  "options": [
   "20",
   "16",
   "24",
   "28"
  ],
  "a": 0,
  "d": "hard"
 },
 "Flip 3 fair coins. Probability of at least one head?": {
  "cat": "advmaths",
  "q": "What is the mean of 3, 7, 8, 10 and 12?",
  "options": [
   "7",
   "9",
   "8",
   "10"
  ],
  "a": 2,
  "d": "hard"
 },
 "How many distinct ways can you arrange the letters of LEVEL?": {
  "cat": "advmaths",
  "q": "Solve for x: 5x − 4 = 3x + 10",
  "options": [
   "5",
   "6",
   "8",
   "7"
  ],
  "a": 3,
  "d": "hard"
 },
 "Roll two dice. Probability the total is 8?": {
  "cat": "advmaths",
  "q": "In how many different orders can 4 people line up in a row?",
  "options": [
   "24",
   "16",
   "12",
   "8"
  ],
  "a": 0,
  "d": "hard"
 },
 "Roughly what is the half-life of carbon-14?": {
  "cat": "science",
  "q": "What is the chemical symbol for sodium?",
  "options": [
   "So",
   "Na",
   "Sd",
   "S"
  ],
  "a": 1,
  "d": "hard"
 },
 "What is the third most abundant gas in Earth's atmosphere?": {
  "cat": "science",
  "q": "Which organ produces insulin?",
  "options": [
   "Liver",
   "Kidney",
   "Pancreas",
   "Spleen"
  ],
  "a": 2,
  "d": "hard"
 },
 "Roughly how fast does sound travel in air at 20°C?": {
  "cat": "science",
  "q": "Who discovered penicillin in 1928?",
  "options": [
   "Louis Pasteur",
   "Joseph Lister",
   "Edward Jenner",
   "Alexander Fleming"
  ],
  "a": 3,
  "d": "hard"
 },
 "What is the smallest bone in the human body?": {
  "cat": "science",
  "q": "Lack of vitamin C causes which disease, once common among sailors?",
  "options": [
   "Scurvy",
   "Rickets",
   "Beriberi",
   "Gout"
  ],
  "a": 0,
  "d": "hard"
 },
 "What is the name of the spaceship in Alien (1979)?": {
  "cat": "movies",
  "q": "In Breaking Bad, what alias does Walter White go by?",
  "options": [
   "Heisenberg",
   "Einstein",
   "Gatsby",
   "Oppenheimer"
  ],
  "a": 0,
  "d": "hard"
 },
 "In the TV series Severance, what is the name of the company?": {
  "cat": "movies",
  "q": "In Finding Nemo, what is the name of Nemo's dad?",
  "options": [
   "Gill",
   "Marlin",
   "Crush",
   "Bruce"
  ],
  "a": 1,
  "d": "hard"
 },
 "Which band's debut album was 'Pablo Honey' (1993)?": {
  "cat": "music",
  "q": "Which Aussie singer, known for hiding her face, had the hit 'Chandelier'?",
  "options": [
   "Kylie Minogue",
   "Delta Goodrem",
   "Sia",
   "Tones and I"
  ],
  "a": 2,
  "d": "hard"
 },
 "What was Beyoncé's debut solo studio album?": {
  "cat": "music",
  "q": "Which British singer named her albums after her age, like '21' and '25'?",
  "options": [
   "Amy Winehouse",
   "Dua Lipa",
   "Lily Allen",
   "Adele"
  ],
  "a": 3,
  "d": "hard"
 },
 "Which Daft Punk album includes 'Get Lucky'?": {
  "cat": "music",
  "q": "Who sang 'Never Gonna Give You Up', the song behind 'Rickrolling'?",
  "options": [
   "Rick Astley",
   "George Michael",
   "Phil Collins",
   "Lionel Richie"
  ],
  "a": 0,
  "d": "hard"
 },
 "What does the 'GIF' in GIF image stand for?": {
  "cat": "pop",
  "q": "In Mario Kart, which item hunts down the racer in first place?",
  "options": [
   "Red shell",
   "Blue shell",
   "Green shell",
   "Bullet Bill"
  ],
  "a": 1,
  "d": "hard"
 },
 "What was the name of Twitter's bird logo?": {
  "cat": "pop",
  "q": "Which Pokémon does Pikachu evolve into?",
  "options": [
   "Pichu",
   "Jolteon",
   "Raichu",
   "Plusle"
  ],
  "a": 2,
  "d": "hard"
 },
 "Which app was originally launched under the name 'Picaboo'?": {
  "cat": "pop",
  "q": "What is the name of Bluey's dad?",
  "options": [
   "Bandit",
   "Chilli",
   "Rusty",
   "Stripe"
  ],
  "a": 0,
  "d": "hard"
 },
 "What was internet-famous Grumpy Cat's real name?": {
  "cat": "pop",
  "q": "In Fortnite, what drops players onto the island at the start of a match?",
  "options": [
   "Party Plane",
   "Storm Glider",
   "Drop Ship",
   "Battle Bus"
  ],
  "a": 3,
  "d": "hard"
 },
 "What was the title of the first video ever uploaded to YouTube?": {
  "cat": "pop",
  "q": "Which language-learning app has a green owl mascot called Duo?",
  "options": [
   "Babbel",
   "Duolingo",
   "Memrise",
   "Rosetta Stone"
  ],
  "a": 1,
  "d": "hard"
 },
 "Which grape is NOT one of Champagne's three main varieties?": {
  "cat": "food",
  "q": "The pavlova is named after a ballerina from which country?",
  "options": [
   "Russia",
   "France",
   "Italy",
   "Austria"
  ],
  "a": 0,
  "d": "hard"
 },
 "Pimm's No. 1 Cup is a liqueur based on which spirit?": {
  "cat": "food",
  "q": "Which Italian dessert layers mascarpone with coffee-soaked biscuits?",
  "options": [
   "Panna cotta",
   "Cannoli",
   "Tiramisu",
   "Zabaglione"
  ],
  "a": 2,
  "d": "hard"
 },
 "The umami taste is mainly triggered by which compound?": {
  "cat": "food",
  "q": "Pho is a noodle soup that comes from which country?",
  "options": [
   "Thailand",
   "Vietnam",
   "Laos",
   "Cambodia"
  ],
  "a": 1,
  "d": "hard"
 },
 "Which opera singer appears on the Australian $100 note?": {
  "cat": "aussie",
  "q": "The Melbourne Cup is run at which racecourse?",
  "options": [
   "Caulfield",
   "Randwick",
   "Flemington",
   "Moonee Valley"
  ],
  "a": 2,
  "d": "hard"
 },
 "How many chambers does a crocodile's heart have?": {
  "cat": "animals",
  "q": "What is the largest fish in the world?",
  "options": [
   "Whale shark",
   "Great white shark",
   "Basking shark",
   "Blue marlin"
  ],
  "a": 0,
  "d": "hard"
 },
 "What word describes animals most active at dawn and dusk?": {
  "cat": "animals",
  "q": "What is a baby swan called?",
  "options": [
   "Gosling",
   "Duckling",
   "Fledgling",
   "Cygnet"
  ],
  "a": 3,
  "d": "hard"
 },
 "Bluetooth is named after what kind of historical figure?": {
  "cat": "tech",
  "q": "Bluetooth is named after a Viking king from which modern country?",
  "options": [
   "Norway",
   "Denmark",
   "Sweden",
   "Iceland"
  ],
  "a": 1,
  "d": "hard"
 },
 "What was Twitter's original name?": {
  "cat": "tech",
  "q": "Which company develops the Android operating system?",
  "options": [
   "Samsung",
   "Apple",
   "Google",
   "Microsoft"
  ],
  "a": 2,
  "d": "hard"
 },
 "What does 'SIM' in SIM card stand for?": {
  "cat": "tech",
  "q": "What does the 'S' in HTTPS stand for?",
  "options": [
   "Secure",
   "Server",
   "Standard",
   "Safe"
  ],
  "a": 0,
  "d": "hard"
 }
};
  const ADD = [
    {"cat":"science","q":"What is the boiling point of water in degrees Fahrenheit?","options":["100","180","212","232"],"a":2,"d":"hard"},
    {"cat":"pop","q":"Which princess does Link usually set out to rescue?","options":["Peach","Daisy","Rosalina","Zelda"],"a":3,"d":"hard"},
    {"cat":"aussie","q":"Which PM delivered the National Apology to the Stolen Generations in 2008?","options":["Kevin Rudd","John Howard","Julia Gillard","Paul Keating"],"a":0,"d":"hard"},
    {"cat":"aussie","q":"What is the capital of the Northern Territory?","options":["Alice Springs","Katherine","Darwin","Tennant Creek"],"a":2,"d":"hard"},
    {"cat":"aussie","q":"The Twelve Apostles rock stacks sit along which famous Victorian road?","options":["Hume Highway","Princes Highway","Pacific Highway","Great Ocean Road"],"a":3,"d":"hard"},
    {"cat":"tech","q":"Which company created the Walkman portable music player?","options":["Panasonic","Sony","Philips","Toshiba"],"a":1,"d":"hard"},
    {"cat":"tech","q":"The Python programming language is named after which comedy group?","options":["Monty Python","The Goodies","The Young Ones","Flight of the Conchords"],"a":0,"d":"hard"}
  ];
  QUESTIONS.forEach((q, i) => { if (q.d === 'hard' && REPLACE[q.q]) QUESTIONS[i] = REPLACE[q.q]; });
  QUESTIONS.push(...ADD);
})();

// ---- Nov 2026: 8 new categories (Video Games, Cars, Space, Human Body, Words & Slang, Myths & Legends, Brands, Art & Books) ----
QUESTIONS.push(
  {"cat":"games","q":"What colour is Sonic the Hedgehog?","options":["Blue","Green","Red","Yellow"],"a":0,"d":"easy"},
  {"cat":"games","q":"In Pac-Man, what does Pac-Man eat to turn the ghosts blue?","options":["Cherries","Power pellets","Coins","Stars"],"a":1,"d":"easy"},
  {"cat":"games","q":"Which Nintendo console from 2017 can be played handheld or docked to a TV?","options":["Wii U","GameCube","Switch","3DS"],"a":2,"d":"easy"},
  {"cat":"games","q":"In Minecraft, which green mob sneaks up and explodes?","options":["Zombie","Enderman","Skeleton","Creeper"],"a":3,"d":"easy"},
  {"cat":"games","q":"What is the name of Mario's green dinosaur sidekick?","options":["Yoshi","Toad","Wario","Koopa"],"a":0,"d":"easy"},
  {"cat":"games","q":"In the game series GTA, what does GTA stand for?","options":["Great Turbo Action","Grand Theft Auto","Global Tactical Assault","Grand Tour Arena"],"a":1,"d":"easy"},
  {"cat":"games","q":"Which falling-block puzzle game was created in the Soviet Union in 1984?","options":["Pong","Snake","Tetris","Breakout"],"a":2,"d":"easy"},
  {"cat":"games","q":"Which spiky-shelled villain keeps kidnapping Princess Peach?","options":["Ganon","Wario","Ridley","Bowser"],"a":3,"d":"easy"},
  {"cat":"games","q":"Lara Croft is the hero of which game series?","options":["Tomb Raider","Uncharted","Resident Evil","Hitman"],"a":0,"d":"easy"},
  {"cat":"games","q":"In Angry Birds, which animals are the birds attacking?","options":["Cats","Pigs","Snakes","Rats"],"a":1,"d":"easy"},
  {"cat":"games","q":"Master Chief is the hero of which Xbox shooter series?","options":["Gears of War","Doom","Halo","Destiny"],"a":2,"d":"easy"},
  {"cat":"games","q":"Which bandicoot starred in PlayStation platformers from 1996?","options":["Spyro","Sly","Jak","Crash"],"a":3,"d":"easy"},
  {"cat":"games","q":"In Mario Kart, which fruit peel can you drop to make rivals spin out?","options":["Banana","Apple","Orange","Lemon"],"a":0,"d":"easy"},
  {"cat":"games","q":"In the Pokémon anime, what is Ash's first Pokémon?","options":["Charmander","Pikachu","Squirtle","Eevee"],"a":1,"d":"easy"},
  {"cat":"games","q":"Which Aussie-made game stars a Tasmanian tiger who throws boomerangs?","options":["Crash","Spyro","Ty","Rayman"],"a":2,"d":"medium"},
  {"cat":"games","q":"Grand Theft Auto V is set in which fictional city?","options":["Vice City","Liberty City","San Fierro","Los Santos"],"a":3,"d":"medium"},
  {"cat":"games","q":"In Minecraft, which tall black mob teleports and hates being stared at?","options":["Enderman","Creeper","Wither","Ghast"],"a":0,"d":"medium"},
  {"cat":"games","q":"Which game company makes the Grand Theft Auto series?","options":["Ubisoft","Rockstar","EA","Activision"],"a":1,"d":"medium"},
  {"cat":"games","q":"Which Japanese company created Sonic the Hedgehog?","options":["Nintendo","Capcom","Sega","Konami"],"a":2,"d":"medium"},
  {"cat":"games","q":"What is the name of Sonic's two-tailed fox sidekick?","options":["Knuckles","Shadow","Amy","Tails"],"a":3,"d":"medium"},
  {"cat":"games","q":"In Pac-Man, what colour is the ghost Blinky?","options":["Red","Pink","Cyan","Orange"],"a":0,"d":"medium"},
  {"cat":"games","q":"Which Nintendo console launched in 2006 with motion-sensing remotes?","options":["GameCube","Wii","Wii U","DS"],"a":1,"d":"medium"},
  {"cat":"games","q":"In which farming game do you move to Pelican Town?","options":["Animal Crossing","Harvest Moon","Stardew Valley","FarmVille"],"a":2,"d":"medium"},
  {"cat":"games","q":"In Animal Crossing, which raccoon gives you a home loan?","options":["Isabelle","K.K. Slider","Blathers","Tom Nook"],"a":3,"d":"medium"},
  {"cat":"games","q":"What is the name of Valve's PC gaming store?","options":["Steam","Epic","Origin","Battle.net"],"a":0,"d":"medium"},
  {"cat":"games","q":"Which Ubisoft series follows hooded killers through history?","options":["Far Cry","Assassin's Creed","Watch Dogs","Hitman"],"a":1,"d":"medium"},
  {"cat":"games","q":"Kratos is the angry hero of which game series?","options":["Devil May Cry","Dark Souls","God of War","Diablo"],"a":2,"d":"medium"},
  {"cat":"games","q":"EA's football game series was renamed EA Sports FC in 2023. What was it called before?","options":["PES","Madden","Pro Evo","FIFA"],"a":3,"d":"medium"},
  {"cat":"games","q":"In Resident Evil, which zombie-overrun city is home to the Umbrella Corporation's lab?","options":["Raccoon City","Silent Hill","Rapture","Hope County"],"a":0,"d":"hard"},
  {"cat":"games","q":"In Halo, what is Master Chief's AI companion called?","options":["GLaDOS","Cortana","Navi","Jarvis"],"a":1,"d":"hard"},
  {"cat":"games","q":"In Portal, what is the name of the murderous AI running the test chambers?","options":["HAL","Cortana","GLaDOS","SHODAN"],"a":2,"d":"hard"},
  {"cat":"games","q":"In Zelda: Ocarina of Time, what is the fairy that guides Link called?","options":["Tatl","Midna","Fi","Navi"],"a":3,"d":"hard"},
  {"cat":"games","q":"In which year did the original PlayStation launch in Japan?","options":["1994","1992","1996","1998"],"a":0,"d":"hard"},
  {"cat":"games","q":"What is the name of the white-haired monster hunter in The Witcher games?","options":["Ciri","Geralt","Vesemir","Dandelion"],"a":1,"d":"hard"},
  {"cat":"games","q":"The underwater city of Rapture is the setting of which game?","options":["Fallout","Dishonored","BioShock","Half-Life"],"a":2,"d":"hard"},
  {"cat":"games","q":"Which studio develops the main-series Pokémon games?","options":["Capcom","HAL Laboratory","Square Enix","Game Freak"],"a":3,"d":"hard"},
  {"cat":"games","q":"In Fallout, what are the underground nuclear shelters called?","options":["Vaults","Bunkers","Domes","Silos"],"a":0,"d":"hard"},
  {"cat":"games","q":"In Tetris, what is clearing four lines at once called?","options":["A Quad","A Tetris","A Combo","A Strike"],"a":1,"d":"hard"},
  {"cat":"games","q":"Which Japanese company makes Street Fighter and Resident Evil?","options":["Konami","Sega","Capcom","Square Enix"],"a":2,"d":"hard"},
  {"cat":"games","q":"Solid Snake is the hero of which stealth series?","options":["Splinter Cell","Hitman","Dishonored","Metal Gear"],"a":3,"d":"hard"},
  {"cat":"cars","q":"Which Italian car brand has a prancing horse logo?","options":["Ferrari","Lamborghini","Maserati","Alfa Romeo"],"a":0,"d":"easy"},
  {"cat":"cars","q":"Which car brand's logo is a raging bull?","options":["Ferrari","Lamborghini","Pagani","Maserati"],"a":1,"d":"easy"},
  {"cat":"cars","q":"The Commodore was made by which Aussie car brand?","options":["Ford","Toyota","Holden","Mitsubishi"],"a":2,"d":"easy"},
  {"cat":"cars","q":"Which car maker built the Falcon in Australia?","options":["Holden","Chrysler","Nissan","Ford"],"a":3,"d":"easy"},
  {"cat":"cars","q":"Toyota comes from which country?","options":["Japan","South Korea","China","Germany"],"a":0,"d":"easy"},
  {"cat":"cars","q":"Which German brand's logo is four interlocking rings?","options":["BMW","Audi","Volkswagen","Opel"],"a":1,"d":"easy"},
  {"cat":"cars","q":"Mount Panorama, home of the famous Supercars 1000, is in which NSW town?","options":["Orange","Dubbo","Bathurst","Goulburn"],"a":2,"d":"easy"},
  {"cat":"cars","q":"Volvo comes from which country?","options":["Norway","Denmark","Finland","Sweden"],"a":3,"d":"easy"},
  {"cat":"cars","q":"In NSW, what colour are P1 provisional plates?","options":["Red","Green","Yellow","Blue"],"a":0,"d":"easy"},
  {"cat":"cars","q":"What is the name of the red race car hero in Pixar's Cars?","options":["Mater","Lightning McQueen","Doc Hudson","Sally"],"a":1,"d":"easy"},
  {"cat":"cars","q":"Which car company makes the Beetle and the Golf?","options":["Fiat","Renault","Volkswagen","Skoda"],"a":2,"d":"easy"},
  {"cat":"cars","q":"Which German brand makes the 911 sports car?","options":["BMW","Audi","Mercedes-Benz","Porsche"],"a":3,"d":"easy"},
  {"cat":"cars","q":"Which car brand's logo is a three-pointed star?","options":["Mercedes-Benz","BMW","Volvo","Peugeot"],"a":0,"d":"easy"},
  {"cat":"cars","q":"Who plays Dominic Toretto in the Fast & Furious films?","options":["Paul Walker","Vin Diesel","The Rock","Jason Statham"],"a":1,"d":"easy"},
  {"cat":"cars","q":"What does SUV stand for?","options":["Super Urban Vehicle","Standard Utility Van","Sport Utility Vehicle","Sport Urban Vehicle"],"a":2,"d":"medium"},
  {"cat":"cars","q":"Hyundai and Kia come from which country?","options":["Japan","China","Taiwan","South Korea"],"a":3,"d":"medium"},
  {"cat":"cars","q":"Mad Max's V8 Interceptor (1979) was a modified Ford what?","options":["Falcon","Mustang","Fairlane","Cortina"],"a":0,"d":"medium"},
  {"cat":"cars","q":"In which year did Holden stop building cars in Australia?","options":["2013","2017","2015","2019"],"a":1,"d":"medium"},
  {"cat":"cars","q":"Which car became a time machine in Back to the Future?","options":["Corvette","Camaro","DeLorean","Mustang"],"a":2,"d":"medium"},
  {"cat":"cars","q":"Which British luxury brand makes the Phantom and the Ghost?","options":["Bentley","Jaguar","Aston Martin","Rolls-Royce"],"a":3,"d":"medium"},
  {"cat":"cars","q":"James Bond's classic DB5 was made by which brand?","options":["Aston Martin","Jaguar","Lotus","Bentley"],"a":0,"d":"medium"},
  {"cat":"cars","q":"BMW is headquartered in which German city?","options":["Stuttgart","Munich","Berlin","Wolfsburg"],"a":1,"d":"medium"},
  {"cat":"cars","q":"In car brakes, what does ABS stand for?","options":["Automatic Brake Sensor","Active Brake Support","Anti-lock Braking System","Auto Balance System"],"a":2,"d":"medium"},
  {"cat":"cars","q":"What is Toyota's luxury car brand called?","options":["Infiniti","Acura","Genesis","Lexus"],"a":3,"d":"medium"},
  {"cat":"cars","q":"Which Japanese brand makes the WRX?","options":["Subaru","Mitsubishi","Mazda","Nissan"],"a":0,"d":"medium"},
  {"cat":"cars","q":"Which Japanese brand makes the MX-5 roadster?","options":["Honda","Mazda","Toyota","Nissan"],"a":1,"d":"medium"},
  {"cat":"cars","q":"What does a car's tachometer measure?","options":["Speed","Fuel level","Engine revs","Oil temperature"],"a":2,"d":"medium"},
  {"cat":"cars","q":"The Australian F1 Grand Prix moved to which Melbourne circuit in 1996?","options":["Phillip Island","Sandown","Calder Park","Albert Park"],"a":3,"d":"medium"},
  {"cat":"cars","q":"Before Melbourne, which city hosted the Australian F1 Grand Prix (1985–1995)?","options":["Adelaide","Sydney","Perth","Brisbane"],"a":0,"d":"hard"},
  {"cat":"cars","q":"Ferrari's factory and HQ are in which small Italian town?","options":["Modena","Maranello","Turin","Bologna"],"a":1,"d":"hard"},
  {"cat":"cars","q":"Which car brand's name is Latin for 'listen'?","options":["Volvo","Kia","Audi","Skoda"],"a":2,"d":"hard"},
  {"cat":"cars","q":"The Mitsubishi 'Evo' rally car is an evolution of which model?","options":["Galant","Pajero","Colt","Lancer"],"a":3,"d":"hard"},
  {"cat":"cars","q":"Which Aussie racing legend was known as 'King of the Mountain' at Bathurst?","options":["Peter Brock","Allan Moffat","Craig Lowndes","Dick Johnson"],"a":0,"d":"hard"},
  {"cat":"cars","q":"Which Holden coupe, revived in 2001, shares its name with a NSW region?","options":["Torana","Monaro","Kingswood","Statesman"],"a":1,"d":"hard"},
  {"cat":"cars","q":"In RPM, what does the 'R' stand for?","options":["Rotations","Rates","Revolutions","Ranges"],"a":2,"d":"hard"},
  {"cat":"cars","q":"Before making supercars, Ferruccio Lamborghini's company made what?","options":["Motorbikes","Boats","Planes","Tractors"],"a":3,"d":"hard"},
  {"cat":"cars","q":"Which Italian car brand's logo is a trident?","options":["Maserati","Alfa Romeo","Lancia","Fiat"],"a":0,"d":"hard"},
  {"cat":"cars","q":"Who was the first Australian to win the F1 world championship?","options":["Alan Jones","Jack Brabham","Mark Webber","Daniel Ricciardo"],"a":1,"d":"hard"},
  {"cat":"cars","q":"Which Japanese brand makes the Supra sports car?","options":["Nissan","Honda","Toyota","Mazda"],"a":2,"d":"hard"},
  {"cat":"cars","q":"Which Italian brand's badge shows a serpent swallowing a man?","options":["Maserati","Lancia","Fiat","Alfa Romeo"],"a":3,"d":"hard"},
  {"cat":"space","q":"Which planet is known as the Red Planet?","options":["Mars","Venus","Jupiter","Mercury"],"a":0,"d":"easy"},
  {"cat":"space","q":"What is the largest planet in our solar system?","options":["Saturn","Jupiter","Neptune","Earth"],"a":1,"d":"easy"},
  {"cat":"space","q":"Which planet is famous for its huge, bright rings?","options":["Mars","Mercury","Saturn","Venus"],"a":2,"d":"easy"},
  {"cat":"space","q":"What is the name of the galaxy we live in?","options":["Andromeda","Whirlpool","Sombrero","Milky Way"],"a":3,"d":"easy"},
  {"cat":"space","q":"What do we call a space rock that survives the fall and lands on Earth?","options":["Meteorite","Comet","Nebula","Quasar"],"a":0,"d":"easy"},
  {"cat":"space","q":"Which former ninth planet was reclassified as a dwarf planet in 2006?","options":["Ceres","Pluto","Eris","Neptune"],"a":1,"d":"easy"},
  {"cat":"space","q":"Which numbered Apollo mission first landed humans on the Moon?","options":["8","13","11","17"],"a":2,"d":"easy"},
  {"cat":"space","q":"Who became the first human in space in 1961?","options":["Neil Armstrong","John Glenn","Alan Shepard","Yuri Gagarin"],"a":3,"d":"easy"},
  {"cat":"space","q":"Which rocket company did Elon Musk found in 2002?","options":["SpaceX","Blue Origin","Virgin Galactic","Rocket Lab"],"a":0,"d":"easy"},
  {"cat":"space","q":"Which constellation appears on the Australian flag?","options":["Orion","Southern Cross","Big Dipper","Scorpius"],"a":1,"d":"easy"},
  {"cat":"space","q":"What's the word for a named pattern of stars, like Orion?","options":["Galaxy","Nebula","Constellation","Asteroid"],"a":2,"d":"easy"},
  {"cat":"space","q":"Which space telescope launched in 1990 shares its name with astronomer Edwin?","options":["Kepler","Spitzer","Chandra","Hubble"],"a":3,"d":"easy"},
  {"cat":"space","q":"What force keeps the planets orbiting the Sun?","options":["Gravity","Magnetism","Friction","Inertia"],"a":0,"d":"easy"},
  {"cat":"space","q":"Which planet, similar in size to Earth, is called Earth's 'sister planet'?","options":["Mars","Venus","Mercury","Uranus"],"a":1,"d":"easy"},
  {"cat":"space","q":"What was the name of the first artificial satellite, launched by the USSR in 1957?","options":["Vostok","Mir","Sputnik","Soyuz"],"a":2,"d":"medium"},
  {"cat":"space","q":"What is the massive explosion of a dying star called?","options":["Black hole","Big Bang","Solar flare","Supernova"],"a":3,"d":"medium"},
  {"cat":"space","q":"Which planet has a giant storm called the Great Red Spot?","options":["Jupiter","Mars","Saturn","Neptune"],"a":0,"d":"medium"},
  {"cat":"space","q":"Which NASA rover landed on Mars in February 2021?","options":["Curiosity","Perseverance","Opportunity","Spirit"],"a":1,"d":"medium"},
  {"cat":"space","q":"Which star system is the closest to our solar system?","options":["Sirius","Betelgeuse","Alpha Centauri","Vega"],"a":2,"d":"medium"},
  {"cat":"space","q":"Who was the second person to walk on the Moon?","options":["Michael Collins","John Glenn","Yuri Gagarin","Buzz Aldrin"],"a":3,"d":"medium"},
  {"cat":"space","q":"The 2000 film 'The Dish' is about the radio telescope near which NSW town?","options":["Parkes","Dubbo","Orange","Bathurst"],"a":0,"d":"medium"},
  {"cat":"space","q":"Roughly how long does sunlight take to reach Earth?","options":["8 seconds","8 minutes","8 hours","80 minutes"],"a":1,"d":"medium"},
  {"cat":"space","q":"What is the name of Saturn's largest moon?","options":["Europa","Io","Titan","Phobos"],"a":2,"d":"medium"},
  {"cat":"space","q":"Which planet is the furthest from the Sun?","options":["Uranus","Saturn","Jupiter","Neptune"],"a":3,"d":"medium"},
  {"cat":"space","q":"Which famous comet returns to view roughly every 76 years?","options":["Halley's","Hale-Bopp","Encke's","Swift-Tuttle"],"a":0,"d":"medium"},
  {"cat":"space","q":"Which space telescope, launched in 2021, is named after a former NASA boss?","options":["Hubble","James Webb","Kepler","Spitzer"],"a":1,"d":"medium"},
  {"cat":"space","q":"A light-year is a measure of what?","options":["Time","Speed","Distance","Brightness"],"a":2,"d":"medium"},
  {"cat":"space","q":"What is the band of rocky bodies between Mars and Jupiter called?","options":["Kuiper belt","Oort cloud","Van Allen belt","Asteroid belt"],"a":3,"d":"medium"},
  {"cat":"space","q":"What is the name of the giant volcano on Mars, the largest in the solar system?","options":["Olympus Mons","Mauna Kea","Valles Marineris","Tharsis"],"a":0,"d":"hard"},
  {"cat":"space","q":"What was the surname of Valentina, the first woman in space (1963)?","options":["Gagarina","Tereshkova","Romanova","Ivanova"],"a":1,"d":"hard"},
  {"cat":"space","q":"What is the boundary around a black hole beyond which nothing can escape?","options":["Singularity","Photon ring","Event horizon","Accretion disc"],"a":2,"d":"hard"},
  {"cat":"space","q":"What is the largest moon in our solar system?","options":["Titan","Callisto","Europa","Ganymede"],"a":3,"d":"hard"},
  {"cat":"space","q":"Pluto lies in which icy region beyond Neptune?","options":["Kuiper belt","Asteroid belt","Oort cloud","Van Allen belt"],"a":0,"d":"hard"},
  {"cat":"space","q":"What was the name of the Soviet dog that orbited Earth in 1957?","options":["Belka","Laika","Strelka","Sputnik"],"a":1,"d":"hard"},
  {"cat":"space","q":"Which Apollo mission gave us \"Houston, we've had a problem\"?","options":["11","12","13","15"],"a":2,"d":"hard"},
  {"cat":"space","q":"On which planet is a single day longer than its year?","options":["Mercury","Mars","Uranus","Venus"],"a":3,"d":"hard"},
  {"cat":"space","q":"What shape of galaxy is the Milky Way?","options":["Spiral","Elliptical","Irregular","Ring"],"a":0,"d":"hard"},
  {"cat":"space","q":"What is the nearest large galaxy to the Milky Way?","options":["Triangulum","Andromeda","Whirlpool","Sombrero"],"a":1,"d":"hard"},
  {"cat":"space","q":"What is the Sun's outer atmosphere, seen during a total eclipse, called?","options":["Core","Photosphere","Corona","Aurora"],"a":2,"d":"hard"},
  {"cat":"space","q":"NASA's program to return humans to the Moon is named after which Greek goddess?","options":["Athena","Hera","Aphrodite","Artemis"],"a":3,"d":"hard"},
  {"cat":"body","q":"Which pair of organs take in oxygen when you breathe?","options":["Lungs","Kidneys","Liver","Stomach"],"a":0,"d":"easy"},
  {"cat":"body","q":"What is the longest bone in the human body?","options":["Tibia","Femur","Humerus","Spine"],"a":1,"d":"easy"},
  {"cat":"body","q":"What is the everyday name for the patella?","options":["Elbow","Collarbone","Kneecap","Ankle"],"a":2,"d":"easy"},
  {"cat":"body","q":"Which bean-shaped organs filter blood to make urine?","options":["Lungs","Liver","Spleen","Kidneys"],"a":3,"d":"easy"},
  {"cat":"body","q":"What is the everyday name for the clavicle?","options":["Collarbone","Kneecap","Shin bone","Jawbone"],"a":0,"d":"easy"},
  {"cat":"body","q":"Normal human body temperature is roughly how many degrees Celsius?","options":["32","37","40","35"],"a":1,"d":"easy"},
  {"cat":"body","q":"How many chambers does the human heart have?","options":["2","3","4","6"],"a":2,"d":"easy"},
  {"cat":"body","q":"What is the coloured part of the eye called?","options":["Pupil","Retina","Lens","Iris"],"a":3,"d":"easy"},
  {"cat":"body","q":"Which vitamin does your skin make when exposed to sunlight?","options":["Vitamin D","Vitamin C","Vitamin A","Vitamin B12"],"a":0,"d":"easy"},
  {"cat":"body","q":"Which colour of blood cell fights infection?","options":["Red","White","Yellow","Blue"],"a":1,"d":"easy"},
  {"cat":"body","q":"Which back teeth often come through in your late teens or twenties?","options":["Canines","Incisors","Wisdom teeth","Milk teeth"],"a":2,"d":"easy"},
  {"cat":"body","q":"Which bony structure protects the brain?","options":["Ribcage","Pelvis","Spine","Skull"],"a":3,"d":"easy"},
  {"cat":"body","q":"What is the everyday name for the scapula?","options":["Shoulder blade","Collarbone","Kneecap","Hip bone"],"a":0,"d":"easy"},
  {"cat":"body","q":"Which hormone surges during 'fight or flight'?","options":["Insulin","Adrenaline","Melatonin","Oestrogen"],"a":1,"d":"easy"},
  {"cat":"body","q":"How many teeth does a full adult set have, including wisdom teeth?","options":["28","36","32","24"],"a":2,"d":"medium"},
  {"cat":"body","q":"The smallest bone in the body, the stapes, is found where?","options":["Nose","Finger","Toe","Ear"],"a":3,"d":"medium"},
  {"cat":"body","q":"What is the hard outer coating of your teeth called?","options":["Enamel","Dentine","Plaque","Pulp"],"a":0,"d":"medium"},
  {"cat":"body","q":"What are the blood vessels carrying blood away from the heart called?","options":["Veins","Arteries","Capillaries","Valves"],"a":1,"d":"medium"},
  {"cat":"body","q":"Which dome-shaped muscle under the lungs helps you breathe?","options":["Pectoral","Abdominal","Diaphragm","Oblique"],"a":2,"d":"medium"},
  {"cat":"body","q":"What is the medical name for the voice box?","options":["Pharynx","Trachea","Oesophagus","Larynx"],"a":3,"d":"medium"},
  {"cat":"body","q":"The Achilles tendon connects the calf muscles to which bone?","options":["Heel","Knee","Shin","Hip"],"a":0,"d":"medium"},
  {"cat":"body","q":"What is the largest internal organ in the human body?","options":["Brain","Liver","Lungs","Stomach"],"a":1,"d":"medium"},
  {"cat":"body","q":"What is the medical name for the windpipe?","options":["Oesophagus","Larynx","Trachea","Bronchus"],"a":2,"d":"medium"},
  {"cat":"body","q":"Which gland in the neck controls your metabolism?","options":["Pituitary","Adrenal","Pineal","Thyroid"],"a":3,"d":"medium"},
  {"cat":"body","q":"Roughly how many litres of blood does an adult body hold?","options":["5","2","10","15"],"a":0,"d":"medium"},
  {"cat":"body","q":"Which tiny blood cell fragments help your blood clot?","options":["Plasma","Platelets","Red cells","White cells"],"a":1,"d":"medium"},
  {"cat":"body","q":"What is the medical name for the shin bone?","options":["Fibula","Femur","Tibia","Ulna"],"a":2,"d":"medium"},
  {"cat":"body","q":"Which pigment gives human skin its colour?","options":["Keratin","Collagen","Carotene","Melanin"],"a":3,"d":"medium"},
  {"cat":"body","q":"What is the largest part of the human brain?","options":["Cerebrum","Cerebellum","Brainstem","Thalamus"],"a":0,"d":"hard"},
  {"cat":"body","q":"What are the body's smallest blood vessels called?","options":["Venules","Capillaries","Arterioles","Veins"],"a":1,"d":"hard"},
  {"cat":"body","q":"What is the largest muscle in the human body?","options":["Quadriceps","Latissimus","Gluteus maximus","Pectoralis"],"a":2,"d":"hard"},
  {"cat":"body","q":"A nephrologist specialises in which organs?","options":["Lungs","Liver","Heart","Kidneys"],"a":3,"d":"hard"},
  {"cat":"body","q":"Hitting your 'funny bone' actually hits which nerve?","options":["Ulnar nerve","Radial nerve","Sciatic nerve","Median nerve"],"a":0,"d":"hard"},
  {"cat":"body","q":"What is the longest nerve in the human body?","options":["Ulnar","Sciatic","Vagus","Femoral"],"a":1,"d":"hard"},
  {"cat":"body","q":"Which organ, on the left of your abdomen, filters out old red blood cells?","options":["Pancreas","Appendix","Spleen","Gallbladder"],"a":2,"d":"hard"},
  {"cat":"body","q":"What tough tissue connects bone to bone at a joint?","options":["Tendon","Cartilage","Fascia","Ligament"],"a":3,"d":"hard"},
  {"cat":"body","q":"In which organ would you find the tiny air sacs called alveoli?","options":["Lungs","Kidneys","Liver","Heart"],"a":0,"d":"hard"},
  {"cat":"body","q":"What flap of tissue stops food going down your windpipe?","options":["Uvula","Epiglottis","Tonsil","Larynx"],"a":1,"d":"hard"},
  {"cat":"body","q":"What is the medical name for the lower jawbone?","options":["Maxilla","Sternum","Mandible","Clavicle"],"a":2,"d":"hard"},
  {"cat":"body","q":"Which vitamin is essential for blood clotting?","options":["Vitamin C","Vitamin D","Vitamin A","Vitamin K"],"a":3,"d":"hard"},
  {"cat":"words","q":"What does \"arvo\" mean in Aussie slang?","options":["Afternoon","Evening","Avocado","Argument"],"a":0,"d":"easy"},
  {"cat":"words","q":"What meal is \"brekkie\" short for?","options":["Brunch","Breakfast","Dinner","Lunch"],"a":1,"d":"easy"},
  {"cat":"words","q":"What is the plural of \"mouse\"?","options":["Mouses","Meese","Mice","Mousen"],"a":2,"d":"easy"},
  {"cat":"words","q":"How do you say \"thank you\" in French?","options":["Gracias","Danke","Grazie","Merci"],"a":3,"d":"easy"},
  {"cat":"words","q":"In Aussie slang, what is a \"servo\"?","options":["Petrol station","Bottle shop","Pub","Supermarket"],"a":0,"d":"easy"},
  {"cat":"words","q":"What do Aussies call a liquor store for short?","options":["Grog shop","Bottle-o","Booze bar","Drinko"],"a":1,"d":"easy"},
  {"cat":"words","q":"How many letters are in the English alphabet?","options":["24","25","26","28"],"a":2,"d":"easy"},
  {"cat":"words","q":"What is the Spanish word for \"cat\"?","options":["Perro","Chat","Katze","Gato"],"a":3,"d":"easy"},
  {"cat":"words","q":"A word that reads the same backwards, like \"racecar\", is called a what?","options":["Palindrome","Anagram","Acronym","Homophone"],"a":0,"d":"easy"},
  {"cat":"words","q":"What is the past tense of \"swim\"?","options":["Swum","Swam","Swimmed","Swimmt"],"a":1,"d":"easy"},
  {"cat":"words","q":"Which fast food chain do Aussies call \"Maccas\"?","options":["KFC","Hungry Jack's","McDonald's","Subway"],"a":2,"d":"easy"},
  {"cat":"words","q":"In Italian, \"ciao\" means hello and what else?","options":["Please","Thanks","Sorry","Goodbye"],"a":3,"d":"easy"},
  {"cat":"words","q":"What is the German word for \"yes\"?","options":["Ja","Nein","Oui","Si"],"a":0,"d":"easy"},
  {"cat":"words","q":"What number is \"dos\" in Spanish?","options":["10","2","12","3"],"a":1,"d":"easy"},
  {"cat":"words","q":"What is the opposite of a synonym?","options":["Homonym","Acronym","Antonym","Pseudonym"],"a":2,"d":"medium"},
  {"cat":"words","q":"What is the word for an extreme fear of spiders?","options":["Claustrophobia","Agoraphobia","Acrophobia","Arachnophobia"],"a":3,"d":"medium"},
  {"cat":"words","q":"In Aussie slang, what is a \"durry\"?","options":["Cigarette","Beer","Sandwich","Swimsuit"],"a":0,"d":"medium"},
  {"cat":"words","q":"\"Budgie smugglers\" is Aussie slang for which tight swimwear?","options":["Boardshorts","Speedos","Rashies","Bikinis"],"a":1,"d":"medium"},
  {"cat":"words","q":"If a place is \"chockers\", what is it?","options":["Closed","Dirty","Full","Quiet"],"a":2,"d":"medium"},
  {"cat":"words","q":"In Aussie slang, what is a \"dunny\"?","options":["Couch","Shed","Car","Toilet"],"a":3,"d":"medium"},
  {"cat":"words","q":"The word \"kindergarten\" comes from which language?","options":["German","Dutch","French","Danish"],"a":0,"d":"medium"},
  {"cat":"words","q":"The word \"tsunami\" comes from which language?","options":["Chinese","Japanese","Korean","Hawaiian"],"a":1,"d":"medium"},
  {"cat":"words","q":"A word made from initials and said as a word, like NASA, is called what?","options":["Anagram","Synonym","Acronym","Homonym"],"a":2,"d":"medium"},
  {"cat":"words","q":"Not counting Y, how many vowels are in the English alphabet?","options":["6","4","7","5"],"a":3,"d":"medium"},
  {"cat":"words","q":"Which language has the most native speakers in the world?","options":["Mandarin","English","Spanish","Hindi"],"a":0,"d":"medium"},
  {"cat":"words","q":"How do you say \"thank you\" in Japanese?","options":["Konnichiwa","Arigato","Sayonara","Sumimasen"],"a":1,"d":"medium"},
  {"cat":"words","q":"\"Deja vu\" is French for \"already...\" what?","options":["Heard","Done","Seen","Known"],"a":2,"d":"medium"},
  {"cat":"words","q":"The Aussie word \"ute\" is short for what?","options":["Utensil","Utopia","Utmost","Utility"],"a":3,"d":"medium"},
  {"cat":"words","q":"\"Carpe diem\" is Latin for \"seize the...\" what?","options":["Day","Moment","Night","Chance"],"a":0,"d":"hard"},
  {"cat":"words","q":"What is the term for a word that imitates a sound, like \"buzz\"?","options":["Alliteration","Onomatopoeia","Metaphor","Hyperbole"],"a":1,"d":"hard"},
  {"cat":"words","q":"In Aussie slang, what does \"fair dinkum\" mean?","options":["Crazy","Lucky","Genuine","Exhausted"],"a":2,"d":"hard"},
  {"cat":"words","q":"Calling someone a \"galah\" in Aussie slang means they're what?","options":["Show-off","Liar","Snob","Idiot"],"a":3,"d":"hard"},
  {"cat":"words","q":"What does the old Aussie farewell \"hooroo\" mean?","options":["Goodbye","Cheers","Hurry up","Good luck"],"a":0,"d":"hard"},
  {"cat":"words","q":"In Aussie slang, a \"bludger\" is what kind of person?","options":["Rich","Lazy","Violent","Nosy"],"a":1,"d":"hard"},
  {"cat":"words","q":"The word \"robot\" comes from which language?","options":["German","Russian","Czech","Polish"],"a":2,"d":"hard"},
  {"cat":"words","q":"\"Schadenfreude\" is joy at someone else's what?","options":["Success","Wedding","Mistakes","Misfortune"],"a":3,"d":"hard"},
  {"cat":"words","q":"What is the plural of \"criterion\"?","options":["Criteria","Criterions","Criterias","Criteriums"],"a":0,"d":"hard"},
  {"cat":"words","q":"A sentence using every letter of the alphabet is called a what?","options":["Palindrome","Pangram","Anagram","Lipogram"],"a":1,"d":"hard"},
  {"cat":"words","q":"\"Listen\" is an anagram of which word starting with S?","options":["Stolen","Sliten","Silent","Steins"],"a":2,"d":"hard"},
  {"cat":"words","q":"What is the most commonly used letter in written English?","options":["A","T","S","E"],"a":3,"d":"hard"},
  {"cat":"myth","q":"Who is the king of the Greek gods?","options":["Zeus","Poseidon","Hades","Apollo"],"a":0,"d":"easy"},
  {"cat":"myth","q":"Which Norse god wields the hammer Mjolnir?","options":["Odin","Thor","Loki","Freyr"],"a":1,"d":"easy"},
  {"cat":"myth","q":"Who is the Greek god of the sea?","options":["Zeus","Ares","Poseidon","Hermes"],"a":2,"d":"easy"},
  {"cat":"myth","q":"Which Gorgon had snakes for hair and turned people to stone?","options":["Athena","Hera","Circe","Medusa"],"a":3,"d":"easy"},
  {"cat":"myth","q":"What mythical creature is half man, half horse?","options":["Centaur","Minotaur","Satyr","Griffin"],"a":0,"d":"easy"},
  {"cat":"myth","q":"Which fairy tale girl let down her long hair from a tower?","options":["Cinderella","Rapunzel","Belle","Aurora"],"a":1,"d":"easy"},
  {"cat":"myth","q":"Which fairy tale character lost a glass slipper at the ball?","options":["Snow White","Rapunzel","Cinderella","Goldilocks"],"a":2,"d":"easy"},
  {"cat":"myth","q":"Which legendary outlaw stole from the rich to give to the poor?","options":["Ned Kelly","Zorro","Dick Turpin","Robin Hood"],"a":3,"d":"easy"},
  {"cat":"myth","q":"Which mythical bird is reborn from its own ashes?","options":["Phoenix","Griffin","Harpy","Pegasus"],"a":0,"d":"easy"},
  {"cat":"myth","q":"Which legendary king pulled the sword from the stone?","options":["Richard","Arthur","Alfred","Henry"],"a":1,"d":"easy"},
  {"cat":"myth","q":"Which son of Zeus, famous for his strength, completed 12 labours?","options":["Perseus","Theseus","Hercules","Jason"],"a":2,"d":"easy"},
  {"cat":"myth","q":"Whose wooden nose grew longer every time he lied?","options":["Peter Pan","Geppetto","Rumpelstiltskin","Pinocchio"],"a":3,"d":"easy"},
  {"cat":"myth","q":"Which Norse god is famous as a shape-shifting trickster?","options":["Loki","Thor","Odin","Baldur"],"a":0,"d":"easy"},
  {"cat":"myth","q":"Which Greek hero's only weak spot was his heel?","options":["Hector","Achilles","Odysseus","Ajax"],"a":1,"d":"easy"},
  {"cat":"myth","q":"Who is the Greek god of the underworld?","options":["Ares","Hermes","Hades","Apollo"],"a":2,"d":"medium"},
  {"cat":"myth","q":"Who is the Greek goddess of love and beauty?","options":["Athena","Hera","Artemis","Aphrodite"],"a":3,"d":"medium"},
  {"cat":"myth","q":"Who is the Roman god of war?","options":["Mars","Mercury","Neptune","Jupiter"],"a":0,"d":"medium"},
  {"cat":"myth","q":"What wooden animal did the Greeks hide inside to get into Troy?","options":["Bull","Horse","Lion","Eagle"],"a":1,"d":"medium"},
  {"cat":"myth","q":"Who is the one-eyed chief of the Norse gods?","options":["Thor","Tyr","Odin","Freyr"],"a":2,"d":"medium"},
  {"cat":"myth","q":"In Norse myth, what hall do slain warriors go to?","options":["Asgard","Midgard","Niflheim","Valhalla"],"a":3,"d":"medium"},
  {"cat":"myth","q":"Which Egyptian god has the head of a jackal?","options":["Anubis","Ra","Horus","Osiris"],"a":0,"d":"medium"},
  {"cat":"myth","q":"Who flew too close to the sun on wings of wax?","options":["Daedalus","Icarus","Perseus","Orpheus"],"a":1,"d":"medium"},
  {"cat":"myth","q":"What bull-headed monster lived in the Labyrinth?","options":["Cyclops","Hydra","Minotaur","Chimera"],"a":2,"d":"medium"},
  {"cat":"myth","q":"Which Greek goddess of wisdom gave her name to Athens?","options":["Artemis","Demeter","Hestia","Athena"],"a":3,"d":"medium"},
  {"cat":"myth","q":"Who opened a jar and released all evils into the world?","options":["Pandora","Persephone","Helen","Medea"],"a":0,"d":"medium"},
  {"cat":"myth","q":"Which fairy tale girl broke into the house of three bears?","options":["Red Riding Hood","Goldilocks","Gretel","Snow White"],"a":1,"d":"medium"},
  {"cat":"myth","q":"What is the name of King Arthur's sword?","options":["Durendal","Mjolnir","Excalibur","Longclaw"],"a":2,"d":"medium"},
  {"cat":"myth","q":"Which Greek messenger god wore winged sandals?","options":["Apollo","Ares","Hephaestus","Hermes"],"a":3,"d":"medium"},
  {"cat":"myth","q":"What is the Roman name for Zeus?","options":["Jupiter","Saturn","Mars","Neptune"],"a":0,"d":"hard"},
  {"cat":"myth","q":"What is the Roman name for Aphrodite?","options":["Juno","Venus","Minerva","Diana"],"a":1,"d":"hard"},
  {"cat":"myth","q":"Which Egyptian god of the dead was the husband of Isis?","options":["Anubis","Horus","Osiris","Set"],"a":2,"d":"hard"},
  {"cat":"myth","q":"Which Titan was punished for giving fire to humans?","options":["Atlas","Cronus","Hyperion","Prometheus"],"a":3,"d":"hard"},
  {"cat":"myth","q":"Which Greek hero cut off Medusa's head?","options":["Perseus","Theseus","Jason","Achilles"],"a":0,"d":"hard"},
  {"cat":"myth","q":"Which Titan was condemned to hold up the sky?","options":["Prometheus","Atlas","Cronus","Oceanus"],"a":1,"d":"hard"},
  {"cat":"myth","q":"What is the name of the three-headed dog guarding the underworld?","options":["Fenrir","Orthrus","Cerberus","Garm"],"a":2,"d":"hard"},
  {"cat":"myth","q":"Who led the Argonauts in search of the Golden Fleece?","options":["Theseus","Odysseus","Perseus","Jason"],"a":3,"d":"hard"},
  {"cat":"myth","q":"Whose abduction by Paris started the Trojan War?","options":["Helen","Penelope","Cassandra","Andromeda"],"a":0,"d":"hard"},
  {"cat":"myth","q":"Who is the Greek god of wine and partying?","options":["Apollo","Dionysus","Hermes","Ares"],"a":1,"d":"hard"},
  {"cat":"myth","q":"Which Norse god guards the Bifrost rainbow bridge?","options":["Tyr","Baldur","Heimdall","Freyr"],"a":2,"d":"hard"},
  {"cat":"myth","q":"Which twin, raised by a wolf, gave his name to Rome?","options":["Remus","Romanus","Remulus","Romulus"],"a":3,"d":"hard"},
  {"cat":"brands","q":"Which sportswear company uses a swoosh as its logo?","options":["Nike","Adidas","Puma","Reebok"],"a":0,"d":"easy"},
  {"cat":"brands","q":"Which Swedish furniture store is famous for flat-pack furniture and meatballs?","options":["Freedom","IKEA","Amart","Fantastic Furniture"],"a":1,"d":"easy"},
  {"cat":"brands","q":"Which Danish company makes plastic interlocking toy bricks?","options":["Mattel","Hasbro","Lego","Meccano"],"a":2,"d":"easy"},
  {"cat":"brands","q":"Colonel Sanders is the face of which fast-food chain?","options":["Red Rooster","Nando's","Hungry Jack's","KFC"],"a":3,"d":"easy"},
  {"cat":"brands","q":"Hungry Jack's is the Australian version of which US burger chain?","options":["Burger King","Wendy's","Carl's Jr","Five Guys"],"a":0,"d":"easy"},
  {"cat":"brands","q":"Which energy drink brand claims it gives you wings?","options":["Monster","Red Bull","V","Mother"],"a":1,"d":"easy"},
  {"cat":"brands","q":"Which coffee chain has a green mermaid logo?","options":["Gloria Jean's","Costa","Starbucks","Dunkin'"],"a":2,"d":"easy"},
  {"cat":"brands","q":"Which Australian airline has a kangaroo on its tail?","options":["Virgin Australia","Jetstar","Rex","Qantas"],"a":3,"d":"easy"},
  {"cat":"brands","q":"Which Italian sports car maker uses a prancing horse logo?","options":["Ferrari","Lamborghini","Maserati","Alfa Romeo"],"a":0,"d":"easy"},
  {"cat":"brands","q":"Biting the ends off which chocolate biscuit and sucking a drink through it is called a 'slam'?","options":["Mint Slice","Tim Tam","Monte Carlo","Kingston"],"a":1,"d":"easy"},
  {"cat":"brands","q":"Toyota cars come from which country?","options":["South Korea","China","Japan","Germany"],"a":2,"d":"easy"},
  {"cat":"brands","q":"Which sportswear brand's logo is famously three stripes?","options":["Puma","Nike","Kappa","Adidas"],"a":3,"d":"easy"},
  {"cat":"brands","q":"Which fast-food chain sells the Big Mac?","options":["McDonald's","Hungry Jack's","KFC","Wendy's"],"a":0,"d":"easy"},
  {"cat":"brands","q":"Which Aussie supermarket chain is nicknamed 'Woolies'?","options":["Coles","Woolworths","Aldi","IGA"],"a":1,"d":"easy"},
  {"cat":"brands","q":"Which surfwear brand was founded on the Gold Coast in 1973?","options":["Rip Curl","Quiksilver","Billabong","Mambo"],"a":2,"d":"medium"},
  {"cat":"brands","q":"Melanie Perkins co-founded which Australian design software company?","options":["Atlassian","Afterpay","Airtasker","Canva"],"a":3,"d":"medium"},
  {"cat":"brands","q":"In which decade was Vegemite first created?","options":["1920s","1940s","1950s","1900s"],"a":0,"d":"medium"},
  {"cat":"brands","q":"The chicken chain Nando's was founded in which country?","options":["Portugal","South Africa","Brazil","Mozambique"],"a":1,"d":"medium"},
  {"cat":"brands","q":"Which company makes the Kindle e-reader?","options":["Apple","Sony","Amazon","Kobo"],"a":2,"d":"medium"},
  {"cat":"brands","q":"Car maker BMW is headquartered in which German city?","options":["Stuttgart","Berlin","Wolfsburg","Munich"],"a":3,"d":"medium"},
  {"cat":"brands","q":"Which Australian software company makes Jira and Trello?","options":["Atlassian","Canva","Xero","Afterpay"],"a":0,"d":"medium"},
  {"cat":"brands","q":"The fashion chain Zara comes from which country?","options":["Italy","Spain","France","Portugal"],"a":1,"d":"medium"},
  {"cat":"brands","q":"The Michelin Man represents a company best known for making what?","options":["Paint","Motor oil","Tyres","Batteries"],"a":2,"d":"medium"},
  {"cat":"brands","q":"Toblerone's triangle shape is often linked to which Swiss mountain?","options":["Mont Blanc","Eiger","Jungfrau","Matterhorn"],"a":3,"d":"medium"},
  {"cat":"brands","q":"Which Aussie 'buy now, pay later' company was bought by Block (Square) in 2022?","options":["Afterpay","Zip","Humm","Klarna"],"a":0,"d":"medium"},
  {"cat":"brands","q":"The Chuck Taylor All Star is a classic shoe from which brand?","options":["Vans","Converse","Nike","Puma"],"a":1,"d":"medium"},
  {"cat":"brands","q":"Which coffee capsule brand is owned by Nestlé?","options":["Lavazza","Vittoria","Nespresso","Moccona"],"a":2,"d":"medium"},
  {"cat":"brands","q":"Australian brand R.M. Williams is most famous for making what?","options":["Hats","Saddles","Jeans","Boots"],"a":3,"d":"medium"},
  {"cat":"brands","q":"The name Lego comes from Danish words meaning what?","options":["Play well","Build more","Little bricks","Good toys"],"a":0,"d":"hard"},
  {"cat":"brands","q":"What was Nike originally called?","options":["Swoosh Athletics","Blue Ribbon Sports","Oregon Runners","Knight Sports"],"a":1,"d":"hard"},
  {"cat":"brands","q":"Which German supermarket chain opened its first Australian stores in 2001?","options":["Lidl","Kaufland","Aldi","Costco"],"a":2,"d":"hard"},
  {"cat":"brands","q":"Pepsi was originally known as what?","options":["Cola Tonic","Pep Water","Carolina Cola","Brad's Drink"],"a":3,"d":"hard"},
  {"cat":"brands","q":"Coca-Cola was invented by a pharmacist in which US city?","options":["Atlanta","Chicago","New York","Nashville"],"a":0,"d":"hard"},
  {"cat":"brands","q":"Which Perth-based conglomerate owns Bunnings?","options":["Woolworths Group","Wesfarmers","Metcash","Coles Group"],"a":1,"d":"hard"},
  {"cat":"brands","q":"Which company makes Weet-Bix in Australia?","options":["Uncle Tobys","Kellogg's","Arnott's","Sanitarium"],"a":3,"d":"hard"},
  {"cat":"brands","q":"Which company invented the Post-it Note?","options":["3M","Staples","Avery","Bic"],"a":0,"d":"hard"},
  {"cat":"brands","q":"Which fashion house uses two interlocking Cs as its logo?","options":["Celine","Chanel","Coach","Cartier"],"a":1,"d":"hard"},
  {"cat":"brands","q":"Red Rooster was founded in 1972 in which Australian state?","options":["Queensland","South Australia","Western Australia","Victoria"],"a":2,"d":"hard"},
  {"cat":"brands","q":"Which Swiss company makes Kit Kat in most countries?","options":["Mars","Cadbury","Lindt","Nestlé"],"a":3,"d":"hard"},
  {"cat":"books","q":"Who wrote the Harry Potter books?","options":["J.K. Rowling","Roald Dahl","Enid Blyton","Suzanne Collins"],"a":0,"d":"easy"},
  {"cat":"books","q":"Which Dutch painter famously cut off part of his own ear?","options":["Rembrandt","Van Gogh","Vermeer","Monet"],"a":1,"d":"easy"},
  {"cat":"books","q":"Who wrote Romeo and Juliet?","options":["Charles Dickens","Jane Austen","Shakespeare","Christopher Marlowe"],"a":2,"d":"easy"},
  {"cat":"books","q":"In The Hobbit, what is Bilbo's surname?","options":["Took","Gamgee","Brandybuck","Baggins"],"a":3,"d":"easy"},
  {"cat":"books","q":"Which author created Sherlock Holmes?","options":["Arthur Conan Doyle","Agatha Christie","Charles Dickens","Edgar Allan Poe"],"a":0,"d":"easy"},
  {"cat":"books","q":"Which Roald Dahl character owns a famous chocolate factory?","options":["Mr Twit","Willy Wonka","Miss Trunchbull","Augustus Gloop"],"a":1,"d":"easy"},
  {"cat":"books","q":"Who wrote The Cat in the Hat?","options":["Roald Dahl","Eric Carle","Dr. Seuss","Maurice Sendak"],"a":2,"d":"easy"},
  {"cat":"books","q":"What animal is Aslan in the Narnia books?","options":["Tiger","Bear","Eagle","Lion"],"a":3,"d":"easy"},
  {"cat":"books","q":"Which surrealist painter is famous for melting clocks?","options":["Salvador Dalí","René Magritte","Pablo Picasso","Joan Miró"],"a":0,"d":"easy"},
  {"cat":"books","q":"Which pop artist painted Campbell's Soup cans?","options":["Roy Lichtenstein","Andy Warhol","Keith Haring","Jackson Pollock"],"a":1,"d":"easy"},
  {"cat":"books","q":"What is the name of Winnie-the-Pooh's gloomy donkey friend?","options":["Piglet","Tigger","Eeyore","Kanga"],"a":2,"d":"easy"},
  {"cat":"books","q":"What does Peter Pan never want to do?","options":["Fly","Sleep","Go home","Grow up"],"a":3,"d":"easy"},
  {"cat":"books","q":"In The Very Hungry Caterpillar, what does the caterpillar become?","options":["Butterfly","Moth","Bee","Dragonfly"],"a":0,"d":"easy"},
  {"cat":"books","q":"Which holiday does the Grinch try to steal?","options":["Easter","Christmas","Halloween","Thanksgiving"],"a":1,"d":"easy"},
  {"cat":"books","q":"Sherlock Holmes lives on which London street?","options":["Fleet Street","Downing Street","Baker Street","Abbey Road"],"a":2,"d":"medium"},
  {"cat":"books","q":"Who wrote Pride and Prejudice?","options":["Charlotte Brontë","Emily Brontë","Mary Shelley","Jane Austen"],"a":3,"d":"medium"},
  {"cat":"books","q":"Who wrote the novel 1984?","options":["George Orwell","Aldous Huxley","Ray Bradbury","H.G. Wells"],"a":0,"d":"medium"},
  {"cat":"books","q":"Who wrote Frankenstein?","options":["Bram Stoker","Mary Shelley","Jane Austen","Emily Brontë"],"a":1,"d":"medium"},
  {"cat":"books","q":"Which artist painted Guernica, about the bombing of a Spanish town?","options":["Dalí","Goya","Picasso","Miró"],"a":2,"d":"medium"},
  {"cat":"books","q":"Who wrote The Great Gatsby?","options":["Ernest Hemingway","John Steinbeck","William Faulkner","F. Scott Fitzgerald"],"a":3,"d":"medium"},
  {"cat":"books","q":"Which Dutch artist painted Girl with a Pearl Earring?","options":["Vermeer","Rembrandt","Van Gogh","Bruegel"],"a":0,"d":"medium"},
  {"cat":"books","q":"In Moby-Dick, what kind of animal is Moby Dick?","options":["Shark","Whale","Squid","Seal"],"a":1,"d":"medium"},
  {"cat":"books","q":"Who painted The Scream, a figure clutching its face under a red sky?","options":["Gustav Klimt","Egon Schiele","Edvard Munch","Van Gogh"],"a":2,"d":"medium"},
  {"cat":"books","q":"Which Australian author wrote The Book Thief?","options":["Tim Winton","Liane Moriarty","Peter Carey","Markus Zusak"],"a":3,"d":"medium"},
  {"cat":"books","q":"Who painted the ceiling of the Sistine Chapel?","options":["Michelangelo","Raphael","Leonardo da Vinci","Botticelli"],"a":0,"d":"medium"},
  {"cat":"books","q":"What is the name of the dragon in The Hobbit?","options":["Glaurung","Smaug","Ancalagon","Norbert"],"a":1,"d":"medium"},
  {"cat":"books","q":"Who wrote Dracula?","options":["Mary Shelley","Edgar Allan Poe","Bram Stoker","Oscar Wilde"],"a":2,"d":"medium"},
  {"cat":"books","q":"Which French painter is famous for his water lilies series?","options":["Manet","Renoir","Degas","Monet"],"a":3,"d":"medium"},
  {"cat":"books","q":"Which Japanese artist made The Great Wave off Kanagawa?","options":["Hokusai","Hiroshige","Utamaro","Murakami"],"a":0,"d":"hard"},
  {"cat":"books","q":"In To Kill a Mockingbird, what is the first name of Scout's lawyer father?","options":["Boo","Atticus","Jem","Tom"],"a":1,"d":"hard"},
  {"cat":"books","q":"Who painted The Birth of Venus, showing a goddess standing on a shell?","options":["Titian","Raphael","Botticelli","Caravaggio"],"a":2,"d":"hard"},
  {"cat":"books","q":"Which Australian author wrote Big Little Lies?","options":["Markus Zusak","Tim Winton","Kate Morton","Liane Moriarty"],"a":3,"d":"hard"},
  {"cat":"books","q":"Which Australian author wrote Cloudstreet?","options":["Tim Winton","Peter Carey","Richard Flanagan","Thomas Keneally"],"a":0,"d":"hard"},
  {"cat":"books","q":"In Animal Farm, what kind of animal is Napoleon?","options":["Horse","Pig","Dog","Sheep"],"a":1,"d":"hard"},
  {"cat":"books","q":"Who wrote The Catcher in the Rye?","options":["Jack Kerouac","John Steinbeck","J.D. Salinger","Harper Lee"],"a":2,"d":"hard"},
  {"cat":"books","q":"Who wrote the dystopian novel Brave New World?","options":["George Orwell","Ray Bradbury","Kurt Vonnegut","Aldous Huxley"],"a":3,"d":"hard"},
  {"cat":"books","q":"Who wrote The Picture of Dorian Gray?","options":["Oscar Wilde","Bram Stoker","Charles Dickens","Thomas Hardy"],"a":0,"d":"hard"},
  {"cat":"books","q":"Which American painter is famous for dripping and splashing paint on canvas?","options":["Mark Rothko","Jackson Pollock","Andy Warhol","Willem de Kooning"],"a":1,"d":"hard"},
  {"cat":"books","q":"Which Australian author wrote the picture book Possum Magic?","options":["May Gibbs","Graeme Base","Mem Fox","Jackie French"],"a":2,"d":"hard"},
  {"cat":"books","q":"In The Hitchhiker's Guide to the Galaxy, what number is the answer to everything?","options":["7","101","88","42"],"a":3,"d":"hard"}
);
