import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ProfileOutlined,
  FolderOpenOutlined,
  TagOutlined,
  AppstoreOutlined,
  SolutionOutlined,
  NotificationOutlined,
  ApartmentOutlined,
  BlockOutlined,
  QuestionOutlined,
  SettingOutlined,
  HistoryOutlined,
  CommentOutlined,
  FileTextOutlined,
  CodepenOutlined
} from "@ant-design/icons";
import auth from "@src/helpers/auth";
const user = auth().user;

const sidebar = [
  {
    routeName: "frontend.admin.dashboard.index",
    icon: <HomeOutlined />,
    permissions: {
      dashboard: "R",
    },
  },
  {
    routeName: "frontend.admin.application.index",
    icon: <FileTextOutlined />,
    permissions: {
      application: "R",
    },
  },
  {
    routeName: "frontend.admin.users.title",
    icon: <UserOutlined />,
    routeParams: {},
    permissions: {
      users: "R",
    },
    type: "sub",
    children: [
      {
        routeName: "frontend.admin.users.index",
        icon: <TeamOutlined />,
        permissions: {
          users: "R",
        },
      },
      {
        routeName: "frontend.admin.roles.index",
        icon: <ApartmentOutlined />,
        permissions: {
          roles: "R",
        },
      }
    ]
  },
  {
    routeName: "frontend.admin.products.index",
    icon: <CodepenOutlined />,
    permissions: {
      products: "R",
    },
  },
];

export default sidebar;
