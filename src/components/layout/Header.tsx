import { HeaderActions, LoginCard, SmartHeader } from "../features";
import { Logo } from "../ui";

export default function Header() {
  return (
    <>
      <SmartHeader>
        <Logo />
        <HeaderActions />
      </SmartHeader>
    </>
  );
}
