import {useContext, useEffect, useMemo, useState} from "react";
import styled, {css} from 'styled-components'
import {BigNumber} from "ethers";
import WhitelistCheck from "./WhitelistCheck";
import {Web3ProviderContext} from "./Web3ProviderContext";
import {createContractHelper} from "./createContractHelper";
import FivePenguinsABI from "./artifacts/contracts/FivePenguins.sol/FivePenguins.json"
import {formatEther} from "ethers/lib/utils";
import {MintCountInput} from "./MintCount";
import MintModal from "./MintModal";

const fivePengiunsAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const correctChainId = process.env.REACT_APP_LOCAL_DEV === 'true' ? 1337 : 1


function MintSection() {
  const { provider, activeAddress, chainId, connectToWeb3 } = useContext(Web3ProviderContext)

  const [whitelistCheckOpen, setWhitelistCheckOpen] = useState(false)
  const [saleStatus, setSaleStatus] = useState('loading')
  const [canClaimFreeMint, setCanClaimFreeMint] = useState(false)
  const [priceWei, setPriceWei] = useState(BigNumber.from('50000000000000000'))
  const [onWhitelist, setOnWhitelist] = useState(false)
  const [totalMinted, setTotalMinted] = useState(0)
  const [mintCountStr, setMintCountStr] = useState('1')

  const [currentTx, setCurrentTx] = useState(null)
  const [currentMintedIds, setCurrentMintedIds] = useState([])
  const [currentMintError, setCurrentMintError] = useState(null)
  const mintModalOpen = !!currentTx

  const fivePenguins = createContractHelper(fivePengiunsAddress, FivePenguinsABI.abi, provider, !activeAddress)
  const onCorrectChain = !chainId || chainId === correctChainId

  console.log('sale status:', saleStatus)
  console.log('canClaimFreeMint:', canClaimFreeMint)

  function update() {
    return Promise.all([
      fivePenguins.reader.totalSupply(),
      fivePenguins.reader.presaleEnabled(),
      fivePenguins.reader.saleEnabled(),
      fivePenguins.reader.soldOut(),
    ]).then(([totalSupply, presaleEnabled, saleEnabled, soldOut]) => {
      setTotalMinted(totalSupply.toNumber())
      if (soldOut) {
        setSaleStatus('soldOut')
      } else if (saleEnabled) {
        setSaleStatus('publicSale')
      } else if (presaleEnabled) {
        setSaleStatus('presale')
      } else {
        setSaleStatus('prelaunch')
      }
    })
  }

  useEffect(() => {
    if (!onCorrectChain) return
    update()
  }, [])

  useEffect(() => {
    setInterval(update, 10000)
  }, [])

  useEffect(() => {
    console.log('saleStatus:', saleStatus)
  }, [saleStatus])

  useEffect(() => {
    if (!activeAddress || !onCorrectChain) return
    if (['presale', 'publicSale'].includes(saleStatus)) {
      Promise.all([
        fivePenguins.reader.canClaimFreeMint(activeAddress),
        fivePenguins.reader.price(),
      ])
        .then(([_canClaimFreeMint, price]) => {
          setCanClaimFreeMint(_canClaimFreeMint)
          setPriceWei(price)
          console.log('free mint:', _canClaimFreeMint)
          console.log('price:', price)
        })
    }
    if (saleStatus === 'presale') {
      fivePenguins.reader.whitelist(activeAddress)
        .then((result) => {
          setOnWhitelist(result)
          console.log('on whitelist:', result)
        })
    }
  }, [saleStatus, activeAddress])

  function calculateMintCost() {
    if (canClaimFreeMint) {
      return priceWei.mul(parseInt(mintCountStr) - 1)
    }
    return priceWei.mul(parseInt(mintCountStr))
  }

  async function handleMint() {
    let txHash
    try {
      const tx = await fivePenguins.signer.mint(parseInt(mintCountStr), { value: calculateMintCost() })
      setCurrentTx(tx)
      txHash = tx.hash
      await tx.wait()
      const txReceipt = await provider.getTransactionReceipt(tx.hash)
      const mintedIds = txReceipt.logs
        .map((log) => fivePenguins.interface.parseLog(log))
        .filter((log) => log.name === 'Transfer')
        .map((log) => log.args.tokenId.toNumber())
      setCurrentMintedIds(mintedIds)
    } catch(err) {
      if (txHash) {
        setCurrentMintError(err)
      }
    }
    const [totalSupply, _canClaimFreeMint, soldOut] = await Promise.all([
      fivePenguins.reader.totalSupply(),
      fivePenguins.reader.canClaimFreeMint(activeAddress),
      fivePenguins.reader.soldOut(),
    ])
    setTotalMinted(totalSupply.toNumber())
    setCanClaimFreeMint(_canClaimFreeMint)
    if (soldOut) {
      setSaleStatus('soldOut')
    }
  }

  function closeMintModal() {
    setCurrentTx(null)
    setCurrentMintedIds([])
    setCurrentMintError(null)
  }

  function openWhitelistCheckModal() {
    setWhitelistCheckOpen(true)
  }

  function closeWhitelistCheckModal() {
    setWhitelistCheckOpen(false)
  }

  const adminControls = <div>
    <button onClick={() => fivePenguins.signer.setPresaleEnabled(true)}>
      Presale ON
    </button>
    <button onClick={() => fivePenguins.signer.setPresaleEnabled(false)}>
      Presale OFF
    </button>
    <button onClick={() => fivePenguins.signer.setSaleEnabled(true)}>
      Sale ON
    </button>
    <button onClick={() => fivePenguins.signer.setSaleEnabled(false)}>
      Sale OFF
    </button>
    <button onClick={() => fivePenguins.signer.addToWhitelist(['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'])}>
      Add to whitelist
    </button>
    <button onClick={() => fivePenguins.signer.removeFromWhitelist(['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'])}>
      Remove from whitelist
    </button>
  </div>

  let mintSection
  if (activeAddress && !onCorrectChain) {
    mintSection = <WrongChain>
      Please make sure you are connected to the Ethereum network.
    </WrongChain>
  } else if (saleStatus === 'prelaunch') {
    mintSection = <div>
      <ButtonWrap>
        <MintPlaceholder disabled>
          Mint
        </MintPlaceholder>
        <OpenWhitelistChecker onClick={openWhitelistCheckModal}>
          Check Whitelist Status
        </OpenWhitelistChecker>
      </ButtonWrap>

      <LaunchTime>
        Snapshot for whitelist was taken at 11:59 PM EST on Dec. 14<br/>
        Pre-sale opens at 12:00 PM EST on Dec. 16<br/>
        Public sale opens at 12:00 PM EST on Dec. 17
      </LaunchTime>

      <WhitelistCheck modalIsOpen={whitelistCheckOpen} closeModal={closeWhitelistCheckModal}/>
    </div>
  } else if (saleStatus === 'soldOut') {
    mintSection = <div>
      <SoldOut>
        <SoldOutTitle>Five Penguins is sold out!</SoldOutTitle>
        Official secondary markets:
        <SoldOutLinks>
          <A target={'_blank'} rel={'nofollow'} href={`https://opensea.io/collection/fivepenguins`}>OpenSea</A> <A target={'_blank'} rel={'nofollow'} href={`https://niftygateway.com/marketplace?collectible=0x697e0a5e2a6be117760d192a03fac688e774efcf`}>Nifty Gateway</A>
        </SoldOutLinks>
      </SoldOut>
    </div>
  } else if (saleStatus === 'presale') {
    mintSection = <div>
      <MintTitle>Presale is Live!</MintTitle>
      <ShowPresale onWhitelist={onWhitelist || !activeAddress}>
        <NoCursorEvents onWhitelist={onWhitelist || !activeAddress}>
          {activeAddress ? <Mint onClick={handleMint}>Mint for {formatEther(calculateMintCost())} ETH</Mint>
          : <Mint onClick={connectToWeb3}>Connect Wallet</Mint>}
          <MintCountInput mintCountStr={mintCountStr} setMintCountStr={setMintCountStr} />
          <MintCount>{totalMinted} / 3125</MintCount>
          {canClaimFreeMint ? <FreeMint>🎉 Congratulations, you are entitled to 1 free mint!</FreeMint> : null}
        </NoCursorEvents>
      </ShowPresale>
      <PresaleLimited onWhitelist={onWhitelist || !activeAddress}>Presale is limited to whitelisted addresses only.</PresaleLimited>
    </div>
  } else if (saleStatus === 'publicSale') {
    mintSection = <div>
      <MintTitle>Public Sale is Live!</MintTitle>
      {activeAddress ? <Mint onClick={handleMint}>Mint for {formatEther(calculateMintCost())} ETH</Mint>
        : <Mint onClick={connectToWeb3}>Connect Wallet</Mint>}
      <MintCountInput mintCountStr={mintCountStr} setMintCountStr={setMintCountStr} />
      <MintCount>{totalMinted} / 3125</MintCount>
      {canClaimFreeMint ? <FreeMint>🎉 Congratulations, you are entitled to 1 free mint!</FreeMint> : null}
    </div>
  }

  return <Wrap>
    {activeAddress && process.env.REACT_APP_LOCAL_DEV === 'true' ? adminControls : null}
    <Title>
      <TitleLeft>FIVE</TitleLeft> <TitleRight>PENGUINS</TitleRight>
    </Title>
    <Intro>
      <Paragraph>
        <b>Five Penguins</b> is a collectible concert visualizer that anyone can use for free. It is a generative art series by Gavin Shapiro, available to collect on the Ethereum blockchain, and designed to fit your Twitter banner. Similar in spirit to generative collections like those found on Art Blocks, this is first and foremost an art release, and there is no roadmap! Just majestic, endlessly marching penguins. And sometimes bees.
      </Paragraph>
      <Paragraph>
        The 3,125 squads in this collection consist of <b>every possible combination</b> of 5 different penguin types in 5 different positions (5^5). There is only one of each combination, and the rarity of these combinations is treated like poker hands (so getting five of the same penguin is much rarer than a pair or three-of-a-kind). Each squad then gets a random background and a chance to spawn with special environmental traits.
      </Paragraph>
    </Intro>
    {mintSection}
    <MintModal
      modalIsOpen={mintModalOpen}
      closeModal={closeMintModal}
      tx={currentTx}
      mintedIds={currentMintedIds}
      error={currentMintError}
    />
  </Wrap>
}

