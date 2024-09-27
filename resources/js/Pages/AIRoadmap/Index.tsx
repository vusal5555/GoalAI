import ChatComponent, { Goal } from "@/Components/ChatComponent";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Index = ({ auth, goals }: PageProps<{ goals: { data: Goal[] } }>) => {
  return (
    <>
      <Head title="AI Chat" />
      <MainLayout auth={auth}>
        <ChatComponent goals={goals.data} />
      </MainLayout>
    </>
  );
};

export default Index;
