import fs from 'fs';

const branches = JSON.parse(fs.readFileSync('scratch/branches_data.json', 'utf8'));
const formRooms = JSON.parse(fs.readFileSync('scratch/form_rooms.json', 'utf8'));

const tsContent = `export interface RoomItem {
  name: string;
  link: string;
  price: string;
  desc: string;
  image: string;
}

export interface BranchItem {
  id: string;
  image: string;
  badge: string;
  area: string;
  name: string;
  address: string;
  notice: string;
  tags: string[];
  roomTitle: string;
  rooms: RoomItem[];
}

export interface FormRoomOption {
  value: string;
  text: string;
  price1?: string;
  price2?: string;
  price3?: string;
  pricesub?: string;
}

export const BRANCHES_DATA: BranchItem[] = ${JSON.stringify(branches, null, 2)};

export const FORM_ROOMS_BY_BRANCH: Record<string, FormRoomOption[]> = ${JSON.stringify(formRooms, null, 2)};
`;

fs.writeFileSync('src/data/branchesData.ts', tsContent, 'utf8');
console.log('Updated src/data/branchesData.ts with FORM_ROOMS_BY_BRANCH');
