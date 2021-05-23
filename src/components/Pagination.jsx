import { Box } from "@material-ui/core";
import React from "react";
import NegativeButton from "./NegativeButton";
import PositiveButton from "./PositiveButton";

function Pagination({ show, currPage, lastPage, onPreviousPage, onNextPage }) {
  return show ? (
    <Box
      display="flex"
      justifyContent="center"
      mr="auto"
      width={625}
      mt={3}
      mb={3}
    >
      {currPage > 0 ? (
        <NegativeButton
          onClick={onPreviousPage}
          style={{ maxWidth: 100, borderRadius: 6 }}
        >
          Quay lại
        </NegativeButton>
      ) : null}
      {lastPage ? null : (
        <PositiveButton
          onClick={onNextPage}
          style={{ maxWidth: 100, borderRadius: 6, marginLeft: 12 }}
        >
          Xem thêm
        </PositiveButton>
      )}
    </Box>
  ) : null;
}

export default Pagination;
