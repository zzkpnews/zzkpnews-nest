export interface SiteMeta {
  site_title: string;
  site_description: string | null;
  site_keywords: string | null;

  contact_address: string | null;
  contact_email: string | null;
  contact_phone: string[] | null;
  contact_wechat: string | null;

  info_technology_support: string | null;
  info_icp_license: string | null;
  info_security_license: string | null;
  info_institution: string | null;

  setting_enable_memory_mode: boolean;
  setting_maintaining_mode: boolean;
}
