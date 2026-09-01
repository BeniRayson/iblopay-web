// src/app/modules/users/data/burundi-locations.data.ts

export interface BurundiProvince {
  code: string;
  name: string;
  communes: string[];
}

export const BURUNDI_PROVINCES: BurundiProvince[] = [
  { code: 'BUBANZA', name: 'Bubanza', communes: ['Bubanza', 'Gihanga', 'Mpanda', 'Musigati', 'Rugazi'] },
  { code: 'BUJUMBURA_MAIRIE', name: 'Bujumbura Mairie', communes: ['Mukaza', 'Ntahangwa', 'Muha'] },
  { code: 'BUJUMBURA_RURAL', name: 'Bujumbura Rural', communes: ['Isale', 'Kabezi', 'Mubimbi', 'Mugongomanga', 'Muhuta', 'Mukike', 'Mutambu', 'Mutimbuzi', 'Nyabiraba'] },
  { code: 'BURURI', name: 'Bururi', communes: ['Bururi', 'Matana', 'Mugamba', 'Rutovu', 'Songa', 'Vyanda'] },
  { code: 'CANKUZO', name: 'Cankuzo', communes: ['Cankuzo', 'Cendajuru', 'Gisagara', 'Kigamba', 'Mishiha'] },
  { code: 'CIBITOKE', name: 'Cibitoke', communes: ['Bukinanyana', 'Buganda', 'Mabayi', 'Mugina', 'Murwi', 'Rugombo'] },
  { code: 'GITEGA', name: 'Gitega', communes: ['Bugendana', 'Buraza', 'Giheta', 'Gishubi', 'Gitega', 'Itaba', 'Makebuko', 'Mutaho', 'Nyarusange', 'Ryansoro'] },
  { code: 'KARUZI', name: 'Karuzi', communes: ['Bugenyuzi', 'Buhiga', 'Gihogazi', 'Gitaramuka', 'Mutumba', 'Nyabikere', 'Shombo'] },
  { code: 'KAYANZA', name: 'Kayanza', communes: ['Butaganzwa', 'Gahombo', 'Gatara', 'Kabarore', 'Kayanza', 'Matongo', 'Muhanga', 'Muruta', 'Rango'] },
  { code: 'KIRUNDO', name: 'Kirundo', communes: ['Bugabira', 'Busoni', 'Bwambarangwe', 'Gitobe', 'Kirundo', 'Ntega', 'Vumbi'] },
  { code: 'MAKAMBA', name: 'Makamba', communes: ['Kayogoro', 'Kibago', 'Mabanda', 'Makamba', 'Nyanza-Lac', 'Vugizo'] },
  { code: 'MURAMVYA', name: 'Muramvya', communes: ['Bukeye', 'Kiganda', 'Mbuye', 'Muramvya', 'Rutegama'] },
  { code: 'MUYINGA', name: 'Muyinga', communes: ['Buhinyuza', 'Butihinda', 'Gashoho', 'Gasorwe', 'Giteranyi', 'Muyinga', 'Mwakiro'] },
  { code: 'MWARO', name: 'Mwaro', communes: ['Bisoro', 'Gisozi', 'Kayokwe', 'Mwaro', 'Nyabihanga', 'Rusaka'] },
  { code: 'NGOZI', name: 'Ngozi', communes: ['Busiga', 'Gashikanwa', 'Kiremba', 'Marangara', 'Mwumba', 'Ngozi', 'Nyamurenza', 'Ruhororo', 'Tangara'] },
  { code: 'RUMONGE', name: 'Rumonge', communes: ['Bugarama', 'Burambi', 'Buyengero', 'Rumonge'] },
  { code: 'RUTANA', name: 'Rutana', communes: ['Bukemba', 'Giharo', 'Gitanga', 'Mpinga-Kayove', 'Musongati', 'Rutana'] },
  { code: 'RUYIGI', name: 'Ruyigi', communes: ['Bweru', 'Butaganzwa', 'Butezi', 'Gisuru', 'Kinyinya', 'Nyabitsinda', 'Ruyigi'] }
];

export function getCommunesForProvince(provinceCode: string): string[] {
  const province = BURUNDI_PROVINCES.find(p => p.code === provinceCode);
  return province ? province.communes : [];
}