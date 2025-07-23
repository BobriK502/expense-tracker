import React from 'react';
import { ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import InfoTile from '@/components/tiles/InfoTile/index';
import Row from '@/components/layout/row';
import Cell from '@/components/layout/cell'

import { InfoTileTypes } from '@/components/tiles/InfoTile/IInfoTile';

export default function DashboardView() {
  return (
    <ScrollView>
        <Row height={20} gap={10} >
          <Cell width={50}>
            <Row height={50} gap={2} >
              <InfoTile type={InfoTileTypes.Expenses} />
            </Row>
            <Row height={50} gap={2} >
              <InfoTile type={InfoTileTypes.Expenses} />
            </Row>
          </Cell>
        </Row>
    </ScrollView>
  );
}