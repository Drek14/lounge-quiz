// Question bank — 100 questions across 10 categories, medium difficulty.
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
  { id: 'photo',    name: 'Photo Round',   icon: '📸', color: '#00b4d8' }, // filled from photos/manifest.json
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
  turkey:      `<svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#E30A17"/><circle cx="1.1" cy="1" r="0.5" fill="#fff"/><circle cx="1.225" cy="1" r="0.4" fill="#E30A17"/>${star(1.65,1,0.25,0.1,'#fff')}</svg>`,
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
  { cat:'advmaths', q:'What is the derivative of x³?', options:['x²','3x²','3x','x³/3'], a:1 },
  { cat:'advmaths', q:'What is 5! (five factorial)?', options:['25','60','120','720'], a:2 },
  { cat:'advmaths', q:'What is the integral of 2x dx?', options:['2x² + C','x² + C','x + C','2 + C'], a:1 },
  { cat:'advmaths', q:'Solve x² − 5x + 6 = 0', options:['x = 1 or 6','x = 2 or 3','x = −2 or −3','x = 5 or 6'], a:1 },
  { cat:'advmaths', q:'What is log base 10 of 1000?', options:['2','3','10','100'], a:1 },
  { cat:'advmaths', q:'The interior angles of a hexagon add up to?', options:['540°','630°','720°','900°'], a:2 },
  { cat:'advmaths', q:'Which number under 100 is both a perfect square and a perfect cube?', options:['36','49','64','81'], a:2 },
  { cat:'advmaths', q:'What is i² (where i is the imaginary unit)?', options:['1','−1','i','0'], a:1 },
  { cat:'advmaths', q:'What is the sum of the integers from 1 to 100?', options:['4950','5000','5050','5100'], a:2 },
  { cat:'advmaths', q:'What is the probability of rolling two sixes with two dice?', options:['1/6','1/12','1/18','1/36'], a:3 },

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
];

if (typeof module !== "undefined") module.exports = { CATEGORIES, QUESTIONS };
