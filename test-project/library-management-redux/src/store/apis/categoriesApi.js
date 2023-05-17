import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoriesApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://645e200d12e0a87ac0e837cd.mockapi.io",
  }),
  endpoints(builder) {
    return {
      fetchCategories: builder.query({
        providesTags: (result) => {
          const tags = [
            ...result.map((res) => ({ type: "Category", id: res.id })),
            { type: "Categories", id: "CATEGORY" },
          ];

          return tags;
        },
        query: () => {
          return {
            url: "/categories",
            method: "GET",
          };
        },
      }),

      addCategory: builder.mutation({
        invalidatesTags: [{ type: "Categories", id: "CATEGORY" }],
        query: (name) => {
          return {
            url: "/categories",
            method: "POST",
            body: {
              name,
            },
          };
        },
      }),

      editCategory: builder.mutation({
        invalidatesTags: (result, error, { categoryToEdit }) => [
          { type: "Category", id: categoryToEdit.id },
        ],
        query: ({ categoryToEdit, newCategory }) => {
          console.log(categoryToEdit);
          return {
            url: `/categories/${categoryToEdit.id}`,
            method: "PUT",
            body: {
              ...categoryToEdit,
              name: newCategory,
            },
          };
        },
      }),

      deleteCategory: builder.mutation({
        invalidatesTags: (res, error, id) => [{ type: "Category", id }],
        query: (id) => {
          return {
            url: `/categories/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
export { categoriesApi };
