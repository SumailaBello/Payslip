import React, { FC, useMemo } from 'react';
import { PaySlip, VirtualListType } from '../../utils/types';
import { Virtuoso } from 'react-virtuoso';
import RowItem from './RowItem';
import { useHistory } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

export const VirtualList: FC<VirtualListType> = ({ items })=> {
    // console.log(items)
    // const router = useIonRouter();
    const history = useHistory();
    
    const handleClick = (item: PaySlip )=> {
        history.push({pathname: 'Details', state: item})
    }

    const list = useMemo(()=> items, [items]);

    return ( 
        <Virtuoso className="ion-content-scroll-host"
            style={{ height: '100%', }}
            // totalCount={items?.length}
            data={list}
            components={{
                Header: ()=> (
                    <IonHeader collapse="condense">
                        <IonToolbar color={'light'}>
                            <IonTitle size="large">Payslips</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                )
            }}
            totalCount={list.length}
            itemContent={(index, item) => {
                // console.log(item)
                return (
                    <RowItem item={item} onClick={handleClick} />
                );
            }}
            increaseViewportBy={{
                top: 200,
                bottom: 200
            }}
            fixedItemHeight={109}
        />
    )
  }