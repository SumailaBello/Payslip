import React, { FC, memo, StyleHTMLAttributes } from 'react';
// import { FixedSizeList as List, areEqual } from 'react-window';
import { RowType, VirtualListType } from '../../utils/types';
import { Virtuoso } from 'react-virtuoso';
import { IonAvatar, IonContent, IonItem, IonLabel, IonIcon } from '@ionic/react';
import RowItem from './RowItem';

export const VirtualList: FC<VirtualListType> = ({ items })=> {
    console.log(items)
   
    return ( 
        <Virtuoso className="ion-content-scroll-host"
            style={{ height: '100%' }}
            // totalCount={items?.length}
            data={items}
            itemContent={(index, item) => {
                // console.log(item)
                return (
                    <RowItem item={item} style={{marginBottom: '65px'}}/>
                );
            }}
        />
    );
  }