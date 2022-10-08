import { useAccount, useBalance } from "wagmi"

export const BalanceComponent = () => {
    const { isConnected, address } = useAccount()
    const { data } = useBalance({
        addressOrName: address,
    })

    if (isConnected) {
        const ethBalance = data.formatted
        const symbol = data.symbol
        return (
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">Account Balance</div>
                    <div className="stat-value"> {ethBalance} {symbol}</div>
                </div>
            </div>
        )
    } else {
        // Return connect button
    }

}