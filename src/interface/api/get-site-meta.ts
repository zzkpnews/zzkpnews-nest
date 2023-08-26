export type GetSiteMetaAPI = {
  siteTitle: string;
  siteDescription: string | null;
  siteKeywords: string | null;

  contactAddress: string | null;
  contactEmail: string | null;
  contactPhone: string[] | null;
  contactWechat: string | null;

  infoTechnologySupport: string | null;
  infoIcpLicense: string | null;
  infoSecurityLicense: string | null;
  infoInstitution: string | null;

  settingEnableMemoryMode: boolean;
  settingMaintainingMode: boolean;
};
