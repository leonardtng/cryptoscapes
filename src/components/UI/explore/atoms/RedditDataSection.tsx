import React from "react";
import { Box, Typography } from "@material-ui/core";
import { formatNumber } from "../../../../common/helpers";

interface Props {
  title: string;
  value?: number;
}

const RedditDataSection: React.FC<Props> = ({ title, value = 0 }) => (
  <Box>
    <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
    <Typography variant="h5">{value === 0 ? '-' : formatNumber(value)}</Typography>
  </Box>
)

export default RedditDataSection