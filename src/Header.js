import styled from 'styled-components'

function Header() {
  return <Wrap>
    <TopLinks>
      <A href={"https://twitter.com/shapiro500"} rel={"nofollow"} target={"_blank"}>Twitter</A>
      <A href={"#drop-details"}>Drop Details</A>
      <A href={"#trait-rarity"}>Trait Rarity</A>
      <A href={"#about-the-artist"}>About the Artist</A>
      {/*<a href={"#"}>OpenSea</a>*/}
      {/*<a href={"#"}>Contract</a>*/}
      {/*<a href={"#"}>FAQs</a>*/}
    </TopLinks>
    <HeaderLoop
      src={"/assets/header_loop.mp4"}
      poster={"/assets/placeholder.png"}
      autoPlay
      muted
      loop
      playsInline
    />
  </Wrap>
}

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 35px;
`

const TopLinks = styled.div`
  font-size: 18px;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  gap: 60px;
  
  @media (max-width: 500px) {
    visibility: hidden;
    height: 10px;
    padding: 0;
  }
`

const HeaderLoop = styled.video`
  width: 100%;
  border-radius: 20px;
`

const A = styled.a`
  text-align: center;
  line-height: 1.4
 
`

export default Header
