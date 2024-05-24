import { useState, useRef } from "react";
import Container from "../components/Container";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import Sigil from "../components/Sigil";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";
import ShadeSlider from "@uiw/react-color-shade-slider";
import useSigilDownloader from "../hooks/useSigilDownloader";

const SigilGenerator = () => {
  const { selectedShip } = useWalletStore();
  const { patp } = selectedShip;
  const [fgColor, setFgColor] = useState({ h: 114, s: 43, v: 90, a: 1 });
  const [bgColor, setBgColor] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const canvasRef = useRef(null);
  const { downloadSigil } = useSigilDownloader(canvasRef);

  const colors = [hsvaToHex(fgColor), hsvaToHex(bgColor)];

  const handleDownload = async () => {
    const error = await downloadSigil(selectedShip.point, colors, 256);

    if (error) {
      toast.error("Error downloading sigil");
    } else {
      toast.success("Sigil downloaded successfully");
    }
  };

  return (
    <Container headerText={`Urbit Id / Advanced Settings / Sigil Generator`}>
      <ControlBox
        onSubmit={handleDownload}
        headerContent={
          <div className="text-left w-full flex justify-between text-[20px]">
            <div className="items-center justify-center flex">
              <div className="font-bold">Sigil Generator</div>
            </div>
            {patp}
          </div>
        }
        buttonTitle="Download Sigil"
        className="h-[461px] w-[484px]"
      >
        <div className="text-[20px] justify-start flex flex-col items-start p-5 border-b border-primary-color h-full">
          <div className="flex">
            <Sigil
              id={patp}
              size={125}
              colors={[hsvaToHex(fgColor), hsvaToHex(bgColor)]}
            />
            Size
          </div>

          <canvas ref={canvasRef} style={{ display: "none" }} />

          <div className="flex justify-between w-full pr-4 mr-0 pt-8">
            <Wheel
              id={"bg-color"}
              color={bgColor}
              onChange={(color) => setBgColor({ ...bgColor, ...color.hsva })}
              width={154}
              height={154}
            />
            <ShadeSlider
              id={"bg-color"}
              direction="vertical"
              hsva={bgColor}
              style={{ width: 15, height: 100 }}
              onChange={(newShade) => {
                setBgColor({ ...bgColor, ...newShade });
              }}
            />
            <Wheel
              id={"fg-color"}
              color={fgColor}
              onChange={(color) => setFgColor({ ...fgColor, ...color.hsva })}
              width={154}
              height={154}
            />
            <ShadeSlider
              id={"fg-color"}
              direction="vertical"
              hsva={fgColor}
              style={{ width: 15, height: 100 }}
              onChange={(newShade) => {
                setFgColor({ ...fgColor, ...newShade });
              }}
            />
          </div>
        </div>
        <div className="flex items-center"></div>
      </ControlBox>
    </Container>
  );
};

export default SigilGenerator;
