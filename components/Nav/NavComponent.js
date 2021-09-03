/** @jsxImportSource theme-ui */
import { Box, NavLink, Text, Flex } from "@theme-ui/components";

export default function NavComponent({}) {
  return (
    <Flex as="nav">
      <NavLink href="#!" p={2}>
        Home
      </NavLink>
      <NavLink href="#!" p={2}>
        Blog
      </NavLink>
      <NavLink href="#!" p={2}>
        About
      </NavLink>
      {/* {loggedIn && <Text>{addr}</Text>} */}
    </Flex>
  );
}
