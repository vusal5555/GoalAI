import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import MainLayout from "@/Layouts/MainLayout";
import BottomSection from "@/Components/BottomSection";
import TopSection from "@/Components/TopSection";
import MiddleSection from "@/Components/MiddleSection";

export default function Dashboard({ auth }: PageProps) {
  return (
    <>
      <Head title="Dashboard" />
      <MainLayout auth={auth}>
        <TopSection></TopSection>
        <MiddleSection></MiddleSection>
        <BottomSection></BottomSection>
      </MainLayout>
    </>
  );
}
