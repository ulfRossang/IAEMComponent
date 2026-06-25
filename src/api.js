export function boolJa(val) { return val ? 'Ja' : 'Nej'; }
export function fmtDatum(iso) {
  if (!iso) return '–';
  return iso.replace('T', ' ').substring(0, 16);
}

// ---- Mock data store ----

const KUNDER = {
  'KD-71042': { kundnr: 'KD-71042', kundnamn: 'Kund #71042', land: 'Sverige' },
  'KD-38815': { kundnr: 'KD-38815', kundnamn: 'Kund #38815', land: 'Sverige' },
  'KD-90423': { kundnr: 'KD-90423', kundnamn: 'Kund #90423', land: 'Sverige' },
};

const MEDDELANDEN = [
  { id: 'MSG-2024-0041', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Testenv 7', mottagare: 'Kund #71042', datum: '2025-01-22T09:58', kategori: 'Digital', amne: 'Kontoutdrag februari', las: true, borttaget: false, arkiverat: true, status: 'Skickat', kontor: 'SE-6292', innehall: 'Ditt kontoutdrag för februari finns tillgängligt i din e-brevlåda.', bilagor: [{ filnamn: 'kontoutdrag-feb.pdf', storlek: 15360, url: '/files/kontoutdrag-feb.pdf' }] },
  { id: 'MSG-2024-0039', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-02-10T14:20', kategori: 'Kontoutdrag', amne: 'Kontoutdrag januari', las: false, borttaget: false, arkiverat: false, status: 'Skickat', kontor: 'SE-6292', innehall: 'Ditt kontoutdrag för januari finns tillgängligt.', bilagor: [{ filnamn: 'kontoutdrag-jan.pdf', storlek: 14080, url: '/files/kontoutdrag-jan.pdf' }] },
  { id: 'MSG-2024-0038', kundnr: 'KD-38815', kundnamn: 'Kund #38815', avsandare: 'Handelsbanken', mottagare: 'Kund #38815', datum: '2025-02-10T14:20', kategori: 'Kontoutdrag', amne: 'Kontoutdrag januari', las: false, borttaget: false, arkiverat: false, status: 'Skickat', kontor: 'SE-6292', innehall: 'Ditt kontoutdrag för januari finns tillgängligt.', bilagor: [] },
  { id: 'MSG-2024-0035', kundnr: 'KD-90423', kundnamn: 'Kund #90423', avsandare: 'Handelsbanken', mottagare: 'Kund #90423', datum: '2025-03-01T08:10', kategori: 'Avtal', amne: 'Nytt kortavtal', las: true, borttaget: false, arkiverat: false, status: 'Skickat', kontor: 'SE-6292', innehall: 'Bekräftelse på ditt nya kortavtal bifogas.', bilagor: [{ filnamn: 'kortavtal.pdf', storlek: 20480, url: '/files/kortavtal.pdf' }] },
];

const UTSKICK = [
  { id: 'UTK-2025-0001', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-11-19T16:35', kategori: 'Avräkningsnota', amne: 'Avräkningsnota nov', las: true, borttaget: false, arkiverat: true, visasTill: '2036-03-20', innehall: 'Din fondorder är genomförd enligt bifogad avräkningsnota.', bilagor: [{ filnamn: 'Avräkningsnota nov.pdf', url: '/files/avrakningsnota-nov.pdf' }] },
  { id: 'UTK-2025-0002', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-11-10T15:40', kategori: 'Kontoutdrag', amne: 'Kontoutdrag okt', las: true, borttaget: false, arkiverat: false, visasTill: '2036-03-20', innehall: 'Ditt kontoutdrag för oktober 2025 finns tillgängligt.', bilagor: [{ filnamn: 'Kontoutdrag okt.pdf', url: '/files/kontoutdrag-okt.pdf' }] },
  { id: 'UTK-2025-0003', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-11-04T11:22', kategori: 'Avräkningsnota', amne: 'Avräkningsnota okt', las: false, borttaget: false, arkiverat: false, visasTill: '2036-03-20', innehall: 'Din fondorder är genomförd enligt bifogad avräkningsnota.', bilagor: [{ filnamn: 'Avräkningsnota okt.pdf', url: '/files/avrakningsnota-okt.pdf' }] },
  { id: 'UTK-2025-0004', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-11-03T12:44', kategori: 'Bokföringsavi', amne: 'Bokföringsavi nov', las: false, borttaget: false, arkiverat: false, visasTill: '2036-03-20', innehall: 'Bokföringsavi för november bifogad.', bilagor: [{ filnamn: 'Bokföringsavi nov.pdf', url: '/files/bokforingsavi-nov.pdf' }] },
  { id: 'UTK-2025-0005', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-08-18T10:56', kategori: 'Avtal', amne: 'IGDH Test doktyp 2', las: true, borttaget: false, arkiverat: true, visasTill: '2036-03-20', innehall: 'Avtalsbekräftelse bifogad.', bilagor: [{ filnamn: 'IGDH Test doktyp 2.pdf', url: '/files/igdh-test.pdf' }] },
];

const DOKUMENT = [
  { dokumentnamn: 'Avtal Allkonto', forbindelse: '', dokumentdatum: '2025-08-13', utskicksdatum: '2025-08-13', skickatsTill: 'Digitalt', visasTill: '2027-02-13', last: true, borttaget: false, arkiverat: false, kundnr: 'KD-71042' },
  { dokumentnamn: 'Kontoutdrag sep', forbindelse: 'SE-001', dokumentdatum: '2025-09-30', utskicksdatum: '2025-10-01', skickatsTill: 'Digitalt', visasTill: '2027-10-01', last: true, borttaget: false, arkiverat: true, kundnr: 'KD-71042' },
];

const KUVERT = [
  { kuvertId: 'ENV-2024-88441', kundnr: 'KD-71042', kundnamn: 'Kund #71042', datum: '2024-02-29', mall: 'Kontoutdrag', kanal: 'Digital brevlåda', status: 'Levererat' },
];

const UTSKICK_INSTALLNINGAR = [
  { kundnr: 'KD-71042', kategori: 'Kontoutdrag',    avser: 'Konto',           forbindelse: 'SE-001-001', papper: false, internet: false },
  { kundnr: 'KD-71042', kategori: 'Bokföringsavi',  avser: 'Konto',           forbindelse: 'SE-011-011', papper: true,  internet: false },
  { kundnr: 'KD-71042', kategori: 'Låneavi',        avser: 'Lån',             forbindelse: '0',          papper: false, internet: false },
  { kundnr: 'KD-71042', kategori: 'Avräkningsnota', avser: 'Värdepapper',     forbindelse: '0',          papper: true,  internet: false },
  { kundnr: 'KD-71042', kategori: 'Avtal',          avser: 'Lån Stadshypotek',forbindelse: 'SE-005-05',  papper: true,  internet: false },
];

let INFORMATIONSSAMBAND = [
  { id: 'SAM-001', systembeteckning: 'EPOX', informationsId: 'Q294902', publiceraAutomatiskt: false },
];

let PUBLICERING_JOBB = [
  { jobbId: 'EPOX-JOB-001', systembeteckning: 'EPOX', informationsId: 'Q294902', leveranstidpunkt: '2026-06-01T08:00', status: 'Väntar' },
  { jobbId: 'REVL-JOB-002', systembeteckning: 'REVL', informationsId: 'Q295100', leveranstidpunkt: '2026-06-02T08:00', status: 'Väntar' },
];

let INFORMATIONSPRODUKTER = [
  { id: '32225', namn: 'Konto, Account', land: 'Sverige', status: 'Aktiv' },
  { id: '32228', namn: 'Konto',          land: 'Sverige', status: 'Aktiv' },
  { id: '32230', namn: 'Fondkonto',      land: 'Sverige', status: 'Aktiv' },
  { id: '32241', namn: 'Bolån',          land: 'Sverige', status: 'Aktiv' },
];

let DEBITERINGSUPPGIFTER = [
  { produktid: 'DEB-001', meddelandeid: '-', systembeteckning: 'INLÅ', antsKodInternet: '217805', antsKodEjInternet: '217905', resultatstalle: '68821', status: 'Aktiv' },
  { produktid: 'DEB-002', meddelandeid: '-', systembeteckning: 'INLÅ', antsKodInternet: '217826', antsKodEjInternet: '217926', resultatstalle: '68821', status: 'Aktiv' },
  { produktid: 'DEB-003', meddelandeid: '-', systembeteckning: 'REVL', antsKodInternet: '217807', antsKodEjInternet: '217907', resultatstalle: '69314', status: 'Aktiv' },
  { produktid: 'DEB-004', meddelandeid: '-', systembeteckning: 'HBOS', antsKodInternet: '217804', antsKodEjInternet: '217904', resultatstalle: '60180', status: 'Under upplägg' },
  { produktid: 'DEB-005', meddelandeid: '-', systembeteckning: 'AKKO', antsKodInternet: '217800', antsKodEjInternet: '217900', resultatstalle: '60280', status: 'Under upplägg' },
];

let MASSUTSKICK = [
  { meddId: '250', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'TBD',                                      utskicksdatum: '2026-06-25', notifieringskategori: '', meddelande: '',                                         status: 'Under upplägg' },
  { meddId: '214', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'Byte av försäkringssystem',                 utskicksdatum: '2024-09-06', notifieringskategori: '', meddelande: 'Brev om byte av försäkringssystem.',         status: 'Klarmarkerad' },
  { meddId: '213', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'Förfall av dokumentation för direktnedsättning', utskicksdatum: '2024-09-02', notifieringskategori: '', meddelande: 'Information om förfall av dokumentation.', status: 'Klarmarkerad' },
  { meddId: '211', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'Fel i utskick från Handelsbanken',          utskicksdatum: '2024-06-26', notifieringskategori: '', meddelande: 'Rättelse av tidigare utskick.',               status: 'Klarmarkerad' },
  { meddId: '210', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'Difference in tax purposes',               utskicksdatum: '2024-06-03', notifieringskategori: '', meddelande: 'Information regarding tax differences.',       status: 'Klarmarkerad' },
  { meddId: '209', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'e-Kapitalkonto blir Sparkonto',             utskicksdatum: '2024-05-02', notifieringskategori: '', meddelande: 'Information om namnbyte av kontotyp.',         status: 'Klarmarkerad' },
];

// ---- Mock API functions (replace apiFetch) ----

export function mockGetKund(kundnr) {
  return KUNDER[kundnr] ?? null;
}

export function mockGetMeddelanden(kundnr) {
  return MEDDELANDEN.filter(m => m.kundnr === kundnr);
}

export function mockGetMeddelande(kundnr, id) {
  return MEDDELANDEN.find(m => m.kundnr === kundnr && m.id === id) ?? null;
}

export function mockGetUtskick(kundnr) {
  return UTSKICK.filter(u => u.kundnr === kundnr);
}

export function mockGetUtskickById(kundnr, id) {
  return UTSKICK.find(u => u.kundnr === kundnr && u.id === id) ?? null;
}

export function mockGetDokument(kundnr) {
  return DOKUMENT.filter(d => d.kundnr === kundnr);
}

export function mockGetKuvert(kuvertId) {
  return KUVERT.find(k => k.kuvertId === kuvertId) ?? null;
}

export function mockGetUtskickInstallningar(kundnr) {
  return UTSKICK_INSTALLNINGAR.filter(u => u.kundnr === kundnr);
}

export function mockGetInformationssamband() { return [...INFORMATIONSSAMBAND]; }
export function mockCreateInformationssamband(input) {
  const id = 'SAM-' + String(INFORMATIONSSAMBAND.length + 1).padStart(3, '0');
  const item = { id, ...input };
  INFORMATIONSSAMBAND.push(item);
  return item;
}
export function mockUpdateInformationssamband(id, input) {
  const i = INFORMATIONSSAMBAND.findIndex(s => s.id === id);
  if (i < 0) return null;
  INFORMATIONSSAMBAND[i] = { id, ...input };
  return INFORMATIONSSAMBAND[i];
}
export function mockDeleteInformationssamband(id) {
  const i = INFORMATIONSSAMBAND.findIndex(s => s.id === id);
  if (i < 0) return false;
  INFORMATIONSSAMBAND.splice(i, 1);
  return true;
}

export function mockGetPubliceringJobb() { return [...PUBLICERING_JOBB]; }
export function mockGodkannJobb(jobbId, godkand) {
  const j = PUBLICERING_JOBB.find(j => j.jobbId === jobbId);
  if (!j) return false;
  j.status = godkand ? 'Godkänd' : 'Nekad';
  return true;
}

export function mockGetInformationsprodukter(land) {
  if (!land) return [...INFORMATIONSPRODUKTER];
  return INFORMATIONSPRODUKTER.filter(p => p.land.toLowerCase() === land.toLowerCase());
}
export function mockCreateInformationsprodukt(input) {
  const id = String(Math.max(...INFORMATIONSPRODUKTER.map(p => Number(p.id))) + 1);
  const item = { id, ...input };
  INFORMATIONSPRODUKTER.push(item);
  return item;
}
export function mockUpdateInformationsprodukt(id, input) {
  const i = INFORMATIONSPRODUKTER.findIndex(p => p.id === id);
  if (i < 0) return null;
  INFORMATIONSPRODUKTER[i] = { id, ...input };
  return INFORMATIONSPRODUKTER[i];
}

export function mockGetDebiteringsuppgifter() { return [...DEBITERINGSUPPGIFTER]; }
export function mockCreateDebiteringsuppgift(input) {
  const item = { ...input };
  DEBITERINGSUPPGIFTER.push(item);
  return item;
}
export function mockUpdateDebiteringsuppgift(produktid, input) {
  const i = DEBITERINGSUPPGIFTER.findIndex(d => d.produktid === produktid);
  if (i < 0) return null;
  DEBITERINGSUPPGIFTER[i] = { produktid, ...input };
  return DEBITERINGSUPPGIFTER[i];
}
export function mockDeleteDebiteringsuppgift(produktid) {
  const i = DEBITERINGSUPPGIFTER.findIndex(d => d.produktid === produktid);
  if (i < 0) return false;
  DEBITERINGSUPPGIFTER.splice(i, 1);
  return true;
}

export function mockGetMassutskick() { return [...MASSUTSKICK].sort((a,b) => Number(b.meddId)-Number(a.meddId)); }
export function mockCreateMassutskick(input) {
  const meddId = String(Math.max(...MASSUTSKICK.map(m => Number(m.meddId))) + 1);
  const item = { meddId, ...input, status: 'Under upplägg' };
  MASSUTSKICK.push(item);
  return item;
}
export function mockUpdateMassutskick(meddId, input) {
  const i = MASSUTSKICK.findIndex(m => m.meddId === meddId);
  if (i < 0) return null;
  MASSUTSKICK[i] = { ...MASSUTSKICK[i], ...input };
  return MASSUTSKICK[i];
}
export function mockDeleteMassutskick(meddId) {
  const i = MASSUTSKICK.findIndex(m => m.meddId === meddId);
  if (i < 0) return false;
  MASSUTSKICK.splice(i, 1);
  return true;
}
export function mockKlarmarkeraMassutskick(meddId) {
  const m = MASSUTSKICK.find(m => m.meddId === meddId);
  if (!m) return 'NOT_FOUND';
  if (m.status === 'Klarmarkerad' || m.status === 'Skickad') return 'CONFLICT';
  m.status = 'Klarmarkerad';
  return 'OK';
}
