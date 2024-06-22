const fetchAdditionalQuestions = async (topic) => {
  const response = await fetch(
    `https://api.example.com/questions?topic=${topic}`
  );
  const data = await response.json();
  return data.questions;
};

export default fetchAdditionalQuestions;
