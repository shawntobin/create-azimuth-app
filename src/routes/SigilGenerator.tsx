import { useState, useRef } from "react";
import Container from "../components/Container";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import Sigil from "../components/Sigil";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex, hexToHsva } from "@uiw/color-convert";
import ShadeSlider from "@uiw/react-color-shade-slider";
import useSigilDownloader from "../hooks/useSigilDownloader";

const SigilGenerator = () => {
  const { selectedShip } = useWalletStore();
  const { patp } = selectedShip;
  const [fgColor, setFgColor] = useState({ h: 114, s: 43, v: 90, a: 1 });
  const [bgColor, setBgColor] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [size, setSize] = useState(256);
  const canvasRef = useRef(null);
  const { downloadSigil } = useSigilDownloader(canvasRef);

  const colors = [hsvaToHex(fgColor), hsvaToHex(bgColor)];

  const handleDownload = async () => {
    const error = await downloadSigil(selectedShip.point, colors, size);

    if (error) {
      toast.error("Error downloading sigil");
    } else {
      toast.success("Sigil downloaded successfully");
    }
  };

  return (
    <Container headerText={`Urbit ID / Sigil Generator`}>
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
        <div className="text-[20px] justify-start flex flex-col items-start p-5 border-b border-primary-color h-full mt-2">
          <div className="flex">
            <Sigil
              id={patp}
              size={125}
              colors={[hsvaToHex(bgColor), hsvaToHex(fgColor)]}
            />
            <div className="items-left flex flex-col text-left ml-5 text-[20px] font-[500]">
              <div>Size (px)</div>
              <input
                placeholder="1000 (max)"
                className="h-[33px] bg-transparent border p-1 w-[98px] text-dark-gray"
                onChange={(e) => setSize(parseInt(e.target.value))}
                value={size}
              />

              <div className="flex flex-row">
                <div className="flex flex-col">
                  <div>Hex Code</div>
                  <input
                    placeholder="#0F0F0F"
                    className="h-[33px] bg-transparent border p-1 w-[98px] text-dark-gray"
                    onChange={(e) => {
                      const newColor = hexToHsva(e.target.value);
                      setFgColor({ ...fgColor, ...newColor });
                    }}
                    value={hsvaToHex(fgColor)}
                  />
                </div>
                <div className="flex flex-col ml-5">
                  <div>Hex Code</div>
                  <input
                    placeholder="#0F0F0F"
                    className="w-20 h-8 bg-transparent border p-1 w-[98px] h-[33px] text-dark-gray"
                    onChange={(e) => {
                      const newColor = hexToHsva(e.target.value);
                      setBgColor({ ...bgColor, ...newColor });
                    }}
                    value={hsvaToHex(bgColor)}
                  />
                </div>
              </div>
            </div>
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />

          <div className="flex justify-between w-full pr-4 mr-0 pt-4">
            <div className="flex-col text-left">
              Foreground Color
              <div className="flex-row flex mt-3">
                <Wheel
                  id={"fg-color"}
                  color={fgColor}
                  onChange={(color) =>
                    setFgColor({ ...fgColor, ...color.hsva })
                  }
                  width={154}
                  height={154}
                />
                <ShadeSlider
                  id={"fg-color"}
                  direction="vertical"
                  hsva={fgColor}
                  className="ml-7"
                  style={{ width: 15, height: 100 }}
                  onChange={(newShade) => {
                    setFgColor({ ...fgColor, ...newShade });
                  }}
                />
              </div>
            </div>
            <div className="flex-col text-left">
              Background Color
              <div className="flex-row flex mt-3">
                <Wheel
                  id={"bg-color"}
                  color={bgColor}
                  onChange={(color) =>
                    setBgColor({ ...bgColor, ...color.hsva })
                  }
                  width={154}
                  height={154}
                />
                <ShadeSlider
                  id={"bg-color"}
                  direction="vertical"
                  hsva={bgColor}
                  className="ml-7"
                  style={{ width: 15, height: 100 }}
                  onChange={(newShade) => {
                    setBgColor({ ...bgColor, ...newShade });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center"></div>
      </ControlBox>
    </Container>
  );
};

export default SigilGenerator;