const Wrap = styled.div`
  text-align: center;
  margin-bottom: 90px;
`

const Title = styled.div`
  font-size: 48px;
  margin-bottom: 30px;
`

const TitleLeft = styled.span`
  font-weight: 200;
`

const TitleRight = styled.span`
  font-weight: bold;
`

const Intro = styled.div`
  width: 85%;
  margin: 0 auto 40px;
`

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 28px;
  margin-bottom: 20px;
`

const ButtonWrap = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`

const MintPlaceholder = styled.button`
  color: inherit;
  font-size: 18px;
  width: 171px;
  background-color: #72A3FF;
  border-radius: 10px;
  border-width: 0;
  padding: 11px; 
  
  opacity: 0.7;
  cursor: not-allowed;
`

const Mint = styled.button`
  color: inherit;
  font-size: 18px;
  width: 171px;
  background-color: #72A3FF;
  border-radius: 10px;
  border-width: 0;
  padding: 11px; 
  
  cursor: pointer;
`

const LaunchTime = styled.div`
  margin-top: 20px;
  font-style: italic;
  margin-bottom: 45px;
`

const OpenWhitelistChecker = styled.button`
  color: inherit;
  background-color: #72A3FF;
  border-radius: 10px;
  border-width: 0;
  padding: 11px; 
  font-size: 18px;
  cursor: pointer;
`

