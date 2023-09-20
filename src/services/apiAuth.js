import supabase, { supabaseUrl } from "./supabase";
import { removeAccents } from '../utils/helpers'

export const signupUser = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      }
    }
  })

  if (error) throw new Error(error.message);
  return data
}

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error.message);

  return data
}

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export const updateUser = async ({ password, fullName, avatar, oldAvatarPath }) => {
  // 1.Update password OR full name
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data

  // 2,Upload the avatar image
  const fileName = `avatar-${data.user.id}-${removeAccents(avatar.name)}`;
  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 2.5 Delete old avatar IF EXISTS
  if (oldAvatarPath) {
    const avatarName = oldAvatarPath.split('/').at(-1);
    const { error: avatarError } = await supabase.storage.from('avatars').remove([avatarName]);
    if (avatarError) throw new Error(avatarError.message);
  }

  // 3.Update avatar in the user
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({ data: { avatar: imagePath } });
  if (error2) throw new Error(error2.message);

  return updatedUser
}

export const deleteAvatar = async (avatarPath) => {
  // Change avatar in the user
  const { error } = await supabase.auth.updateUser({ data: { avatar: '' } });
  if (error) throw new Error(error.message);

  // Delete avatar
  const avatarName = avatarPath.split('/').at(-1);
  const { error: avatarError } = await supabase.storage.from('avatars').remove([avatarName]);
  if (avatarError) throw new Error(avatarError.message);
}

