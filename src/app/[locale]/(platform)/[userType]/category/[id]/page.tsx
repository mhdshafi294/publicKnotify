// Internal Imports
import {
  getCategoriesAction,
  getTrendingAction,
} from "@/app/actions/podcastActions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import PodcastsByCategoryContainer from "../_components/podcasts-by-category-container";

/**
 * Page Component
 * Fetches podcasts by category and displays them on the page.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the podcast category.
 * @param {string} props.params.userType - The type of user to filter podcasts.
 *
 * @returns {JSX.Element} The rendered page with podcasts by category.
 */
const Page = async ({
  params,
}: {
  params: { id: string; userType: string };
}) => {
  // Fetch the list of podcasts by category
  const podcastsByCategory = await getTrendingAction({
    type: params.userType,
    category_id: params.id,
    page: "1",
  });

  // Fetch all categories
  const getCategories = await getCategoriesAction();

  return (
    <MaxWidthContainer className="pt-8 space-y-4">
      {/* Display the category name as the page title */}
      <h1 className="text-3xl font-bold capitalize">
        {getCategories.find((item) => item.id.toString() === params.id)?.name ||
          ""}
      </h1>

      {/* Render the podcasts in a container */}
      <PodcastsByCategoryContainer
        initialData={podcastsByCategory.podcasts}
        categoryId={params.id}
        type={params.userType}
      />
    </MaxWidthContainer>
  );
};

export default Page;
