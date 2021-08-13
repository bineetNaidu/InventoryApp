type RootStackParamList = {
  Product: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type RootTabParamList = {
  Main: undefined;
  Notifications: undefined;
  Setting: undefined;
  NewItem: undefined;
  Item: { id: string };
  EditItem: { id: string };
};

type UserType = {
  id: number;
  username: string;
  email: string;
  inventory_location: InventoryLocationsType;
  is_admin?: boolean;
  created_at?: string;
  updated_at?: string;
};

type ItemsType = {
  id: number;
  name: string;
  info: string;
  price: number;
  sku?: string;
  expiration_date: string;
  purchase_location?: string;
  item_type: ItemTypesType;
  user: UserType;
  manufacturer: ManufacturersType;
  created_at?: string;
  updated_at?: string;
};

type CommentsType = {
  id: number;
  body: string;
  author_id: string;
  item_id: string;
  created_at?: string;
  updated_at?: string;
};

type InventoryLocationsType = {
  id: number;
  location: string;
  created_at?: string;
  updated_at?: string;
};

type ItemTypesType = {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
};

type ManufacturersType = {
  id: number;
  name: string;
  description: string;
  contacts: string;
  website: string;
  logo_url: string;
  created_at?: string;
  updated_at?: string;
};
