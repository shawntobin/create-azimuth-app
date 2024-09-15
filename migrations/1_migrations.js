// used by truffle to deploy contracts
// "artifacts" is a truffle global that provides access to the contract artifacts

var Azimuth = artifacts.require("azimuth-solidity/Azimuth");
var Polls = artifacts.require("azimuth-solidity/Polls");
var Claims = artifacts.require("azimuth-solidity/Claims");
var Ecliptic = artifacts.require("azimuth-solidity/Ecliptic");

module.exports = async function (deployer) {
  await deployer;

  // setup contracts
  const azimuth = await deployer.deploy(Azimuth);
  const polls = await deployer.deploy(Polls, 1209600, 604800);
  const claims = await deployer.deploy(Claims, azimuth.address);

  //NOTE  for real deployment, use a real ENS registry
  const ecliptic = await deployer.deploy(
    Ecliptic,
    "0x0000000000000000000000000000000000000000",
    azimuth.address,
    polls.address,
    claims.address
  );

  // configure contract ownership
  await azimuth.transferOwnership(ecliptic.address);
  await polls.transferOwnership(ecliptic.address);

  // deploy naive contract
  // const naive = await deployer.deploy(Naive);

  const own = await ecliptic.owner();
  switch (process.env.WITH_TEST_STATE) {
    case "L2":
      break;
    case "L1":
      // all ships will have as owner:
      //   0x6deffb0cafdb11d175f123f6891aa64f01c24f7d
      //
      // ~zod -> L1
      await ecliptic.createGalaxy(0, own);
      await ecliptic.configureKeys(0, "0xffff", "0xffff", 1, false);
      // ~marzod -> L1
      await ecliptic.spawn(256, own);
      await ecliptic.configureKeys(256, "0xffff", "0xffff", 1, false);
      // ~wanzod -> L1
      await ecliptic.spawn(768, own);
      await ecliptic.configureKeys(768, "0xffff", "0xffff", 1, false);
      // ~wicdev-wisryt -> L1
      await ecliptic.spawn(65792, own);
      // ~panret-tocsel -> L1
      await ecliptic.spawn(131328, own);
      // ~binzod -> L1
      await ecliptic.spawn(512, own);
      // ~norsyr-torryn -> L1
      await ecliptic.spawn(99549440, own);
      break;

    default:
      return;
  }
};
