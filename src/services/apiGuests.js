import { PAGE_SIZE_GUESTS } from "../utils/constants";
import supabase from "./supabase"

export const getGuests = async ({ page, all }) => {
  let query = supabase
    .from('guests')
    .select('*', { count: 'exact' })

  if (!all) {
    const from = (page - 1) * PAGE_SIZE_GUESTS;
    const to = page * PAGE_SIZE_GUESTS - 1;

    query = query.range(from, to).order('created_at', { ascending: false });
  }
  if (all)
    query = query.order('fullName', { ascending: true });

  const { data, error, count } = await query;

  if (error) throw new Error("Guests could not get loaded");
  return { data, count }
}

export const createGuest = async (guest) => {
  const { data, error } = await supabase
    .from('guests')
    .insert([guest])
    .select();

  if (error) throw new Error('There was an error while creating new guest! Try again.')
  return data
}

export const deleteGuest = async id => {
  const { data, error } = await supabase
    .from('guests')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be deleted");
  }
  return data;
}
