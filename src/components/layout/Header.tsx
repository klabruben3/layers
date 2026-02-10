import { LoginContextProvider } from "@/contexts";
import { HeaderActions, LoginCard, SmartHeader } from "../features";
import { Logo } from "../ui";

export default function Header() {
  return (
    <LoginContextProvider>
      <SmartHeader>
        <Logo />
        <HeaderActions />
      </SmartHeader>
      <LoginCard />
    </LoginContextProvider>
  );
}
