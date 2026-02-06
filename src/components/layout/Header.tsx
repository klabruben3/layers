import { LoginContextProvider } from "@/contexts";
import { Logo, HeaderActions, SmartHeader, LoginCard } from "../features";

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
