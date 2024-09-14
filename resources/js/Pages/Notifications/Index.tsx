import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Index = ({ auth }: PageProps) => {
  return (
    <>
      <Head title="Notifications"></Head>
      <MainLayout auth={auth}>Notifications</MainLayout>
    </>
  );
};

export default Index;
