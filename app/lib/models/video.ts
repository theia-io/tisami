export interface Meta {
  description?: string | null;
  tags?: Array<string>;
  timestamp: Date; 
}

export interface IVideo extends Meta {
  id: string;
  url: string;
  listId?: IList["id"];
}

export interface IList extends Meta {
  id: string;
  parentId?: IList["id"];
  // 
  name: string | null;
  // think on this
  pinnedVideoUrl: IVideo['url'] | null;
}
