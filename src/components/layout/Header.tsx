import { HeaderActions, SmartHeader } from "../features";
import { Logo } from "../ui";

export default async function Header() {
  return (
    <SmartHeader>
      <Logo />
      <HeaderActions />
    </SmartHeader>
  );
}
