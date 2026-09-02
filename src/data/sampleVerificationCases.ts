import { SampleVerificationCase } from '../types';

export const SAMPLE_VERIFICATION_CASES: SampleVerificationCase[] = [
  {
    label: 'Whole Foods Market (Campbell Store)',
    companyName: 'Whole Foods Market',
    companyAddress: '1690 S Bascom Ave, Campbell, CA 95008, USA',
    country: 'United States',
    flag: '🇺🇸',
    language: 'English (US)',
    expectedStatus: 'VERIFIED_BRANCH_LOCATION',
    category: 'Retail & Supermarket',
    note: 'Confirmed operating supermarket branch & anchor store in Hamilton Plaza shopping center.'
  },
  {
    label: 'Nintendo Global HQ (Kyoto)',
    companyName: 'Nintendo Co., Ltd.',
    companyAddress: '11-1 Hokotate-cho, Kamitoba, Minami-ku, Kyoto 601-8501, Japan',
    country: 'Japan',
    flag: '🇯🇵',
    language: 'Japanese (日本語)',
    expectedStatus: 'VERIFIED_OFFICIAL_ADDRESS',
    category: 'Video Games & Electronics',
    note: 'Official registered global headquarters (任天堂株式会社 本社).'
  },
  {
    label: 'LVMH World HQ (Paris)',
    companyName: 'LVMH Moët Hennessy Louis Vuitton',
    companyAddress: '22 Avenue Montaigne, 75008 Paris, France',
    country: 'France',
    flag: '🇫🇷',
    language: 'French (Français)',
    expectedStatus: 'VERIFIED_OFFICIAL_ADDRESS',
    category: 'Luxury Goods & Fashion',
    note: 'Official registered corporate headquarters (Siège Social).'
  },
  {
    label: 'Siemens AG Global HQ (Munich)',
    companyName: 'Siemens AG',
    companyAddress: 'Werner-von-Siemens-Straße 1, 80333 Munich, Germany',
    country: 'Germany',
    flag: '🇩🇪',
    language: 'German (Deutsch)',
    expectedStatus: 'VERIFIED_OFFICIAL_ADDRESS',
    category: 'Industrial & Technology',
    note: 'Official world headquarters complex (Konzernzentrale).'
  },
  {
    label: 'Inditex / Zara Sede Central (Arteixo)',
    companyName: 'Inditex S.A. (Zara)',
    companyAddress: 'Avenida de la Diputación, s/n, 15143 Arteixo, A Coruña, Spain',
    country: 'Spain',
    flag: '🇪🇸',
    language: 'Spanish (Español)',
    expectedStatus: 'VERIFIED_OFFICIAL_ADDRESS',
    category: 'Fashion & Retail',
    note: 'World headquarters and logistics campus (Sede Central).'
  },
  {
    label: 'Apple Park Campus & HQ',
    companyName: 'Apple Inc.',
    companyAddress: '1 Apple Park Way, Cupertino, CA 95014, USA',
    country: 'United States',
    flag: '🇺🇸',
    language: 'English (US)',
    expectedStatus: 'VERIFIED_OFFICIAL_ADDRESS',
    category: 'Consumer Electronics & Software',
    note: 'Official primary corporate headquarters and executive campus.'
  },
  {
    label: 'Samsung Digital City HQ (Suwon)',
    companyName: 'Samsung Electronics',
    companyAddress: '129 Samsung-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do 16677, South Korea',
    country: 'South Korea',
    flag: '🇰🇷',
    language: 'Korean (한국어)',
    expectedStatus: 'VERIFIED_OFFICIAL_ADDRESS',
    category: 'Semiconductors & Electronics',
    note: 'Global headquarters and mega R&D campus (삼성전자 본사 디지털시티).'
  },
  {
    label: 'TSMC Global Headquarters (Hsinchu)',
    companyName: 'TSMC (Taiwan Semiconductor Manufacturing Co.)',
    companyAddress: '8, Li-Hsin Rd. 6, Hsinchu Science Park, Hsinchu 300-096, Taiwan',
    country: 'Taiwan',
    flag: '🇹🇼',
    language: 'Traditional Chinese (繁體中文)',
    expectedStatus: 'VERIFIED_OFFICIAL_ADDRESS',
    category: 'Semiconductors',
    note: 'Official global corporate headquarters (台灣積體電路製造全球研發中心與總部).'
  },
  {
    label: 'Mercado Libre Corporate HQ (Buenos Aires)',
    companyName: 'Mercado Libre',
    companyAddress: 'Pasaje Posta 4789, C1430 CABA, Buenos Aires, Argentina',
    country: 'Argentina',
    flag: '🇦🇷',
    language: 'Spanish (Español)',
    expectedStatus: 'VERIFIED_OFFICIAL_ADDRESS',
    category: 'E-commerce & Fintech',
    note: 'Official corporate headquarters building in Polo Dot.'
  },
  {
    label: '⚠️ Mismatch Test: Tesla at The White House',
    companyName: 'Tesla, Inc.',
    companyAddress: '1600 Pennsylvania Avenue NW, Washington, DC 20500, USA',
    country: 'United States',
    flag: '🇺🇸',
    language: 'English (US)',
    expectedStatus: 'MISMATCH_UNVERIFIED',
    category: 'Negative Test Case',
    note: 'Demonstrates mismatch detection: Address is The White House, not a Tesla business address.'
  }
];
