import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const defaultCategory = {
  color: 'gray',
  title: 'Choose category',
  id: null,
  iconId: 'default'
}

const useCategoriesState = create(
  combine(
    {
      selectedCategoryId: 0,
      categories: [],
      editCategory: defaultCategory,
    },
    (set, get) => {
      return {
        setCategories: (newCategories: Array<never> | ((curr: Array<never>) => Array<never>)) => {
          set((state) => {
            const categoriesUpdated = typeof newCategories === 'function'
              ? newCategories(state.categories)
              : newCategories;
            return {
              categories: categoriesUpdated,
              selectedCategoryId: categoriesUpdated[0]?.id || 0,
            }
          })
        },
        setSelectedCategoryId: (newSelectedCategoryID: number | ((curr: number) => number)) => {
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
