import {
  getCategoriesAction,
  getTrendingAction,
} from "@/app/actions/podcastActions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import PodcastsByCategoryContainer from "../_components/podcasts-by-category-container";

const Page = async ({
  params,
}: {
  params: { id: string; userType: string };
}) => {
  const podcastsByCategory = await getTrendingAction({
    type: params.userType,
    category_id: params.id,
    page: "1",
  });
  const getCategories = await getCategoriesAction();
  return (
    <MaxWidthContainer className="pt-8 space-y-4">
      <h1 className="text-3xl font-bold capitalize">
        {getCategories.find((item) => item.id.toString() === params.id)?.name ||
          ""}
      </h1>
      <PodcastsByCategoryContainer
        initialData={podcastsByCategory.podcasts}
        categoryId={params.id}
        type={params.userType}
      />
    </MaxWidthContainer>
  );
};

export default Page;
