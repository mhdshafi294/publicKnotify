import React from "react";
import EditShowContainer from "./_components/edit-show-container";

interface EditShowPageProps {
  params: { showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * The EditShowPage component renders the interface for Editing a new show.
 * It provides a container where the user can edit the information of a specific show.
 *
 * @returns {JSX.Element} The rendered EditShowPage component.
 */
const EditShowPage: React.FC<EditShowPageProps> = ({
  params,
  searchParams,
}) => {
  return (
    <div className="flex-1 relative flex justify-center">
      {/* The following sidebar code is commented out. Uncomment if needed for navigation controls. */}
      {/* 
      <div className="fixed py-8 start-0 top-[71px] w-6 h-[calc(100vh_-_71px)] flex flex-col justify-between items-center">
        <Button variant="ghost" size="icon" className="size-fit">
          <ChevronUpIcon />
        </Button>
        <div className="flex-1">ss</div>
        <Button variant="ghost" size="icon" className="size-fit">
          <ChevronDownIcon />
        </Button>
      </div> 
      */}
      <EditShowContainer showId={params.showId} />
    </div>
  );
};

export default EditShowPage;
