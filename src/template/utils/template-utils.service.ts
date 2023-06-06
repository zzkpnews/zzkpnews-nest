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
          id: group.id,
          title: group.title,
          sections: (
            await this.sectionRepository.findByGroupId(group.id)
          ).map((section) => ({
            id: section.id,
            title: section.title,
          })),
        })),
      ),
    };

    const friend_links = (await this.friendRepository.findAll()).map(
      (item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        description: item.description,
      }),
    );

    return {
      site_title: site_meta?.site_title,
      site_description: site_meta?.site_description,
      site_keywords: site_meta?.site_keywords,
      contact_address: site_meta?.contact_address ?? null,
      contact_email: site_meta?.contact_email,
      contact_phone: site_meta?.contact_phone,
      contact_wechat: site_meta?.contact_wechat,
      friend_links: friend_links,
      info_technology_support: site_meta?.info_technology_support,
      info_icp_license: site_meta?.info_icp_license,
      info_security_license: site_meta?.info_security_license,
      info_institution: site_meta?.info_institution,
      setting_enable_memory_mode:
        site_meta?.setting_enable_memory_mode ?? false,
      setting_maintaining_mode: false,
      navigation: navigation,
    };
  }
}
