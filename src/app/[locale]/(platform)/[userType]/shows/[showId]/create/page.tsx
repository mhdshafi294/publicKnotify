import CreateShowContainer from "./_components/create-show-container";
const CreateShowPage = () => {
  return (
    <div className="flex-1 relative flex justify-center bg-[#034843]">
      {/* <div className="fixed py-8 start-0 top-[71px] w-6 h-[calc(100vh_-_71px)] flex flex-col justify-between items-center">
        <Button variant="ghost" size="icon" className="size-fit">
          <ChevronUpIcon />
        </Button>
        <div className="flex-1">
          ss
        </div>
        <Button variant="ghost" size="icon" className="size-fit">
          <ChevronDownIcon />
        </Button>
      </div> */}
      <CreateShowContainer />
    </div>
  );
};

export default CreateShowPage;
