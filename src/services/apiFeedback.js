import supabase from "./supabase"

export const getIdFeedbacks = async () => {
  const { data, error } = await supabase
    .from('feedbacks')
    .select('bookingId')

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data
}

export const addFeedback = async newFeedback => {
  // 1. Create new feed back
  const { data, error } = await supabase
    .from('feedbacks')
    .insert([newFeedback])
    .select()
    .single()

  if (error) {
    console.error(error);
    throw new Error("Feedback could not be created");
  }

  // 2. Get all feedbacks rating cabin
  const { data: ratings, error: feedbackError } = await supabase
    .from('feedbacks')
    .select('rating')
    .eq('cabinId', data.cabinId)
  if (feedbackError) {
    return data
  }
  // 3. Update synchronize data rating
  const rating = ratings.reduce((acc, cur, _, arr) => acc + cur.rating / arr.length, 0);
  const { error: ratingError } = await supabase
    .from('cabins')
    .update({ rating })
    .eq('id', data.cabinId)
  if (ratingError) return data

  return data
}

