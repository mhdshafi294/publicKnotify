import PodcasterDashboard from "../_components/podcaster-dashboard";

const Page = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <main className="flex flex-1 flex-col items-start justify-start gap-6 w-full mb-2">
      <PodcasterDashboard />
    </main>
  );
};

export default Page;