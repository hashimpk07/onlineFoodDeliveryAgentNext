export interface TermCondition {
  id?: number;
  company_id?: number;
  company_name?: string;
  term?: string;
  condition?: string;
}

export interface PrivacyPolicy {
  id?: number;
  company_id?: number;
  company_name?: string;
  policy?: string;
}

export interface SocialMedia {
  id?: number;
  company_id?: number;
  company_name?: string;
  media_term?: string;
  link?: string;
}

export interface CompanyInfo {
  id: string | number;
  name: string;
  email: string;
  website?: string;
  mobile_no?: string;
  vat_id?: string;
  app_version?: string;
  app_version_ios?: string;
  min_supported_version?: string;
  min_supported_version_ios?: string;
  about?: string;
  terms_conditions?: TermCondition[];
  privacy_policies?: PrivacyPolicy[];
  social_media?: SocialMedia[];
}

export interface UpdateCompanyPayload {
  name: string;
  email: string;
  mobile_no?: string;
  app_version?: string;
  app_version_ios?: string;
  website?: string;
  vat_id?: string;
  about?: string;
  min_supported_version?: string;
  min_supported_version_ios?: string;
  add_more?: { term: string; condition: string }[];
  add_policy?: { policy: string }[];
  add_media?: { media_term: string; link: string }[];
}
