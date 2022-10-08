import { ChangeEvent, useState } from 'react';
import { BalanceComponent } from "./balanceComponent";
import { useAccount, useBalance } from "wagmi"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { DepositProgressBarComponent } from 'components/shared/depositProgressBarComponent';

const errorClassForInput = "input-error"

export const StakeFormComponent = () => {
    const { isConnected, address } = useAccount()
    const { data } = useBalance({
        addressOrName: address,
    })
    if (isConnected) {
        return (
            <div>
                <BalanceComponent ethBalance={data.formatted} symbol={data.symbol}></BalanceComponent>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Enter amount</span>
                    </label>
                    <label className="input-group">
                        <input onChange={(event) => handleUserInput(event, data.formatted)} id="ethInput" type="text" placeholder="0.00" className="input input-bordered" />
                        <span>ETH</span>
                    </label>
                </div >
            </div>
        );
    } else {
        return (
            <div className="mt-4">
                <ConnectButton></ConnectButton>
            </div>
        )
    }
}

function handleUserInput(event: ChangeEvent<HTMLInputElement>, formattedBalance: string): void {
    const stringValue = event.target.value
    if (stringValue.length !== 0) {
        const balance = parseFloat(formattedBalance)
        const value = parseFloat(stringValue)
        const ethInput = document.getElementById("ethInput")
        const validState = value > balance
        if (validState) {
            ethInput.classList.add(errorClassForInput)
        } else {
            ethInput.classList.remove(errorClassForInput)
        }
    }
}