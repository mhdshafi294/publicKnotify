import PodcasterDashboard from "./_components/podcaster-dashboard";

const Page = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex flex-1 flex-col items-start justify-start gap-6 w-full">
      <PodcasterDashboard {...{ params, searchParams }} />
    </div>
  );
};

export default Page;
