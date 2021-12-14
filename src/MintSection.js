import styled from 'styled-components'

function MintSection() {
  return <Wrap>
    <Title>
      <TitleLeft>FIVE</TitleLeft> <TitleRight>PENGUINS</TitleRight>
    </Title>
    <Intro>
      <Paragraph>
        <b>Five Penguins</b> is a generative art series by Gavin Shapiro, designed to fit your Twitter banner. Similar in spirit to generative collections like those found on ArtBlocks, this is first and foremost an art release, and there is no roadmap! Just majestic, endlessly marching penguins. And sometimes bees.
      </Paragraph>
      <Paragraph>
        The 3,125 squads in this collection consist of <b>every possible combination</b> of 5 different penguin types in 5 different positions (5^5). There is only one of each combination, and the rarity of these combinations is treated like poker hands (so getting five of the same penguin is much rarer than a pair or three-of-a-kind.). Each squad then gets a random background and a chance to spawn with special environmental traits.
      </Paragraph>
    </Intro>
    <MintPlaceholder disabled>
      Mint
    </MintPlaceholder>
    <LaunchTime>
      Snapshot for whitelist will be taken at 11:59 EST on Dec. 14<br/>
      Pre-sale opens at 12:00 EST on Dec. 16<br/>
      Public sale opens at 12:00 EST on Dec. 17
    </LaunchTime>
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

const LaunchTime = styled.div`
  margin-top: 20px;
  font-style: italic;
`

export default MintSection