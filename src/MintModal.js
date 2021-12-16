import { useState } from "react";
import styled, {css, keyframes} from "styled-components";
import Modal from 'react-modal';


const pngIpfsHash = 'QmWWkFftxvgySym6LGRMyYVrBZgWKezbS6xBNCeGbBtJor'
const mp4IpfsHash = 'QmeWw2zmLoVEcJgw7rGmjVnm5sEbmY5Yk4oGwkekNe38Ap'

function MintModal({ modalIsOpen, closeModal, tx, mintedIds, error }) {
  const isDoneMinting = !!mintedIds.length || error

  function pngSrc(tokenId) {
    return `https://ipfs.io/ipfs/${pngIpfsHash}/${tokenId}.png`
  }

  function mp4Src(tokenId) {
    return `https://ipfs.io/ipfs/${mp4IpfsHash}/${tokenId}.mp4`
  }

  function getVideo(tokenId) {
    return <div>
      <VideoTitle>Five Penguins #{tokenId} (<A
        download={`$five-penguins-${tokenId}-banner.png`}
        href={pngSrc(tokenId)}
        target={'_blank'}
        rel={'nofollow'}
      >Download Twitter banner</A>)</VideoTitle>
      <Video
        src={mp4Src(tokenId)}
        poster={pngSrc(tokenId)}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={217}
      className="_"
      overlayClassName="_"
      ariaHideApp={false}
      contentElement={(props, children) => <ModalElement isDoneMinting={isDoneMinting} {...props}>{children}</ModalElement>}
      overlayElement={(props, contentElement) => <OverlayElement {...props}>{contentElement}</OverlayElement>}
      contentLabel="Minting"
      shouldCloseOnOverlayClick={isDoneMinting}
      shouldCloseOnEsc={isDoneMinting}
    >
      <Wrap>
        {tx && !mintedIds.length && !error ? <div>
          <ModalTitle pulse>Minting...</ModalTitle>
        </div> : null}
        {tx && mintedIds.length && !error ? <div>
          <ModalTitle>Minted!</ModalTitle>
          <VideoGallery>
            {mintedIds.map((tokenId) => {
              // return <PngWrap><Png alt={`Five Penguins #${tokenId}`} src={pngSrc(tokenId)} /></PngWrap>
              return getVideo(tokenId)
            })}
          </VideoGallery>
          <A onClick={closeModal} fontSize={30} center>Close</A>
        </div>: null}
        {tx && error ? <div>
          Error! {error.message}
        </div>: null}
      </Wrap>
    </Modal>
  );
}

const Wrap = styled.div`
  width: 100%;
  /* margin-bottom: 35px; */
`;

const ModalElement = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;

  width: ${({isDoneMinting}) => isDoneMinting ? '70%' : '300px'};
  background-color: #264f78;
  overflow: auto;
  border-radius: 20px;
  outline: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  padding: 30px;
  

  @media (max-width: 600px) {
    width: 70%;
  }
`

const OverlayElement = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #000000c0;
  transition: opacity 200ms;

  &.ReactModal__Overlay {
    opacity: 0;
  }
  
  &.ReactModal__Overlay--after-open {
    opacity: 1;
  }

  &.ReactModal__Overlay--before-close {
    opacity: 0;
  }
`

const ModalTitle = styled.div`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
    ${({ pulse }) => pulse ? css`
      text-align: center;
      margin-bottom: 0;
      animation-name: ${Pulse};
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    ` : ''}
`

const Pulse = keyframes`
  0% {
      transform: scale(1);
  }
  50% {
      transform: scale(1.075)
  }
`

const A = styled.a`
  ${({ fontSize }) => fontSize ? `font-size: ${fontSize}px;` : ''}
  ${({ center }) => center ? `display: block; text-align: center;` : ''}
  text-decoration: underline;
  cursor: pointer;
`;

const VideoTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`

const VideoGallery = styled.div``

const Video = styled.video`
  width: 100%;
  margin-bottom:20px;
`

export default MintModal;
