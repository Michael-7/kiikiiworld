export interface PostBase {
  type: PostType;
  date: string;
  title: string;
  tags: string[];
}

export interface Video extends PostBase {
  type: PostType.video;
  url: string;
}

export interface Photo extends PostBase {
  type: PostType.photo;
  url: string;
}

export interface Quote extends PostBase {
  type: PostType.quote;
  quote: string;
}

export interface Story extends PostBase {
  type: PostType.story;
  markdown: string;
}

export interface Project extends PostBase {
  type: PostType.project;
  markdown: string;
}

export enum PostType {
  video = 'video',
  photo = 'photo',
  quote = 'quote',
  story = 'story',
  project = 'project',
}