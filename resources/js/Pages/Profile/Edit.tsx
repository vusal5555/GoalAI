import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import MainLayout from "@/Layouts/MainLayout";

export default function Edit({
  auth,
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <MainLayout auth={auth}>
      <Head title="Profile" />

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 3 w-full gap-4">
          <div className="p-4 sm:p-8 w-full  bg-transparent text-white border shadow-lg shadow-gray-200/30 sm:rounded-lg">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="w-full"
            />
          </div>

          <div className="p-4 sm:p-8 w-full bg-transparent text-white border shadow-lg shadow-gray-200/30 sm:rounded-lg">
            <UpdatePasswordForm className="w-full" />
          </div>

          <div className="p-4 sm:p-8 w-full bg-transparent text-white border shadow-lg shadow-gray-200/30 sm:rounded-lg">
            <DeleteUserForm className="w-full" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
