import {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import Web3Modal from "web3modal";
import { ReactComponent as ImageFilesIcon } from './svgs/image-files.svg'
import {Web3ProviderContext} from "./Web3ProviderContext";
import {createContractHelper} from "./createContractHelper";
import FivePenguinsABI from "./artifacts/contracts/FivePenguins.sol/FivePenguins.json";
import PngModal from "./PngModal";

const fivePengiunsAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const correctChainId = process.env.REACT_APP_LOCAL_DEV === 'true' ? 1337 : 1



function Header() {
  const { connectToWeb3, disconnectFromWeb3, activeAddress, provider, chainId } = useContext(Web3ProviderContext)
  const [isOpen, setIsOpen] = useState(false)
  const [pngModalOpen, setPngModalOpen] = useState(false)
  const [ownedTokenIds, setOwnedTokenIds] = useState([])

  const NAV_LINKS = [
    { text: 'Twitter', href: 'https://twitter.com/shapiro500', targetBlank: true },
    { text: 'OpenSea', href: 'https://opensea.com/collection/FivePenguins', targetBlank: true },
    { text: 'My Squads', href: '#', onClick: openPngModal, hide: !ownedTokenIds.length },
  ]

  function makeLinks(styledATag, onClick = () => {}, className = 'desktopNav') {
    const ATag = styled.a`${styledATag.componentStyle.rules[0]}`
    return NAV_LINKS.map((link) => {
      if (link.hide) return null
      if (link.onClick) {
        const originalOnClick = onClick
        onClick = () => {
          originalOnClick()
          link.onClick()
        }
      }
      if (link.targetBlank) {
        return <ATag className={className} onClick={onClick} href={link.href} target={'_blank'} rel={"nofollow"}>{link.text}</ATag>
      }
      return <ATag className={className} onClick={onClick} href={link.href}>{link.text}</ATag>
    })
  }

  const fivePenguins = createContractHelper(fivePengiunsAddress, FivePenguinsABI.abi, provider, !activeAddress)
  const onCorrectChain = !chainId || chainId === correctChainId

  useEffect(() => {
    if (!activeAddress || !onCorrectChain) {
      setOwnedTokenIds([])
      return
    }
    // getTokensByOwner(activeAddress)
    getTokensByOwner(activeAddress)
      .then((result) => {
        console.log('owned tokens:', result)
        setOwnedTokenIds(result)
      })
  }, [activeAddress, onCorrectChain])

  async function getTokensByOwner(address) {
    let owners = []
    const perPage = 800
    for (let i = 0; i < 4; i++) {
      const [pageRaw, length] = await fivePenguins.reader.tokenOwners(i * perPage + 1, perPage + 1)
      const page = pageRaw.slice(0, length)
      owners = [...owners, ...page]
      if (length.lt(perPage)) break
    }
    return owners.flatMap((a, i) => a === address ? i+1 : []);
  }

  function openPngModal() {
    getTokensByOwner(activeAddress)
    setPngModalOpen(true)
  }

  function closePngModal() {
    setPngModalOpen(false)
  }

  const ConnectedAddress = <ConnectedAddressWrap>
    <_ConnectedAddress>
      <GreenCircle />
      {activeAddress?.slice(0,6)}…{activeAddress?.slice(-4)}
    </_ConnectedAddress>
    <Disconnect onClick={disconnectFromWeb3}>✖</Disconnect>
  </ConnectedAddressWrap>

  const ConnectOrConnectedAddress = activeAddress ?
    [ConnectedAddress]
    : <ConnectWalletButton onClick={connectToWeb3}>Connect Wallet</ConnectWalletButton>


  return (
    <Wrap>
      <TopLinks>
        <Nav>
          <HamburgerDiv onClick={() => setIsOpen(!isOpen)}>
            <img width={35} height={35} src="/menu.svg"/>
          </HamburgerDiv>
          <Menu isOpen={isOpen}>
            {makeLinks(NavItem, () => setIsOpen(false), 'mobileNav')}
          </Menu>
        </Nav>
        {makeLinks(A)}
        {ConnectOrConnectedAddress}
      </TopLinks>
      <HeaderLoop
        src={"/assets/header_loop.mp4"}
        poster={"/assets/placeholder.png"}
        autoPlay
        muted
        loop
        playsInline
      />
      <PngModal modalIsOpen={pngModalOpen} closeModal={closePngModal} tokenIds={ownedTokenIds} />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 35px;
`;

const TopLinks = styled.div`
  font-size: 18px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 5%;
  height: 73px;

  @media (max-width: 624px) {
      padding: 0 20px;
    }

  .desktopNav {
    @media (max-width: 624px) {
      display: none;
    }
  }
`;

const HeaderLoop = styled.video`
  width: 100%;
  border-radius: 20px;
  margin-bottom: 15px;
  @media (max-width: 624px) {
    margin-top: 15px;
  }
`;

const A = styled.a`
  text-align: center;
  line-height: 1.4;
`;

// mobile nav

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (min-width: 625px) {
    display: none;
  }
`;

const HamburgerDiv = styled.div`
  cursor: pointer;
  padding: 20px 15px 0px 0px;
`;



const Menu = styled.div`
  display: flex;
  background: white;
  position: absolute;
  top: 65px;
  z-index: 1;
  overflow: hidden;
  flex-direction: column;
  width: 94%;
  margin-top: 5px;
  margin-left: -20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  max-height: ${( { isOpen }) => isOpen ? "300px" : "0px"};
  transition: max-height 0.3s ease-in;
`;

const NavItem = styled.a`
  color: black;
  font-weight: 400;
  padding: 20px 0px 20px 15px;
`;

const ConnectWalletButton = styled.button`
  color: inherit;
  background-color: #72A3FF;
  border-radius: 10px;
  border-width: 0;
  padding: 11px; 
  font-size: 18px;
  cursor: pointer;
  margin-left: auto;
`

const IconWrap = styled.div`
  ${( { ownsTokens }) => !ownsTokens ? "display: none;" : ""}
  padding: 5px;
  margin-right: 10px;
  cursor: pointer;
`

const ConnectedAddressWrap = styled.div`
  margin-left: auto;
  display: flex;
`

const _ConnectedAddress = styled.div`
  background: #5077ab;
  padding: 5px 10px 3px 7px;
  border-radius: 0px;
  font-family: "Monaco", monospace;
  font-size: 16px;
  border: 2px solid #72a3ff91;
  border-radius: 10px;
  font-weight: bold;
  user-select: none;
  height: 22px;
`

const GreenCircle = styled.span`
  width: 11px;
  height: 11px;
  display: inline-block;
  background: #4ceb4c;
  border-radius: 10px;
  margin: 0 10px 0 5px;
`

const Disconnect = styled.div`
  margin-left: 10px;
  background: #be3c3c;
  padding: 5px 7px 5px 7px;
  border-radius: 0px;
  font-family: monospace;
  border: 2px solid #ff7272ba;
  border-radius: 10px;
  width: 22px;
  text-align: center;
  font-size: 26px;
  line-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  height: 22px;
`

export default Header;
