import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import DashboardCardContainer from "./_components/dashboard-card-container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, MenuIcon } from "lucide-react";
const AllShowsPage = () => {
  const t = useTranslations("Index");
  return (
    <main className="flex-1">
      <div className="flex w-full justify-between items-center px-4 sm:px-6 md:px-8 py-3 border-b border-b-secondary">
        <h2>{t("all-shows")}</h2>
        <div>
          <Button variant="outline">{t("add-show")}</Button>
        </div>
      </div>
      <div className="py-3 px-4 sm:px-6 md:px-8">
        <DashboardCardContainer className="rounded">
          <h2 className="text-3xl font-bold">{t("all-shows")}</h2>
          <Table className="flex-1 shrink-0 grow">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Title</TableHead>
                <TableHead className="">{t("episodes")}</TableHead>
                <TableHead className="">{t("role")}</TableHead>
                <TableHead className="">{t("owner")}</TableHead>
                <TableHead className="text-end"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex gap-3 items-center">
                  <img src="/draftC.png" className="size-16" alt="" />{" "}
                  <p className="font-bold">name</p>
                </TableCell>
                <TableCell className="">1</TableCell>
                <TableCell className="">2</TableCell>
                <TableCell className="">You</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end w-full ">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>{t('episodes')}</DropdownMenuItem>
                        <DropdownMenuItem>{t('audience')}</DropdownMenuItem>
                        <DropdownMenuItem>{t('show-setting')}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DashboardCardContainer>
      </div>
    </main>
  );
};

export default AllShowsPage;
