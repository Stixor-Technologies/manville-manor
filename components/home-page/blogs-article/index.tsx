"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/public/assets/icons/arrow.svg";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Button } from "@/components/button";
import { Blogs } from "@/utils/types/types";
import { BASE_URL } from "@/utils/contants";
import moment from "moment";

interface BlogsArticleProps {
  blogsData: Blogs[];
}

const BlogsArticle: FC<BlogsArticleProps> = ({ blogsData }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  const handleSlideChange = (swiper: SwiperClass) => {
    const isPrevButtonDisabled = swiper.isBeginning;
    const isNextButtonDisabled = swiper.isEnd;

    setIsPrevButtonDisabled(isPrevButtonDisabled);
    setIsNextButtonDisabled(isNextButtonDisabled);
  };

  useEffect(() => {
    if (swiperRef.current) {
      handleSlideChange(swiperRef.current);
    }
  }, []);

  return (
    <section className="py-20">
      {/* <div className="gap-x-7.5 grid grid-cols-1 gap-[1.875rem] gap-y-12 pb-10 pt-24 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="relative font-medium text-white">
            <span className="absolute right-3 top-3 rounded-[.25rem] border border-white px-2.5 py-1.5 text-xs">
              Basket Ball
            </span>
            <Image src={DummyArticle} alt="" className="mb-7" />

            <div>
              <div className="flex items-center gap-4">
                <div className="size-11 overflow-hidden rounded-full">
                  <Image src={DummyAvatar} alt="" />
                </div>
                <h4>Jake Will</h4>
              </div>

              <span className="my-5 inline-block text-white/60">
                04 June 2023
              </span>
            </div>

            <div>
              <h2 className="mb-3 font-cormorant text-[1.375rem] font-normal leading-tight">
                5 Exercises Basketball Players Should Be Using To Develop
                Strength
              </h2>

              <p>
                This article was written by Jake Willhoite from Healthlisted.com
                Strength in basketball isn't all about a massive body mass or
                ripped muscles.
              </p>
            </div>
          </div>
        ))}
      </div> */}
      {/* <div className="container px-[8.125rem]"> */}
      <h2 className="mb-4 font-cormorant text-4xl text-white">
        Sports Article
      </h2>
      {/* </div> */}

      {/* <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        freeMode={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
          <SwiperSlide
            key={index}
            className="mr-[1.875rem] last:mr-0 sm:max-w-[23.3125rem]"
          >
            <article className="relative font-medium text-white">
              <span className="absolute right-3 top-3 rounded-[.25rem] border border-white px-2.5 py-1.5 text-xs">
                Basket Ball
              </span>
              <Image src={DummyArticle} alt="" className="mb-7" />

              <div>
                <div className="flex items-center gap-4">
                  <div className="size-11 overflow-hidden rounded-full">
                    <Image src={DummyAvatar} alt="" />
                  </div>
                  <h4>Jake Will</h4>
                </div>

                <span className="my-5 inline-block text-white/60">
                  04 June 2023
                </span>
              </div>

              <div>
                <h2 className="mb-3 font-cormorant text-[1.375rem] font-normal leading-tight">
                  5 Exercises Basketball Players Should Be Using To Develop
                  Strength
                </h2>

                <p>
                  This article was written by Jake Willhoite from
                  Healthlisted.com Strength in basketball isn&apos;t all about a
                  massive body mass or ripped muscles.
                </p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper> */}

      <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        freeMode={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        {blogsData?.map((blog, index) => (
          <SwiperSlide
            key={index}
            className="mr-[1.875rem] last:mr-0 sm:max-w-[23.3125rem]"
          >
            <Link href={`/blogs/${blog.attributes?.title}`}>
              <article className="relative font-medium text-white">
                <span className="absolute right-3 top-3 rounded-[.25rem] border border-white px-2.5 py-1.5 text-xs">
                  {blog?.attributes?.tag}
                </span>

                <Image
                  src={`${BASE_URL}${blog?.attributes?.media?.data?.attributes?.url}`}
                  alt=""
                  className="mb-7"
                  width={370}
                  height={248}
                />

                <div>
                  <div className="flex items-center gap-4">
                    <div className="relative size-11 overflow-hidden rounded-full">
                      <Image
                        src={`${BASE_URL}${blog?.attributes?.auhtorImage?.data?.attributes?.url}`}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4>{blog?.attributes?.authorName}</h4>
                  </div>

                  <span className="my-5 inline-block text-white/60">
                    {moment(blog?.attributes?.date).format("DD-MM-YYYY")}
                  </span>
                </div>

                <div>
                  <h2 className="mb-3 font-cormorant text-[1.375rem] font-normal leading-tight">
                    {blog?.attributes?.title}
                  </h2>

                  <p>
                    This article was written by Jake Willhoite from
                    Healthlisted.com Strength in basketball isn&apos;t all about
                    a massive body mass or ripped muscles.
                  </p>
                </div>
              </article>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        freeMode={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="!overflow-visible "
      >
        {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
          <SwiperSlide
            key={index}
            className="mr-[1.875rem] last:mr-0 sm:max-w-[23.3125rem]"
          >
            <article className="relative font-medium text-white">
              <span className="absolute right-3 top-3 rounded-[.25rem] border border-white px-2.5 py-1.5 text-xs">
                Basket Ball
              </span>
              <Image src={DummyArticle} alt="" className="mb-7" />

              <div>
                <div className="flex items-center gap-4">
                  <div className="size-11 overflow-hidden rounded-full">
                    <Image src={DummyAvatar} alt="" />
                  </div>
                  <h4>Jake Will</h4>
                </div>

                <span className="my-5 inline-block text-white/60">
                  04 June 2023
                </span>
              </div>

              <div>
                <h2 className="mb-3 font-cormorant text-[1.375rem] font-normal leading-tight">
                  5 Exercises Basketball Players Should Be Using To Develop
                  Strength
                </h2>

                <p>
                  This article was written by Jake Willhoite from
                  Healthlisted.com Strength in basketball isn't all about a
                  massive body mass or ripped muscles.
                </p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper> */}

      <div className="mt-8 flex gap-5">
        <Button
          disabled={isPrevButtonDisabled}
          variant={"icon"}
          size={"icon"}
          className="bg-[#262626] px-5 py-4 hover:bg-[#BAB8B8] disabled:opacity-60"
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
        >
          <Image src={Arrow} alt="previous-slide" className="rotate-180" />
        </Button>

        <Button
          disabled={isNextButtonDisabled}
          variant={"icon"}
          size={"icon"}
          className="bg-[#262626] px-5 py-4 hover:bg-[#BAB8B8] disabled:opacity-60"
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
        >
          <Image src={Arrow} alt="next-slide" />
        </Button>
      </div>
    </section>
  );
};

export default BlogsArticle;
