export interface SampleAddress {
  label: string;
  query: string;
  category: string;
  city: string;
  country: string;
  flag: string;
  iconType: 'tech' | 'landmark' | 'finance' | 'retail' | 'cultural' | 'science';
  description?: string;
}

export const SAMPLE_CATEGORIES = [
  { id: 'all', label: 'All Destinations', icon: '🌍' },
  { id: 'tech', label: 'Tech Giants & Campuses', icon: '💻' },
  { id: 'landmark', label: 'World Landmarks', icon: '🗽' },
  { id: 'finance', label: 'Finance & Skyscrapers', icon: '📈' },
  { id: 'cultural', label: 'Arts & Culture', icon: '🏛️' },
  { id: 'retail', label: 'Famous Avenues & Retail', icon: '🛍️' },
  { id: 'science', label: 'Science & Innovation', icon: '🔬' },
] as const;

export const SAMPLE_GLOBAL_ADDRESSES: SampleAddress[] = [
  // Tech & Innovation
  {
    label: 'Googleplex HQ',
    query: '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
    category: 'Corporate Tech Campus',
    city: 'Mountain View',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'tech',
    description: 'Alphabet & Google global corporate headquarters in Silicon Valley.'
  },
  {
    label: 'Apple Park Infinite Ring',
    query: '1 Apple Park Way, Cupertino, CA 95014, USA',
    category: 'Innovation Mega-Campus',
    city: 'Cupertino',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'tech',
    description: 'Iconic neo-futurist circular spaceship campus designed by Foster + Partners.'
  },
  {
    label: 'Microsoft Millennium Campus',
    query: '1 Microsoft Way, Redmond, WA 98052, USA',
    category: 'Enterprise Tech Campus',
    city: 'Redmond',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'tech',
    description: 'Sprawling innovation headquarters of Microsoft in the Pacific Northwest.'
  },
  {
    label: 'Amazon The Spheres',
    query: '2111 7th Ave, Seattle, WA 98121, USA',
    category: 'Urban Biophilic Campus',
    city: 'Seattle',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'tech',
    description: 'Botanical greenhouse domes in the heart of downtown Seattle Amazon HQ.'
  },
  {
    label: 'Meta MPK HQ',
    query: '1 Hacker Way, Menlo Park, CA 94025, USA',
    category: 'Social Media & AI Campus',
    city: 'Menlo Park',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'tech',
    description: 'Frank Gehry designed headquarters overlooking the San Francisco Bay.'
  },
  {
    label: 'Station F Tech Mega-Hub',
    query: '55 Boulevard Vincent Auriol, 75013 Paris, France',
    category: 'World Largest Startup Campus',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    iconType: 'tech',
    description: 'Converted railway depot hosting over 1,000 international tech startups.'
  },
  {
    label: 'Spotify Global HQ',
    query: 'Regeringsgatan 19, 111 53 Stockholm, Sweden',
    category: 'Music Tech Headquarters',
    city: 'Stockholm',
    country: 'Sweden',
    flag: '🇸🇪',
    iconType: 'tech',
    description: 'Nordic audio streaming giant headquarters in central Stockholm.'
  },
  {
    label: 'Sony Center / Potsdamer Platz',
    query: 'Kemperplatz 1, 10785 Berlin, Germany',
    category: 'Mixed-Use Tech & Media Center',
    city: 'Berlin',
    country: 'Germany',
    flag: '🇩🇪',
    iconType: 'tech',
    description: 'Spectacular canopy-domed corporate and media complex in Berlin.'
  },
  {
    label: 'Samsung Digital City',
    query: '129 Samsung-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do, South Korea',
    category: 'Electronics & R&D Mega-City',
    city: 'Suwon',
    country: 'South Korea',
    flag: '🇰🇷',
    iconType: 'tech',
    description: 'Self-contained technology city housing tens of thousands of engineers.'
  },
  {
    label: 'TSMC Global Headquarters',
    query: '8 Li-Hsin Rd 6, Hsinchu Science Park, Hsinchu 30078, Taiwan',
    category: 'Semiconductor Fabrication Hub',
    city: 'Hsinchu',
    country: 'Taiwan',
    flag: '🇹🇼',
    iconType: 'tech',
    description: 'Epicenter of advanced global microchip and semiconductor manufacturing.'
  },

  // Landmarks & Architectural Marvels
  {
    label: 'Burj Khalifa & Downtown',
    query: '1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE',
    category: 'Megatall Skyscraper & Commercial Hub',
    city: 'Dubai',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    iconType: 'landmark',
    description: 'The world\'s tallest architectural structure and vibrant commercial center.'
  },
  {
    label: 'Empire State Building',
    query: '350 5th Ave, New York, NY 10118, USA',
    category: 'Commercial Skyscraper & Art Deco Landmark',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'landmark',
    description: 'Historic 102-story Art Deco monument in Midtown Manhattan.'
  },
  {
    label: 'Sydney Opera House Precinct',
    query: 'Bennelong Point, Sydney NSW 2000, Australia',
    category: 'World Heritage Performing Arts Complex',
    city: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    iconType: 'landmark',
    description: 'Jørn Utzon\'s expressionist architectural masterpiece on Sydney Harbour.'
  },
  {
    label: 'Marina Bay Sands & Tower',
    query: '10 Bayfront Avenue, Singapore 018956',
    category: 'Integrated Resort & Business Hub',
    city: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    iconType: 'landmark',
    description: 'Moshe Safdie\'s three towers crowned by the SkyPark cantilevered observatory.'
  },
  {
    label: 'Taipei 101 Financial Tower',
    query: 'No. 7, Section 5, Xinyi Rd, Xinyi District, Taipei City, Taiwan 110',
    category: 'Postmodern Skyscraper & Business Center',
    city: 'Taipei',
    country: 'Taiwan',
    flag: '🇹🇼',
    iconType: 'landmark',
    description: 'Pagoda-inspired architectural high-rise with massive tuned mass damper.'
  },
  {
    label: 'Petronas Twin Towers',
    query: 'Kuala Lumpur City Centre, 50088 Kuala Lumpur, Malaysia',
    category: 'Twin Tower Commercial Complex',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    flag: '🇲🇾',
    iconType: 'landmark',
    description: 'Iconic 88-story twin skyscrapers joined by a skybridge on the 41st floor.'
  },
  {
    label: 'The Shard London Bridge',
    query: '32 London Bridge St, London SE1 9SG, United Kingdom',
    category: 'Vertical City & Mixed-Use Tower',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    iconType: 'landmark',
    description: 'Renzo Piano\'s 72-story glass pyramid overlooking the River Thames.'
  },
  {
    label: 'Sagrada Família Surrounding Block',
    query: 'Carrer de Mallorca, 401, 08013 Barcelona, Spain',
    category: 'Gothic-Art Nouveau Architectural Monument',
    city: 'Barcelona',
    country: 'Spain',
    flag: '🇪🇸',
    iconType: 'landmark',
    description: 'Antoni Gaudí\'s basilica and bustling Eixample cultural district.'
  },
  {
    label: 'Eiffel Tower / Champ de Mars',
    query: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    category: 'Wrought-Iron Monument & Promenade',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    iconType: 'landmark',
    description: 'Gustave Eiffel\'s world-famous 330-meter tower beside the River Seine.'
  },
  {
    label: 'Colosseum Archeological Plaza',
    query: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
    category: 'Ancient Imperial Amphitheatre',
    city: 'Rome',
    country: 'Italy',
    flag: '🇮🇹',
    iconType: 'landmark',
    description: 'Ancient Roman landmark surrounded by historic forums and classical avenues.'
  },
  {
    label: 'Shibuya Scramble Crossing',
    query: '2 Chome-2-1 Dogenzaka, Shibuya City, Tokyo 150-0043, Japan',
    category: 'High-Density Commercial Intersection',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    iconType: 'landmark',
    description: 'World\'s busiest pedestrian intersection illuminated by giant video screens.'
  },

  // Finance & Business Districts
  {
    label: 'New York Stock Exchange (Wall St)',
    query: '11 Wall St, New York, NY 10005, USA',
    category: 'Global Securities Exchange & Financial Epicenter',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'finance',
    description: 'The epicenter of American finance and neoclassical financial architecture.'
  },
  {
    label: '1 Canada Square (Canary Wharf)',
    query: '1 Canada Square, Canary Wharf, London E14 5AA, United Kingdom',
    category: 'International Financial Tower',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    iconType: 'finance',
    description: 'César Pelli skyscraper anchoring London\'s secondary financial district.'
  },
  {
    label: 'Marunouchi Building',
    query: '2-4-1 Marunouchi, Chiyoda-ku, Tokyo 100-6390, Japan',
    category: 'Commercial & Corporate High-Rise',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    iconType: 'finance',
    description: 'Premier business address facing Tokyo Station in Chiyoda financial district.'
  },
  {
    label: 'One World Trade Center',
    query: '285 Fulton St, New York, NY 10007, USA',
    category: 'Class A Commercial Tower',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'finance',
    description: '1,776-foot tall skyscraper anchoring Lower Manhattan\'s financial center.'
  },
  {
    label: 'Bank of China Tower Hong Kong',
    query: '1 Garden Rd, Central, Hong Kong',
    category: 'International Banking High-Rise',
    city: 'Hong Kong',
    country: 'Hong Kong',
    flag: '🇭🇰',
    iconType: 'finance',
    description: 'I. M. Pei\'s iconic prism-like skyscraper in Hong Kong Central.'
  },
  {
    label: 'First Canadian Place',
    query: '100 King St W, Toronto, ON M5X 1A9, Canada',
    category: 'Financial District Skyscraper',
    city: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    iconType: 'finance',
    description: 'Canada\'s tallest commercial skyscraper located in Toronto Financial Core.'
  },
  {
    label: 'Frankfurt Financial Main Tower',
    query: 'Neue Mainzer Str. 52-58, 60311 Frankfurt am Main, Germany',
    category: 'European Financial High-Rise',
    city: 'Frankfurt',
    country: 'Germany',
    flag: '🇩🇪',
    iconType: 'finance',
    description: 'Major banking skyscraper in "Mainhattan", Frankfurt\'s financial center.'
  },
  {
    label: 'DIFC Gate Building',
    query: 'Dubai International Financial Centre, Trade Centre, Dubai, UAE',
    category: 'Sovereign Financial Free Zone',
    city: 'Dubai',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    iconType: 'finance',
    description: 'Architectural triumphal arch housing the Middle East\'s prime financial hub.'
  },
  {
    label: 'International Financial Center (IFC) Seoul',
    query: '10 Gukjegeumyung-ro, Yeongdeungpo-gu, Seoul, South Korea',
    category: 'Yeouido Financial Plaza',
    city: 'Seoul',
    country: 'South Korea',
    flag: '🇰🇷',
    iconType: 'finance',
    description: 'High-density commercial complex in Seoul\'s "Wall Street" island district.'
  },

  // Culture, Arts & History
  {
    label: 'Louvre Museum & Cour Napoléon',
    query: 'Rue de Rivoli, 75001 Paris, France',
    category: 'Historic Palace & National Art Museum',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    iconType: 'cultural',
    description: 'Former royal palace featuring I. M. Pei\'s glass pyramid entrance.'
  },
  {
    label: 'The British Museum',
    query: 'Great Russell St, London WC1B 3DG, United Kingdom',
    category: 'Human History & Culture Institution',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    iconType: 'cultural',
    description: 'Neoclassical landmark with Norman Foster\'s Queen Elizabeth II Great Court.'
  },
  {
    label: 'Rijksmuseum & Museumplein',
    query: 'Museumstraat 1, 1071 XX Amsterdam, Netherlands',
    category: 'Dutch Golden Age Museum & Cultural Square',
    city: 'Amsterdam',
    country: 'Netherlands',
    flag: '🇳🇱',
    iconType: 'cultural',
    description: 'Gothic-Renaissance monumental museum framing Amsterdam\'s museum square.'
  },
  {
    label: 'Guggenheim Museum Bilbao',
    query: 'Abandoibarra Etorb., 2, 48009 Bilbo, Bizkaia, Spain',
    category: 'Titanium Contemporary Art Museum',
    city: 'Bilbao',
    country: 'Spain',
    flag: '🇪🇸',
    iconType: 'cultural',
    description: 'Frank Gehry\'s revolutionary deconstructivist titanium and limestone landmark.'
  },
  {
    label: 'Lincoln Center for the Performing Arts',
    query: 'Lincoln Center Plaza, New York, NY 10023, USA',
    category: 'Performing Arts Complex',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'cultural',
    description: 'Home of the Metropolitan Opera, New York Philharmonic, and NYC Ballet.'
  },
  {
    label: 'Elbphilharmonie Concert Hall',
    query: 'Platz der Deutschen Einheit 1, 20457 Hamburg, Germany',
    category: 'HafenCity Wave-Glass Music Hall',
    city: 'Hamburg',
    country: 'Germany',
    flag: '🇩🇪',
    iconType: 'cultural',
    description: 'Herzog & de Meuron\'s glassy wave atop a historic brick warehouse.'
  },

  // Famous Avenues & Luxury Retail
  {
    label: 'Whole Foods Market (Campbell)',
    query: 'Whole Foods, 1690 S Bascom Ave, Campbell, CA 95008, USA',
    category: 'Supermarket & Shopping Center Plaza',
    city: 'Campbell',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'retail',
    description: 'Premier Silicon Valley organic supermarket anchor store and Hamilton Plaza retail center.'
  },
  {
    label: 'Champs-Élysées & Arc de Triomphe',
    query: 'Place Charles de Gaulle, 75008 Paris, France',
    category: 'World Renowned Prestige Boulevard',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    iconType: 'retail',
    description: 'Tree-lined Parisian avenue celebrated for luxury flagship stores and cafes.'
  },
  {
    label: 'Fifth Avenue Luxury Corridor',
    query: '725 5th Ave, New York, NY 10022, USA',
    category: 'Prestige Retail & High Fashion Row',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'retail',
    description: 'Manhattan\'s premier retail thoroughfare featuring historic department stores.'
  },
  {
    label: 'Ginza 4-Chome Intersection',
    query: '4-5-11 Ginza, Chuo City, Tokyo 104-0061, Japan',
    category: 'High-End Retail & Luxury District',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    iconType: 'retail',
    description: 'Tokyo\'s premier luxury shopping district anchored by Wako clock tower.'
  },
  {
    label: 'Rodeo Drive / Wilshire Blvd',
    query: '200 N Rodeo Dr, Beverly Hills, CA 90210, USA',
    category: 'Luxury Fashion & Haute Couture Strip',
    city: 'Beverly Hills',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'retail',
    description: 'Two-mile-long boulevard famed for exclusive luxury fashion boutiques.'
  },
  {
    label: 'Bahnhofstrasse Zurich',
    query: 'Bahnhofstrasse 45, 8001 Zürich, Switzerland',
    category: 'Exclusive Swiss Banking & Retail Avenue',
    city: 'Zurich',
    country: 'Switzerland',
    flag: '🇨🇭',
    iconType: 'retail',
    description: 'One of the world\'s most exclusive and expensive shopping avenues.'
  },
  {
    label: 'Orchard Road Commercial Belt',
    query: '2 Orchard Turn, Singapore 238801',
    category: 'Multi-Level Luxury Retail Boulevard',
    city: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    iconType: 'retail',
    description: 'Singapore\'s vibrant 2.2-kilometer shopping and culinary epicenter.'
  },

  // Science, Space & Research
  {
    label: 'CERN Meyrin Research Complex',
    query: 'Espl. des Particules 1, 1211 Meyrin, Switzerland',
    category: 'Particle Physics Laboratory & Supercollider',
    city: 'Geneva',
    country: 'Switzerland',
    flag: '🇨🇭',
    iconType: 'science',
    description: 'European Organization for Nuclear Research and birthplace of the World Wide Web.'
  },
  {
    label: 'NASA Kennedy Space Center',
    query: 'Space Commerce Way, Merritt Island, FL 32953, USA',
    category: 'Orbital Launch Complex & Aerospace Center',
    city: 'Cape Canaveral',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'science',
    description: 'Historic primary launch center of human spaceflight and exploration.'
  },
  {
    label: 'MIT Stata Center & Media Lab',
    query: '32 Vassar St, Cambridge, MA 02139, USA',
    category: 'AI, Robotics & Computing Research Hub',
    city: 'Cambridge',
    country: 'United States',
    flag: '🇺🇸',
    iconType: 'science',
    description: 'Frank Gehry architectural complex hosting computer science and AI labs.'
  },
  {
    label: 'Francis Crick Institute',
    query: '1 Midland Rd, London NW1 1AT, United Kingdom',
    category: 'Biomedical Discovery Research Institute',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    iconType: 'science',
    description: 'Europe\'s largest single biomedical laboratory located in Kings Cross.'
  },
];
