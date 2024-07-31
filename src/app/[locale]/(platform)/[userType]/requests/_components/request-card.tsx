import { FC } from "react";

import { Request } from "@/types/request";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/navigation";
import { SquareArrowOutUpRightIcon } from "lucide-react";

type RequestCardProps = {
  request: Request;
};

const RequestCard: FC<RequestCardProps> = ({ request }) => {
  // console.log(request);
  return (
    <Link href={`requests/${request.id}`}>
      <Card className=" bg-card/50 border-card-foreground/10">
        <CardHeader>
          <div className="flex gap-3">
            <div className="w-full flex flex-col justify-start gap-3">
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <CardTitle className="capitalize">{request.name}</CardTitle>
                  <SquareArrowOutUpRightIcon
                    size={14}
                    className="text-card-foreground/30"
                  />
                </div>
                <div className="text-xs rounded bg-card-foreground text-card px-2 py-1.5 font-semibold">
                  {request.status}
                </div>
              </div>
              <p className="text-sm capitalize">
                <span className="text-xs text-card-foreground/50">From </span>
                {request.company
                  ? request.company?.full_name
                  : request.podcaster?.full_name}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-stretch gap-2">
            <p className="w-4/5 text-wrap overflow-hidden">{request.summary}</p>
            <div className="flex flex-col gap-2 w-1/5">
              <div>
                <p className="text-xs text-card-foreground/50">Publish date</p>
                <p className="text-xs">{request.publishing_date}</p>
              </div>
              <div>
                <p className="text-xs text-card-foreground/50">Offer value</p>
                <p className="text-sm">{request.ad_cost} $</p>
              </div>
              <div>
                <p className="text-xs text-card-foreground/50">AD Position</p>
                <p className="text-sm"> {request.ad_place}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-baseline">
            <p className="text-[10px] text-card-foreground/50">
              Sent at {request.created_at}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RequestCard;
