import { Logo, HeaderActions, SmartHeader } from "../features";

export default function Header() {
  return (
    <SmartHeader>
      <Logo />
      <HeaderActions />
    </SmartHeader>
  );
}
