import _query from './_query'

async function CategoriesQuery() {
  const query = `
    query CategoriesQuery {
      categories
    }
  `

  const { categories } = await _query(query, {})

  return categories
}

export default CategoriesQuery
