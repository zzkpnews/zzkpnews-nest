export interface PageTemplateUtils {
  siteTitle: string;
  siteDescription: string | null;
  siteKeywords: string | null;

  navigation: {
    groups: {
      groupId: string;
      groupTitle: string;
      sections: {
        sectionId: string;
        sectionTitle: string;
      }[];
    }[];
  };

  contactAddress: string | null;
  contactEmail: string | null;
  contactPhone: string[] | null;
  contactWechat: string | null;

  friendLinks: {
    friendTitle: string;
    friendDescription: string | null;
    friendUrl: string | null;
  }[];

  infoTechnologySupport: string | null;
  infoIcpLicense: string | null;
  infoSecurityLicense: string | null;
  infoInstitution: string | null;

  settingEnableMemoryMode: boolean;
  settingEnableMaintainingMode: boolean;
}
