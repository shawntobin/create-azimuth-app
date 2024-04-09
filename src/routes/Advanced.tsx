import Container from "../components/Container";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Advanced = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Button
        handleClick={() => navigate(`/manage/sponsor`)}
        text="Change Sponsor"
        className="mt-8 mb-3 w-[500px] h-[60px]"
      />
      <Button
        handleClick={() => navigate(`/manage/management-key`)}
        text="Edit Management Key"
        className="mb-3 w-[500px] h-[60px]"
      />
      <Button
        handleClick={() => navigate(`/manage/transfer`)}
        text="Transfer Ownership"
        className="mb-3 w-[500px] h-[60px]"
      />

      <Button
        handleClick={() => {}}
        text="Set Network Keys"
        className="mb-3 w-[500px] h-[60px] bg-light-gray"
      />
    </Container>
  );
};
export default Advanced;
