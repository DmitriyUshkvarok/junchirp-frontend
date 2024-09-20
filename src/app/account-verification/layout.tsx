import { AccountVerificationHeader } from "@/components/Role-confirmation/AccountVerificationHeader";
export default function RoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AccountVerificationHeader />
      {children}
    </div>
  );
}
