export default interface Ship {
  point: number;
  patp: string;
  layer: string;
  owner: string;
  hasSponsor: boolean;
  sponsor: string;
  keyRevisionNumber: string;
  managementProxy: string;
  spawnProxy: string;
  transferProxy: string;
  votingProxy: string;
}
