import { useTranslation } from "react-i18next";
import {
  MdOutlineDashboard,
  MdOutlineCategory,
  MdStraighten,
  MdChecklist,
  MdVerified,
  MdQrCode,
} from "react-icons/md";
import {
  TbMapPin,
  TbUserShield,
  TbJumpRope,
  TbTrashX,
  TbSettings,
  TbWorld,
  TbDeviceMobile,
  TbDeviceDesktop,
  TbSettingsDollar,
  TbSettings2,
  TbLogout,
} from "react-icons/tb";
import {
  TbUserEdit,
  TbBrandAppleArcade,
  TbTablePlus,
  TbListDetails,
  TbBrandAsana,
} from "react-icons/tb";
import { GoPackage } from "react-icons/go";
import { CiBarcode } from "react-icons/ci";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { PiWarningDiamond } from "react-icons/pi";
import {
  TbShoppingBag,
  TbFileUnknown,
  TbFileUpload,
  TbFileStack,
  TbFilePencil,
  TbMoneybag,
  TbReportMoney,
  TbAlertCircle,
  TbZoomMoney,
  TbFileInfinity,
  TbUsersGroup,
  TbUserUp,
  TbUserDollar,
  TbHomeBolt,
  TbBuildingWarehouse,
} from "react-icons/tb";
import { CiBank } from "react-icons/ci";
import { TbFilePercent, TbGiftCard } from "react-icons/tb";
import {
  BsPeople,
  BsPersonGear,
  BsPersonFillCheck,
  BsCalendarCheck,
  BsFillPersonLinesFill,
  BsFillPersonXFill,
  BsHSquare,
} from "react-icons/bs";

import {
  RiAccountPinCircleLine,
  RiTeamLine,
  RiTimeLine,
  RiGroupLine,
} from "react-icons/ri";

import {
  FaRegFileAlt,
  FaFileInvoiceDollar,
  FaChartBar,
} from "react-icons/fa";

// import {
//   MdOutlineDashboard,
//   MdOutlinePointOfSale,
// } from "react-icons/md";
import {
  // MdOutlineDashboard,
  MdOutlinePointOfSale,
} from "react-icons/md";
import {
  TbFileInvoice,
  TbReceiptRefund,
  TbFileDescription,
} from "react-icons/tb";
import { useAuth } from "../../auth/AuthContext";
import { FaStackOverflow } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { IoLogoWebComponent } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { SiFuturelearn } from "react-icons/si";

