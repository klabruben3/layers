import { Logo, HeaderActions } from "../features";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-global w-full border-b-2 border-[var(--gray)]">
      <Logo />
      <HeaderActions />
    </header>
  );
}
