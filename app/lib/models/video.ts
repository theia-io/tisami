
export interface Meta {
  name?: string | null;
  description?: string | null;
  tags?: Array<string>;
  timestamp: {
    createdAt: Date;
    updatedAt?: Date;
  }; 
}

export interface IVideo extends Meta {
  id: string;
  url: string;
  listId?: IList["id"];
}

export interface AssetMeta extends Meta {
  viewed?: number;
}

export interface IList extends AssetMeta {
  id: string;
  parentId?: IList["id"];
  // think about this
  pinnedVideoUrl?: IVideo['url'];
}
