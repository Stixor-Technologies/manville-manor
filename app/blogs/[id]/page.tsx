import { getBlogDetail } from "@/utils/api-calls";
import { Blogs } from "@/utils/types/types";
import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { BASE_URL } from "@/utils/contants";
import ShareButtons from "@/components/social-shares";
import moment from "moment";

interface BlogDetailProps {
  params: {
    id: string;
  };
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const data: Blogs[] = await getBlogDetail(params?.id);
  const blogsData: Blogs = data?.[0];
  return (
    <div className="container text-white">
      {blogsData ? (
        <>
          {" "}
          <h1 className="text-3xl  leading-none md:text-[4rem] ">
            {blogsData?.attributes?.title}
          </h1>
          <div className="my-10 flex flex-col justify-between gap-5 xs:flex-row">
            <div className="flex items-center gap-4">
              <div className="relative size-11 overflow-hidden rounded-full">
                <Image
                  src={`${BASE_URL}${blogsData?.attributes?.auhtorImage?.data?.attributes?.url}`}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h4>{blogsData?.attributes?.authorName}</h4>
                <span className=" inline-block text-white/60">
                  {moment(blogsData?.attributes?.date).format("DD-MM-YYYY")}
                </span>
              </div>
            </div>

            <ShareButtons />
          </div>
          <Image
            src={`${BASE_URL}${blogsData?.attributes?.media?.data?.attributes?.url}`}
            alt=""
            className="mx-auto"
            width={1636}
            height={800}
          />
          <div className="prose lg:prose-xl prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-h5:text-white prose-h6:text-white prose-img:mx-auto prose-code:text-white prose-blockquote:text-white prose-p:my-0 my-14 w-full max-w-screen-2xl !text-base text-white md:!text-lg">
            <BlocksRenderer content={data?.[0]?.attributes?.description} />
          </div>
        </>
      ) : (
        <div className="flex h-[50vh] items-center justify-center text-center">
          <p className="text-3xl lg:text-[4rem]"> No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
