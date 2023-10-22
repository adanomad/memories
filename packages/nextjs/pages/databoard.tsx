import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Tableland } from "~~/components/Tableland";

// import { ContractData } from "~~/components/example-ui/ContractData";
// import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const DataboardUI: NextPage = () => {
  return (
    <>
      <MetaHeader title="Databoard | Memories" description="Databoard created with 🏗 Memories.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Databoard</h1>
        <p className="text-neutral">
          This is the Databoard. You can use it to interact with the database and see the data hash stored on the
          blockchain. Data hash is computed from the data above and stored on the blockchain. It can be used to quickly
          verify the integrity of the data in the database, checked against the smart contract.
        </p>
      </div>
      <div className="grid lg:grid-cols-1 flex-grow" data-theme="exampleUi">
        <Tableland />
        {/* <ContractInteraction />
        <ContractData /> */}
      </div>
    </>
  );
};

export default DataboardUI;
