import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { t } from "i18next";
import type { NextPage } from "next";
import { Hash, Transaction, TransactionReceipt, formatEther, formatUnits } from "viem";
import { hardhat } from "viem/chains";
import { usePublicClient } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { decodeTransactionData, getFunctionDetails } from "~~/utils/scaffold-eth";
import { replacer } from "~~/utils/scaffold-eth/common";

const TransactionPage: NextPage = () => {
  const client = usePublicClient({ chainId: hardhat.id });

  const router = useRouter();
  const { txHash } = router.query as { txHash?: Hash };
  const [transaction, setTransaction] = useState<Transaction>();
  const [receipt, setReceipt] = useState<TransactionReceipt>();
  const [functionCalled, setFunctionCalled] = useState<string>();

  const { targetNetwork } = useTargetNetwork();

  useEffect(() => {
    if (txHash) {
      const fetchTransaction = async () => {
        const tx = await client.getTransaction({ hash: txHash });
        const receipt = await client.getTransactionReceipt({ hash: txHash });

        const transactionWithDecodedData = decodeTransactionData(tx);
        setTransaction(transactionWithDecodedData);
        setReceipt(receipt);

        const functionCalled = transactionWithDecodedData.input.substring(0, 10);
        setFunctionCalled(functionCalled);
      };

      fetchTransaction();
    }
  }, [client, txHash]);

  return (
    <div className="container mx-auto mt-10 mb-20 px-10 md:px-0">
      <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
        {t("pages.transaction.Back")}
      </button>
      {transaction ? (
        <div className="overflow-x-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-primary-content">
            {t("pages.transaction.Transaction Details")}
          </h2>{" "}
          <table className="table rounded-lg bg-base-100 w-full shadow-lg md:table-lg table-md">
            <tbody>
              <tr>
                <td>
                  <strong>{t("pages.transaction.Transaction Hash")}</strong>
                </td>
                <td>{transaction.hash}</td>
              </tr>
              <tr>
                <td>
                  <strong>{t("pages.transaction.Block Number")}</strong>
                </td>
                <td>{Number(transaction.blockNumber)}</td>
              </tr>
              <tr>
                <td>
                  <strong>{t("pages.transaction.From")}</strong>
                </td>
                <td>
                  <Address address={transaction.from} format="long" />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>{t("pages.transaction.To")}</strong>
                </td>
                <td>
                  {!receipt?.contractAddress ? (
                    transaction.to && <Address address={transaction.to} format="long" />
                  ) : (
                    <span>
                      {t("pages.transaction.Contract Creation")}
                      <Address address={receipt.contractAddress} format="long" />
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>{t("pages.transaction.Value:")}</strong>
                </td>
                <td>
                  {formatEther(transaction.value)} {targetNetwork.nativeCurrency.symbol}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>{t("pages.transaction.Function called")}</strong>
                </td>
                <td>
                  <div className="w-full md:max-w-[600px] lg:max-w-[800px] overflow-x-auto whitespace-nowrap">
                    {functionCalled === "0x" ? (
                      t("pages.transaction.This transaction did not call any function.")
                    ) : (
                      <>
                        <span className="mr-2">{getFunctionDetails(transaction)}</span>
                        <span className="badge badge-primary font-bold">{functionCalled}</span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>{t("pages.transaction.Gas Price")}</strong>
                </td>
                <td>{formatUnits(transaction.gasPrice || 0n, 9)} Gwei</td>
              </tr>
              <tr>
                <td>
                  <strong>{t("pages.transaction.Data")}</strong>
                </td>
                <td className="form-control">
                  <textarea readOnly value={transaction.input} className="p-0 textarea-primary bg-inherit h-[150px]" />
                </td>
              </tr>
              <tr>
                <td>
                  <strong> {t("pages.transaction.Logs")}</strong>
                </td>
                <td>
                  <ul>
                    {receipt?.logs?.map((log, i) => (
                      <li key={i}>
                        <strong>
                          {t("pages.transaction.Log ")} {i} {t("topics")}
                        </strong>{" "}
                        {JSON.stringify(log.topics, replacer, 2)}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-2xl text-base-content">{t("Loading...")}</p>
      )}
    </div>
  );
};

export default TransactionPage;