const WrongChain = styled.div`
  font-size: 20px;
  font-weight: bold;
  background: #ff00008a;
  display: inline-block;
  padding: 10px;
  border: 2px solid #ff000096;
  border-radius: 10px;
`

const MintTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-alight: center;
  margin-bottom: 20px;
`

const MintCount = styled.span`
  color: #72A3FF;
  margin-left: 23px;
  background: #2b3a53;
  border-radius: 5px;
  padding: 12px 20px;
  height: 41px;
`

const ShowPresale = styled.div`
  ${({onWhitelist}) => {
    if (!onWhitelist) {
      return css`
        opacity: 0.7;
        cursor: not-allowed;
        display: inline-block;
      `
    }
  }}
`
const NoCursorEvents = styled.div`
  ${({onWhitelist}) => {
    if (!onWhitelist) {
      return css`
          pointer-events: none
        `
    }
  }}
`

const PresaleLimited = styled.div`
  margin-top: 12px;
  font-style: italic;
  ${({onWhitelist}) => {
    if (onWhitelist) {
      return css`
        display: none;
      `
    }
  }}
`

const A = styled.a`
  ${({ fontSize }) => fontSize ? `font-size: ${fontSize}px;` : ''}
  ${({ center }) => center ? `display: block; text-align: center;` : ''}
  text-decoration: underline;
`;

const FreeMint = styled.div`
  margin-top: 12px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

const SoldOut = styled.div`
  font-size: 18px;
  line-height: 1.5em;
`

const SoldOutTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.5em;
  margin-bottom: 20px;
`

const SoldOutLinks = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.5em;
  margin-bottom: 20px;
  
  a {
    margin: 0 8px;
  }
`

export default MintSection