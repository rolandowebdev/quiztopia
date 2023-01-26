export const generateApiUrl = (amount, questionCategory, questionDifficulty) => {
  let apiUrl = `/api.php?amount=${amount}`
  if (questionCategory) apiUrl = apiUrl.concat(`&category=${questionCategory}`)
  if (questionDifficulty) apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`)
  apiUrl.concat('&type=multiple')
  return apiUrl
}
