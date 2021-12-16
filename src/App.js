import styled from 'styled-components'
import './App.css'
import Header from "./Header";
import MintSection from "./MintSection";
import InfoSection from "./InfoSection";
import {Web3Provider} from "./Web3ProviderContext";

function App() {
  return (
    <Web3Provider>
      <Wrap>
        <Header />
        <MintSection />
        <InfoSection />
      </Wrap>
    </Web3Provider>
  )
}

const Wrap = styled.div`
  margin: 0 auto;
  width: 94%;
  max-width: 1250px;
  padding: 0 3%;
`

export default App
