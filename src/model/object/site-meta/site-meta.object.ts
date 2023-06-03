export interface SiteMeta {
  site_title: string;
  site_description: string | null;
  site_keywords: string | null;

  official_contact: {
    address: string | null;
    email: string | null;
    phone: string[] | null;
    wechat: string | null;
  };

  technology_support: string | null;
  icp_license: string | null;
  security_license: string | null;
  institution: string | null;

  enable_memory_mode: boolean;
}
