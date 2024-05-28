// Response returned by L1's azimuth#getPoint
export type L1Point = {
  active: boolean;
  layer: 1 | 2;
  isL2Spawn?: boolean;
  authenticationKey: string;
  continuityNumber: string;
  cryptoSuiteVersion: string;
  encryptionKey: string;
  escapeRequested: boolean;
  escapeRequestedTo: string;
  hasSponsor: boolean;
  sponsor: string;
  keyRevisionNumber: string;
  managementProxy: string;
  owner: string;
  spawnProxy: string;
  transferProxy: string;
  votingProxy: string;
};
