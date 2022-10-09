interface InviteFrensProps {
  tokenCode: string;
  poolContract: string;
}

export const InviteFrens = ({ tokenCode, poolContract }: InviteFrensProps) => {
  const link = `https://frens-network.vercel.app/staker?token=${tokenCode}?pool=${poolContract}`

  function copyToClipboard(copyMe: string): void {
    navigator.clipboard.writeText(copyMe)
  }

  return (
    <div>
      <h2 className='title'>{link}</h2>
      <button className='btn' onClick={() => copyToClipboard(link)}>Copy to clipboard</button>
    </div>
  );
};
