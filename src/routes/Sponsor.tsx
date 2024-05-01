import Button from "../components/Button";
import { useState } from "react";
import useWalletStore from "../store/useWalletStore";
import Container from "../components/Container";
import { ecliptic } from "azimuth-js";

const Sponsor = () => {
  const [newSponsor, setNewSponsor] = useState("");

  return (
    <Container>
      <div className="text-[40px] mb-7 text-white">Request New Sponsor</div>
      <div className="relative flex items-center mb-3 w-[500px]">
        <input
          type="text"
          placeholder="~sampel"
          className="pl-4 pr-20 py-2 rounded-full border-2 border-white w-full text-black text-[25px] h-[61px]"
          value={newSponsor}
          onChange={(e) => setNewSponsor(e.target.value)}
        />

        <button className="text-black absolute inset-y-0 right-0 flex items-center justify-center bg-light-green rounded-full h-[61px] w-[61px] text-[50px] p-2 pt-0 font-[300]">
          &gt;
        </button>
      </div>
    </Container>
  );
};

export default Sponsor;
