/* eslint-disable react-hooks/exhaustive-deps */
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { contractABI, ContractAddress } from "./contracts/contractData";
import {
  AlchemyProvider,
  BrowserProvider,
  Contract,
  formatEther,
} from "ethers";
import { useEffect, useState } from "react";
import { MainLayout } from "./layouts/MainLayout";
import Card from "./components/Card";
import FundCard from "./components/FundCard";
import { LoaderCircle } from "lucide-react";
import { FundedEvent } from "./lib/type";
import LatestDonation from "./components/LatestDonation";

// 1. Your Reown Cloud project ID
const projectId = import.meta.env.VITE_WALLETCONNECT_ID;

// 2. Set chains
const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: import.meta.env.VITE_ETH_SEPOLIA_RPC_URL,
};

// 3. Create a metadata object
const metadata = {
  name: "dapp",
  description: "AppKit Example",
  url: "https://reown.com/appkit", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [sepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function App() {
  const { walletProvider } = useWeb3ModalProvider();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [crowdfundingBal, setCrowdfundingBal] = useState<string | null>(null);
  const [funderLength, setFunderLength] = useState<number | null>(null);
  const [historyEvent, setHistoryEvent] = useState<FundedEvent[] | null>(null);

  const fetchContractData = async () => {
    setIsLoading(true);
    try {
      let ethersProvider: BrowserProvider | AlchemyProvider;
      if (walletProvider) {
        ethersProvider = new BrowserProvider(walletProvider);
      } else {
        ethersProvider = new AlchemyProvider(
          "sepolia",
          import.meta.env.VITE_ETH_SEPOLIA_APIKEY
        );
      }

      const contract = new Contract(
        ContractAddress,
        contractABI,
        ethersProvider
      );
      const contractBalance = await ethersProvider.getBalance(ContractAddress);

      const responseFunderLength = await contract.getFundersLength();

      const fundedFilter = contract.filters.Funded;

      const fundedEvends = await contract.queryFilter(fundedFilter, 10000);

      const fundedEventFormated: FundedEvent[] = [];

      for (let i = 0; i < fundedEvends.length; i++) {
        const currentEvent = fundedEvends[i];

        const eventObj: FundedEvent[] = {
          blockNumber: currentEvent.blockNumber,
          txHash: currentEvent.transactionHash,
          funder: (currentEvent as any).args[0],
          value: formatEther((currentEvent as any).args[1]),
        };
        fundedEventFormated.push(eventObj);
      }
      fundedEventFormated.sort((a, b) => b.blockNumber - a.blockNumber);

      setHistoryEvent(fundedEventFormated);

      setCrowdfundingBal(formatEther(contractBalance));

      setFunderLength(Number(responseFunderLength));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContractData();
  }, [walletProvider]);
  return (
    <MainLayout>
      <div className="flex justify-start items-center gap-4 mt-4 pb-4 boder-b">
        <div className="space-y-2 w-[30%]">
          <Card>
            <h2 className="text-sm font-semibold text-lime-950">
              Total Amount Funding
            </h2>
            {isLoading && <LoaderCircle className="animate-spin" />}
            {!isLoading && crowdfundingBal && (
              <p className="text-2xl font-bold">
                {crowdfundingBal}{" "}
                <span className="text-base font-semibold">ETH</span>
              </p>
            )}
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-lime-950">Funders</h2>
            {isLoading && <LoaderCircle className="animate-spin" />}
            {!isLoading && funderLength && (
              <p className="text-2xl font-bold">{funderLength}</p>
            )}
          </Card>
        </div>
        <FundCard fetchContractData={fetchContractData} />
      </div>
      <div>
        <LatestDonation isLoading={isLoading} historyEvent={historyEvent} />
      </div>
    </MainLayout>
  );
}

export default App;
