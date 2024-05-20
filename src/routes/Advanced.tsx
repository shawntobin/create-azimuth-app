import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import SettingsItem from "../components/SettingsItem";
import useWalletStore from "../store/useWalletStore";
import * as ob from "urbit-ob";
import { formatAddress } from "../utils/helper";

const Advanced = () => {
  const navigate = useNavigate();

  const { selectedShip } = useWalletStore();

  // disable Sponsor for galaxies

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
    <Container headerText={`Urbit Id / Advanced Settings`}>
      <div className="w-[968px]">
        <BackButton />
        <div className="flex gap-x-8">
          <div className="w-[484px]">
            <div className="text-left font-bold">ID Settings</div>
            <div className="flex flex-col gap-y-1">
              {" "}
              <SettingsItem
                handleClick={() => navigate(`/manage/ownership`)}
                title="Ownership Address"
                text={owner}
              />
              <SettingsItem
                handleClick={() => navigate(`/manage/management-key`)}
                title="Management Address"
                text={managementProxy}
              />
              <SettingsItem
                handleClick={() => navigate(`/manage/master-ticket`)}
                title="Master Ticket"
                text="Transfer to Master Ticket"
              />
              <SettingsItem
                handleClick={() => navigate(`/manage/sigil-generator`)}
                title="Sigil Generator"
                text="Modify or download your sigil"
              />
            </div>
          </div>
          <div className="w-[484px]">
            <div className="text-left font-bold">OS Settings</div>
            <div className="flex flex-col gap-y-1">
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

              {/* <SettingsItem
                handleClick={() => {}}
                title="Spawn Planets"
                text="Spawn planets from your star"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Advanced;
