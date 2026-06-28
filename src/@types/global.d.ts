declare namespace Types {
  //列表数据接口
  interface appList<T> {
    total: number;
    tableData: T[];
  }
  // 查询请求参数
  type Query = {
    replace?: boolean;
    [propName: string]: any;
  };
  //字典数据类型
  type CodeInfo = {
    value: string;
    content: string;
    parentValue: string;
  };
  //字典接口
  interface CodeType<T = CodeInfo> {
    [key: string]: Array<T>;
  }
}
declare namespace ColumnsType {
  //列表项
  interface appColumns {
    isShow?: boolean;
    prop: string;
    label: string;
    formatter?: (s: any) => void;
    align?: string;
    width?: string | number;
    sortable?: string;
    overflow?: boolean;
    isEllipsis?: boolean;
    [key: string]: any;
  }
}

declare namespace TreeType {
  //树节点
  interface nodeTreeItem {
    id: string;
    name: string;
    parentId?: number | string | null;
    children?: Array<NodeTreeItem>;
    checked: boolean;
    open: boolean;
    [key: string]: any;
  }
  // 映射关系
  type MapType = {
    [key: string]: NodeTreeItem;
  };
}

declare var wx: any;
