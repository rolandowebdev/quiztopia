export const generateApiUrl = (amount, questionCategory, questionDifficulty, questionType) => {
  let apiUrl = `/api.php?amount=${amount}`;
  if (questionCategory) apiUrl = apiUrl.concat(`&category=${questionCategory}`);
  if (questionDifficulty) apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`);
  if (questionType) apiUrl = apiUrl.concat(`&type=${questionType}`);
  return apiUrl;
};
