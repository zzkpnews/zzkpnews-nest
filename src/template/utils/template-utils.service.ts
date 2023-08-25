import { DependenceFlags } from '@/constant/dep-flags';
import { PageTemplateUtils } from '@/interface/template/utils';
import { FriendRepository } from '@/model/entity/friend/friend.repository';
import { GroupRepository } from '@/model/entity/group/group.repository';
import { SectionRepository } from '@/model/entity/section/section.repository';
import { SiteMeta } from '@/model/object/site-meta/site-meta.object';
import { ObjectStorage } from '@/repository/object-storage/object-storage';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TemplateUtilsService {
  constructor(
    @Inject(DependenceFlags.ObjectStorage)
    private readonly objectStorage: ObjectStorage,
    @Inject(DependenceFlags.GroupRepository)
    private readonly groupRepository: GroupRepository,
    @Inject(DependenceFlags.SectionRepository)
    private readonly sectionRepository: SectionRepository,
    @Inject(DependenceFlags.FriendRepository)
    private readonly friendRepository: FriendRepository,
  ) {}

  async getTemplateUtils(): Promise<PageTemplateUtils> {
    const site_meta = this.objectStorage.get<SiteMeta>('site-meta');

    const navigation = {
      groups: await Promise.all(
        (
          await this.groupRepository.findAll()
        ).map(async (group) => ({
          groupId: group.id,
          groupTitle: group.title,
          sections: (
            await this.sectionRepository.findByGroupId(group.id)
          ).map((section) => ({
            sectionId: section.id,
            sectionTitle: section.title,
          })),
        })),
      ),
    };

    const friend_links = (await this.friendRepository.findAll()).map((item) => ({
      friendId: item.id,
      friendTitle: item.title,
      friendUrl: item.url,
      friendDescription: item.description,
    }));

    return {
      siteTitle: site_meta?.siteTitle,
      siteDescription: site_meta?.siteDescription,
      siteKeywords: site_meta?.siteKeywords,
      contactAddress: site_meta?.contactAddress ?? null,
      contactEmail: site_meta?.contactEmail,
      contactPhone: site_meta?.contactPhone,
      contactWechat: site_meta?.contactWechat,
      friendLinks: friend_links,
      infoTechnologySupport: site_meta?.infoTechnologySupport,
      infoIcpLicense: site_meta?.infoIcpLicense,
      infoSecurityLicense: site_meta?.infoSecurityLicense,
      infoInstitution: site_meta?.infoInstitution,
      settingEnableMemoryMode: site_meta?.settingEnableMemoryMode ?? false,
      settingEnableMaintainingMode: site_meta?.settingMaintainingMode ?? false,
      navigation: navigation,
    };
  }
}
