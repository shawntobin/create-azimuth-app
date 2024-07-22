import * as ob from "urbit-ob";

type Planet = {
  patp: string;
  point: number;
};

export const findBothEnglish = (patp: string) => {
  const first = patp.substring(1, 7);
  const second = patp.substring(8, 14);

  if (findEnglishPatps(first) && findEnglishPatps(second)) return true;
};

export const findDoubles = (patp) => {
  if (patp.substring(1, 7) == patp.substring(8, 14)) return true;
};

export const findEnglishPatps = (patp: string) => {
  const ps = [
    "balder",
    "balled",
    "baller",
    "ballet",
    "banned",
    "banter",
    "barfed",
    "barfer",
    "batted",
    "battel",
    "batter",
    "bolder",
    "boldyr",
    "biches",
    "bitdev",
    "bitter",
    "dapper",
    "darrel",
    "darren",
    "darryl",
    "docter",
    "doctyr",
    "doller",
    "dotnet",
    "dotted",
    "fabled",
    "fallen",
    "faster",
    "fastyr",
    "fitter",
    "forbes",
    "happen",
    "harden",
    "harder",
    "harper",
    "hasten",
    "hatred",
    "hidden",
    "hodler",
    "holder",
    "holdyr",
    "hopper",
    "larper",
    "lasted",
    "laster",
    "littel",
    "littul",
    "magnet",
    "magnum",
    "magnus",
    "mapped",
    "martyn",
    "martyr",
    "master",
    "mastyr",
    "midnyt",
    "miller",
    "misder",
    "mister",
    "missed",
    "misled",
    "missel",
    "missyl",
    "mistyr",
    "mitten",
    "molten",
    "parden",
    "pilled",
    "piller",
    "ponder",
    "possum",
    "ranted",
    "ranter",
    "rapper",
    "rapped",
    "rapter",
    "riches",
    "ridden",
    "riddel",
    "ripped",
    "ripper",
    "roller",
    "rolled",
    "rollex",
    "salted",
    "salter",
    "sampel",
    "signed",
    "signer",
    "sonnet",
    "sovryn",
    "tapper",
    "tapped",
    "tasted",
    "taster",
    "tinder",
    "walnut",
    "walrus",
    "wanted",
    "wantyd",
    "wanter",
    "wander",
    "wandyr",
    "watsup",
    "winner",
    "winnyr",
    "winter",
    "wisdem",
    "wisdym",
    "wishes",
    "witnes",
    "worsen",
  ];

  return ps.reduce((acc, x) => acc || patp.includes(x), false);
};

export const assignTags = ({ patp }: Planet) => {
  let tags = [];

  // if (findBothEnglish(patp)) {
  //   tags.push(BOTH_ENGLISH);
  // }

  if (findDoubles(patp)) {
    tags.push(DOUBLES);
  }

  if (findEnglishPatps(patp) && !findBothEnglish(patp)) {
    tags.push(ENGLISH_LIKE);
  }

  return tags;
};

export const getPlanets = (patp: string) => {
  const shipArr = [];

  const pnt = parseInt(ob.patp2dec(patp));

  if (pnt >= 256 && pnt <= 65535) {
    for (let i = 1; i < 65535; i++) {
      const planet = ob.patp(pnt + 65536 * i);
      shipArr.push({
        point: pnt + 65536 * i,
        patp: planet,
        tags: assignTags({ point: pnt + 65536 * i, patp: planet }),
      });
    }
  }

  return shipArr;
};

export const ENGLISH_LIKE = "words";
export const DOUBLES = "doubles";
export const BOTH_ENGLISH = "both english";

export const filters = [ENGLISH_LIKE, DOUBLES, BOTH_ENGLISH];
