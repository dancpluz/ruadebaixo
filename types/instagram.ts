// types/instagram.ts

// Validation Error Types
export interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// User Type
export interface User {
  pk: string;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  is_verified: boolean;
  media_count: number;
  follower_count: number;
  following_count: number;
  is_business: boolean;

  // Optional properties (not in required array)
  account_type?: number;
  address_street?: string;
  biography?: string;
  business_category_name?: string;
  business_contact_method?: string;
  category?: string;
  category_name?: string;
  city_id?: string;
  city_name?: string;
  contact_phone_number?: string;
  external_url?: string;
  instagram_location_id?: string;
  interop_messaging_user_fbid?: string;
  latitude?: number;
  longitude?: number;
  profile_pic_url_hd?: string;
  public_email?: string;
  public_phone_country_code?: string;
  public_phone_number?: string;
  zip?: string;
}

// New types for media endpoint
export interface UserShort {
  pk: string;
  full_name?: string;
  is_private?: boolean;
  profile_pic_url?: string;
  profile_pic_url_hd?: string;
  username?: string;
  stories?: unknown[]; // Consider creating a Story type if needed
}

export interface Resource {
  pk: string;
  media_type: number;
  thumbnail_url: string;
  video_url?: string;
}

export interface Usertag {
  user: UserShort;
  x: number;
  y: number;
}

export interface Media {
  // Required properties
  pk: string;
  id: string;
  code: string;
  taken_at: string; // ISO date-time string
  media_type: number;
  user: UserShort;
  like_count: number;
  caption_text: string;
  usertags: Usertag[];
  sponsor_tags: UserShort[];

  // Optional properties
  accessibility_caption?: string;
  clips_metadata?: Record<string, unknown>;
  comment_count?: number;
  commenting_disabled_for_viewer?: boolean;
  comments_disabled?: boolean;
  has_liked?: boolean;
  image_versions2?: Record<string, unknown>;
  location?: unknown; // Add proper Location type if schema available
  play_count?: number;
  product_type?: string;
  resources?: Resource[];
  thumbnail_url?: string;
  title?: string;
  video_duration?: number;
  video_url?: string;
  view_count?: number;
}

// Response type for user medias endpoint
export type UserMediasResponse = Media[] | HTTPValidationError;

// Response type for the endpoint
export type UserInfoResponse = User | HTTPValidationError;