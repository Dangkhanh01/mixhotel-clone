import type { Metadata } from "next";
import { Questrial, Roboto } from "next/font/google";
import "./globals.css";
import "./mixhotel-luxury.css";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-questrial",
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mixhotel.vn"),
  title: "Mix Boutique Hotel - #1 Hệ Thống Khách Sạn Tình Yêu Tại Hà Nội",
  description:
    "Mix Boutique Hotel, chúng tôi giúp bạn vẽ bức tranh tình yêu của chính mình bằng những sắc màu tươi mới, để mỗi phút giây bên nhau đều như 'Phút yêu đầu'. Một chốn riêng tư, một nơi nghỉ ngơi, một điểm đến mới toanh với đa dạng phong cách tại Hà Nội.",
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Mix Boutique Hotel - #1 Hệ Thống Khách Sạn Tình Yêu Tại Hà Nội",
    description:
      "Một chốn riêng tư, một nơi nghỉ ngơi, một điểm đến mới toanh với đa dạng phong cách tại Hà Nội.",
    url: "https://mixhotel.vn/",
    siteName: "Mix Boutique Hotel",
    images: [
      {
        url: "/images/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "Mix Boutique Hotel",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${questrial.variable} ${roboto.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0f0f12] text-white font-body antialiased selection:bg-[#c5a880] selection:text-black">
        {children}
      </body>
    </html>
  );
}
