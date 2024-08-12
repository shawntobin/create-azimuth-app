import Container from "../components/Container";
import OptionBox from "../components/OptionBox";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";

const Hosting = () => {
  return (
    <Container dropdown={false}>
      <div className="flex flex-col items-center justify-center">
        {/* <BackButton /> */}
        <div className="mb-5 mt-[100px] w-[500px] flex justify-center items-center text-[20px]">
          Please choose whether you want to run your Urbit yourself or have Red Horizon host it for you.
        </div>
        <div className="flex">
          <OptionBox
            width="275px"
            height="480px"
            hideBackButton
            headerContent={
              <div className="text-left w-full flex justify-between">
                <div className="items-center justify-center flex text-[20px] ">
                  <div className="font-bold">Get Hosted with Red Horizon</div>
                </div>
              </div>
            }
            buttonTitle="Select"
            onSubmit={() => toast("Coming soon!")}
          >
            <div className="text-[16px] justify-start flex flex-col items-start  h-full mt-2">
              <div className="flex justify-center items-center w-full h-full py-0">
                <img
                  src="/red-horizon-soon.png"
                  alt="red horizon logo"
                  className="w-[250px] h-[250px]"
                />
              </div>
              <div className="text-left py-3  px-3 text-[14px] font-[400] border-t text-[#D5D5D5]">{`Import your Urbit ID to Red Horizon’s free hosting service. No maintenance required, easy to access from any device.
`}</div>
            </div>
          </OptionBox>
          <OptionBox
            width="275px"
            height="480px"
            className="ml-8"
            hideBackButton
            headerContent={
              <div className="text-left w-full flex justify-between">
                <div className="items-center justify-center flex text-[20px] ">
                  <div className="font-bold">
                    Run Urbit Yourself{" "}
                    <span className="text-dark-gray">(Advanced)</span>
                  </div>
                </div>
              </div>
            }
            buttonTitle="Select"
            onSubmit={() => toast("Coming soon!")}
          >
            <div className="text-[16px] justify-start flex flex-col items-start h-full">
              <div className="flex justify-start items-start w-full h-full">
                <img
                  src="/urbit-dojo.png"
                  alt="red horizon logo"
                  className="w-full h-full"
                />
              </div>
              <div className="text-left py-3  px-3 text-[14px] font-[400] border-t text-[#D5D5D5]">{`Run your Urbit on your own machine at home or in the cloud. It only takes a few commands to install, but you'll have to maintain it yourself.
`}</div>
            </div>
          </OptionBox>
        </div>
      </div>
    </Container>
  );
};

export default Hosting;
