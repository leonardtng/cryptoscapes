import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  FaceRounded,
  SentimentDissatisfiedRounded,
  SentimentSatisfiedRounded,
  SentimentVeryDissatisfiedRounded,
  SentimentVerySatisfiedRounded
} from '@material-ui/icons';
import { useAppSelector } from '../../../../app/hooks';
import { selectFearGreedIndex } from '../../../../features/fearGreedIndexSlice';


const MappedSentimentIcon: React.FC = () => {
  // <=25: Extreme Fear, 26-46: Fear, 47-54: Neutral, 55-76: Greed, >=77: Extreme Greed
  const theme = useTheme();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);
  const sentimentValue = Number(fearGreedIndex.value[0].value)

  if (sentimentValue <= 25) {
    return <SentimentVeryDissatisfiedRounded style={{ fill: theme.palette.error.main }} />
  }

  if (sentimentValue >= 26 && sentimentValue <= 46) {
    return <SentimentDissatisfiedRounded style={{ fill: theme.palette.error.main }} />
  }

  if (sentimentValue >= 47 && sentimentValue <= 54) {
    return <FaceRounded style={{ fill: theme.palette.warning.main }} />
  }

  if (sentimentValue >= 55 && sentimentValue <= 76) {
    return <SentimentSatisfiedRounded style={{ fill: theme.palette.success.main }} />
  }

  if (sentimentValue >= 77) {
    return <SentimentVerySatisfiedRounded style={{ fill: theme.palette.success.main }} />
  }

  return <FaceRounded />
}

export default MappedSentimentIcon
