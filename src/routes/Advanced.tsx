import Container from "../components/Container";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const Advanced = () => {
  const navigate = useNavigate();

  return (
    <Container headerText={`Urbit Id / Advanced Settings`}>
      <div className="w-[968px]">
        <BackButton />
        <div className="flex gap-x-8">
          <div className="w-[484px]">
            <div className="text-left font-bold">ID Settings</div>
            <Button
              handleClick={() => navigate(`/manage/transfer`)}
              text="Ownership Address"
              className="w-full flex"
            />
            <Button
              handleClick={() => navigate(`/manage/management-key`)}
              text="Management Address"
              className="w-full flex text-green"
            />
            <Button
              handleClick={() => {}}
              text="Master Ticket"
              className="w-full flex"
            />

            <Button
              handleClick={() => {}}
              text="Sigil Generator"
              className="w-full flex"
            />
          </div>
          <div className="w-[484px]">
            <div className="text-left font-bold">OS Settings</div>
            <Button
              handleClick={() => navigate(`/manage/sponsor`)}
              text="Sponsor"
              className="w-full flex"
            />
            <Button
              handleClick={() => {}}
              text="Network Keys"
              className="w-full flex"
            />

            <Button
              handleClick={() => {}}
              text="Spawn Planets"
              className="w-full flex"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Advanced;
