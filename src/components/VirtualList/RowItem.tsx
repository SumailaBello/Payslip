import { FC } from 'react';
import { RowType } from '../../utils/types';
import { IonItem, IonLabel, IonIcon, IonCard, IonCardContent, IonNote } from '@ionic/react';
import {readerOutline} from 'ionicons/icons';

const RowItem: FC<RowType> = ({ item, index, style, onClick }) => {

    return (
        <div style={{height: '109px', ...style}}>
            <IonCard onClick={()=> onClick && onClick(item)}>
                <IonCardContent>
                    <IonItem lines='none' detail>
                        <IonIcon slot='start' size='large' icon={readerOutline} color='medium'></IonIcon>
                        <IonLabel color={''} className='ion-text-capitalize'>
                            {item.name} <br />
                            <IonNote color={'primary'}>${item.amount}</IonNote>
                        </IonLabel>
                    </IonItem>
                </IonCardContent>
            </IonCard>
        </div>
    )
};

export default RowItem