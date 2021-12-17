import styled, { css } from "styled-components";

function InfoSection() {
  return (
    <Wrap>
      <Title id={"drop-details"}>Drop Details</Title>

      <SubTitle>Collector Rewards</SubTitle>
      <Paragraph>
        Gavin Shapiro collectors are allowed to mint 24 hours before minting
        opens to the general public. Collectors will also be allowed to mint one
        free squad. To qualify as a collector, you must hold at least one Gavin
        Shapiro piece in your minting wallet during the whitelist snapshot on
        December 14th at 11:59 pm EST. If you hold a Shapiro piece on Nifty Gateway,
        then you must link your minting wallet to your Nifty Gateway account by
        following the instructions <A href={'/assets/nifty-instructions.jpg'} target={'_blank'}>here</A>.
      </Paragraph>

      <SubTitle>Minting Information</SubTitle>
      <Paragraph>
        <BlueHighlight>December 14, 11:59 pm EST:</BlueHighlight> Whitelist
        snapshot
        <br />
        <BlueHighlight>December 16, 12:00 pm EST:</BlueHighlight> Minting begins
        for Gavin Shapiro collectors
        <br />
        <BlueHighlight>December 17, 12:00 pm EST:</BlueHighlight> Public minting
        begins
        <br />
        <br />
        Each squad is <b>0.05 ETH</b> and you can{" "}
        <b>mint up to 10 in a single transaction</b>.
      </Paragraph>

      <SubTitle>Which works count towards the whitelist?</SubTitle>
      <Paragraph>
        All Gavin Shapiro NFTs (on Ethereum) on{" "}
        <A
          href={"https://niftygateway.com/profile/shapiro500"}
          rel={"nofollow"}
          target={"_blank"}
        >
          Nifty Gateway
        </A>
        ,{" "}
        <A
          href={"https://superrare.com/shapiro500"}
          rel={"nofollow"}
          target={"_blank"}
        >
          SuperRare
        </A>
        , and{" "}
        <A
          href={
            "https://artifex.art/waves/digital-icons/gavin-shapiro-self-portrait"
          }
          rel={"nofollow"}
          target={"_blank"}
        >
          Artifex
        </A>
        . If you hold a piece on Nifty Gateway, you must make sure you
        have <A href={'/assets/nifty-instructions.jpg'} target={'_blank'}>linked your minting wallet</A> to
        your Nifty Gateway account before the whitelist snapshot on December
        14th at 11:59 pm EST. If you’ve transferred a Shapiro NFT to your minting
        wallet, that’s fine too, and it will be picked up by the snapshot!
      </Paragraph>

      <SubTitle>Can I have an animated Twitter banner?</SubTitle>
      <Paragraph>
        Not currently! But you can get a still image of your squad to use as
        your banner by clicking "My Squads" in the top menu.
      </Paragraph>

      <Spacer />

      <Title id={"trait-rarity"}>Trait Rarity</Title>
      <Paragraph>
        Rarities are split into three main categories: poker hands, environment
        traits, and BGs. The poker hand rarities are determined naturally by
        probability, and the other rarities were designed so that each rarity
        tier is twice as rare as the next in the list. The hope is that even if
        you get a common trait in one of these categories, there is still a
        chance of getting something rare in one of the other two. There is also
        a 4% chance to get the Palindrome trait, which applies to symmetrical
        penguin squads.
      </Paragraph>
      <SubTitle center>Poker Hands</SubTitle>
      <Video src={"/assets/pokerhands.mp4"} autoPlay muted loop playsInline />
      <SubTitle center>Environment Traits</SubTitle>
      <Video src={"/assets/environments.mp4"} autoPlay muted loop playsInline />
      <SubTitle center>Legendary Backgrounds</SubTitle>
      <Video
        src={"/assets/bgs_legendary.mp4"}
        autoPlay
        muted
        loop
        playsInline
      />
      <SubTitle center>Standard Backgrounds</SubTitle>
      <Video src={"/assets/bgs_standard.mp4"} autoPlay muted loop playsInline />

      <Spacer />

      <BioSection id={"about-the-artist"}>
        <GavinDesktop src={"/assets/gavin.jpg"} />
        <div>
          <SubTitle>About the Artist</SubTitle>
          <GavinMobile src={"/assets/gavin.jpg"} />
          <BioText>
            Gavin Shapiro is a digital artist whose ultimate goal is to produce
            work that makes you smile. He focuses primarily on playful
            conceptual artworks that explore how we can use digital tools to
            confront our expectations of what’s possible in a traditionally
            physical art world. He's lived in New York, Osaka and Paris, working
            on a large variety of projects including tv shows, commercials,
            outdoor displays, large-format stage visuals, and animations for
            casino games.
            <br />
            <br />
            His personal work, released under the name “shapiro500,” has been
            used as visuals at music festivals and concerts all over the world,
            and has been shown on digital billboards as part of art exhibitions
            in New York City, Paris, and Tokyo. His animations have accumulated
            hundreds of millions of views across Instagram, Facebook, Reddit,
            and Giphy, and have been sold as NFTs on Nifty Gateway and SuperRare
            since mid-2020.
          </BioText>
        </div>
      </BioSection>

      <Spacer />
    </Wrap>
  );
}

const Wrap = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 36px;
  color: #72a3ff;
  margin-bottom: 20px;
  padding-top: 25px;
  font-weight: bold;
  text-align: left;
`;

const Paragraph = styled.p`
  margin-left: 25px;
  max-width: 1200px;
  font-size: 18px;
  line-height: 28px;
  text-align: left;
  margin-top: 20px;
`;

const Video = styled.video`
  width: 85%;
  border-radius: 20px;
  @media (max-width: 850px) {
    border-radius: 10px;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const SubTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding-top: 25px;
  text-align: left;
  margin-bottom: 15px;
  ${(props) =>
    props.center &&
    css`
      text-align: center;
      margin-bottom: 30px;
      margin-top: 15px;
    `}
`;

const Spacer = styled.div`
  width: 0;
  height: 65px;
`;

const BlueHighlight = styled.span`
  color: #72a3ff;
`;

const A = styled.a`
  text-decoration: underline;
`;

const BioSection = styled.div`
  display: flex;
  gap: 20px;
`;

const GavinDesktop = styled.img`
  width: 30%;
  height: 30%;
  place-self: center;
  border-radius: 20px;
  @media (max-width: 850px) {
    display: none;
  }
`;

const GavinMobile = styled.img`
  display: none;
  width: 80%;
  height: auto;
  margin: 30px auto;
  border-radius: 20px;
  @media (max-width: 850px) {
    display: block;
  }
`;

const BioText = styled.div`
  margin-top: 30px;
  text-align: left;
  font-size: 16px;
  line-height: 1.625;
`;

export default InfoSection;
