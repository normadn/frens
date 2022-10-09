import { ChangeEvent, useState } from 'react';
import { BalanceComponent } from "./balanceComponent";
import { useAccount, useBalance } from "wagmi"
import { DepositProgressBarComponent } from 'components/shared/depositProgressBarComponent';

const errorClassForInput = "input-error"

export const StakeFormComponent = ({ setStake }) => {
    const {  address } = useAccount()
    const { data } = useBalance({
        addressOrName: address,
    })
    return (
        <div>
            <div className="text-center font-bold my-2">Select amount</div>
            <label className="input-group flex justify-center">
                <input 
                    onChange={(event) => handleUserInput(event, data.formatted, setStake)} 
                    id="ethInput"
                    type="text" 
                    placeholder="0.00" 
                    className="input input-bordered w-1/3" />
                <span>ETH</span>
            </label>
            {/* <BalanceComponent ethBalance={data.formatted} symbol={data.symbol}></BalanceComponent> */}
        </div>
    );
    
}

function handleUserInput(event: ChangeEvent<HTMLInputElement>, formattedBalance: string, setStake): void {
    const stringValue = event.target.value
    if (stringValue.length !== 0) {
        const balance = parseFloat(formattedBalance)
        const value = parseFloat(stringValue)
        const ethInput = document.getElementById("ethInput")
        const invalidState = value > balance
        if (invalidState) {
            ethInput.classList.add(errorClassForInput)
        } else {
            setStake(stringValue)
            ethInput.classList.remove(errorClassForInput)
        }
    }
}