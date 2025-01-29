"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import CartAccount from "./cart-account";
import GetContent from "@/lib/wp/get-content";
import DashboardNav from "../dashboard/dashboard-nav";
import { useSession } from "next-auth/react";

export default async function Header() {
    const { data: sessionClient, status } = useSession();

    const [session, setSession] = useState(sessionClient || null);
    // const [pageContent, setPageContent] = useState(null);
    const [menu, setMenu] = useState(false);

    // const menuLogo = useMemo(() => {
    //     return pageContent?.menuLogo?.node?.sourceUrl || "/images/logos/dr-green-logo.png";
    // }, [pageContent]);

    const handleMenuClose = () => {
        setMenu(!menu);
    }

    // Disable scrolling when menu is open
    useEffect(() => {
        if (menu) {
            document.body.style.overflow = "hidden"; // Prevent scrolling
        } else {
            document.body.style.overflow = ""; // Restore scrolling
        }
        return () => (document.body.style.overflow = ""); // Cleanup on unmount
    }, [menu]);


    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        pageContent {
            menuIcon {
                node {
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            menuIconText
            menuLogo {
                node {
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
        featuredImage {
            node {
                sourceUrl
                mediaDetails {
                    height
                    width
                }
                title
            }
        }
    }
}
    `;
    const pageContent = (await GetContent(query)).pageBy.pageContent;

    return (
        <header className="top-0 left-0 w-full z-[1000] bg-gradient-to-t from-white/80 to-primary/60">
            <div className="container mx-auto px-4 2xl:max-w-[calc(100%_-_5rem)] py-3">
                <div className="grid grid-cols-3 items-center">
                    <div className="flex justify-start items-center gap-4">
                        {
                            sessionClient && (
                                <>
                                    <button
                                        className="block md:hidden"
                                        onClick={() => setMenu(!menu)}
                                        aria-label="Toggle Menu"
                                    >
                                        <Image
                                            src="/images/icons/menu.svg"
                                            alt="Menu Icon"
                                            width={30}
                                            height={30}
                                            priority
                                        />
                                    </button>
                                </>
                            )
                        }
                        {/* <Image
                            src="/images/general/main.png"
                            alt="Planet Icon"
                            width={50}
                            height={50}
                            priority
                            className="max-w-[30px] sm:max-w-full h-auto"
                        /> */}
                        <Image
                            src={pageContent.menuIcon.node.sourceUrl}
                            alt="Planet Icon"
                            width={50}
                            height={50}
                            // width={pageContent.menuIcon.node.mediaDetails.width}
                            // height={pageContent.menuIcon.node.mediaDetails.height}
                            priority
                            className="max-w-[30px] sm:max-w-full h-auto"
                        />
                        <p className="text-2xl sm:text-4xl leading-none secondary-font hidden sm:block">
                            {pageContent.menuIconText}
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link href="/">
                            <Image
                                src={pageContent.menuLogo.node.sourceUrl}
                                alt="Website Logo"
                                width={60}
                                height={60}
                                // width={pageContent.menuLogo.node.mediaDetails.width}
                                // height={pageContent.menuLogo.node.mediaDetails.height}
                                priority
                            />
                            {/* <Image
                                src={menuLogo}
                                alt="Website Logo"
                                width={60}
                                height={60}
                                priority
                                className="max-w-[30px] sm:max-w-full h-auto"
                            /> */}
                        </Link>
                    </div>
                    <CartAccount session={session} />
                </div>
            </div>
            {/* Hamburger menu */}
            {menu && (
                <nav className="absolute top-full h-screen left-0 w-full bg-white shadow-md md:hidden">
                    <div className="p-4">
                        <DashboardNav menuPage={menu} handleMenuClose={handleMenuClose} />
                    </div>
                </nav>
            )}
        </header>
    );
}
