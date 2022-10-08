import { CSSProperties, useState } from 'react';

const TARGET_ETH = 32

export const DepositProgressBarComponent = () => {
    const [numberOfEth, updateEth] = useState(1)
    const style = {
        "--value": numberOfEth * 100 / TARGET_ETH,
        "--size": "12rem",
        "--thickness": "1rem"
    } as CSSProperties

    function addEth(): void {
        const value = numberOfEth + 1
        updateEth(value)
    }

    function removeEth(): void {
        const value = numberOfEth - 1
        updateEth(value)
    }
    return (
        <div className='align-items center mt-3'>
            <div id="ethProgress" className="radial-progress m-4" style={style}>{numberOfEth} ETH</div>
            <div className="btn-group m-4">
                <button className="btn" onClick={addEth}>+</button>
                <button className="btn" onClick={removeEth}>-</button>
            </div>
        </div>
    )
}
