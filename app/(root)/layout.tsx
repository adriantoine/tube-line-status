import { fetchLineStatuses } from "@/lib/api";
import { MainLayout } from "../MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tube Line Status",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lineStatus = await fetchLineStatuses();

  return (
    <main>
      <MainLayout lineStatus={lineStatus}>{children}</MainLayout>
    </main>
  );
}
