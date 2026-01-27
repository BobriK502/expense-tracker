import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const defaultCategory = {
  color: 'gray',
  title: 'Choose category',
  id: null,
  iconId: 'default'
}

type CategoriesState = {
  selectedCategoryId: number | null;
  categories: Array<any>;
  editCategory: any;
}

const useCategoriesState = create(
  combine(
    {
      selectedCategoryId: null,
      categories: [],
      editCategory: defaultCategory,
    },
    (set) => {
      return {
        setCategories: (newCategories: Array<never> | ((curr: Array<never>) => Array<never>)) => {
          set((state) => {
            const categoriesUpdated = typeof newCategories === 'function'
              ? newCategories(state.categories)
              : newCategories;
            return {
              categories: categoriesUpdated,
            }
          })
        },
        setSelectedCategoryId: (newSelectedCategoryID: (number | null) | ((curr: number | null) => (number | null))) => {
         // @ts-ignore
          set((state) => ({
            selectedCategoryId:
              typeof newSelectedCategoryID === 'function'
                ? newSelectedCategoryID(state.selectedCategoryId)
                : newSelectedCategoryID,
          }))
        },
        setEditCategory: (editCategory: any | ((curr: any) => any)) => {
          set((state) => {
            return {
              editCategory:
                typeof editCategory === 'function'
                  ? editCategory(state.editCategory)
                  : editCategory,
            }
          })
        },
      }
    },
  ),
)

export { useCategoriesState };
