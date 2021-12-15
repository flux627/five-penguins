import { useState } from "react";
import styled from "styled-components";
import Modal from 'react-modal';
import whitelist from './whitelist'


function WhitelistCheck({ modalIsOpen, closeModal }) {
  const [addressToCheck, setAddressToCheck] = useState('');
  const [checkResultText, setCheckResultText] = useState('');

  function onAddressFormChange(e) {
    setAddressToCheck(e.target.value)
    setCheckResultText('')
  }

  function checkWhitelist() {
    if (!(addressToCheck.split('0x')[1]?.length === 40)) {
      return setCheckResultText('Entered address is invalid. Please check and try again.')
    }
    if (whitelist.includes(addressToCheck)) {
      return setCheckResultText('✅ Address is whitelisted!')
    }
    return setCheckResultText('❌ Address is not whitelisted')
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={217}
      className="_"
      overlayClassName="_"
      ariaHideApp={false}
      contentElement={(props, children) => <ModalElement {...props}>{children}</ModalElement>}
      overlayElement={(props, contentElement) => <OverlayElement {...props}>{contentElement}</OverlayElement>}
      contentLabel="Example Modal"
    >
      <ModalTitle>Whitelist Check</ModalTitle>
      <ModalInstructions>Submit your address below to check your whitelist status:</ModalInstructions>
      <AddressInput onChange={onAddressFormChange}/>
      <AddressSubmit onClick={checkWhitelist}>Check</AddressSubmit>
      <CheckResult>
        {checkResultText}
      </CheckResult>
    </Modal>
  );
}

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 35px;
`;

const ModalElement = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 450px;
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
`
const ModalInstructions = styled.div`
  margin-bottom: 10px;
`
const AddressInput = styled.input`
  border-width: 0;
  padding: 10px;
  border-radius: 5px;
  width: 350px;
  margin-right: 10px;
  font-size: 14px;
  margin-bottom: 18px;
  
  @media (max-width: 600px) {
    width: 94%;
  }
`
const AddressSubmit = styled.button`
  color: inherit;
  font-size: 14px;
  width: 60px;
  background-color: #72A3FF;
  border-radius: 10px;
  border-width: 0;
  padding: 10px;
  margin-bottom: 18px;
  
  &:active {
    background-color: #213760;
  }
  
  @media (max-width: 600px) {
    width: 100%;
  }
`

const CheckResult = styled.div`
  font-size: 18px;
  min-height: 28px;
`

const A = styled.a`
  text-align: center;
  line-height: 1.4;
`;



export default WhitelistCheck;
