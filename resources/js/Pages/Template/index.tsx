import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import React from "react";

const index = ({ auth }: PageProps) => {
  return (
    <>
      <Head title="Templates"></Head>

      <MainLayout auth={auth}>hello</MainLayout>
    </>
  );
};

export default index;
