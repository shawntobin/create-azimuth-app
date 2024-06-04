import React from "react";
import { ReactComponent as GalaxyIconBold } from "../assets/icons/bold/Galaxy.svg";
import { ReactComponent as StarIconBold } from "../assets/icons/bold/Star.svg";
import { ReactComponent as PlanetIconBold } from "../assets/icons/bold/Planet.svg";
import { ReactComponent as AzimuthIconBold } from "../assets/icons/bold/Azimuth.svg";
import { ReactComponent as GalaxyIcon } from "../assets/icons/regular/Galaxy.svg";
import { ReactComponent as StarIcon } from "../assets/icons/regular/Star.svg";
import { ReactComponent as PlanetIcon } from "../assets/icons/regular/Planet.svg";
import { ReactComponent as AzimuthIcon } from "../assets/icons/regular/Azimuth.svg";

const icons = {
  galaxy: GalaxyIcon,
  star: StarIcon,
  planet: PlanetIcon,
  azimuth: AzimuthIcon,
};

const UrbitIcon = ({ name, size, color = "#000000", weight }) => {
  const Icon = icons[name];

  if (!Icon) {
    return null;
  }

  return <Icon width={size} height={size} fill={color} weight="bold" />;
};

export default UrbitIcon;
