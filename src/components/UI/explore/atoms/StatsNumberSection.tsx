import React from "react";
import { Box, Typography } from "@material-ui/core";
import { formatNumber } from "../../../../common/helpers";

interface Props {
  title: string;
  value?: number | string;
}

const StatsNumberSection: React.FC<Props> = ({ title, value = 0 }) => (
  <Box>
    <Typography variant="subtitle2" color="textSecondary" align="center">{title}</Typography>
    <Typography variant="h5" align="center">
      {value === 0 ? '-' : typeof value === 'string' ? value : formatNumber(value)}
    </Typography>
  </Box>
)

export default StatsNumberSection