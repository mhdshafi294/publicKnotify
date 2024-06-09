// import { useInfiniteQuery } from "@tanstack/react-query";
// import getTrending from "@/services/podcast/get-trending";
// import { useSearchParams } from "next/navigation";

// const useGetTrending = () => {

//   return useInfiniteQuery({
//     queryKey: ["trending", data],
//     queryFn: getTrending,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => {
//       const filePagination = lastPage.files.pagination;
//       const folderPagination = lastPage.folder.pagination;
//       if (filePagination && typeof filePagination.next_page_url === "string") {
//         return filePagination.current_page + 1;
//       } else if (
//         folderPagination &&
//         typeof folderPagination.next_page_url === "string"
//       ) {
//         return folderPagination.current_page + 1;
//       } else {
//         return undefined;
//       }
//     },
//   });
// };

// export default useGetTrending;
