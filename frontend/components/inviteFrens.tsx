interface InviteFrensProps {
  tokenCode: string;
}

export const InviteFrens = ({ tokenCode }: InviteFrensProps) => {
  const link = `https://frens-network.vercel.app/staker?token=${tokenCode}`

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
