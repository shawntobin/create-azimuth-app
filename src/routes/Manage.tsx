import Container from "../components/Container";
import UrbitIdCard from "../components/UrbitIdCard";
import { useParams } from "react-router";
import Button from "../components/Button";

const Manage = () => {
  const { patp } = useParams();

  return (
    <Container>
      <UrbitIdCard patp={patp} />

      <Button
        handleClick={() => {}}
        text="Host your Planet"
        className="mt-8 mb-3 w-[500px] h-[60px]"
        secondaryText="Host your Planet
        Run your ship on a cloud server via one of Urbit’s hosting provider"
      />
      <Button
        handleClick={() => {}}
        text="Download your Passport"
        className="mb-3 w-[500px] h-[60px]"
      />
      <Button
        handleClick={() => {}}
        text="Advanced Settings"
        className="mb-3 w-[500px] h-[60px] bg-light-gray"
      />
    </Container>
  );
};
export default Manage;
