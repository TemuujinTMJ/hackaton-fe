export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: number;
  dob?: Date;
  address?: string;
  profile_img?: string;
  gender?: string;
  password?: string;
  coordinate?: string;
  longitude?: number;
  latitude?: number;
  user_role_id: string;
  status?: string;
}
