import { StyledNav,NavLink } from './styles/Navbar.styled';

export default function Navbar() {
  return (
      <StyledNav>
        <NavLink href={'/'}>
          <p>Home</p>
        </NavLink>
        <NavLink href={'/produtos'}>
          <p>Produtos</p>
        </NavLink>
        <NavLink href={'/lookbook'}>
          <p>LookBook</p>
        </NavLink>
        <NavLink href={'/links'}>
          <p>Links</p>
        </NavLink>
      </StyledNav>
  )
}
  