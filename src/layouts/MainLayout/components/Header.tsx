import { ExternalLink } from "lucide-react";
import { ContractAddress } from "../../../contracts/contractData";
import { shortenAddress } from "../../../lib/utils";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import Button from "../../../components/Button";

const Header = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  return (
    <header className="py-3 border-b">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-lime-950">Crowdfunding</h1>
          <a
            href={`https://sepolia.etherscan.io/address/${ContractAddress}`}
            target="_blank"
            className="text-l hover:bg-gray-600 p-1 rounded-2xl flex items-center gap-2  text-blue-900"
          >
            {shortenAddress(ContractAddress)}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <Button onClick={() => open()}>
          {isConnected ? `${shortenAddress(address)}` : "Connect Wallet"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
