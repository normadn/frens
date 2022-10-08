import { useAccount } from "wagmi";
import { BalanceComponent } from "./balanceComponent";

const errorClassForInput = "input-error w-full max-w-xs"

export const StakeFormComponent = () => {
    const { isConnected } = useAccount()
    if (isConnected) {
        return (
            <div>
                <BalanceComponent></BalanceComponent>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Enter amount</span>
                    </label>
                    <label className="input-group">
                        <input onChange={(event) => handleUserInput(event)} id="ethInput" type="text" placeholder="0.00" className="input input-bordered" />
                        <span>ETH</span>
                    </label>
                </div >
            </div>
        );
    }
}

function handleUserInput(event): void {

}