import { ReactComponent as AzimuthIconBold } from "../assets/icons/bold/azimuth.svg";
import { ReactComponent as AzimuthIcon } from "../assets/icons/regular/azimuth.svg";
import { ReactComponent as AlertIcon } from "../assets/icons/regular/alert-yellow.svg";

import { ReactComponent as DoublesIcon } from "../assets/icons/regular/doubles.svg";
import { ReactComponent as ArrowsRightLeftIcon } from "../assets/icons/regular/arrows-right-left.svg";
import { ReactComponent as SpawnProxyIcon } from "../assets/icons/regular/spawn-proxy-changed.svg";
import { ReactComponent as EscapeRequestedIcon } from "../assets/icons/regular/escape-requested.svg";
import { ReactComponent as InviteIcon } from "../assets/icons/regular/invite.svg";
import { ReactComponent as ChangeManagementProxyIcon } from "../assets/icons/regular/change-management-proxy.svg";
import { ReactComponent as SpawnIcon } from "../assets/icons/regular/spawn.svg";
import { ReactComponent as BrokeContinuity } from "../assets/icons/regular/broke-continuity.svg";

const icons = {
  azimuth: AzimuthIcon,
  alert: AlertIcon,
  azimuthBold: AzimuthIconBold,
  alertBold: AlertIcon,
  doubles: DoublesIcon,
  arrowsRightLeft: ArrowsRightLeftIcon,
  spawnProxy: SpawnProxyIcon,
  escapeRequested: EscapeRequestedIcon,
  invite: InviteIcon,
  changeManagementProxy: ChangeManagementProxyIcon,
  spawn: SpawnIcon,
  brokeContinuity: BrokeContinuity,
};

const UrbitIcon = ({ name, size, color = "#000000", weight = "regular" }) => {
  const Icon = weight === "bold" ? icons[`${name}Bold`] : icons[name];

  if (!Icon) {
    return null;
  }

  return (
    <div style={{ width: size * 1.1, height: size * 1.1, margin: 1 }}>
      <Icon width={size} height={size} fill={color} weight={weight} />
    </div>
  );
};

export default UrbitIcon;
