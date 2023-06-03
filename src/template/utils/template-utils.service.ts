import { DependenceFlags } from '@/constant/dep-flags';
import { PageTemplate } from '@/interface/template/utils';
import { Group } from '@/model/entity/group/group.entity';
import { Friends } from '@/model/object/friends/friends.object';
import { SiteMeta } from '@/model/object/site-meta/site-meta.object';
import { ObjectStorage } from '@/repository/object-storage/object-storage';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateUtilsService {
  constructor(
    @Inject(DependenceFlags.ObjectStorage)
    private readonly objectStorage: ObjectStorage,
    @Inject(DependenceFlags.GroupRepository)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async getTemplateUtils(): Promise<PageTemplate> {
    const site_meta = this.objectStorage.get<SiteMeta>('site-meta');
    const friend_links = this.objectStorage
      .get<Friends>('friends')
      .map((item) => ({
        title: item.url,
        description: item.description,
        url: item.url,
      }));

    const navigation = {
      groups: (await this.groupRepository.find()).map((group) => ({
        id: group.id,
        title: group.title,
        sections: group.sections.map((section) => ({
          id: section.id,
          title: section.title,
        })),
      })),
    };

    return {
      site_title: site_meta.site_title,
      site_description: site_meta.site_description,
      site_keywords: site_meta.site_keywords,
      official_contact: site_meta.official_contact,
      friend_links: friend_links,
      technology_support: site_meta.technology_support,
      icp_license: site_meta.icp_license,
      security_license: site_meta.security_license,
      institution: site_meta.institution,
      enable_memory_mode: site_meta.enable_memory_mode,
      navigation: navigation,
    };
  }
}
