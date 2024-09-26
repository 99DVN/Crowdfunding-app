import {
  BrowserProvider,
  Contract,
  parseEther,
  TransactionResponse,
} from "ethers";
import { contractABI, ContractAddress } from "../contracts/contractData";
import { useState } from "react";
import Card from "./Card";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import Button from "./Button";
import { LoaderCircle } from "lucide-react";
import { shortenAddress } from "../lib/utils";

interface FundCradProps {
  fetchContractData: () => void;
}

const FundCard = ({ fetchContractData }: FundCradProps) => {
  const { walletProvider } = useWeb3ModalProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [amountFund, setAmountfund] = useState<number | null>(null);
  const handleFunToCrowdfunding = async () => {
    setIsLoading(true);
    try {
      if (amountFund === null || amountFund <= 0) {
        alert("Amount Funding Invalid");
      }
      if (walletProvider) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const contract = new Contract(ContractAddress, contractABI, signer);

        const tx: TransactionResponse = await contract.fund({
          value: parseEther(String(amountFund)),
        });

        setTxHash(tx.hash);

        await tx.wait();

        fetchContractData();
      }
    } catch (e) {
      alert("Fund to Crowdfunding Contract Error");
    } finally {
      setIsLoading(false);
    }
  };

  const onInputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountfund(Number(e.target.value));
  };
  return (
    <Card className="w-[70%] py-8 px-4 space-x-2">
      {!isLoading && (
        <>
          <h2 className="text-lg font-semibold p-2">Donate your Ether</h2>
          <div className="space-y-2">
            <input
              placeholder="Amount"
              className="border p-2 rounded-3xl text-sm"
              type="number"
              onChange={onInputAmountChange}
            />
            <Button className="w-fit" onClick={() => handleFunToCrowdfunding()}>
              Funders
            </Button>
          </div>
        </>
      )}

      {isLoading && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LoaderCircle className="animate-spin w-6 h-6" />
            <span>Transaction is pending...</span>
          </div>
          {txHash && (
            <>
              <span>Transaction Hash:</span>
              <a
                className="cursor-pointer hover: underline"
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="blank"
              >
                {shortenAddress(txHash)}
              </a>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default FundCard;
