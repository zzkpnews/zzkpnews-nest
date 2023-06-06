import { DependenceFlags } from '@/constant/dep-flags';
import { PageTemplate } from '@/interface/template/utils';
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

  async getTemplateUtils(): Promise<PageTemplate> {
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
      site_title: site_meta?.site_title ?? '',
      site_description: site_meta?.site_description ?? '',
      site_keywords: site_meta?.site_keywords ?? '',
      official_contact: site_meta?.official_contact,
      friend_links: friend_links,
      technology_support: site_meta?.technology_support ?? '',
      icp_license: site_meta?.icp_license ?? '',
      security_license: site_meta?.security_license ?? '',
      institution: site_meta?.institution ?? '',
      enable_memory_mode: site_meta?.enable_memory_mode ?? false,
      navigation: navigation,
    };
  }
}
