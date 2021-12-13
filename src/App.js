import styled from 'styled-components'
import './App.css'
import Header from "./Header";
import MintSection from "./MintSection";
import InfoSection from "./InfoSection";

function App() {
  return (
    <Wrap>
      <Header />
      <MintSection />
      <InfoSection />
    </Wrap>
  )
}

const Wrap = styled.div`
  margin: 0 auto;
  width: 94%;
  max-width: 1250px;
  padding: 0 3%;
`

export default App
