export const generateApiUrl = (amount, questionCategory, questionDifficulty) => {
  let apiUrl = `/api.php?amount=${amount}&type=multiple`
  if (questionCategory) apiUrl = apiUrl.concat(`&category=${questionCategory}`)
  if (questionDifficulty) apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`)
  return apiUrl
}
