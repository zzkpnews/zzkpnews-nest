/**
 * The dependency flag for making inject.
 */
export const DependenceFlags = {
  DataSource: Symbol('data source'),
  ObjectStorage: Symbol('object storage'),

  ArticleRepository: Symbol('article repository'),
  BookRepository: Symbol('book repository'),
  CreatorRepository: Symbol('creator repository'),
  CarouselRepository: Symbol('carousel repository'),
  FriendRepository: Symbol('friend repository'),
  GroupRepository: Symbol('group repository'),
  NotificationRepository: Symbol('notification repository'),
  SectionRepository: Symbol('section repository'),
  TopicRepository: Symbol('topic repository'),
  VideoRepository: Symbol('video repository'),

  NewsListItemRepository: Symbol('news-list-item repository'),
  BooksListItemRepository: Symbol('books-list-item repository'),
  SearchListItemRepository: Symbol('search-result-item repository'),
  CreatorAllocationRepository: Symbol('allocation repository'),
};
