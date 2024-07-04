import React from 'react'
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
    MdDeliveryDining,
} from "react-icons/md";
import { BsShop, BsCartCheckFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { auth, signOut } from "@/app/auth";

// const menuItems = [
//     {
//         title: "Pages",
//         list: [
//             {
//                 title: "Dashboard",
//                 path: "/dashboard",
//                 icon: <MdDashboard />,
//             },
//             {
//                 title: "Users",
//                 path: "/dashboard/users",
//                 icon: <MdSupervisedUserCircle />,
//             },
//             {
//                 title: "Services",
//                 path: "/dashboard/services",
//                 icon: <MdShoppingBag />,
//             },
//             {
//                 title: "Orders",
//                 path: "/dashboard/orders",
//                 icon: <BsCartCheckFill />,
//             },
//             {
//                 title: "Transactions",
//                 path: "/dashboard/transactions",
//                 icon: <MdAttachMoney />,
//             },
//             {
//                 title: "Profile",
//                 path: "/dashboard/profile",
//                 icon: <CgProfile />,
//             },
//         ],
//     },
//     {
//         title: "Analytics",
//         list: [
//             {
//                 title: "Revenue",
//                 path: "/dashboard/revenue",
//                 icon: <MdWork />,
//             },
//             {
//                 title: "Reports",
//                 path: "/dashboard/reports",
//                 icon: <MdAnalytics />,
//             },
//             {
//                 title: "Teams",
//                 path: "/dashboard/teams",
//                 icon: <MdPeople />,
//             },
//         ],
//     },
//     {
//         title: "Partners",
//         list: [
//             {
//                 title: "Riders",
//                 path: "/dashboard/riders",
//                 icon: <MdDeliveryDining />,
//             },
//             {
//                 title: "Shops",
//                 path: "/dashboard/shops",
//                 icon: <BsShop />,
//             },
//         ],
//     },
//     {
//         title: "User",
//         list: [
//             {
//                 title: "Settings",
//                 path: "/dashboard/settings",
//                 icon: <MdOutlineSettings />,
//             },
//             {
//                 title: "Help",
//                 path: "/dashboard/help",
//                 icon: <MdHelpCenter />,
//             },
//         ],
//     },
// ];

const getMenuItemsForUserRole = (userRole) => {
    let menuItems = [];
    switch (userRole) {
        case "Admin":
            menuItems = adminMenuItems;
            break;
        case "Rider":
            menuItems = riderMenuItems;
            break;
        case "Shop":
            menuItems = shopMenuItems;
            break;
        default:
            break;
    }
    return menuItems;
};

const adminMenuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Services",
                path: "/dashboard/services",
                icon: <MdShoppingBag />,
            },
            {
                title: "Orders",
                path: "/dashboard/orders",
                icon: <BsCartCheckFill />,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: "/dashboard/revenue",
                icon: <MdWork />,
            },
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdAnalytics />,
            },
            {
                title: "Customers",
                path: "/dashboard/customers",
                icon: <MdPeople />,
            },
        ],
    },
    {
        title: "Partners",
        list: [
            {
                title: "Riders",
                path: "/dashboard/riders",
                icon: <MdDeliveryDining />,
            },
            {
                title: "Shops",
                path: "/dashboard/shops",
                icon: <BsShop />,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const riderMenuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Profile",
                path: "/dashboard/profile",
                icon: <CgProfile />,
            },
            {
                title: "Orders",
                path: "/dashboard/orders",
                icon: <BsCartCheckFill />,
            },  
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const shopMenuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Services",
                path: "/dashboard/services",
                icon: <MdShoppingBag />,
            },
            {
                title: "Orders",
                path: "/dashboard/orders",
                icon: <BsCartCheckFill />,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />,
            },
            {
                title: "Profile",
                path: "/dashboard/profile",
                icon: <CgProfile />,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: "/dashboard/revenue",
                icon: <MdWork />,
            },
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdAnalytics />,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <MdHelpCenter />,
            },
        ],
    },
];




const Sidebar = async () => {
    const { user } = await auth();

    const menuItems = getMenuItemsForUserRole(user.userRole);
    
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image
                    className={styles.userImage}
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width="50"
                    height="50"
                />
                <div className={styles.userDetail}>
                    <span className={styles.username}>{user.username}</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <React.Fragment key={cat.title}>
                        <li>
                            <span className={styles.cat}>{cat.title}</span>
                            {cat.list.map((item) => (
                                <MenuLink item={item} key={item.title} />
                            ))}
                        </li>
                    </React.Fragment>
                ))}
            </ul>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button className={styles.logout}>
                    <MdLogout />
                    Logout
                </button>
            </form>
        </div>
    );
};

export default Sidebar;
