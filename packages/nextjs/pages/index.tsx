import Link from "next/link";
import { t } from "i18next";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">{t("pages.home.Welcome to")}</span>
            <span className="block text-4xl font-bold">{t("pages.home.Scaffold-ETH 2")}</span>
          </h1>
          <p className="text-center text-lg">
            {t("pages.home.Edit your smart contract")}{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            {t("pages.home.in")}{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                {t("pages.home.Tinker with your smart contract using the")}{" "}
                <Link href="/debug" passHref className="link">
                  {t("pages.home.Debug Contract")}
                </Link>{" "}
                {t("pages.home.tab.")}
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                {t("pages.home.Explore your local transactions with the")}{" "}
                <Link href="/blockexplorer" passHref className="link">
                  {t("pages.home.Block Explorer")}
                </Link>{" "}
                {t("pages.home.tab.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
