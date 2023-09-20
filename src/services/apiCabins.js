import { removeAccents } from "../utils/helpers";
import supabase, { supabaseUrl } from "./supabase"

export const getCabins = async () => {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data
}

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const name = newCabin.isDuplicate ? newCabin.image.split('/').at(-1) : hasImagePath ? newCabin.image.name : removeAccents(newCabin.image.name);
  const imageName = `${Math.random()}-${name}`.replaceAll('/', ' ');
  const imagePath = newCabin.isDuplicate ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`:  (hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`);

  // 1. Create/edit cabin
  let query = supabase.from('cabins');
  // Create
  if (!id) {
    const cabin = { ...newCabin };
    delete cabin.isDuplicate;

    query = query.insert([{ ...cabin, image: imagePath }])
  }
  // Edit
  if (id) {
    const cabin = { ...newCabin };
    delete cabin.oldImagePath;

    query = query.update({ ...cabin, image: imagePath })
      .eq('id', id)
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error('Cabin cannot be created! Try again');
  }

  // 1.5 Duplicate image when create new cabin
  if (newCabin.isDuplicate) {
    const { error: duplicateError } = await supabase
      .storage
      .from('cabin-images')
      .copy(newCabin.image.split('/').at(-1), imageName)

    if (duplicateError) {
      console.error(duplicateError);
      throw new Error('There were some error! Try again');
    }
  }

  // 2. Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3. Delete the cabin IF there was an error uploading image (create new cabin)
  if (storageError) {
    console.error(storageError);
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)
    throw new Error('Cabin couldn\'t be created! Try again');
  }

  // 4. Delete old image if there is a new one (edit cabin)
  if (id) {
    const oldImageName = newCabin.oldImagePath.split('/').at(-1);
    const { error: imageError } = await supabase
      .storage
      .from('cabin-images')
      .remove([oldImageName])

    if (imageError) {
      console.error(imageError);
      throw new Error('Old image cannot be deleted! Try again')
    }
  }
  return data
}

export const deleteCabin = async cabin => {
  // Delete cabin
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabin.id)

  if (error) {
    console.error(error);
    throw new Error('Cannot be deleted! Try again')
  }

  // Delete image cabin
  const imageName = cabin.image.split('/').at(-1);
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .remove([imageName])

  if (storageError) {
    console.error(storageError);
    throw new Error('Image cannot be deleted! Try again')
  }
}