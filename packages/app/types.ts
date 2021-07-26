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

enum ItemType {
  Inventory = 'inventory',
  NonInventory = 'non-inventory',
  Service = 'service',
}

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  country: string;
  state?: string;
  inventory_location?: string;
  date_of_birth?: string;
  is_admin?: boolean;
};

type Item = {
  id: number;
  name: string;
  price: number;
  has_warranty?: boolean;
  purchase_location?: string;
  info?: string;
  item_type: ItemType;
  user_id: string;
  manufacturer: string;
};

// @ts-ignore
type Comment = {
  id: number;
  comment: string;
  commented_at?: Date | string;
  author_id: string;
  item_id: string;
};
