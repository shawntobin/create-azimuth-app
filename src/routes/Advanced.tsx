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

    asyncFunction();
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

  const handleDownloadKeyfile = async () => {
    const authToken = await getAuthToken({
      address: walletAddress,
      walletType: WALLET_TYPES.METAMASK,
      web3,
    });

    toast("Downloading keyfile is disabled.");
    authToken && console.log("AUTH TOKEN", authToken);
    authToken && setAuthToken(authToken);
  };

  const statusMessage = sponsorStatus
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
            data-tooltip-id="my-tooltip"
            data-tooltip-content={statusMessage}
            className="rounded-full text-black px-[3px] py-[3px] w-[5px] h-[5px]"
            style={{ backgroundColor: sponsorStatus ? "#AAE68C" : "#E72E2E" }}
          />

          <Tooltip
            id="my-tooltip"
            style={{
              backgroundColor: "#212121",
              color: "white",
              fontWeight: 600,
              fontSize: "18px",
              borderRadius: "10px",
              zIndex: 1,
            }}
          />
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
      <AlertModal isOpen={showAlert} handleClose={() => setShowAlert(false)} />
      <div className="flex-col items-center justify-center">
        <div className="ml-[3px]">
          <BackButton />
        </div>
        <div className="flex gap-x-8 h-[96px] mt-2">
          <div className="w-[484px]">
            <div className="text-left font-bold  pb-1 ml-5">OS Settings</div>
            <div className="flex flex-col gap-y-1">
              <SettingsItem
                handleClick={() => navigate(`/manage/settings/sponsor`)}
                title="Change Sponsor"
                text={renderSponsor()}
              />
              <SettingsItem
                handleClick={() => navigate(`/manage/settings/network-keys`)}
                title={
                  Number(keyRevisionNumber) === 0
                    ? "Set Network Keys"
                    : "Reset Network Keys"
                }
                text={`Revision ${keyRevisionNumber}`}
              />

              <div className="flex justify-between items-start w-full">
                <div
                  className={`w-[232px] pl-4 justify-start rounded-[10px] border border-primary-color text-primary-color text-[20px] h-[36px] bg-transparent m-[3px] relative flex items-center`}
                >
                  <div className="mb-0 pb-0">Download Keyfile</div>

                  <div
                    className="cursor-pointer font-[600] text-[22px] pb-0 pl-0 -mr-0.5 bg-primary-color text-base-color border-primary-color absolute right-0 flex items-center justify-center rounded-r-[10px] h-[36px] w-[36px] focus:outline-none focus:bg-transparent hover:bg-light-gray hover:border-primary-color"
                    onClick={handleDownloadKeyfile}
                  >
                    {`↓`}
                  </div>
                </div>

                <div
                  className={`w-[232px] pl-4 justify-start rounded-[10px] border border-primary-color text-primary-color text-[20px] h-[36px] bg-transparent m-[3px] relative flex items-center`}
                >
                  <div className="mb-0 pb-0">Copy Access Key</div>

                  <div
                    className="cursor-pointer font-[600] text-[28px] pb-1 pl-0.5 -mr-0.5 bg-primary-color text-base-color border-primary-color absolute right-0 flex items-center justify-center rounded-r-[10px] h-[36px] w-[36px] focus:outline-none focus:bg-transparent hover:bg-light-gray hover:border-primary-color"
                    onClick={() => toast("Copying access key is disabled.")}
                  >
                    {`>`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[484px]">
            <div className="text-left font-bold pb-1 ml-5">ID Settings</div>
            <div className="flex flex-col gap-y-1">
              <SettingsItem
                handleClick={() => navigate(`/manage/settings/ownership`)}
                title="Transfer Ownership"
                text={owner}
              />
              <SettingsItem
                handleClick={() => navigate(`/manage/settings/management-key`)}
                title="Set Management Proxy"
                text={
                  !isZeroAddress(managementProxy) ? managementProxy : "None"
                }
              />
              <SettingsItem
                handleClick={() => navigate(`/manage/settings/master-ticket`)}
                title="Master Ticket"
                text="Convert to Master Ticket"
              />
              {ob.clan(selectedShip.patp) === "star" && (
                <>
                  <div className="text-left font-bold pb-1">Star Settings</div>
                  <SettingsItem
                    handleClick={() => navigate(`/manage/settings/spawn`)}
                    title="Spawn Planets"
                    text=""
                  />
                  <SettingsItem
                    handleClick={() => navigate(`/manage/settings/spawn-proxy`)}
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
