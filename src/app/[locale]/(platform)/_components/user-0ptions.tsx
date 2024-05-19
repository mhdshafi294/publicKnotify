import { Fragment, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useSession } from "next-auth/react";
import ResponsivePopover from "@/components/ui/responsive-popover";

const UserOptions = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      {status === "unauthenticated" ? (
        <Link
          href="/sign-in"
          className={cn(buttonVariants({ variant: "default" }), "")}
        >
          Sign in
        </Link>
      ) : (
        <ResponsivePopover
          open={open}
          setOpen={setOpen}
          title={session?.user?.full_name as string}
          description={session?.user?.phone as string}
        >
          <div></div>
        </ResponsivePopover> // TODO: implement User Dropdown component
      )}
    </Fragment>
  );
};

export default UserOptions;
