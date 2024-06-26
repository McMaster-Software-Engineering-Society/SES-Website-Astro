import { Button, Tooltip } from "@nextui-org/react";
import type { Course } from "@utils/past-outlines";
import { HiOutlineExternalLink } from "@react-icons/all-files/hi/HiOutlineExternalLink";
import { isMobile } from "react-device-detect";
import clsx from "clsx";

type CourseOutlinePreviewProps = {
  selectedCourse: number;
  courses: Course[];
};

// TODO: Add loading skeleton to prevent jittering when switching between outlines

export default function CourseOutlinePreview({
  selectedCourse,
  courses,
}: Readonly<CourseOutlinePreviewProps>) {
  return (
    <div
      id="course-outline-preview"
      className={clsx([
        "hidden flex-col ml-8 lg:flex w-full justify-center items-center text-center",
        courses[selectedCourse].pngPaths.length !== 0 && "border-1",
      ])}>
      {courses[selectedCourse].pngPaths.length === 0 ? (
        <div>
          <h2 className="text-xl font-bold">Preview is unavailable</h2>
          <Button
            className="mt-2"
            variant="bordered"
            endContent={<HiOutlineExternalLink />}
            onClick={() => window.open(courses[selectedCourse].pdfPath)}>
            Open outline
          </Button>
        </div>
      ) : (
        <div className="relative group">
          <div className="overflow-y-scroll max-h-[78vh]">
            {courses[selectedCourse].pngPaths.map((pngPath, index) => (
              <img
                key={`${pngPath}-${index}`}
                alt={`${courses[selectedCourse].courseCode} ${courses[selectedCourse].term} outline page #${index + 1}`}
                src={pngPath}
              />
            ))}
          </div>
          <div
            className={clsx([
              "absolute top-4 right-8 transition duration-150",
              !isMobile && "group-hover:opacity-100 opacity-0",
            ])}>
            <Tooltip
              content={<span className="text-white">Open in browser</span>}
              placement="top-end"
              closeDelay={0}>
              <Button
                isIconOnly
                variant="shadow"
                color="primary"
                onClick={() =>
                  window.open(courses[selectedCourse].pdfPath, "_blank")
                }
                className="text-xl">
                <HiOutlineExternalLink />
              </Button>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}