export const getMenuData = () => {
  const { t } = useTranslation();
    const { user } = useAuth();
  const id = user?._id;

  return [
    // main dashboard
    {
      section: t("main"),
      items: [
        {
          key: "dashboard",
          title: t("dashboard"),
          icon: <MdOutlineDashboard className="icons" />,
          subItems: [
            { label: t("adminDashboard"), path: "/admin" },
            { label: t("adminDashboard2"), path: "/admin-2" },
            { label: t("salesDashboard"), path: "/sales" },
          ],
        },
        {
          key: "superAdmin",
          title: t("superAdmin"),
          icon: <TbUserEdit className="icons" />,
          subItems: [
            { label: t("dashboard"), path: "/dashboard" },
            { label: t("companies"), path: "/companies" },
            { label: t("subscriptions"), path: "/subscriptions" },
            { label: t("packages"), path: "/packages" },
            { label: t("domain"), path: "/domain" },
            { label: t("purchaseTransaction"), path: "/transactions" },
          ],
        },
        {
          key: "application",
          title: t("application"),
          icon: <TbBrandAppleArcade className="icons" />,
          subItems: [
            { label: t("chat"), path: "/chat" },
            { label: t("mail"), path: "/mail" },
            {
              label: t("call"),
              nestedKey: "call",
              nested: [
                { label: t("videoCall"), path: "/video-call" },
                { label: t("audioCall"), path: "/audio-call" },
                { label: t("callHistory"), path: "/call-history" },
              ],
            },
            { label: t("calendar"), path: "/calendar" },
            { label: t("contacts"), path: "/contacts" },
            { label: t("email"), path: "/email" },
            { label: t("todo"), path: "/todo" },
            { label: t("notes"), path: "/notes" },
            { label: t("fileManager"), path: "/file-manager" },
            { label: t("projects"), path: "/projects" },
          ],
        },
      ],
    },
    // inventory section
    {
      section: t("inventory"),
      key: "inventory",
      items: [
        { label: t("product"), path: "/product", icon: <GoPackage className="icons" /> },
        { label: t("createProduct"), path: "/choose-adproduct", icon: <TbTablePlus className="icons" /> },
        { label: t("expiredProducts"), path: "/expired-products", icon: <PiWarningDiamond className="icons" /> },
        { label: t("lowStocks"), path: "/low-stocks", icon: <HiArrowTrendingUp className="icons" /> },
        { label: t("category"), path: "/category-list", icon: <TbListDetails className="icons" /> },
        { label: t("subCategory"), path: "/sub-categories", icon: <MdOutlineCategory className="icons" /> },
        { label: t("brands"), path: "/brand-list", icon: <TbBrandAsana className="icons" /> },
        { label: t("units"), path: "/units", icon: <MdStraighten className="icons" /> },
        { label: t("hsn"), path: "/hsn", icon: <BsHSquare className="icons" /> },
        { label: t("variantAttributes"), path: "/variant-attributes", icon: <MdChecklist className="icons" /> },
        { label: t("warranties"), path: "/warranty", icon: <MdVerified className="icons" /> },
        { label: t("printBarcode"), path: "/barcode", icon: <CiBarcode className="icons" /> },
        { label: t("printQRCode"), path: "/qrcode", icon: <MdQrCode className="icons" /> },
        { label: "Debit", path: "/debit-note", icon: <MdQrCode className="icons" /> },
        { label: "Credit", path: "/credit-note", icon: <MdQrCode className="icons" /> },
      ],
    },
    {
      section: t("peoples"),
      key: "Peoples",
      items: [
        {
          label: t("customers"),
          path: "/customers",
          icon: <TbUsersGroup className="icons" />,
        },
        {
          label: t("billers"),
          path: "/billers",
          icon: <TbUserUp className="icons" />,
        },
        {
          label: t("suppliers"),
          path: "/suppliers",
          icon: <TbUserDollar className="icons" />,
        },
        {
          label: t("stores"),
          path: "/store-list",
          icon: <TbHomeBolt className="icons" />,
        },
        {
          
          path: "/warehouse",
          icon: <TbBuildingWarehouse className="icons" />,
          title: t("Warehouse"),
          subItems:[
            {
              label: t("All warehouse"),
              path:"/warehouse",
            },
            {
              label : t("Stock Movement Log"),
              path:"/stock-movement-log"
            },
          ]
        },
      ],
    },
    {
      section: t("purchases"),
      key: "purchases",
      items: [
        {
          label: t("purchases"),
          path: "/purchase-list",
          icon: <TbShoppingBag className="icons" />,
        },
        {
          label: t("purchaseOrder"),
          path: "/purchase-order",
          icon: <TbFileUnknown className="icons" />,
        },
        {
          label: t("purchaseReturn"),
          path: "/purchase-returns",
          icon: <TbFileUpload className="icons" />,
        },
      ],
    },
        
    {
      section: t("Stock"),
      key: "stock",
      items: [
        {
          label: t("Manage Stock"),
          path: "/manage-stocks",
          icon: <TbShoppingBag className="icons" />,
        },
        {
          label: t("Stock Adjustment"),
          path: "/stock-adjustment",
          icon: <TbFileUnknown className="icons" />,
        },
        {
          label: t("Stock Transfer"),
          path: "/stock-transfer",
          icon: <TbFileUpload className="icons" />,
        },
      ],
    },


    {
      section: t("sales"),
      key: "sales",
      items: [
        {
          label: t("sales"),
          path: "/invoice",
          icon: <MdOutlineDashboard className="icons" />,
          title: t("salesOrders"),
          subItems: [
            {
              label: t("onlineOrders"),
              path: "/online-orders",
            },
            {
              label: t("posOrders"),
              path: "/pos-orders",
            },
          ],
        },
        {
          label: t("invoices"),
          path: "/invoice",
          icon: <TbFileInvoice className="icons" />,
        },
        {
          label: t("salesReturn"),
          path: "/sales-returns",
          icon: <TbReceiptRefund className="icons" />,
        },
        {
          label: t("quotation"),
          path: "/quotation-list",
          icon: <TbFileDescription className="icons" />,
        },
        {
          title: t("pos"),
          icon: <MdOutlinePointOfSale className="icons" />,
          key: "pos",
          subItems: [
            { label: t("pos1"), path: "/pos-1" },
            { label: t("pos2"), path: "/pos-2" },
            { label: t("pos3"), path: "/pos-3" },
            { label: t("pos4"), path: "/pos-4" },
            { label: t("pos5"), path: "/pos-5" },
          ],
        },
      ],
    },
    {
      section: t("promo"),
      key: "promo",
      items: [
        {
          label: t("coupons"),
          path: "/coupons",
          icon: <TbFilePercent className="icons" />,
        },
        {
          label: t("giftCards"),
          path: "/gift-cards",
          icon: <TbGiftCard className="icons" />,
        },
      ],
    },
    {
      section: t("location"),
      items: [
        {
          title: t("location"),
          icon: <TbMapPin className="icons" />,
          key: "Location",
          subItems: [
            { label: t("locations"), path: "/locations" },
            { label: t("countries"), path: "/countries" },
            { label: t("states"), path: "/states" },
            { label: t("cities"), path: "/cities" },
          ],
        },
      ],
    },
    {
      section: t("userManagement"),
      items: [
        { label: t("users"), icon: <TbUserShield className="icons" />, path: "/Users" },
        { label: t("rolesPermissions"), icon: <TbJumpRope className="icons" />, path: "/roles-permissions" },
        // { label: t("deleteAccountRequest"), icon: <TbTrashX className="icons" />, path: "/delete-account" },
      ],
    },
    {
      section: t("settings"),
      items: [
        {
          title: t("generalSettings"),
          // title: "General Settings",
          icon: <TbSettings className="icons" />,
          key: "generalSettings",
          subItems: [
            // { label: "Purchase", path: "/Purchase-settings" },
            // { label: "Warehouse", path: "/warehouse-settings" },
            { label: "Profile",  path: `/profile/${id}` },
            { label: "Security", path: "/security-settings" },
            // { label: "Notifications", path: "/notification" },
            // { label: "Connected Apps", path: "/connected-apps" },
          ],
        },
        {
          title: "Website Settings",
          icon: <TbWorld className="icons" />,
          key: "websiteSettings",
          subItems: [
            // { label: "System Settings", path: "/system-settings" },
            { label: "Company Settings", path: "/company-settings" },
            { label: "Language", path: "/language-settings" },
            // { label: "Prefixes", path: "/prefixes" },
            // { label: "Preference", path: "/preference" },
            // { label: "Appearance", path: "/appearance" },
            // { label: "Social Authentication", path: "/social-authentication" },
            // { label: "Language", path: "/language-settings" },
          ],
        },
        // {
        //   title: "App Settings",
        //   icon: <TbDeviceMobile className="icons" />,
        //   key: "appSettings",
        //   subItems: [
        //     {
        //       nestedKey: "Invoice",
        //       label: "Invoice",
        //       nested: [
        //         { label: "Invoice Settings", path: "/invoice-settings" },
        //         { label: "Invoice Template", path: "/invoice-template" },
        //       ],
        //     },


        //     { label: "Printer", path: "/printer-settings" },
        //     { label: "POS", path: "/pos-settings" },
        //     { label: "Custom Fields", path: "/custom-fields" },
        //   ],
        // },
        // {
        //   title: "System Settings",
        //   icon: <TbDeviceDesktop className="icons" />,
        //   key: "systemSettings",
        //   subItems: [
        //     {
        //       label: "Email",
        //       nestedKey: "Email",
        //       nested: [
        //         { label: "Email Settings", path: "/email-settings" },
        //         { label: "Email Template", path: "/email-template" },
        //       ],
        //     },
        //     {
        //       label: "SMS",
        //       nestedKey: "SMS",
        //       nested: [
        //         { label: "SMS Settings", path: "/sms-settings" },
        //         { label: "SMS Template", path: "/sms-template" },
        //       ],
        //     },
        //     { label: "OTP", path: "/otp-settings" },
        //     { label: "GDPR Cookies", path: "/gdpr-settings" },
        //   ],
        // },
        // {
        //   title: "Financial Settings",
        //   icon: <TbSettingsDollar className="icons" />,
        //   key: "financialSettings",
        //   subItems: [
        //     { label: "Payment Gateway", path: "/payment-gateway-settings" },
        //     { label: "Bank Accounts", path: "/bank-settings-grid" },
        //     { label: "Tax Rates", path: "/tax-rates" },
        //     { label: "Currencies", path: "/currency-settings" },
        //   ],
        // },
        // {
        //   title: "Other Settings",
        //   icon: <TbSettings2 className="icons" />,
        //   key: "otherSettings",
        //   subItems: [
        //     { label: "Storage", path: "/storage-settings" },
        //     { label: "Ban IP Address", path: "/ban-ip-address" },
        //   ],
        // },
        {
          label: "Logout",
          icon: <TbLogout className="icons" />,
          path: "/logout",
        },
      ],
    },

    // hrm
    {
      section: "HRM",
      key: "hrm",
      items: [
        {
          label: "Employees",
          path: "/employees",
          icon: <BsPeople className="icons" />,
        },
        {
          label: "Roles & Permissions",
          path: "/roles-permissions",
          icon: <BsPersonGear className="icons" />,
        },
        {
          label: "Attendance",
          path: "/attendance",
          icon: <BsCalendarCheck className="icons" />,
        },
        {
          label: "Leave Requests",
          path: "/leave-requests",
          icon: <BsFillPersonLinesFill className="icons" />,
        },
        {
          label: "Payroll",
          path: "/payroll",
          icon: <FaFileInvoiceDollar className="icons" />,
        },
        {
          label: "Full & Final",
          path: "/full-and-final",
          icon: <BsFillPersonXFill className="icons" />,
        },
        {
          label: "Departments",
          path: "/departments",
          icon: <RiAccountPinCircleLine className="icons" />,
        },
        {
          label: "Teams",
          path: "/teams",
          icon: <RiTeamLine className="icons" />,
        },
        {
          label: "Shift Management",
          path: "/shifts",
          icon: <RiTimeLine className="icons" />,
        },
        {
          label: "Managers",
          path: "/managers",
          icon: <RiGroupLine className="icons" />,
        },
      ],
    },
    // report
    {
      section: "Reports",
      key: "reports",
      items: [
        {
          label: "Sales Report",
          path: "/reports/sales",
          icon: <FaChartBar className="icons" />,
        },
        {
          label: "Purchase Report",
          path: "/reports/purchase",
          icon: <FaRegFileAlt className="icons" />,
        },
        {
          label: "Inventory Report",
          path: "/reports/inventory",
          icon: <FaChartBar className="icons" />,
        },
        {
          label: "Employee Report",
          path: "/reports/employees",
          icon: <BsFillPersonLinesFill className="icons" />,
        },
      ],
    },
    // finance & acount section
    {
      section: "Finance & Accounts",
      key: "Finance & Accounts",

      items: [
        {
          label: "Expenses",
          stateKey: "expenses",
          icon: <TbFileStack className="icons" />,
          children: [
            { label: "Expenses", path: "/expense-list" },
            { label: "Expense Category", path: "/expense-category" },
          ],
        },
        {
          label: "Income",
          stateKey: "income",
          icon: <TbFilePencil className="icons" />,
          children: [
            { label: "Income", path: "/income" },
            { label: "Income Category", path: "/income-category" },
          ],
        },
        {
          label: "Bank Accounts",
          path: "/account-list",
          icon: <CiBank className="icons" />,
        },
        {
          label: "Money Transfer",
          path: "/money-transfer",
          icon: <TbMoneybag className="icons" />,
        },
        {
          label: "Balance Sheet",
          path: "/balance-sheet",
          icon: <TbReportMoney className="icons" />,
        },
        {
          label: "Profit & Loss",
          path: "/profit&loss",
          icon: <SiFuturelearn className="icons"/>,
        },
         {
          label: "Overdue Report",
          path: "/overdue-report",
          icon: <FaStackOverflow  className="icons"/>,
        },
         {
          label: "Expense Report",
          path: "/expense-report",
          icon: <GiExpense className="icons"/>,
        },
         {
          label: "B2B & B2C",
          path: "/bc",
          icon: <IoLogoWebComponent className="icons"/>,
        },
         {
          label: "Payment History",
          path: "/payment-history",
          icon: <MdOutlinePayments className="icons"/>,
        },
         {
          label: "Credit & Debit Note",
          path: "/credit&debit-note",
          icon: <MdOutlineSpeakerNotes className="icons"/>,
        },
        {
          label: "Trial Balance",
          path: "/trial-balance",
          icon: <TbAlertCircle className="icons" />,
        },
        {
          label: "Cash Flow",
          path: "/cash-flow",
          icon: <TbZoomMoney className="icons" />,
        },
        {
          label: "Account Statement",
          path: "/account-statement",
          icon: <TbFileInfinity className="icons" />,
        },
      ],
    },


  ];
};
