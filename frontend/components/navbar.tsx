import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => (
  <div className="navbar">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost btn-circle text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <Link href="/">
              <a>Homepage</a>
            </Link>
          </li>
          <li>
            <Link href="/operator">
              <a>Operator</a>
            </Link>
          </li>
          <li>
            <Link href="/staker">
              <a>Staker</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <Link href="/">
        <a className="btn btn-ghost normal-case text-3xl text-white">frens 🧑‍🤝‍🧑</a>
      </Link>
    </div>
    <div className="navbar-end">
      <ConnectButton />
    </div>
  </div>
);

export default Navbar;
