import { ReactComponent as StarIconBold } from "../assets/icons/bold/star.svg";
import { ReactComponent as PlanetIconBold } from "../assets/icons/bold/planet.svg";
import { ReactComponent as AzimuthIconBold } from "../assets/icons/bold/azimuth.svg";
import { ReactComponent as GalaxyIconBold } from "../assets/icons/bold/galaxy.svg";
import { ReactComponent as GalaxyIcon } from "../assets/icons/regular/galaxy.svg";
import { ReactComponent as StarIcon } from "../assets/icons/regular/star.svg";
import { ReactComponent as PlanetIcon } from "../assets/icons/regular/planet.svg";
import { ReactComponent as AzimuthIcon } from "../assets/icons/regular/azimuth.svg";
import { ReactComponent as AlertIcon } from "../assets/icons/regular/alert.svg";
import { ReactComponent as DoublesIcon } from "../assets/icons/regular/doubles.svg";

const icons = {
  galaxy: GalaxyIcon,
  star: StarIcon,
  planet: PlanetIcon,
  azimuth: AzimuthIcon,
  alert: AlertIcon,
  galaxyBold: GalaxyIconBold,
  starBold: StarIconBold,
  planetBold: PlanetIconBold,
  azimuthBold: AzimuthIconBold,
  alertBold: AlertIcon,
  doubles: DoublesIcon,
};

const UrbitIcon = ({ name, size, color = "#000000", weight = "regular" }) => {
  const Icon = weight === "bold" ? icons[`${name}Bold`] : icons[name];

  if (!Icon) {
    return null;
  }

  return <Icon width={size} height={size} fill={color} weight={weight} />;
};

export default UrbitIcon;
