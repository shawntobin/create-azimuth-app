import Container from "../components/Container";
import UrbitIdCard from "../components/UrbitIdCard";
import useWalletStore from "../store/useWalletStore";
import BackButton from "../components/BackButton";

const MyApp = () => {
  const { selectedShip } = useWalletStore();

  console.log("Current Selected:", selectedShip);

  return (
    <Container>
      <div className="mt-20 mb-5 w-[540px] flex justify-between">
        <BackButton route={"/ids"} />
      </div>
      <UrbitIdCard ship={selectedShip} className={"mb-[15px]"} />
    </Container>
  );
};
export default MyApp;
