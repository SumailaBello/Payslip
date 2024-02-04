import { FC } from 'react';
import { PaySlip, RowType } from '../../utils/types';
import { IonItem, IonLabel, IonIcon, IonCard, IonCardContent, useIonRouter, IonNote } from '@ionic/react';
import {readerOutline} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const RowItem: FC<RowType> = ({ item, index, style, onClick }) => {
    // const router = useIonRouter();
    const history = useHistory();

    const handleClick = (item: PaySlip )=> {
        history.push({pathname: 'Details', state: item})
    }

    return (
        <div style={{ height: '56px' , ...style}}>
            <IonCard onClick={()=> handleClick(item)} >
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