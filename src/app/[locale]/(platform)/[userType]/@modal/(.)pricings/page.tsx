import { getPricingsAction } from "@/app/actions/profileActions";
import PricingsContainer from "../../pricings/_components/pricings-container";
import Modal from "./modal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Pricingpage = async () => {
  const session = await getServerSession(authOptions);
  const data = await getPricingsAction({ type: session?.user?.type as string });
  return (
    <Modal>
      <PricingsContainer pricings={data} />
    </Modal>
  );
};

export default Pricingpage;