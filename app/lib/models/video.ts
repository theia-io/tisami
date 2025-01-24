export interface Meta {
  name?: string | null;
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
  // think about this
  pinnedVideoUrl?: IVideo['url'];
}
