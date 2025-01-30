"use client";

export default async function SingleAccordion(props) {

    const toggleAccordion = async (item) => {
        if (!item) return; // Safety check

        const container = item.querySelector(".accordion-container");
        const button = item.querySelector(".each-accordion button");
        const openLine = item.querySelector(".each-accordion .open-line");

        if (item.classList.contains("open")) {
            container.style.height = `0px`;
            item.classList.remove("open");
            button.classList.remove("open");
            openLine.classList.remove("opacity-0");
        } else {
            const contentHeight = item.querySelector(".accordion-text").getBoundingClientRect().height;
            container.style.height = `${contentHeight}px`;
            item.classList.add("open");
            button.classList.add("open");
            openLine.classList.add("opacity-0");
        }
    };

    return (
        <div className="each-accordion w-full text-left mb-4 border border-[#2b2b2b] rounded-[20px]">
            <button
                className="w-full text-left text-lg font-[400] py-6 px-6 sm:px-12 flex justify-between items-center gap-4 rounded-[40px]"
                onClick={(e) => {
                    toggleAccordion(e.target.closest(".each-accordion"));
                }}
                title={props.question}
            >
                {props.question}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="min-w-[14px] min-h-[14px] pointer-events-none" // Prevents the SVG from blocking clicks
                >
                    <path
                        d="M6.75 0V13.5"
                        stroke="#2b2b2b"
                        strokeWidth="2"
                        className="open-line duration-500 ease-in-out"
                    />
                    <path
                        className="open-line duration-500 ease-in-out"
                        d="M13.5 6.75L-3.57628e-07 6.75"
                        stroke="#2b2b2b"
                        strokeWidth="2"
                    />
                </svg>
            </button>

            <div className="accordion-container w-full h-[0px] overflow-hidden duration-500 ease-in-out">
                <div className="accordion-text pb-6 px-6 sm:px-12 rounded-[40px]">
                    <p className="font-light">{props.answer}</p>
                </div>
            </div>
        </div>
    );
}
