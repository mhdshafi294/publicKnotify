import React from "react";
import CreateShowContainer from "./_components/create-show-container";

/**
 * The CreateShowPage component renders the interface for creating a new show.
 * It provides a container where the user can input the necessary information to create a show.
 *
 * @returns {JSX.Element} The rendered CreateShowPage component.
 */
const CreateShowPage: React.FC = () => {
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
      <CreateShowContainer />
    </div>
  );
};

export default CreateShowPage;
