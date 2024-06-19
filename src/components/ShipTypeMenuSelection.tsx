const ShipTypeMenuSelection = (props) => {
  const { selectedShipType } = props;

  const handleClick = (shipType) => {
    props.selectShipType(shipType);
  };

  return (
    <div className="flex justify-between w-[150px]">
      <span
        onClick={() => handleClick("all")}
        className={`cursor-pointer ${
          selectedShipType === "all" ? "text-secondary-color" : ""
        }`}
      >
        All
      </span>
      <span
        onClick={() => handleClick("planet")}
        className={`cursor-pointer ${
          selectedShipType === "planet" ? "text-secondary-color" : ""
        }`}
      >
        Planet
      </span>
      <span
        onClick={() => handleClick("star")}
        className={`cursor-pointer ${
          selectedShipType === "star" ? "text-secondary-color" : ""
        }`}
      >
        Star
      </span>
      <span
        onClick={() => handleClick("galaxy")}
        className={`cursor-pointer ${
          selectedShipType === "galaxy" ? "text-secondary-color" : ""
        }`}
      >
        Galaxy
      </span>
    </div>
  );
};

export default ShipTypeMenuSelection;
