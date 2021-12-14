import { useState } from "react";
import styled from "styled-components";

const NAV_LINKS = [
  { text: 'Twitter', href: 'https://twitter.com/shapiro500', targetBlank: true },
  { text: 'Drop Details', href: '#drop-details' },
  { text: 'Trait Rarity', href: '#trait-rarity' },
  { text: 'About the Artist', href: '#about-the-artist' },
]

function makeLinks(styledATag, onClick = () => {}) {
  const ATag = styled.a`${styledATag.componentStyle.rules[0]}`
  return NAV_LINKS.map((link) => {
    if (link.targetBlank) {
      return <ATag onClick={onClick} href={link.href} target={'_blank'} rel={"nofollow"}>{link.text}</ATag>
    }
    return <ATag onClick={onClick} href={link.href}>{link.text}</ATag>
  })
}

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Wrap>
      <TopLinks>
        {makeLinks(A)}
      </TopLinks>
      <Nav>
        <HamburgerDiv onClick={() => setIsOpen(!isOpen)}>
          <img width={35} height={35} src="/menu.svg"/>
        </HamburgerDiv>
        <Menu isOpen={isOpen}>
          {makeLinks(NavItem, () => setIsOpen(false))}
        </Menu>
      </Nav>
      <HeaderLoop
        src={"/assets/header_loop.mp4"}
        poster={"/assets/placeholder.png"}
        autoPlay
        muted
        loop
        playsInline
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 35px;
`;

const TopLinks = styled.div`
  font-size: 18px;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  gap: 60px;

  @media (max-width: 624px) {
    visibility: hidden;
    height: 10px;
    padding: 0;
  }
`;

const HeaderLoop = styled.video`
  width: 100%;
  border-radius: 20px;
  margin-bottom: 15px;
  @media (max-width: 624px) {
    margin-top: 25px;
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

const HamburgerDiv = styled.a`
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
  margin-top: 15px;
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

export default Header;
