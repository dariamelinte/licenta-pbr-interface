import { UserCircle } from "@/components/icons";

type Route = {
    text: string;
    url: string;
    icon?: React.JSX.Element;
  };
  
export const routes: Route[] = [
    {
        text: 'Profile',
        url: '/profile',
        icon: <UserCircle />
    },
];
