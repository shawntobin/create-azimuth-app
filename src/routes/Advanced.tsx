import { useState, useEffect } from "react";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import SettingsItem from "../components/SettingsItem";
import useWalletStore from "../store/useWalletStore";
import * as ob from "urbit-ob";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { copy } from "../utils/helper";
import { isZeroAddress } from "../utils/address";
import AlertModal from "../components/AlertModal";
import useAppStore from "../store/useAppStore";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const Advanced = () => {
  const navigate = useNavigate();

  const { showAlert, setShowAlert } = useAppStore();
  const { selectedShip } = useWalletStore();

  // disable Sponsor for galaxies

  useEffect(() => {
    // During testing
    useAppStore.persist.clearStorage();
  }, [setShowAlert]);

  const {
    owner,
    spawnProxy,
    managementProxy,
    keyRevisionNumber,
    sponsor,
    hasSponsor,
  } = selectedShip;

  const sponsorPatp = hasSponsor ? ob.patp(sponsor) : "None";

  return (
    <Container>
      <AlertModal isOpen={showAlert} handleClose={() => setShowAlert(false)} />
      <div className="w-[968px]">
        <BackButton />
        <div className="flex gap-x-8 h-[96px]">
          <div className="w-[484px]">
            <div className="text-left font-bold  pb-1">OS Settings</div>
            <div className="flex flex-col gap-y-1 h-full">
              <SettingsItem
                handleClick={() => navigate(`/manage/sponsor`)}
                title="Sponsor"
                text={sponsorPatp}
              />
              <SettingsItem
                handleClick={() => navigate(`/manage/network-keys`)}
                title="Network Keys"
                text={`Revision ${keyRevisionNumber}`}
              />
            </div>
            <div className="flex justify-start items-start w-full">
              <button
                className=" flex underline decoration-1 items-center justify-center text-primary-color text-[20px] bg-transparent p-0 m-0"
                onClick={() => {}}
              >
                <ArrowDownTrayIcon className="h-6 w-6 pr-1" />
                Download Keyfile
              </button>
              <button
                className=" flex underline decoration-1 items-center justify-center text-primary-color text-[20px] bg-transparent p-0 ml-6"
                onClick={() => copy("Access Key")}
              >
                <DocumentDuplicateIcon className="h-6 w-6 pr-1" />
                Copy Access Key
              </button>
            </div>
          </div>
          <div className="w-[484px]">
            <div className="text-left font-bold pb-1">ID Settings</div>
            <div className="flex flex-col gap-y-1">
              <SettingsItem
                handleClick={() => navigate(`/manage/ownership`)}
                title="Ownership Administration"
                text={owner}
              />
              <SettingsItem
                handleClick={() => navigate(`/manage/management-key`)}
                title="Management Address"
                text={
                  !isZeroAddress(managementProxy) ? managementProxy : "None"
                }
              />
              <SettingsItem
                handleClick={() => navigate(`/manage/master-ticket`)}
                title="Master Ticket"
                text="Transfer to Master Ticket"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Advanced;
