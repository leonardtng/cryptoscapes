import React from 'react';
import { CardHeader } from '@material-ui/core';
import CardLayout from '../molecules/CardLayout';

const InstitutionHoldersCard: React.FC = () => {
  return (
    <CardLayout>
      <CardHeader
        title="Institution Hodlers"
        titleTypographyProps={{ variant: 'body1' }}
      />
    </CardLayout>
  )
}

export default InstitutionHoldersCard
