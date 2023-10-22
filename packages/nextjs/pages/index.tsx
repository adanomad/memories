import Link from "next/link";
import type { NextPage } from "next";
import { DocumentDuplicateIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">🌌 Memories</span>
          </h1>
          <p className="text-center text-lg">
            Memories is a web3 platform to create your personal side-chain to store verifyable and modifiable data on
            the blockchain. The database content itself is secured on the IPFS.
          </p>
          <div className="w-full px-8 py-12 bg-base-100 mt-8">
            <h2 className="text-2xl font-bold mb-6">🌍 Use Cases</h2>
            <p className="text-lg mb-6">
              Imagine graduating from school and you have a list of all your classmates and something that changes, such
              as their reputation score. You want to store this list on the blockchain so it can be verifiable, but you
              also want to be able to modify it.
            </p>

            <h2 className="text-2xl font-bold mb-6">❓ Problem</h2>
            <p className="text-lg mb-6">
              We want to know if Jason is a graduate from the class of 2020, but we also want to know if he is a good
              person by checking his reputation.
            </p>

            <h2 className="text-2xl font-bold mb-6">✨ Solution</h2>
            <p className="text-lg mb-6">
              The school can create a database of all the students and their reputation scores. This database can be
              publicly accessible and verifiable on the blockchain. However, the school can also modify the reputation
              scores of the students. This is where Memories comes in.
            </p>
            <ol className="list-decimal pl-5 text-lg mb-6">
              <li>Use any SQL database for the data, such as using Tableland decentralized database system.</li>
              <li>Modify the data in the database and update the smart contract with new hash.</li>
              <li>Quickly check against smart contract the integrity of the data in the database.</li>
              <li>Anyone can query for hashes on the blockchain which verifies off-chain database content.</li>
            </ol>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <DocumentDuplicateIcon className="h-8 w-8 fill-secondary" />
              <p>
                Interact with <code>MemoriesDataHashRegistry</code> on{" "}
                <Link href="/contracts" passHref className="link">
                  Smart Contract
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Experiment with{" "}
                <Link href="/databoard" passHref className="link">
                  Databoard
                </Link>{" "}
                to explore and build your own memories.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
