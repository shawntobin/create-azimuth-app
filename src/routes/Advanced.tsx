import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import SettingsItem from "../components/SettingsItem";
import useWalletStore from "../store/useWalletStore";
import * as ob from "urbit-ob";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { isZeroAddress } from "../utils/address";
import AlertModal from "../components/AlertModal";
import useAppStore from "../store/useAppStore";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { getAuthToken } from "../lib/authToken";
import { WALLET_TYPES } from "../constants/constants";
import Web3 from "web3";
import { PROVIDER_URL } from "../constants";
import toast from "react-hot-toast";
import { getShipStatus } from "../lib/networkEvents";
import { Tooltip } from "react-tooltip";
import { formatDistance } from "date-fns";
import { ALERT_MODAL_TEXT } from "../constants/content";
import { ROUTE_MAP } from "./routeMap";
import { isGalaxy } from "../utils/helper";
// import { useSingleKeyfileGenerator } from "../lib/useKeyfileGenerator"; // xxxx

const Advanced = () => {
  const navigate = useNavigate();

  const [sponsorStatus, setSponsorStatus] = useState(false);

  const { showAlert, setShowAlert } = useAppStore();
  const { selectedShip, walletAddress, urbitWallet, authToken, setAuthToken } =
    useWalletStore();

  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);

  // disable Sponsor for galaxies

  useEffect(() => {
    const asyncFunction = async () => {
      const onlineStatus = await getShipStatus(ob.patp(selectedShip?.sponsor));
      setSponsorStatus(onlineStatus?.online);
    };

    !isGalaxy(selectedShip.patp) && asyncFunction();
  }, [selectedShip]);

  useEffect(() => {
    // During testing
    useAppStore.persist.clearStorage();
  }, [setShowAlert]);

  // const { available, code, download, generating } = useSingleKeyfileGenerator(
  //   {}
  // );

  // console.log("available", available);
  // console.log("code", code);
  // console.log("generating", generating);
  // console.log("auth token", authToken);

  const {
    owner,
    spawnProxy,
    managementProxy,
    keyRevisionNumber,
    sponsor,
    // hasSponsor,
    escapeRequested,
    escapeRequestedTo,
  } = selectedShip;

  const keysSet = Number(keyRevisionNumber) !== 0;

  const keysText = !keysSet
    ? { title: "Set Network Keys", text: "Not set" }
    : {
        title: "Reset Network Keys",
        text: `Revision ${keyRevisionNumber}`,
      };

  const toolTipStyle = {
    backgroundColor: "#212121",
    color: "white",
    fontWeight: 600,
    fontSize: "18px",
    borderRadius: "10px",
    zIndex: 1,
  };
  const handleDownloadKeyfile = async () => {
    // const authToken = await getAuthToken({
    //   address: walletAddress,
    //   walletType: WALLET_TYPES.METAMASK,
    //   web3,
    // });

    // authToken && console.log("AUTH TOKEN", authToken);
    // authToken && setAuthToken(authToken);

    toast("Coming soon!");
  };

  const keyfileMessage = keysSet
    ? ""
    : "Network keys must be set to download keyfile or copy access code.";

  const spawnMessage = keysSet
    ? ""
    : "Network keys must be set to spawn planets.";

  const statusMessage =
    !isGalaxy(selectedShip.patp) && sponsorStatus
      ? `Your sponsor is online (last updated ${formatDistance(
          new Date(sponsorStatus),
          new Date(),
          {
            addSuffix: true,
          }
        )})`
      : "Your sponsor is offline!";

  const renderSponsor = () => {
    return (
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <span className="pr-1">{ob.patp(sponsor)}</span>
          <div
            data-tooltip-id="sponsor-status-tooltip"
            data-tooltip-content={statusMessage}
            className="rounded-full text-black px-[3px] py-[3px] w-[5px] h-[5px]"
            style={{ backgroundColor: sponsorStatus ? "#AAE68C" : "#E72E2E" }}
          />

          <Tooltip id="sponsor-status-tooltip" style={toolTipStyle} />
          <Tooltip id="keyfile-tooltip" style={toolTipStyle} />
          <Tooltip id="spawn-tooltip" style={toolTipStyle} />
        </div>
        <div className="ml-10">
          {escapeRequested && (
            <span className="text-[16px] text-light-green">{`pending request to ${ob.patp(
              escapeRequestedTo
            )}`}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <Container>
      <AlertModal
        text={ALERT_MODAL_TEXT.SETTINGS}
        isOpen={showAlert}
        handleClose={() => setShowAlert(false)}
      />
      <div className="flex-col items-center justify-center">
        <div className="ml-[3px]">
          <BackButton />
        </div>
        <div className="flex gap-x-8 h-[96px] mt-2">
          <div className="w-[484px]">
            <div className="text-left font-bold  pb-1 ml-5">OS Settings</div>
            <div className="flex flex-col gap-y-1">
              {!isGalaxy(selectedShip.patp) && (
                <SettingsItem
                  handleClick={() => navigate(ROUTE_MAP.SPONSOR)}
                  title="Change Sponsor"
                  text={renderSponsor()}
                />
              )}
              <SettingsItem
                handleClick={() => navigate(ROUTE_MAP.NETWORK_KEYS)}
                title={keysText.title}
                text={keysText.text}
              />

              <div className="flex justify-between items-start w-full">
                <div
                  className={`w-[232px] pl-4 justify-start rounded-[10px] border border-primary-color text-primary-color text-[20px] h-[36px] bg-transparent m-[3px] relative flex items-center`}
                >
                  <div className="mb-0 pb-0">Download Keyfile</div>

                  <button
                    data-tooltip-id="keyfile-tooltip"
                    data-tooltip-content={keyfileMessage}
                    disabled={!keysSet}
                    className="cursor-pointer font-[600] text-[22px] border-none pr-0 pt-0 pb-0 pl-0 -mr-0.5 bg-primary-color text-base-color border-primary-color absolute right-0 flex items-center justify-center rounded-r-[10px] h-[36px] w-[36px] focus:outline-none hover:bg-light-gray hover:border-primary-color disabled:bg-light-gray"
                    onClick={handleDownloadKeyfile}
                  >
                    {`↓`}
                  </button>
                </div>

                <div
                  className={`w-[232px] pl-4 justify-start rounded-[10px] border border-primary-color text-primary-color text-[20px] h-[36px] bg-transparent m-[3px] relative flex items-center `}
                >
                  <div className="mb-0 pb-0">Copy Access Code</div>

                  <button
                    disabled={!keysSet}
                    data-tooltip-id="keyfile-tooltip"
                    data-tooltip-content={keyfileMessage}
                    className="cursor-pointer font-[600] text-[28px] border-none pr-0 pt-0 pb-1 pl-0.5 -mr-0.5 bg-primary-color text-base-color border-primary-color absolute right-0 flex items-center justify-center rounded-r-[10px] h-[36px] w-[36px] focus:outline-none hover:bg-light-gray hover:border-primary-color disabled:bg-light-gray"
                    onClick={() => toast("Coming soon!")}
                  >
                    {`>`}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[484px]">
            <div className="text-left font-bold pb-1 ml-5">ID Settings</div>
            <div className="flex flex-col gap-y-1">
              <SettingsItem
                handleClick={() => navigate(ROUTE_MAP.OWNERSHIP)}
                title="Transfer Ownership"
                text={owner}
              />
              <SettingsItem
                handleClick={() => navigate(ROUTE_MAP.MANAGEMENT_KEY)}
                title="Set Management Proxy"
                text={
                  !isZeroAddress(managementProxy) ? managementProxy : "None"
                }
              />
              <SettingsItem
                handleClick={() => navigate(ROUTE_MAP.MASTER_TICKET)}
                title="Master Ticket"
                text="Convert to Master Ticket"
              />
              {ob.clan(selectedShip.patp) === "star" && (
                <>
                  <div className="text-left font-bold pb-1">Star Settings</div>
                  <div
                    data-tooltip-id="spawn-tooltip"
                    data-tooltip-content={spawnMessage}
                  >
                    <SettingsItem
                      handleClick={() => navigate(ROUTE_MAP.SPAWN)}
                      title="Spawn Planets"
                      text=""
                      disabled={!keysSet}
                    />
                  </div>
                  <SettingsItem
                    handleClick={() => navigate(ROUTE_MAP.SPAWN_PROXY)}
                    title="Set Spawn Proxy"
                    text={!isZeroAddress(spawnProxy) ? spawnProxy : "None"}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Advanced;
