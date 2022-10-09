import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from 'components/navbar';
import { InviteFrens } from 'components/inviteFrens';
import { CreatePool } from 'components/createPool';
import { SelectOperator } from 'components/selectOperator';
import { DropKeys } from 'components/dropKeys';
import { DepositProgressBarComponent } from 'components/shared/depositProgressBarComponent';
import { Stake } from 'components/stake';

const Operator: NextPage = () => {
  const poolAddress = useRouter().query["pool"];
  const [poolContract, setPoolContract] = useState("")
  const [tokenCode, setTokenCode] = useState("abcdef")
  const [step, setStep] = useState(1)
  const [depositFileData, setDepositFileData] = useState("")

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-300" data-theme="winter">
      <Head>
        <title>frens | operator</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>

      <Navbar />

      <main className="flex flex-col justify-center items-center min-h-screen -mt-20">
        <div className="w-2/3 flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">
            1️⃣ Create Pool
          </h1>
          <div className={`${step == 1 ? "block" : "hidden"}`}>
            <CreatePool setTokenCode={setTokenCode} setStep={setStep} setPoolContract={setPoolContract} />
          </div>
        </div>

        <div className="w-2/3 flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">
            2️⃣ Invite frens
          </h1>
          <div className={`${step == 2 ? "block" : "hidden"}`}>
            <InviteFrens tokenCode={tokenCode} poolContract={poolContract} setStep={setStep} />
          </div>
        </div>

        <div className="w-2/3 flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">
            3️⃣  Watch pool fill
          </h1>
          <div className={`${step == 3 ? "block" : "hidden"}`}>
            <DepositProgressBarComponent />
          </div>
        </div>

        <div className="w-2/3 flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">
            4️⃣ Start your SSV validator
          </h1>
          {/* <div className={`${step == 4 ? "block" : "hidden"}`}> */}
          <div>
            <p>Now first create staking keys using this command</p>
            <div><b>deposit --eth1_withdrawal_address {poolAddress}</b></div>
            <p>and upload the deposit file here</p>
            <DropKeys onFileReceived={(data) => {
              const depositData = JSON.parse(data);
              setDepositFileData(depositData);
            }} />
            <SelectOperator setTokenCode={setTokenCode} setStep={setStep} />
            <Stake address={poolAddress as string} depositdata={depositFileData} />
          </div>
        </div>
      </main>
    </div >
  );
};

export default Operator;
