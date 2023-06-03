export interface PageTemplate {
  site_title: string;
  site_description: string | null;
  site_keywords: string | null;

  official_contact: {
    address: string | null;
    email: string | null;
    phone: string[] | null;
    wechat: string | null;
  };

  friend_links: {
    title: string;
    description: string | null;
    url: string | null;
  }[];

  technology_support: string | null;
  icp_license: string | null;
  security_license: string | null;
  institution: string | null;

  enable_memory_mode: boolean | null;

  navigation: {
    groups: {
      id: string;
      title: string;
      sections: {
        id: string;
        title: string;
      }[];
    }[];
  };
}
