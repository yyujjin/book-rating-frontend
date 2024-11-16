import React from "react";

const BookAlertDescription = ({
  title,
  action,
}: {
  title: string;
  action: "add" | "delete";
}) => {
  return (
    <div>
      <span className="font-bold italic px-1">{title}</span>이(가){" "}
      {action === "delete" ? "삭제됩니다" : "추가됩니다"}.
    </div>
  );
};

export default BookAlertDescription;
