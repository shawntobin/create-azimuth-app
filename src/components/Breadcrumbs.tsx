import { Link, useLocation } from "react-router-dom";
import { getBreadcrumbName } from "../utils/breadcrumbs";
import { formatAddress } from "../utils/address";
import useWalletStore from "../store/useWalletStore";

const Breadcrumbs = ({ walletAddress }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { selectedShip } = useWalletStore();

  const params = {
    address: formatAddress(walletAddress),
    patp: selectedShip?.patp,
  };

  return (
    <nav className="text-[20px] text-primary-color">
      <ol className="breadcrumb">
        {/* <li key="home" className="breadcrumb-item">
          <Link to="/">{getBreadcrumbName("/", params)}</Link>
        </li> */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const breadcrumbName = getBreadcrumbName(to, params);
          return (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>{breadcrumbName}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
