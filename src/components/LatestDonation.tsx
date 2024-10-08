import { FundedEvent } from "../lib/type";
import { shortenAddress } from "../lib/utils";
import { ExternalLink, LoaderCircle } from "lucide-react";
import Card from "./Card";

interface LatestDonationProps {
  isLoading: boolean;
  historyEvent: FundedEvent[] | null;
}

const LatestDonation = ({ isLoading, historyEvent }: LatestDonationProps) => {
  return (
    <div className="mt-6 pt-6 border-t space-y-2">
      <h2 className="text-lg font-semibold text-lime-950 ">Latest Donation</h2>
      {isLoading && <LoaderCircle className="animate-spin" />}
      {!isLoading &&
        historyEvent?.length !== 0 &&
        historyEvent?.map((item) => (
          <>
            <Card
              key={item.txHash}
              className="shadow-none flex justify-between gap-2 text-center hover:shadow transition-all"
            >
              <div>
                <p className="text-sm font-semibold">Funder</p>
                <a
                  href={`https://sepolia.etherscan.io/address/${item.funder}`}
                  target="_blank"
                  className="hover:underline text-blue-900 flex items-center gap-2"
                >
                  {shortenAddress(item.funder)}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold">Value</p>
                <p>{item.value} ETH</p>
              </div>
              <div>
                <p className="text-sm font-semibold">TxHash</p>
                <a
                  href={`https://sepolia.etherscan.io/tx/${item.txHash}`}
                  target="_blank"
                  className="hover:underline  text-blue-900 flex items-center gap-2"
                >
                  {shortenAddress(item.txHash)}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          </>
        ))}
    </div>
  );
};

export default LatestDonation;
