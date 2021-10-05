import { Link, Flex } from "theme-ui"

export const StyledHeaderLink = ({ href, disabled, defaultMessage }) => (
  <Link href={href} disabled={disabled}>
    {defaultMessage}
  </Link>
)
